import { z } from "zod";

/**
 * Schema for validating generate migration request
 */
export const generateMigrationSchema = z.object({
  server: z
    .string({
      required_error: "server_required",
      invalid_type_error: "server_invalid",
    })
    .min(1, { message: "server_required" }),
  database: z
    .string({
      required_error: "database_required",
      invalid_type_error: "database_invalid",
    })
    .min(1, { message: "database_required" }),
  tables: z
    .union([
      z.array(z.string()).min(1, { message: "tables_empty" }),
      z.literal("all"),
    ])
    .optional(),
  functions: z
    .union([
      z.array(z.string()).min(1, { message: "functions_empty" }),
      z.literal("all"),
    ])
    .optional(),
  description: z.string().optional(),
}).refine(
  (data) => {
    // At least tables or functions must be provided
    return data.tables !== undefined || data.functions !== undefined;
  },
  {
    message: "tables_or_functions_required",
    path: ["tables"],
  }
);

/**
 * Schema for validating query parameters (server and database)
 */
export const databaseQuerySchema = z.object({
  server: z
    .string({
      required_error: "server_required",
      invalid_type_error: "server_invalid",
    })
    .min(1, { message: "server_required" }),
  database: z
    .string({
      required_error: "database_required",
      invalid_type_error: "database_invalid",
    })
    .min(1, { message: "database_required" }),
});

export type IGenerateMigrationInput = z.infer<typeof generateMigrationSchema>;
export type IDatabaseQueryInput = z.infer<typeof databaseQuerySchema>;
