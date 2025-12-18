import { Client } from "pg";
import fs from "fs/promises";
import path from "path";

import { MigrationRepository } from "./migration.repository";

interface DatabaseConfig {
  id: string;
  host: string;
  databases: string[];
  tags?: string[];
  user?: string;
  password?: string;
  port?: number;
}

interface Config {
  defaults: {
    port: number;
    user: string;
    password: string;
  };
  servers: DatabaseConfig[];
}

export class MigrationService {
  private repository = new MigrationRepository();

  /**
   * Load database configuration
   */
  private async loadConfig(): Promise<Config> {
    const configPath = path.join(process.cwd(), "config", "databases.js");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const config = require(configPath);
    return (config.default || config) as Config;
  }

  /**
   * Create database client
   */
  private createClient(
    host: string,
    database: string,
    user: string,
    password: string,
    port: number
  ): Client {
    return new Client({ host, port, user, password, database });
  }

  /**
   * Get list of available databases
   */
  async getDatabases() {
    const config = await this.loadConfig();
    return config.servers.map((server) => ({
      id: server.id,
      host: server.host,
      databases: server.databases,
      tags: server.tags || [],
    }));
  }

  /**
   * Get tables from specified database
   */
  async getTables(serverId: string, database: string) {
    const config = await this.loadConfig();
    const server = config.servers.find((s) => s.id === serverId);

    if (!server) {
      throw new Error(`Server ${serverId} not found`);
    }

    const client = this.createClient(
      server.host,
      database,
      server.user || config.defaults.user,
      server.password || config.defaults.password,
      server.port || config.defaults.port
    );

    try {
      await client.connect();
      return await this.repository.getTables(client);
    } finally {
      await client.end();
    }
  }

  /**
   * Get functions from specified database
   */
  async getFunctions(serverId: string, database: string) {
    const config = await this.loadConfig();
    const server = config.servers.find((s) => s.id === serverId);

    if (!server) {
      throw new Error(`Server ${serverId} not found`);
    }

    const client = this.createClient(
      server.host,
      database,
      server.user || config.defaults.user,
      server.password || config.defaults.password,
      server.port || config.defaults.port
    );

    try {
      await client.connect();
      return await this.repository.getFunctions(client);
    } finally {
      await client.end();
    }
  }

  /**
   * Generate migration file from selected tables and functions
   */
  async generateMigration(
    serverId: string,
    database: string,
    tables: string[] | string,
    functions: string[] | string,
    description?: string
  ) {
    const config = await this.loadConfig();
    const server = config.servers.find((s) => s.id === serverId);

    if (!server) {
      throw new Error(`Server ${serverId} not found`);
    }

    const hasNoTables = !tables || (Array.isArray(tables) && tables.length === 0);
    const hasNoFunctions = !functions || (Array.isArray(functions) && functions.length === 0);

    if (hasNoTables && hasNoFunctions) {
      throw new Error("At least one table or function must be specified, or use 'all'");
    }

    const client = this.createClient(
      server.host,
      database,
      server.user || config.defaults.user,
      server.password || config.defaults.password,
      server.port || config.defaults.port
    );

    try {
      await client.connect();

      // Get all tables if "all" is specified
      let tableNames: string[] = [];
      if (tables === "all") {
        const allTables = await this.repository.getTables(client);
        tableNames = allTables.map(t => t.table_name);
      } else if (Array.isArray(tables) && tables.length > 0) {
        tableNames = tables;
      }

      // Get all functions if "all" is specified
      let functionNames: string[] = [];
      if (functions === "all") {
        const allFunctions = await this.repository.getFunctions(client);
        functionNames = allFunctions.map(f => f.function_name);
      } else if (Array.isArray(functions) && functions.length > 0) {
        functionNames = functions;
      }

      let migrationSQL = `-- Migration: ${description || "Auto-generated migration"}\n`;
      migrationSQL += `-- Source: ${serverId}/${database}\n`;
      migrationSQL += `-- Created: ${new Date().toISOString()}\n\n`;

      // Add functions first (tables might depend on them)
      if (functionNames.length > 0) {
        migrationSQL += `-- Functions (${functionNames.length})\n\n`;
        for (const funcName of functionNames) {
          const funcDef = await this.repository.getFunctionDefinition(client, funcName);
          migrationSQL += funcDef + "\n\n";
        }
      }

      // Add tables
      if (tableNames.length > 0) {
        migrationSQL += `-- Tables (${tableNames.length})\n\n`;
        for (const tableName of tableNames) {
          const tableDef = await this.repository.getTableDefinition(client, tableName);
          migrationSQL += tableDef + "\n\n";
        }
      }

      // Determine next migration version
      const migrationsDir = path.join(process.cwd(), "migrations");
      const files = await fs.readdir(migrationsDir);
      const versions = files
        .map((f) => {
          const match = f.match(/^V(\d+)__/);
          return match ? parseInt(match[1], 10) : 0;
        })
        .filter((v) => v > 0);

      const nextVersion = versions.length > 0 ? Math.max(...versions) + 1 : 1;
      const versionStr = String(nextVersion).padStart(3, "0");
      const safeName = (description || "migration").replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      const filename = `V${versionStr}__${safeName}.sql`;
      const filePath = path.join(migrationsDir, filename);

      // Save migration file
      await fs.writeFile(filePath, migrationSQL);

      return {
        success: true,
        filename,
        path: filePath,
        version: nextVersion,
        sql: migrationSQL,
      };
    } finally {
      await client.end();
    }
  }
}
