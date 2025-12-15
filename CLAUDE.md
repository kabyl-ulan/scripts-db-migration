# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A PostgreSQL database migration tool for managing schema migrations across multiple database servers. Supports parallel execution, schema comparison between master and target databases, and automated synchronization.

**Key Features:**
- Automatic SQL preprocessing with `IF NOT EXISTS/IF EXISTS` clauses
- Checksum-based migration tracking
- Transaction-safe execution with automatic rollback
- Parallel execution across multiple servers
- Schema comparison and synchronization

📖 **[Полная документация на русском языке](./docs/MIGRATION_GUIDE.md)**

## Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Start with hot reload (nodemon + ts-node)
npm run build            # Compile TypeScript and bundle with Webpack
npm run lint             # Check for linting errors
npm run lint:fix         # Auto-fix linting errors
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
```

## CLI Commands

### Quick Commands (via npm scripts)
```bash
npm run migrate:status                    # Show migration status for all DBs
npm run migrate:create "add users table"  # Create new migration file
npm run migrate                           # Run all pending migrations
npm run migrate:dry                       # Dry run (preview changes)
npm run schema:diff <database>            # Compare master vs targets
npm run schema:sync <database>            # Sync schema to targets
```

### Advanced Migration Commands
```bash
npx ts-node src/tools/db-migrate/cli.ts migrate                        # Run all pending migrations
npx ts-node src/tools/db-migrate/cli.ts migrate -t production          # Filter by tags
npx ts-node src/tools/db-migrate/cli.ts migrate -s master,slave-1      # Filter by server IDs
npx ts-node src/tools/db-migrate/cli.ts migrate -e dev-server          # Exclude servers
npx ts-node src/tools/db-migrate/cli.ts migrate -d                     # Dry run (preview changes)
npx ts-node src/tools/db-migrate/cli.ts migrate -c 10                  # Set concurrency (default: 5)
npx ts-node src/tools/db-migrate/cli.ts migrate --target 5             # Migrate up to version 5

npx ts-node src/tools/db-migrate/cli.ts status                         # Show migration status for all DBs
npx ts-node src/tools/db-migrate/cli.ts single <server> <database>     # Run on single database
npx ts-node src/tools/db-migrate/cli.ts create "add users table"       # Create new migration file
```

### Advanced Schema Sync Commands
```bash
npx ts-node src/tools/db-migrate/cli.ts schema:dump <database>         # Dump schema from master
npx ts-node src/tools/db-migrate/cli.ts schema:diff <database>         # Compare master vs targets
npx ts-node src/tools/db-migrate/cli.ts schema:sync <database>         # Sync schema to targets
npx ts-node src/tools/db-migrate/cli.ts schema:sync <database> -d      # Dry run sync
npx ts-node src/tools/db-migrate/cli.ts schema:sync <database> --drop-extra  # Drop extra tables/columns
```

## Architecture

### Source Files (src/tools/db-migrate/)
- `cli.ts` - Command-line interface using Commander.js
- `migrator.ts` - Core migration logic (apply, status, create migrations)
- `schema-sync.ts` - Schema comparison and synchronization between databases
- `types.ts` - TypeScript interfaces for all data structures

### Configuration (config/)
- `databases.example.js` - Example configuration template
- `databases.js` - Active config (create by copying example, not in git)

### Migrations (migrations/)
- Migration files use Flyway-style naming: `V001__description.sql`
- Version number must be unique and sequential
- Applied migrations tracked in `_migrations` table per database

## Configuration Format

```javascript
// config/databases.js
export default {
  defaults: {
    port: 5432,
    user: 'postgres',
    password: process.env.DB_PASSWORD,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  },
  servers: [
    {
      id: 'master',           // Unique identifier
      host: '192.168.1.10',
      tags: ['master', 'production'],  // For filtering
      databases: ['main_db'],          // Databases to manage
    },
    {
      id: 'slave-1',
      host: '192.168.1.11',
      tags: ['slave', 'production'],
      databases: ['main_db', 'analytics_db'],
      user: 'custom_user',    // Override defaults per server
    },
  ],
};
```

## Migration File Format

```sql
-- migrations/V002__add_user_roles.sql
-- Migration: Add user roles
-- Version: 2
-- Created: 2025-01-15T10:00:00.000Z

ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';
CREATE INDEX idx_users_role ON users(role);
```

## Key Behaviors

**SQL Preprocessor**: Automatically adds `IF NOT EXISTS/IF EXISTS` clauses to SQL statements before execution, making migrations idempotent and safe to re-run:
- `CREATE TABLE` → `CREATE TABLE IF NOT EXISTS`
- `ALTER TABLE ADD COLUMN` → `ADD COLUMN IF NOT EXISTS`
- `ALTER TABLE DROP COLUMN` → `DROP COLUMN IF EXISTS`
- `DROP TABLE/INDEX/SEQUENCE` → `DROP ... IF EXISTS`

**Auto-Column Detection**: When applying migrations, the system automatically:
1. Parses `CREATE TABLE` statements from migration files
2. Checks if tables already exist in the database
3. Compares columns in the migration with existing table columns
4. Automatically generates and executes `ALTER TABLE ADD COLUMN` for missing columns
5. Reports added columns in migration output

This ensures that table schema changes in migration files are always applied, even when the table already exists.

**Migration Tracking**: Each database has a `_migrations` table storing applied migrations with checksums. Modified migrations after application are detected via checksum mismatch.

**Parallel Execution**: Migrations run in parallel batches (default concurrency: 5). Use `-c` flag to adjust.

**Transaction Safety**: Each migration runs in a transaction; failure triggers rollback and stops further migrations.

**Server Filtering**: Filter targets using:
- `-t, --tags`: Include servers with matching tags
- `-s, --servers`: Include specific server IDs
- `-e, --exclude`: Exclude specific server IDs

**Schema Sync**: Compares tables, columns, and indexes between master and target databases. Can generate and apply ALTER statements to synchronize schemas.
