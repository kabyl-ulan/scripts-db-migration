import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

import { Client } from "pg";

import type {
  Config,
  ServerConfig,
  DatabaseDefaults,
  Migration,
  MigrationResult,
  MigrationStatus,
  MigrationStatusItem,
  FilterOptions,
  MigrateOptions,
} from "./types";

const MIGRATIONS_DIR = path.join(process.cwd(), "migrations");
const MIGRATIONS_TABLE = "_migrations";

/**
 * Calculate MD5 hash of migration content
 */
function calculateChecksum(content: string): string {
  return crypto.createHash("md5").update(content).digest("hex");
}

/**
 * Parsed CREATE TABLE statement with column definitions
 */
interface ParsedTable {
  tableName: string;
  columns: ParsedColumn[];
}

interface ParsedColumn {
  name: string;
  definition: string; // Full column definition (type, constraints, etc.)
}

/**
 * Parse CREATE TABLE statements from SQL
 */
function parseCreateTables(sql: string): ParsedTable[] {
  const tables: ParsedTable[] = [];

  // Match CREATE TABLE statements
  const createTableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\S+)\s*\(([\s\S]*?)\);/gi;
  let match;

  while ((match = createTableRegex.exec(sql)) !== null) {
    const tableName = match[1];
    const columnsBlock = match[2];

    const columns = parseColumnDefinitions(columnsBlock);

    if (columns.length > 0) {
      tables.push({ tableName, columns });
    }
  }

  return tables;
}

/**
 * Parse column definitions from CREATE TABLE body
 */
function parseColumnDefinitions(columnsBlock: string): ParsedColumn[] {
  const columns: ParsedColumn[] = [];

  // Remove inline comments (-- ...) before parsing to avoid parsing comment content as columns
  const cleanedBlock = columnsBlock.replace(/--[^\n]*/g, "");

  // Split by commas, but respect parentheses (for CHECK constraints, etc.)
  const parts: string[] = [];
  let current = "";
  let depth = 0;

  for (let i = 0; i < cleanedBlock.length; i++) {
    const char = cleanedBlock[i];

    if (char === "(") depth++;
    if (char === ")") depth--;

    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  // Filter out constraints (CONSTRAINT, PRIMARY KEY, FOREIGN KEY, CHECK)
  for (const part of parts) {
    const trimmed = part.trim();

    // Skip constraints
    if (
      /^CONSTRAINT\s+/i.test(trimmed) ||
      /^PRIMARY\s+KEY/i.test(trimmed) ||
      /^FOREIGN\s+KEY/i.test(trimmed) ||
      /^UNIQUE\s*\(/i.test(trimmed) ||
      /^CHECK\s*\(/i.test(trimmed)
    ) {
      continue;
    }

    // Extract column name (first word)
    const nameMatch = trimmed.match(/^"?(\w+)"?/);
    if (nameMatch) {
      columns.push({
        name: nameMatch[1],
        definition: trimmed,
      });
    }
  }

  return columns;
}

/**
 * Check if table exists in database
 */
async function tableExists(client: Client, tableName: string): Promise<boolean> {
  const result = await client.query<{ exists: boolean }>(
    `SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = $1
    )`,
    [tableName.replace(/^public\./, "")]
  );
  return result.rows[0].exists;
}

/**
 * Get existing columns for a table
 */
async function getExistingColumns(client: Client, tableName: string): Promise<Set<string>> {
  const result = await client.query<{ column_name: string }>(
    `SELECT column_name
     FROM information_schema.columns
     WHERE table_schema = 'public'
     AND table_name = $1`,
    [tableName.replace(/^public\./, "")]
  );
  return new Set(result.rows.map((r) => r.column_name));
}

/**
 * Generate ALTER TABLE ADD COLUMN statements for missing columns
 */
function generateAlterStatements(
  tableName: string,
  parsedColumns: ParsedColumn[],
  existingColumns: Set<string>
): string[] {
  const statements: string[] = [];

  for (const col of parsedColumns) {
    if (!existingColumns.has(col.name)) {
      statements.push(`ALTER TABLE ${tableName} ADD COLUMN IF NOT EXISTS ${col.definition};`);
    }
  }

  return statements;
}

/**
 * Generate ALTER TABLE DROP COLUMN statements for extra columns
 */
function generateDropStatements(
  tableName: string,
  parsedColumns: ParsedColumn[],
  existingColumns: Set<string>
): string[] {
  const statements: string[] = [];
  const parsedColumnNames = new Set(parsedColumns.map((col) => col.name));

  for (const existingCol of existingColumns) {
    if (!parsedColumnNames.has(existingCol)) {
      statements.push(`ALTER TABLE ${tableName} DROP COLUMN IF EXISTS ${existingCol};`);
    }
  }

  return statements;
}

/**
 * Extract function name from PostgreSQL error message
 */
function extractMissingFunctionName(errorMessage: string): string | null {
  // Match patterns like: "function update_system_updated_at_column() does not exist"
  // Also supports function names starting with digits like "111trg_discipline_topic_hours_calc"
  // May be quoted like "111trg..." if name starts with digit or contains special chars
  const match = errorMessage.match(/function\s+"?([a-z0-9_]+)"?\s*\([^)]*\)\s+does not exist/i);
  return match ? match[1] : null;
}

/**
 * Extract all EXECUTE FUNCTION references from SQL file
 */
function extractAllFunctionReferences(sql: string): string[] {
  const functions = new Set<string>();

  // Match patterns like: EXECUTE FUNCTION "function_name"() or EXECUTE FUNCTION function_name()
  const regex = /EXECUTE\s+FUNCTION\s+"?([a-z0-9_]+)"?\s*\(/gi;
  let match;

  while ((match = regex.exec(sql)) !== null) {
    functions.add(match[1]);
  }

  return Array.from(functions);
}

/**
 * Extract sequence name from PostgreSQL error message
 */
function extractMissingSequenceName(errorMessage: string): string | null {
  // Match patterns like: "relation "user_object_type_id_object_type_seq" does not exist"
  const match = errorMessage.match(/relation\s+"?([a-z_][a-z0-9_]*)"?\s+does not exist/i);
  if (match && match[1].endsWith('_seq')) {
    return match[1];
  }
  return null;
}

/**
 * Extract all sequence references from SQL file (nextval calls)
 */
function extractAllSequenceReferences(sql: string): string[] {
  const sequences = new Set<string>();

  // Match patterns like: nextval('sequence_name'::regclass) or nextval('sequence_name')
  const regex = /nextval\s*\(\s*'([a-z0-9_]+)'(?:::regclass)?\s*\)/gi;
  let match;

  while ((match = regex.exec(sql)) !== null) {
    sequences.add(match[1]);
  }

  return Array.from(sequences);
}

/**
 * Get function definition from database
 */
async function getFunctionDefinition(client: Client, functionName: string): Promise<string | null> {
  try {
    const result = await client.query<{ function_definition: string }>(
      `SELECT pg_get_functiondef(p.oid) AS function_definition
       FROM pg_proc p
       JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public'
         AND p.proname = $1
       LIMIT 1`,
      [functionName]
    );

    if (result.rows.length > 0) {
      return result.rows[0].function_definition;
    }
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Get sequence definition from database
 */
async function getSequenceDefinition(client: Client, sequenceName: string): Promise<string | null> {
  try {
    const result = await client.query<{
      start_value: string;
      min_value: string;
      max_value: string;
      increment_by: string;
      cycle_option: string;
      cache_size: string;
    }>(
      `SELECT
        start_value::text,
        min_value::text,
        max_value::text,
        increment_by::text,
        CASE WHEN "cycle" THEN 'CYCLE' ELSE 'NO CYCLE' END as cycle_option,
        cache_size::text as cache_size
       FROM pg_sequences
       WHERE schemaname = 'public'
         AND sequencename = $1
       LIMIT 1`,
      [sequenceName]
    );

    if (result.rows.length > 0) {
      const seq = result.rows[0];
      return `CREATE SEQUENCE IF NOT EXISTS ${sequenceName}
    INCREMENT BY ${seq.increment_by}
    MINVALUE ${seq.min_value}
    MAXVALUE ${seq.max_value}
    START ${seq.start_value}
    CACHE ${seq.cache_size}
    ${seq.cycle_option};`;
    }
    return null;
  } catch (err) {
    return null;
  }
}

/**
 * Cache for PostgreSQL reserved keywords (loaded once per session)
 */
let cachedReservedKeywords: Set<string> | null = null;

/**
 * Get PostgreSQL reserved keywords from database
 */
async function getReservedKeywords(client: Client): Promise<Set<string>> {
  if (cachedReservedKeywords) {
    return cachedReservedKeywords;
  }

  try {
    const result = await client.query<{ word: string }>(
      `SELECT word FROM pg_get_keywords() WHERE catcode IN ('R', 'T')`
      // R = reserved, T = reserved (can be function or type)
    );
    cachedReservedKeywords = new Set(result.rows.map(r => r.word.toLowerCase()));
    return cachedReservedKeywords;
  } catch {
    // Fallback to common problematic keywords if query fails
    cachedReservedKeywords = new Set(['order', 'user', 'group', 'key', 'type', 'comment', 'default', 'table', 'column']);
    return cachedReservedKeywords;
  }
}

/**
 * Quote reserved keywords used as column names in column definitions
 */
function quoteReservedKeywords(content: string, reservedKeywords: Set<string>): string {
  let processed = content;

  for (const keyword of reservedKeywords) {
    // Pattern: tab/spaces + unquoted keyword + space + column type
    const pattern = new RegExp(
      `(^|[\\t ])${keyword}(\\s+(?:int|varchar|character|text|bool|float|numeric|serial|bigint|smallint|timestamp|date|time|uuid|json|int2|int4|int8)[^,)\\n]*)`,
      'gim'
    );
    processed = processed.replace(pattern, `$1"${keyword}"$2`);
  }

  return processed;
}

/**
 * Preprocess SQL to add IF NOT EXISTS/IF EXISTS clauses automatically
 * This prevents errors when tables/columns already exist
 */
function preprocessSQL(content: string, reservedKeywords?: Set<string>): string {
  let processed = content;

  // First, quote reserved keywords used as column names
  if (reservedKeywords) {
    processed = quoteReservedKeywords(processed, reservedKeywords);
  }

  // CREATE TABLE -> CREATE TABLE IF NOT EXISTS
  processed = processed.replace(
    /CREATE\s+TABLE\s+(?!IF\s+NOT\s+EXISTS)(\S+)/gi,
    "CREATE TABLE IF NOT EXISTS $1"
  );

  // CREATE SEQUENCE -> CREATE SEQUENCE IF NOT EXISTS
  processed = processed.replace(
    /CREATE\s+SEQUENCE\s+(?!IF\s+NOT\s+EXISTS)(\S+)/gi,
    "CREATE SEQUENCE IF NOT EXISTS $1"
  );

  // CREATE INDEX -> CREATE INDEX IF NOT EXISTS
  processed = processed.replace(
    /CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?!IF\s+NOT\s+EXISTS)(\S+)/gi,
    (match, indexName) => {
      if (match.toLowerCase().includes("unique")) {
        return `CREATE UNIQUE INDEX IF NOT EXISTS ${indexName}`;
      }
      return `CREATE INDEX IF NOT EXISTS ${indexName}`;
    }
  );

  // ALTER TABLE ... ADD COLUMN -> ADD COLUMN IF NOT EXISTS
  processed = processed.replace(
    /ALTER\s+TABLE\s+(\S+)\s+ADD\s+COLUMN\s+(?!IF\s+NOT\s+EXISTS)(\S+)/gi,
    "ALTER TABLE $1 ADD COLUMN IF NOT EXISTS $2"
  );

  // ALTER TABLE ... DROP COLUMN -> DROP COLUMN IF EXISTS
  processed = processed.replace(
    /ALTER\s+TABLE\s+(\S+)\s+DROP\s+COLUMN\s+(?!IF\s+EXISTS)(\S+)/gi,
    "ALTER TABLE $1 DROP COLUMN IF EXISTS $2"
  );

  // DROP TABLE -> DROP TABLE IF EXISTS
  processed = processed.replace(/DROP\s+TABLE\s+(?!IF\s+EXISTS)(\S+)/gi, "DROP TABLE IF EXISTS $1");

  // DROP SEQUENCE -> DROP SEQUENCE IF EXISTS
  processed = processed.replace(
    /DROP\s+SEQUENCE\s+(?!IF\s+EXISTS)(\S+)/gi,
    "DROP SEQUENCE IF EXISTS $1"
  );

  // DROP INDEX -> DROP INDEX IF EXISTS
  processed = processed.replace(/DROP\s+INDEX\s+(?!IF\s+EXISTS)(\S+)/gi, "DROP INDEX IF EXISTS $1");

  // CREATE TRIGGER -> DROP TRIGGER IF EXISTS + CREATE TRIGGER
  // PostgreSQL doesn't support CREATE TRIGGER IF NOT EXISTS, so we drop first
  // Use [\s\S] to match across newlines
  processed = processed.replace(
    /CREATE\s+TRIGGER\s+(\S+)\s+([\s\S]+?)\s+ON\s+(\S+)/gi,
    (_match, triggerName, rest, tableName) => {
      return `DROP TRIGGER IF EXISTS ${triggerName} ON ${tableName};\nCREATE TRIGGER ${triggerName} ${rest} ON ${tableName}`;
    }
  );

  // CREATE MATERIALIZED VIEW -> DROP + CREATE
  // PostgreSQL doesn't support CREATE MATERIALIZED VIEW IF NOT EXISTS in older versions
  processed = processed.replace(
    /CREATE\s+MATERIALIZED\s+VIEW\s+(\S+)/gi,
    "DROP MATERIALIZED VIEW IF EXISTS $1 CASCADE;\nCREATE MATERIALIZED VIEW $1"
  );

  // COMMENT ON CONSTRAINT -> Wrap in DO block to check existence
  // PostgreSQL doesn't support COMMENT ON CONSTRAINT IF EXISTS
  processed = processed.replace(
    /COMMENT\s+ON\s+CONSTRAINT\s+(\S+)\s+ON\s+(\S+)\s+IS\s+'([^']*)';/gi,
    (_match, constraintName, tableName, comment) => {
      return `DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = t.relnamespace
    WHERE c.conname = '${constraintName}'
    AND t.relname = split_part('${tableName}', '.', 2)
    AND n.nspname = COALESCE(split_part('${tableName}', '.', 1), 'public')
  ) THEN
    EXECUTE 'COMMENT ON CONSTRAINT ${constraintName} ON ${tableName} IS ''${comment}''';
  END IF;
END $$;`;
    }
  );

  return processed;
}

/**
 * Parse migration filename: V001__description.sql
 */
function parseMigrationFilename(filename: string): Migration | null {
  const match = filename.match(/^V(\d+)__(.+)\.sql$/);
  if (!match) return null;
  return {
    version: parseInt(match[1], 10),
    description: match[2].replace(/_/g, " "),
    filename,
  };
}

/**
 * Create database connection
 */
function createClient(
  serverConfig: ServerConfig,
  database: string,
  defaults: DatabaseDefaults
): Client {
  return new Client({
    host: serverConfig.host,
    port: serverConfig.port || defaults.port,
    user: serverConfig.user || defaults.user,
    password: serverConfig.password || defaults.password,
    database,
    connectionTimeoutMillis: defaults.connectionTimeoutMillis,
  });
}

/**
 * Ensure migrations tracking table exists
 */
async function ensureMigrationsTable(client: Client): Promise<void> {
  await client.query(`
    CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
      version INTEGER PRIMARY KEY,
      description VARCHAR(255) NOT NULL,
      filename VARCHAR(255) NOT NULL,
      checksum VARCHAR(32) NOT NULL,
      applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      execution_time_ms INTEGER
    )
  `);
}

/**
 * Get list of applied migrations from database
 */
async function getAppliedMigrations(client: Client): Promise<Map<number, string>> {
  const result = await client.query<{ version: number; checksum: string }>(
    `SELECT version, checksum FROM ${MIGRATIONS_TABLE} ORDER BY version`
  );
  return new Map(result.rows.map((row) => [row.version, row.checksum]));
}

/**
 * Get all migration files from disk
 */
async function getMigrationFiles(): Promise<Migration[]> {
  try {
    const files = await fs.readdir(MIGRATIONS_DIR);
    const migrations = files
      .map(parseMigrationFilename)
      .filter((m): m is Migration => m !== null)
      .sort((a, b) => a.version - b.version);
    return migrations;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      await fs.mkdir(MIGRATIONS_DIR, { recursive: true });
      return [];
    }
    throw err;
  }
}

/**
 * Read migration file content
 */
async function readMigrationContent(filename: string): Promise<string> {
  const filePath = path.join(MIGRATIONS_DIR, filename);
  return fs.readFile(filePath, "utf-8");
}

/**
 * Apply a single migration
 */
async function applyMigration(
  client: Client,
  migration: Migration,
  content: string,
  options: { dropExtra?: boolean; masterClient?: Client; serverId?: string; database?: string } = {}
): Promise<{
  success: boolean;
  executionTime: number;
  alterStatements?: string[];
  dropStatements?: string[];
  createdFunctions?: string[];
  createdSequences?: string[];
}> {
  const startTime = Date.now();
  const checksum = calculateChecksum(content);
  const { dropExtra = false, masterClient } = options;

  // Parse CREATE TABLE statements to check for missing columns
  const parsedTables = parseCreateTables(content);
  const alterStatements: string[] = [];
  const dropStatements: string[] = [];
  const createdFunctions: string[] = [];
  const createdSequences: string[] = [];

  // Get reserved keywords from PostgreSQL for automatic quoting
  const reservedKeywords = await getReservedKeywords(client);

  await client.query("BEGIN");
  try {
    // For each CREATE TABLE, check if table exists and sync columns
    for (const table of parsedTables) {
      const exists = await tableExists(client, table.tableName);

      if (exists) {
        // Table exists - check for missing and extra columns
        const existingColumns = await getExistingColumns(client, table.tableName);

        // Add missing columns
        const alters = generateAlterStatements(table.tableName, table.columns, existingColumns);

        for (const alterSQL of alters) {
          const dbInfo = options.serverId && options.database ? `${options.serverId}/${options.database}` : "unknown";
          console.log(`[${dbInfo}] Executing ALTER: ${alterSQL.substring(0, 200)}`);
          try {
            await client.query(alterSQL);
            alterStatements.push(alterSQL);
          } catch (alterErr) {
            console.error(`[${dbInfo}] ALTER ERROR: ${(alterErr as Error).message}`);
            throw alterErr;
          }
        }

        // Drop extra columns if requested
        if (dropExtra) {
          const drops = generateDropStatements(table.tableName, table.columns, existingColumns);

          for (const dropSQL of drops) {
            await client.query(dropSQL);
            dropStatements.push(dropSQL);
          }
        }
      }
    }

    // Preprocess SQL to add IF NOT EXISTS/IF EXISTS clauses
    const processedSQL = preprocessSQL(content, reservedKeywords);

    // Execute main migration SQL
    try {
      await client.query(processedSQL);
    } catch (sqlError) {
      const errorMessage = (sqlError as Error).message;

      // Check if error is due to missing function
      const functionName = extractMissingFunctionName(errorMessage);

      if (functionName && masterClient) {
        // ROLLBACK current transaction since it's aborted
        await client.query("ROLLBACK");

        // Extract ALL function references from the migration SQL
        const allFunctionNames = extractAllFunctionReferences(content);
        const dbInfo = options.serverId && options.database ? `${options.serverId}/${options.database}` : "unknown";

        console.log(`[${dbInfo}] Detected missing function. Extracting ALL ${allFunctionNames.length} functions from master...`);

        // Try to get ALL function definitions from master database
        let functionsCreated = 0;
        for (const funcName of allFunctionNames) {
          const functionDef = await getFunctionDefinition(masterClient, funcName);
          if (functionDef) {
            try {
              await client.query(functionDef);
              createdFunctions.push(funcName);
              functionsCreated++;
              console.log(`[${dbInfo}]   ✓ Created function: ${funcName}()`);
            } catch (createErr) {
              console.log(`[${dbInfo}]   ⚠ Failed to create ${funcName}(): ${(createErr as Error).message}`);
            }
          } else {
            console.log(`[${dbInfo}]   ✗ Not found in master: ${funcName}()`);
          }
        }

        if (functionsCreated > 0) {
          console.log(`[${dbInfo}] Created ${functionsCreated}/${allFunctionNames.length} functions. Retrying migration...`);

          // Start new transaction and retry the ENTIRE migration from beginning
          await client.query("BEGIN");

          // Re-do column sync
          for (const table of parsedTables) {
            const exists = await tableExists(client, table.tableName);
            if (exists) {
              const existingColumns = await getExistingColumns(client, table.tableName);
              const alters = generateAlterStatements(table.tableName, table.columns, existingColumns);
              for (const alterSQL of alters) {
                await client.query(alterSQL);
                if (!alterStatements.includes(alterSQL)) {
                  alterStatements.push(alterSQL);
                }
              }
            }
          }

          // Retry the migration SQL
          await client.query(processedSQL);
        } else {
          throw sqlError; // No functions created, re-throw original error
        }
      } else {
        // Check if error is due to missing sequence
        const sequenceName = extractMissingSequenceName(errorMessage);

        if (sequenceName && masterClient) {
          // ROLLBACK current transaction since it's aborted
          await client.query("ROLLBACK");

          // Extract ALL sequence references from the migration SQL
          const allSequenceNames = extractAllSequenceReferences(content);
          const dbInfo = options.serverId && options.database ? `${options.serverId}/${options.database}` : "unknown";

          console.log(`[${dbInfo}] Detected missing sequence. Extracting ALL ${allSequenceNames.length} sequences from master...`);

          // Try to get ALL sequence definitions from master database
          let sequencesCreated = 0;
          for (const seqName of allSequenceNames) {
            const sequenceDef = await getSequenceDefinition(masterClient, seqName);
            if (sequenceDef) {
              try {
                await client.query(sequenceDef);
                createdSequences.push(seqName);
                sequencesCreated++;
                console.log(`[${dbInfo}]   ✓ Created sequence: ${seqName}`);
              } catch (createErr) {
                // Sequence might already exist, that's OK
                const errMsg = (createErr as Error).message;
                if (!errMsg.includes('already exists')) {
                  console.log(`[${dbInfo}]   ⚠ Failed to create ${seqName}: ${errMsg}`);
                }
              }
            } else {
              console.log(`[${dbInfo}]   ✗ Not found in master: ${seqName}`);
            }
          }

          if (sequencesCreated > 0) {
            console.log(`[${dbInfo}] Created ${sequencesCreated}/${allSequenceNames.length} sequences. Retrying migration...`);

            // Start new transaction and retry the ENTIRE migration from beginning
            await client.query("BEGIN");

            // Re-do column sync
            for (const table of parsedTables) {
              const exists = await tableExists(client, table.tableName);
              if (exists) {
                const existingColumns = await getExistingColumns(client, table.tableName);
                const alters = generateAlterStatements(table.tableName, table.columns, existingColumns);
                for (const alterSQL of alters) {
                  await client.query(alterSQL);
                  if (!alterStatements.includes(alterSQL)) {
                    alterStatements.push(alterSQL);
                  }
                }
              }
            }

            // Retry the migration SQL
            await client.query(processedSQL);
          } else {
            throw sqlError; // No sequences created, re-throw original error
          }
        } else {
          throw sqlError; // Not a function/sequence error or no master client, re-throw
        }
      }
    }

    // Record migration in tracking table
    await client.query(
      `INSERT INTO ${MIGRATIONS_TABLE} (version, description, filename, checksum, execution_time_ms)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        migration.version,
        migration.description,
        migration.filename,
        checksum,
        Date.now() - startTime,
      ]
    );

    await client.query("COMMIT");
    return {
      success: true,
      executionTime: Date.now() - startTime,
      alterStatements: alterStatements.length > 0 ? alterStatements : undefined,
      dropStatements: dropStatements.length > 0 ? dropStatements : undefined,
      createdFunctions: createdFunctions.length > 0 ? createdFunctions : undefined,
      createdSequences: createdSequences.length > 0 ? createdSequences : undefined,
    };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  }
}

/**
 * Main migration function for a single database
 */
export async function migrateDatabase(
  serverConfig: ServerConfig,
  database: string,
  defaults: DatabaseDefaults,
  options: MigrateOptions = {}
): Promise<MigrationResult> {
  const { dryRun = false, targetVersion = null, masterServer, masterDefaults } = options;
  const client = createClient(serverConfig, database, defaults);

  // Create master client if master server is provided (for auto-fetching functions/sequences)
  let masterClient: Client | undefined;
  if (masterServer && masterDefaults) {
    // Try to connect to master with same database name first
    masterClient = createClient(masterServer, database, masterDefaults);
    try {
      await masterClient.connect();
    } catch (err) {
      // If same database name doesn't exist on master, try first available database
      if (masterServer.databases.length > 0) {
        const fallbackDatabase = masterServer.databases[0];
        masterClient = createClient(masterServer, fallbackDatabase, masterDefaults);
        try {
          await masterClient.connect();
        } catch (fallbackErr) {
          // If fallback also fails, continue without master client
          masterClient = undefined;
        }
      } else {
        masterClient = undefined;
      }
    }
  }

  const results: MigrationResult = {
    server: serverConfig.id,
    database,
    applied: [],
    skipped: [],
    errors: [],
  };

  try {
    await client.connect();
    await ensureMigrationsTable(client);

    const appliedMigrations = await getAppliedMigrations(client);
    const migrationFiles = await getMigrationFiles();

    for (const migration of migrationFiles) {
      // Skip if already applied
      if (appliedMigrations.has(migration.version)) {
        const content = await readMigrationContent(migration.filename);
        const currentChecksum = calculateChecksum(content);
        const appliedChecksum = appliedMigrations.get(migration.version);

        if (currentChecksum !== appliedChecksum) {
          results.errors.push({
            migration: migration.filename,
            error: `Checksum mismatch! Migration was modified after being applied.`,
          });
        }
        results.skipped.push(migration.filename);
        continue;
      }

      // Skip if beyond target version
      if (targetVersion !== null && migration.version > targetVersion) {
        break;
      }

      const content = await readMigrationContent(migration.filename);

      if (dryRun) {
        results.applied.push({ filename: migration.filename, dryRun: true });
        continue;
      }

      try {
        const result = await applyMigration(client, migration, content, {
          dropExtra: options.dropExtra,
          masterClient,
          serverId: serverConfig.id,
          database,
        });
        results.applied.push({
          filename: migration.filename,
          executionTime: result.executionTime,
          alterStatements: result.alterStatements,
          dropStatements: result.dropStatements,
          createdFunctions: result.createdFunctions,
          createdSequences: result.createdSequences,
        });
      } catch (err) {
        results.errors.push({
          migration: migration.filename,
          error: (err as Error).message,
        });
        break; // Stop on first error
      }
    }
  } catch (err) {
    results.errors.push({
      error: `Connection failed: ${(err as Error).message}`,
    });
  } finally {
    await client.end();
    if (masterClient) {
      await masterClient.end();
    }
  }

  return results;
}

/**
 * Get migration status for a database
 */
export async function getMigrationStatus(
  serverConfig: ServerConfig,
  database: string,
  defaults: DatabaseDefaults
): Promise<MigrationStatus> {
  const client = createClient(serverConfig, database, defaults);

  try {
    await client.connect();
    await ensureMigrationsTable(client);

    const appliedMigrations = await getAppliedMigrations(client);
    const migrationFiles = await getMigrationFiles();

    const status: MigrationStatusItem[] = migrationFiles.map((migration) => ({
      version: migration.version,
      filename: migration.filename,
      applied: appliedMigrations.has(migration.version),
    }));

    const pending = status.filter((m) => !m.applied).length;

    return {
      server: serverConfig.id,
      database,
      migrations: status,
      applied: status.filter((m) => m.applied).length,
      pending,
    };
  } finally {
    await client.end();
  }
}

/**
 * Create a new migration file
 */
export async function createMigration(
  description: string
): Promise<{ filename: string; path: string }> {
  const files = await getMigrationFiles();
  const nextVersion = files.length > 0 ? Math.max(...files.map((f) => f.version)) + 1 : 1;

  const versionStr = String(nextVersion).padStart(3, "0");
  const safeName = description.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  const filename = `V${versionStr}__${safeName}.sql`;
  const filePath = path.join(MIGRATIONS_DIR, filename);

  const template = `-- Migration: ${description}
-- Version: ${nextVersion}
-- Created: ${new Date().toISOString()}

-- Write your migration SQL here

`;

  await fs.writeFile(filePath, template);
  return { filename, path: filePath };
}

/**
 * Filter servers by tags or IDs
 */
export function filterServers(servers: ServerConfig[], options: FilterOptions): ServerConfig[] {
  const { tags = [], ids = [], exclude = [] } = options;
  let filtered = servers;

  if (ids.length > 0) {
    filtered = filtered.filter((s) => ids.includes(s.id));
  }

  if (tags.length > 0) {
    filtered = filtered.filter((s) => s.tags && s.tags.some((t) => tags.includes(t)));
  }

  if (exclude.length > 0) {
    filtered = filtered.filter((s) => !exclude.includes(s.id));
  }

  return filtered;
}

/**
 * Run migrations on multiple servers in parallel
 */
export async function migrateAll(
  config: Config,
  options: MigrateOptions = {}
): Promise<MigrationResult[]> {
  const { concurrency = 5 } = options;
  const servers = filterServers(config.servers, options);

  // Find master server for auto-fetching missing functions
  const masterServer = config.servers.find((s) => s.tags?.includes("master"));

  // Build list of all database targets
  const targets: { server: ServerConfig; database: string }[] = [];
  for (const server of servers) {
    for (const database of server.databases) {
      targets.push({ server, database });
    }
  }

  // Process in batches for controlled concurrency
  const results: MigrationResult[] = [];
  for (let i = 0; i < targets.length; i += concurrency) {
    const batch = targets.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(({ server, database }) =>
        migrateDatabase(server, database, config.defaults, {
          ...options,
          masterServer,
          masterDefaults: config.defaults,
        })
      )
    );
    results.push(...batchResults);
  }

  return results;
}

/**
 * Get status for all databases
 */
export async function statusAll(
  config: Config,
  options: FilterOptions = {}
): Promise<MigrationStatus[]> {
  const concurrency = 5;
  const servers = filterServers(config.servers, options);

  const targets: { server: ServerConfig; database: string }[] = [];
  for (const server of servers) {
    for (const database of server.databases) {
      targets.push({ server, database });
    }
  }

  const results: MigrationStatus[] = [];
  for (let i = 0; i < targets.length; i += concurrency) {
    const batch = targets.slice(i, i + concurrency);
    const batchResults = await Promise.allSettled(
      batch.map(({ server, database }) => getMigrationStatus(server, database, config.defaults))
    );
    results.push(
      ...batchResults.map((r, idx) =>
        r.status === "fulfilled"
          ? r.value
          : {
              server: batch[idx].server.id,
              database: batch[idx].database,
              migrations: [],
              applied: 0,
              pending: 0,
              error: (r.reason as Error).message,
            }
      )
    );
  }

  return results;
}
