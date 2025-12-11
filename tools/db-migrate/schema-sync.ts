import { Client } from "pg";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

import type {
  ServerConfig,
  DatabaseDefaults,
  ColumnInfo,
  IndexInfo,
  TableStructure,
  ColumnDiff,
  IndexDiff,
  SchemaDifferences,
  SyncResult,
  SyncOptions,
} from "./types";

const execAsync = promisify(exec);
const SCHEMA_DIR = path.join(__dirname, "..", "schema");

/**
 * Dump schema from master database using pg_dump
 */
export async function dumpMasterSchema(
  serverConfig: ServerConfig,
  database: string,
  defaults: DatabaseDefaults,
  outputFile?: string
): Promise<{ success: boolean; path: string; size: number }> {
  const host = serverConfig.host;
  const port = serverConfig.port || defaults.port;
  const user = serverConfig.user || defaults.user;
  const password = serverConfig.password || defaults.password;

  await fs.mkdir(SCHEMA_DIR, { recursive: true });

  const filename = outputFile || `${database}_schema.sql`;
  const filePath = path.join(SCHEMA_DIR, filename);

  // pg_dump with schema only (no data)
  const env = { ...process.env, PGPASSWORD: password };
  const cmd = `pg_dump -h ${host} -p ${port} -U ${user} -d ${database} --schema-only --no-owner --no-privileges --no-comments`;

  try {
    const { stdout } = await execAsync(cmd, {
      env,
      maxBuffer: 50 * 1024 * 1024,
    });

    // Clean up the dump
    const cleanedSchema = cleanSchemaDump(stdout);
    await fs.writeFile(filePath, cleanedSchema);

    return { success: true, path: filePath, size: cleanedSchema.length };
  } catch (err) {
    throw new Error(`pg_dump failed: ${(err as Error).message}`);
  }
}

/**
 * Clean schema dump - remove volatile parts
 */
function cleanSchemaDump(schema: string): string {
  return schema
    // Remove comments with timestamps
    .replace(/^--.*$/gm, "")
    // Remove empty lines
    .replace(/^\s*[\r\n]/gm, "\n")
    // Remove SET statements
    .replace(/^SET .*$/gm, "")
    // Remove SELECT pg_catalog
    .replace(/^SELECT pg_catalog\..*$/gm, "")
    // Normalize whitespace
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Get list of all tables in a database
 */
async function getTables(client: Client): Promise<string[]> {
  const result = await client.query<{ table_name: string }>(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name NOT LIKE '_migrations%'
    ORDER BY table_name
  `);
  return result.rows.map((r) => r.table_name);
}

/**
 * Get table structure
 */
async function getTableStructure(
  client: Client,
  tableName: string
): Promise<TableStructure> {
  const columns = await client.query<ColumnInfo>(
    `
    SELECT
      column_name,
      data_type,
      character_maximum_length,
      is_nullable,
      column_default
    FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = $1
    ORDER BY ordinal_position
  `,
    [tableName]
  );

  const indexes = await client.query<IndexInfo>(
    `
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE schemaname = 'public' AND tablename = $1
  `,
    [tableName]
  );

  const constraints = await client.query<{
    conname: string;
    contype: string;
    definition: string;
  }>(
    `
    SELECT conname, contype, pg_get_constraintdef(oid) as definition
    FROM pg_constraint
    WHERE conrelid = $1::regclass
  `,
    [tableName]
  );

  return {
    columns: columns.rows,
    indexes: indexes.rows,
    constraints: constraints.rows,
  };
}

/**
 * Compare two database schemas
 */
export async function compareSchemas(
  masterConfig: ServerConfig,
  targetConfig: ServerConfig,
  database: string,
  defaults: DatabaseDefaults
): Promise<SchemaDifferences> {
  const masterClient = new Client({
    host: masterConfig.host,
    port: masterConfig.port || defaults.port,
    user: masterConfig.user || defaults.user,
    password: masterConfig.password || defaults.password,
    database,
  });

  const targetClient = new Client({
    host: targetConfig.host,
    port: targetConfig.port || defaults.port,
    user: targetConfig.user || defaults.user,
    password: targetConfig.password || defaults.password,
    database,
  });

  const differences: SchemaDifferences = {
    missingTables: [],
    extraTables: [],
    differentTables: [],
  };

  try {
    await masterClient.connect();
    await targetClient.connect();

    const masterTables = await getTables(masterClient);
    const targetTables = await getTables(targetClient);

    // Find missing and extra tables
    differences.missingTables = masterTables.filter(
      (t) => !targetTables.includes(t)
    );
    differences.extraTables = targetTables.filter(
      (t) => !masterTables.includes(t)
    );

    // Compare common tables
    const commonTables = masterTables.filter((t) => targetTables.includes(t));

    for (const table of commonTables) {
      const masterStructure = await getTableStructure(masterClient, table);
      const targetStructure = await getTableStructure(targetClient, table);

      const columnDiffs = compareColumns(
        masterStructure.columns,
        targetStructure.columns
      );
      const indexDiffs = compareIndexes(
        masterStructure.indexes,
        targetStructure.indexes
      );

      if (columnDiffs.length > 0 || indexDiffs.length > 0) {
        differences.differentTables.push({
          table,
          columns: columnDiffs,
          indexes: indexDiffs,
        });
      }
    }

    return differences;
  } finally {
    await masterClient.end();
    await targetClient.end();
  }
}

function compareColumns(
  masterCols: ColumnInfo[],
  targetCols: ColumnInfo[]
): ColumnDiff[] {
  const diffs: ColumnDiff[] = [];
  const masterMap = new Map(masterCols.map((c) => [c.column_name, c]));
  const targetMap = new Map(targetCols.map((c) => [c.column_name, c]));

  // Missing columns
  for (const [name, col] of masterMap) {
    if (!targetMap.has(name)) {
      diffs.push({ type: "missing_column", column: name, expected: col });
    } else {
      const targetCol = targetMap.get(name)!;
      if (col.data_type !== targetCol.data_type) {
        diffs.push({
          type: "type_mismatch",
          column: name,
          expected: col.data_type,
          actual: targetCol.data_type,
        });
      }
    }
  }

  // Extra columns
  for (const [name] of targetMap) {
    if (!masterMap.has(name)) {
      diffs.push({ type: "extra_column", column: name });
    }
  }

  return diffs;
}

function compareIndexes(
  masterIdx: IndexInfo[],
  targetIdx: IndexInfo[]
): IndexDiff[] {
  const diffs: IndexDiff[] = [];
  const masterMap = new Map(masterIdx.map((i) => [i.indexname, i.indexdef]));
  const targetMap = new Map(targetIdx.map((i) => [i.indexname, i.indexdef]));

  for (const [name, def] of masterMap) {
    if (!targetMap.has(name)) {
      diffs.push({ type: "missing_index", index: name, definition: def });
    }
  }

  return diffs;
}

/**
 * Generate SQL to sync target to master schema
 */
export function generateSyncSQL(
  differences: SchemaDifferences,
  options: SyncOptions = {}
): string[] {
  const { dropExtra = false } = options;
  const statements: string[] = [];

  // Missing tables - need full CREATE TABLE (from dump)
  for (const table of differences.missingTables) {
    statements.push(
      `-- TODO: Create table ${table} (copy from master schema dump)`
    );
  }

  // Extra tables
  if (dropExtra) {
    for (const table of differences.extraTables) {
      statements.push(`DROP TABLE IF EXISTS ${table} CASCADE;`);
    }
  }

  // Column differences
  for (const diff of differences.differentTables) {
    for (const col of diff.columns) {
      if (col.type === "missing_column" && typeof col.expected === "object") {
        const colInfo = col.expected as ColumnInfo;
        const nullable = colInfo.is_nullable === "YES" ? "" : " NOT NULL";
        const defaultVal = colInfo.column_default
          ? ` DEFAULT ${colInfo.column_default}`
          : "";
        statements.push(
          `ALTER TABLE ${diff.table} ADD COLUMN ${col.column} ${colInfo.data_type}${nullable}${defaultVal};`
        );
      }
      if (col.type === "extra_column" && dropExtra) {
        statements.push(`ALTER TABLE ${diff.table} DROP COLUMN ${col.column};`);
      }
    }

    // Missing indexes
    for (const idx of diff.indexes) {
      if (idx.type === "missing_index") {
        statements.push(`${idx.definition};`);
      }
    }
  }

  return statements;
}

/**
 * Apply schema from master to target database
 */
export async function syncSchema(
  masterConfig: ServerConfig,
  targetConfig: ServerConfig,
  database: string,
  defaults: DatabaseDefaults,
  options: SyncOptions = {}
): Promise<SyncResult> {
  const { dryRun = false } = options;

  const differences = await compareSchemas(
    masterConfig,
    targetConfig,
    database,
    defaults
  );
  const syncSQL = generateSyncSQL(differences, options);

  if (syncSQL.length === 0) {
    return {
      server: targetConfig.id,
      database,
      status: "in_sync",
      changes: [],
    };
  }

  if (dryRun) {
    return {
      server: targetConfig.id,
      database,
      status: "needs_sync",
      changes: syncSQL,
      dryRun: true,
    };
  }

  // Apply changes
  const targetClient = new Client({
    host: targetConfig.host,
    port: targetConfig.port || defaults.port,
    user: targetConfig.user || defaults.user,
    password: targetConfig.password || defaults.password,
    database,
  });

  try {
    await targetClient.connect();
    await targetClient.query("BEGIN");

    for (const sql of syncSQL) {
      if (!sql.startsWith("--")) {
        await targetClient.query(sql);
      }
    }

    await targetClient.query("COMMIT");

    return {
      server: targetConfig.id,
      database,
      status: "synced",
      changes: syncSQL,
    };
  } catch (err) {
    await targetClient.query("ROLLBACK");
    throw err;
  } finally {
    await targetClient.end();
  }
}
