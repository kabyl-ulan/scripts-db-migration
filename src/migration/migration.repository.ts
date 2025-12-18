import { Client } from "pg";

export interface TableInfo {
  table_name: string;
  row_count: number;
}

export interface FunctionInfo {
  function_name: string;
  return_type: string;
}

export class MigrationRepository {
  /**
   * Get list of tables from database
   */
  async getTables(client: Client): Promise<TableInfo[]> {
    const result = await client.query<{ table_name: string; row_count: string }>(
      `SELECT
        t.table_name,
        COALESCE(s.n_live_tup, 0) as row_count
      FROM information_schema.tables t
      LEFT JOIN pg_stat_user_tables s ON s.relname = t.table_name
      WHERE t.table_schema = 'public'
        AND t.table_type = 'BASE TABLE'
        AND t.table_name NOT IN ('_migrations', 'Session', 'Session_log')
      ORDER BY t.table_name`
    );
    return result.rows.map((row) => ({
      table_name: row.table_name,
      row_count: parseInt(row.row_count, 10),
    }));
  }

  /**
   * Get list of functions from database
   */
  async getFunctions(client: Client): Promise<FunctionInfo[]> {
    const result = await client.query<{ function_name: string; return_type: string }>(
      `SELECT
        p.proname as function_name,
        pg_catalog.pg_get_function_result(p.oid) as return_type
      FROM pg_proc p
      JOIN pg_namespace n ON n.oid = p.pronamespace
      WHERE n.nspname = 'public'
      ORDER BY p.proname`
    );
    return result.rows;
  }

  /**
   * Get table definition (CREATE TABLE statement)
   */
  async getTableDefinition(client: Client, tableName: string): Promise<string> {
    const columnsResult = await client.query(
      `SELECT
        column_name,
        data_type,
        character_maximum_length,
        column_default,
        is_nullable,
        udt_name
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position`,
      [tableName]
    );

    if (columnsResult.rows.length === 0) {
      throw new Error(`Table ${tableName} not found`);
    }

    let sql = `-- public.${tableName} definition\n\n`;
    sql += `CREATE TABLE public.${tableName} (\n`;

    const columnDefs: string[] = [];
    for (const col of columnsResult.rows) {
      let colDef = `\t${col.column_name} `;

      if (col.character_maximum_length) {
        colDef += `${col.data_type}(${col.character_maximum_length})`;
      } else {
        colDef += col.udt_name;
      }

      if (col.column_default) {
        colDef += ` DEFAULT ${col.column_default}`;
      }

      if (col.is_nullable === "NO") {
        colDef += " NOT NULL";
      }

      columnDefs.push(colDef);
    }

    sql += columnDefs.join(",\n");

    const constraintsResult = await client.query(
      `SELECT conname as constraint_name, pg_get_constraintdef(oid) as constraint_def
      FROM pg_constraint
      WHERE conrelid = $1::regclass
      ORDER BY contype DESC`,
      [`public.${tableName}`]
    );

    if (constraintsResult.rows.length > 0) {
      sql += ",\n";
      const constraints = constraintsResult.rows.map(
        (c) => `\tCONSTRAINT ${c.constraint_name} ${c.constraint_def}`
      );
      sql += constraints.join(",\n");
    }

    sql += "\n);\n";

    const indexesResult = await client.query(
      `SELECT indexdef
      FROM pg_indexes
      WHERE schemaname = 'public' AND tablename = $1
        AND indexname NOT IN (SELECT conname FROM pg_constraint WHERE conrelid = $2::regclass)`,
      [tableName, `public.${tableName}`]
    );

    if (indexesResult.rows.length > 0) {
      sql += "\n";
      for (const idx of indexesResult.rows) {
        sql += idx.indexdef + ";\n";
      }
    }

    return sql;
  }

  /**
   * Get function definition
   */
  async getFunctionDefinition(client: Client, functionName: string): Promise<string> {
    const result = await client.query<{ function_definition: string }>(
      `SELECT pg_get_functiondef(p.oid) AS function_definition
       FROM pg_proc p
       JOIN pg_namespace n ON n.oid = p.pronamespace
       WHERE n.nspname = 'public' AND p.proname = $1
       LIMIT 1`,
      [functionName]
    );

    if (result.rows.length === 0) {
      throw new Error(`Function ${functionName} not found`);
    }

    return result.rows[0].function_definition + ";";
  }
}
