import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";

import { IAuthState } from "../auth/types";
import { ENV } from "../config/env";
import { IRoleTypeNumber } from "../config/roles";
import { verifyToken } from "../utils/jwt";
import { sendError } from "../utils/response";
import { Check } from "../utils/session";

const isDevelopment = ENV.NODE_ENV === "development";

/**
 * Returns 401 error with translated message
 */
const returnMessage = (res: Response, message: string) => sendError(res, message, false, 401);

/**
 * Safely logs token info (only in development, without exposing full token)
 */
const logTokenDebug = (message: string, data?: any) => {
  if (isDevelopment) {
    console.log(message, data);
  }
};

/**
 * Logs auth errors (always logged for security monitoring)
 */
const logAuthError = (message: string, details?: any) => {
  if (isDevelopment) {
    console.warn(message, details);
  } else {
    // Production: structured object (PM2 serializes to JSON automatically)
    console.error({
      level: "warn",
      type: "auth_error",
      message,
      timestamp: new Date().toISOString(),
      ...details,
    });
  }
};

/**
 * Middleware: Requires Admin role (role 1)
 */
export const isAdminToken = async (req: Request, res: Response, next: NextFunction) => {
  return await checkToken(req, res, next, [1]);
};

/**
 * Middleware: Requires Ministry role (role 2)
 */
export const isMinistryToken = async (req: Request, res: Response, next: NextFunction) => {
  return await checkToken(req, res, next, [2]);
};

/**
 * Middleware: Requires Applicant role (role 5)
 */
export const isAbitToken = async (req: Request, res: Response, next: NextFunction) => {
  return await checkToken(req, res, next, [5]);
};

/**
 * Middleware: Requires any authenticated user (roles 1-6)
 */
export const isNotEmpToken = async (req: Request, res: Response, next: NextFunction) => {
  return await checkToken(req, res, next, [1, 2, 3, 4, 5, 6]);
};

/**
 * Middleware: Requires University roles (3, 4, 6)
 */
export const isUniversityToken = async (req: Request, res: Response, next: NextFunction) => {
  return await checkToken(req, res, next, [3, 4, 6]);
};

/**
 * Middleware: Requires Responsible roles (2, 3, 4, 6)
 */
export const isResponsibleToken = async (req: Request, res: Response, next: NextFunction) => {
  return await checkToken(req, res, next, [2, 3, 4, 6]);
};

/**
 * Core authentication middleware
 * Validates JWT token, checks session, and verifies role permissions
 *result
 * @param req Express request
 * @param res Express response
 * @param next Next function
 * @param role Allowed role IDs
 */
export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction,
  role: IRoleTypeNumber[]
) {
  try {
    // 1. Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      logAuthError("Missing or invalid Authorization header", {
        url: req.url,
        method: req.method,
        ip: req.ip,
      });
      return returnMessage(res, req.t("token.token_required"));
    }

    const token = authHeader.slice(7);

    // Only log token prefix in development (never full token!)
    if (isDevelopment) {
      const tokenPreview = token.substring(0, 20) + "...";
      logTokenDebug(`🔐 Auth request: ${req.method} ${req.url} [token: ${tokenPreview}]`);
    }

    // 2. Verify JWT token
    let authState: IAuthState;
    try {
      authState = verifyToken(token);
      logTokenDebug("✅ Token decoded", { userId: authState.id, role: authState.role });
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        logAuthError("Token expired", {
          url: req.url,
          expiredAt: error.expiredAt,
          ip: req.ip,
        });
        return returnMessage(res, req.t("token.expired"));
      }
      logAuthError("Invalid token", {
        url: req.url,
        error: error.message,
        ip: req.ip,
      });
      return returnMessage(res, req.t("token.invalid_token"));
    }

    // 3. Check session in Redis (if enabled)
    const isCheck = await Check(token, authState.role);
    if (!isCheck) {
      logAuthError("Session expired or invalid", {
        url: req.url,
        userId: authState.id,
        role: authState.role,
      });
      return returnMessage(res, req.t("token.expired"));
    }

    // 4. Verify role permissions
    if (!role.includes(authState.role)) {
      logAuthError("Permission denied", {
        url: req.url,
        userId: authState.id,
        requiredRoles: role,
        userRole: authState.role,
        ip: req.ip,
      });
      return returnMessage(res, req.t("token.permission"));
    }

    // 5. Attach user to request
    req.user = authState;

    logTokenDebug(`✅ Authorized: user ${authState.id}, role ${authState.role}`);

    return next();
  } catch (error: unknown) {
    logAuthError("Unexpected auth error", {
      url: req.url,
      error: (error as Error).message,
      stack: isDevelopment ? (error as Error).stack : undefined,
    });
    return returnMessage(res, req.t("token.invalid"));
  }
}
