import path from "path";

import chalk from "chalk";
import { program } from "commander";

import logger from "../../utils/logger";

import { migrateAll, statusAll, createMigration, migrateDatabase, filterServers } from "./migrator";
import { dumpMasterSchema, compareSchemas, syncSchema } from "./schema-sync";
import type { Config, MigrationResult, MigrationStatus } from "./types";

async function loadConfig(): Promise<Config> {
  try {
    // Look for config from project root
    const configPath = path.join(process.cwd(), "config", "databases.js");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config = require(configPath);
    return (config.default || config) as Config;
  } catch (error) {
    logger.error(chalk.red("Error loading config/databases.js"));
    logger.error(chalk.red((error as Error).message));
    logger.error(
      chalk.yellow(
        "Copy config/databases.example.js to config/databases.js and configure your servers"
      )
    );
    process.exit(1);
  }
}

function printResults(results: MigrationResult[]): void {
  let totalApplied = 0;
  let totalErrors = 0;

  for (const result of results) {
    const header = `${result.server}/${result.database}`;

    if (result.errors?.length > 0) {
      logger.error(chalk.red(`\n✗ ${header}`));
      for (const err of result.errors) {
        logger.error(chalk.red(`  Error printResults: ${err.error}`));
        if (err.migration) {
          logger.error(chalk.red(`  Migration: ${err.migration}`));
        }
      }
      totalErrors += result.errors.length;
    } else if (result.applied?.length > 0) {
      logger.info(chalk.green(`\n✓ ${header}`));
      for (const migration of result.applied) {
        const time = migration.executionTime ? ` (${migration.executionTime}ms)` : "";
        const dry = migration.dryRun ? chalk.yellow(" [DRY RUN]") : "";
        logger.info(chalk.green(`  Applied: ${migration.filename}${time}${dry}`));

        // Show ALTER TABLE ADD COLUMN statements if columns were added automatically
        if (migration.alterStatements && migration.alterStatements.length > 0) {
          logger.info(
            chalk.cyan(`    → Auto-added ${migration.alterStatements.length} missing column(s)`)
          );
          for (const stmt of migration.alterStatements) {
            logger.info(chalk.gray(`      ${stmt}`));
          }
        }

        // Show ALTER TABLE DROP COLUMN statements if columns were dropped automatically
        if (migration.dropStatements && migration.dropStatements.length > 0) {
          logger.info(
            chalk.red(`    → Auto-dropped ${migration.dropStatements.length} extra column(s)`)
          );
          for (const stmt of migration.dropStatements) {
            logger.info(chalk.gray(`      ${stmt}`));
          }
        }

        // Show auto-created functions fetched from master database
        if (migration.createdFunctions && migration.createdFunctions.length > 0) {
          logger.info(
            chalk.magenta(
              `    → Auto-created ${migration.createdFunctions.length} missing function(s) from master`
            )
          );
          for (const funcName of migration.createdFunctions) {
            logger.info(chalk.gray(`      ${funcName}()`));
          }
        }
      }
      totalApplied += result.applied.length;
    } else {
      logger.info(chalk.gray(`\n○ ${header} - up to date`));
    }
  }

  logger.info("\n" + chalk.bold("Summary:"));
  logger.info(`  Migrations applied: ${chalk.green(totalApplied)}`);
  logger.info(`  Errors: ${totalErrors > 0 ? chalk.red(totalErrors) : chalk.green(0)}`);
}

function printStatus(results: MigrationStatus[]): void {
  logger.info(chalk.bold("\nMigration Status:\n"));

  for (const result of results) {
    const header = `${result.server}/${result.database}`;

    if (result.error) {
      logger.error(chalk.red(`✗ ${header}: ${result.error}`));
      continue;
    }

    const statusIcon = result.pending > 0 ? chalk.yellow("●") : chalk.green("✓");
    logger.info(`${statusIcon} ${chalk.bold(header)}`);
    logger.info(
      `  Applied: ${chalk.green(result.applied)} | Pending: ${result.pending > 0 ? chalk.yellow(result.pending) : chalk.green(0)}`
    );

    if (result.pending > 0) {
      const pendingMigrations = result.migrations.filter((m) => !m.applied);
      for (const m of pendingMigrations) {
        logger.info(chalk.yellow(`    - ${m.filename}`));
      }
    }
  }
}

program
  .name("db-migrate")
  .description("PostgreSQL schema migration tool for multiple servers")
  .version("1.0.0");

program
  .command("migrate")
  .description("Run pending migrations")
  .option("-t, --tags <tags>", "Filter servers by tags (comma-separated)", "")
  .option("-s, --servers <ids>", "Filter by server IDs (comma-separated)", "")
  .option("-e, --exclude <ids>", "Exclude server IDs (comma-separated)", "")
  .option("-d, --dry-run", "Show what would be applied without executing")
  .option("-c, --concurrency <n>", "Number of parallel connections", "5")
  .option("--target <version>", "Migrate up to specific version")
  .option("--drop-extra", "Drop columns not present in migration CREATE TABLE")
  .action(async (options) => {
    const config = await loadConfig();

    logger.info(chalk.bold("Running migrations...\n"));

    if (options.dryRun) {
      logger.info(chalk.yellow("DRY RUN MODE - no changes will be made\n"));
    }

    if (options.dropExtra) {
      logger.info(chalk.red("⚠️  DROP EXTRA MODE - columns not in migrations will be dropped!\n"));
    }

    const filterOptions = {
      tags: options.tags ? options.tags.split(",").map((s: string) => s.trim()) : [],
      ids: options.servers ? options.servers.split(",").map((s: string) => s.trim()) : [],
      exclude: options.exclude ? options.exclude.split(",").map((s: string) => s.trim()) : [],
      dryRun: options.dryRun,
      concurrency: parseInt(options.concurrency, 10),
      targetVersion: options.target ? parseInt(options.target, 10) : null,
      dropExtra: options.dropExtra,
    };

    const results = await migrateAll(config, filterOptions);
    printResults(results);

    const hasErrors = results.some((r) => r.errors?.length > 0);
    process.exit(hasErrors ? 1 : 0);
  });

program
  .command("status")
  .description("Show migration status for all databases")
  .option("-t, --tags <tags>", "Filter servers by tags (comma-separated)", "")
  .option("-s, --servers <ids>", "Filter by server IDs (comma-separated)", "")
  .action(async (options) => {
    const config = await loadConfig();

    const filterOptions = {
      tags: options.tags ? options.tags.split(",").map((s: string) => s.trim()) : [],
      ids: options.servers ? options.servers.split(",").map((s: string) => s.trim()) : [],
    };

    const results = await statusAll(config, filterOptions);
    printStatus(results);
  });

program
  .command("create <description>")
  .description("Create a new migration file")
  .action(async (description: string) => {
    const result = await createMigration(description);
    logger.info(chalk.green(`Created migration: ${result.filename}`));
    logger.info(chalk.gray(`Path: ${result.path}`));
  });

program
  .command("single <server> <database>")
  .description("Run migrations on a single database")
  .option("-d, --dry-run", "Show what would be applied without executing")
  .option("--drop-extra", "Drop columns not present in migration CREATE TABLE")
  .action(async (serverId: string, database: string, options) => {
    const config = await loadConfig();
    const server = config.servers.find((s) => s.id === serverId);

    if (!server) {
      logger.error(chalk.red(`Server not found: ${serverId}`));
      process.exit(1);
    }

    logger.info(chalk.bold(`Running migrations on ${serverId}/${database}...\n`));

    if (options.dropExtra) {
      logger.info(chalk.red("⚠️  DROP EXTRA MODE - columns not in migrations will be dropped!\n"));
    }

    const result = await migrateDatabase(server, database, config.defaults, {
      dryRun: options.dryRun,
      dropExtra: options.dropExtra,
    });

    printResults([result]);
  });

// Schema sync commands
program
  .command("schema:dump <database>")
  .description("Dump schema from master database")
  .option("-m, --master <id>", "Master server ID", "master")
  .option("-o, --output <file>", "Output filename")
  .action(async (database: string, options) => {
    const config = await loadConfig();
    const master = config.servers.find((s) => s.id === options.master);

    if (!master) {
      logger.error(chalk.red(`Master server not found: ${options.master}`));
      process.exit(1);
    }

    logger.info(chalk.bold(`Dumping schema from ${options.master}/${database}...\n`));

    try {
      const result = await dumpMasterSchema(master, database, config.defaults, options.output);
      logger.info(chalk.green(`Schema saved: ${result.path}`));
      logger.info(chalk.gray(`Size: ${(result.size / 1024).toFixed(1)} KB`));
    } catch (err) {
      logger.error(chalk.red(`Error: ${(err as Error).message}`));
      process.exit(1);
    }
  });

program
  .command("schema:diff <database>")
  .description("Compare schema between master and target servers")
  .option("-m, --master <id>", "Master server ID", "master")
  .option("-t, --tags <tags>", "Filter target servers by tags", "")
  .option("-s, --servers <ids>", "Filter by server IDs", "")
  .action(async (database: string, options) => {
    const config = await loadConfig();
    const master = config.servers.find((s) => s.id === options.master);

    if (!master) {
      logger.error(chalk.red(`Master server not found: ${options.master}`));
      process.exit(1);
    }

    const filterOptions = {
      tags: options.tags ? options.tags.split(",").map((s: string) => s.trim()) : [],
      ids: options.servers ? options.servers.split(",").map((s: string) => s.trim()) : [],
      exclude: [options.master],
    };

    const targets = filterServers(config.servers, filterOptions);

    logger.info(chalk.bold(`Comparing schemas (master: ${options.master}/${database})\n`));

    for (const target of targets) {
      if (!target.databases.includes(database)) continue;

      try {
        const diff = await compareSchemas(master, target, database, config.defaults);
        const header = `${target.id}/${database}`;

        const hasDiff =
          diff.missingTables.length > 0 ||
          diff.extraTables.length > 0 ||
          diff.differentTables.length > 0;

        if (!hasDiff) {
          logger.info(chalk.green(`✓ ${header} - in sync`));
          continue;
        }

        logger.info(chalk.yellow(`\n● ${header} - differences found:`));

        if (diff.missingTables.length > 0) {
          logger.info(chalk.red(`  Missing tables: ${diff.missingTables.join(", ")}`));
        }

        if (diff.extraTables.length > 0) {
          logger.info(chalk.yellow(`  Extra tables: ${diff.extraTables.join(", ")}`));
        }

        for (const table of diff.differentTables) {
          logger.info(chalk.yellow(`  Table ${table.table}:`));
          for (const col of table.columns) {
            if (col.type === "missing_column") {
              const expected =
                typeof col.expected === "object"
                  ? (col.expected as { data_type: string }).data_type
                  : col.expected;
              logger.info(chalk.red(`    - Missing column: ${col.column} (${expected})`));
            } else if (col.type === "extra_column") {
              logger.info(chalk.yellow(`    - Extra column: ${col.column}`));
            } else if (col.type === "type_mismatch") {
              logger.info(
                chalk.red(
                  `    - Type mismatch: ${col.column} (expected: ${col.expected}, actual: ${col.actual})`
                )
              );
            }
          }
          for (const idx of table.indexes) {
            logger.info(chalk.red(`    - Missing index: ${idx.index}`));
          }
        }
      } catch (err) {
        logger.info(chalk.red(`✗ ${target.id}/${database}: ${(err as Error).message}`));
      }
    }
  });

program
  .command("schema:sync <database>")
  .description("Sync schema from master to all target servers")
  .option("-m, --master <id>", "Master server ID", "master")
  .option("-t, --tags <tags>", "Filter target servers by tags", "")
  .option("-s, --servers <ids>", "Filter by server IDs", "")
  .option("-d, --dry-run", "Show what would be changed without executing")
  .option("--drop-extra", "Drop extra tables/columns not in master")
  .action(async (database: string, options) => {
    const config = await loadConfig();
    const master = config.servers.find((s) => s.id === options.master);

    if (!master) {
      logger.error(chalk.red(`Master server not found: ${options.master}`));
      process.exit(1);
    }

    const filterOptions = {
      tags: options.tags ? options.tags.split(",").map((s: string) => s.trim()) : [],
      ids: options.servers ? options.servers.split(",").map((s: string) => s.trim()) : [],
      exclude: [options.master],
    };

    const targets = filterServers(config.servers, filterOptions);

    logger.info(chalk.bold(`Syncing schema from ${options.master}/${database}\n`));

    if (options.dryRun) {
      logger.info(chalk.yellow("DRY RUN MODE - no changes will be made\n"));
    }

    let synced = 0;
    let errors = 0;

    for (const target of targets) {
      if (!target.databases.includes(database)) continue;

      try {
        const result = await syncSchema(master, target, database, config.defaults, {
          dryRun: options.dryRun,
          dropExtra: options.dropExtra,
        });

        const header = `${result.server}/${result.database}`;

        if (result.status === "in_sync") {
          logger.info(chalk.green(`✓ ${header} - already in sync`));
        } else if (result.dryRun) {
          logger.info(chalk.yellow(`\n● ${header} - changes needed:`));
          for (const sql of result.changes) {
            logger.info(chalk.gray(`  ${sql}`));
          }
        } else {
          logger.info(chalk.green(`✓ ${header} - synced (${result.changes.length} changes)`));
          synced++;
        }
      } catch (err) {
        logger.info(chalk.red(`✗ ${target.id}/${database}: ${(err as Error).message}`));
        errors++;
      }
    }

    logger.info("\n" + chalk.bold("Summary:"));
    logger.info(`  Synced: ${chalk.green(synced)}`);
    logger.info(`  Errors: ${errors > 0 ? chalk.red(errors) : chalk.green(0)}`);
  });

program.parse();
