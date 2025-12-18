import { NextFunction, Request, RequestHandler, Response } from "express";

import { sendSuccess, sendError } from "../utils/response";
import { validate } from "../utils/validation";

import { MigrationService } from "./migration.service";
import { generateMigrationSchema, databaseQuerySchema } from "./migration.schema";

const migrationService = new MigrationService();

export class MigrationController {
  /**
   * Get list of available databases
   */
  getDatabases: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const databases = await migrationService.getDatabases();
      return sendSuccess(res, req.t("success"), databases);
    } catch (error: unknown) {
      console.error("❌ error MigrationController getDatabases: ", (error as Error).message);
      return next(error);
    }
  };

  /**
   * Get tables from specified database
   */
  getTables: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { isValid, data, issues } = validate(databaseQuerySchema, req.query);
      if (!isValid) {
        const msgKey = issues![0].message;
        return sendError(res, req.t(`migration.${msgKey}`), false, 400);
      }

      const tables = await migrationService.getTables(data!.server, data!.database);
      return sendSuccess(res, req.t("success"), tables);
    } catch (error: unknown) {
      console.error("❌ error MigrationController getTables: ", (error as Error).message);
      return next(error);
    }
  };

  /**
   * Get functions from specified database
   */
  getFunctions: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { isValid, data, issues } = validate(databaseQuerySchema, req.query);
      if (!isValid) {
        const msgKey = issues![0].message;
        return sendError(res, req.t(`migration.${msgKey}`), false, 400);
      }

      const functions = await migrationService.getFunctions(data!.server, data!.database);
      return sendSuccess(res, req.t("success"), functions);
    } catch (error: unknown) {
      console.error("❌ error MigrationController getFunctions: ", (error as Error).message);
      return next(error);
    }
  };

  /**
   * Generate migration file from selected tables and functions
   */
  generateMigration: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { isValid, data, issues } = validate(generateMigrationSchema, req.body);
      if (!isValid) {
        const msgKey = issues![0].message;
        return sendError(res, req.t(`migration.${msgKey}`), false, 400);
      }

      const result = await migrationService.generateMigration(
        data!.server,
        data!.database,
        data!.tables || [],
        data!.functions || [],
        data!.description
      );

      return sendSuccess(res, req.t("migration.generated"), result);
    } catch (error: unknown) {
      console.error("❌ error MigrationController generateMigration: ", (error as Error).message);
      return next(error);
    }
  };
}
