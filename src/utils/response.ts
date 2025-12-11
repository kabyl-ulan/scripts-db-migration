import { Response } from "express";

import { ENV } from "../config/env";

const isDevelopment = ENV.NODE_ENV === "development";

/**
 * Validates HTTP status code
 */
const isValidStatusCode = (code: number): boolean => {
  return Number.isInteger(code) && code >= 100 && code <= 599;
};

/**
 * Core response sender with security headers and validation
 *
 * @param res Express response object
 * @param data Response data
 * @param message Response message (i18n key or text)
 * @param error Error flag
 * @param statusCode HTTP status code (100-599)
 * @param responseTime Optional response time in ms
 */
const send = <T = any>(
  res: Response,
  data: T,
  message: string,
  error: boolean,
  statusCode: number,
  responseTime?: number
): void => {
  // 1. Check if headers already sent (prevents crashes)
  if (res.headersSent) {
    if (isDevelopment) {
      console.warn("⚠️  Cannot send response - headers already sent", {
        statusCode,
        message,
      });
    }
    return;
  }

  // 2. Validate status code
  if (!isValidStatusCode(statusCode)) {
    if (isDevelopment) {
      console.warn(`⚠️  Invalid status code: ${statusCode}, defaulting to ${error ? 500 : 200}`);
    }
    statusCode = error ? 500 : 200;
  }

  // 3. Set security headers
  // Prevent MIME type sniffing (OWASP recommendation)
  res.setHeader("X-Content-Type-Options", "nosniff");

  // Explicitly set Content-Type to application/json
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  // 4. Add response time header if available (performance monitoring)
  if (responseTime !== undefined) {
    res.setHeader("X-Response-Time", `${responseTime}ms`);
  }

  // 5. Send JSON response
  res.status(statusCode).json({ message, data, error });
};

/**
 * Sends error response with standardized format
 *
 * @param res Express response object
 * @param message Error message (should be i18n key like "error.not_found")
 * @param data Optional error data (default: false)
 * @param statusCode HTTP status code (default: 400 Bad Request)
 * @param responseTime Optional response time in ms
 *
 * @example
 * sendError(res, req.t("error.not_found"), null, 404);
 * sendError(res, req.t("inValidFormat"));
 */
const sendError = <T = any>(
  res: Response,
  message: string,
  data: T | false = false,
  statusCode: number = 400,
  responseTime?: number
): void => {
  send(res, data, message, true, statusCode, responseTime);
};

/**
 * Sends success response with standardized format
 *
 * @param res Express response object
 * @param message Success message (should be i18n key like "successSave")
 * @param data Response data (default: true)
 * @param statusCode HTTP status code (default: 200 OK)
 * @param responseTime Optional response time in ms
 *
 * @example
 * sendSuccess(res, req.t("successSave"), { id: 123 });
 * sendSuccess(res, req.t("success"), userData, 201);
 */
const sendSuccess = <T = any>(
  res: Response,
  message: string,
  data: T | true = true,
  statusCode: number = 200,
  responseTime?: number
): void => {
  send(res, data, message, false, statusCode, responseTime);
};

export { send, sendError, sendSuccess };
