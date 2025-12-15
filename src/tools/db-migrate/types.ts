export interface DatabaseDefaults {
  port: number;
  user: string;
  password: string;
  connectionTimeoutMillis: number;
  idleTimeoutMillis: number;
}

export interface ServerConfig {
  id: string;
  host: string;
  port?: number;
  user?: string;
  password?: string;
  tags?: string[];
  databases: string[];
}

export interface Config {
  defaults: DatabaseDefaults;
  servers: ServerConfig[];
}

export interface Migration {
  version: number;
  description: string;
  filename: string;
}

export interface MigrationResult {
  server: string;
  database: string;
  applied: AppliedMigration[];
  skipped: string[];
  errors: MigrationError[];
}

export interface AppliedMigration {
  filename: string;
  executionTime?: number;
  dryRun?: boolean;
  alterStatements?: string[]; // ALTER TABLE ADD COLUMN statements for missing columns
  dropStatements?: string[]; // ALTER TABLE DROP COLUMN statements for extra columns
  createdFunctions?: string[]; // Auto-created functions from master database
  createdSequences?: string[]; // Auto-created sequences from master database
}

export interface MigrationError {
  migration?: string;
  error: string;
}

export interface MigrationStatus {
  server: string;
  database: string;
  migrations: MigrationStatusItem[];
  applied: number;
  pending: number;
  error?: string;
}

export interface MigrationStatusItem {
  version: number;
  filename: string;
  applied: boolean;
}

export interface FilterOptions {
  tags?: string[];
  ids?: string[];
  exclude?: string[];
}

export interface MigrateOptions extends FilterOptions {
  dryRun?: boolean;
  concurrency?: number;
  targetVersion?: number | null;
  dropExtra?: boolean; // Automatically drop columns not in migration CREATE TABLE
  masterServer?: ServerConfig; // Master server for auto-fetching missing functions
  masterDefaults?: DatabaseDefaults; // Connection defaults for master server
}

// Schema sync types
export interface ColumnInfo {
  column_name: string;
  data_type: string;
  character_maximum_length: number | null;
  is_nullable: string;
  column_default: string | null;
}

export interface IndexInfo {
  indexname: string;
  indexdef: string;
}

export interface ConstraintInfo {
  conname: string;
  contype: string;
  definition: string;
}

export interface TableStructure {
  columns: ColumnInfo[];
  indexes: IndexInfo[];
  constraints: ConstraintInfo[];
}

export interface ColumnDiff {
  type: "missing_column" | "extra_column" | "type_mismatch";
  column: string;
  expected?: ColumnInfo | string;
  actual?: string;
}

export interface IndexDiff {
  type: "missing_index";
  index: string;
  definition: string;
}

export interface TableDiff {
  table: string;
  columns: ColumnDiff[];
  indexes: IndexDiff[];
}

export interface SchemaDifferences {
  missingTables: string[];
  extraTables: string[];
  differentTables: TableDiff[];
}

export interface SyncResult {
  server: string;
  database: string;
  status: "in_sync" | "needs_sync" | "synced";
  changes: string[];
  dryRun?: boolean;
}

export interface SyncOptions {
  dryRun?: boolean;
  dropExtra?: boolean;
}
