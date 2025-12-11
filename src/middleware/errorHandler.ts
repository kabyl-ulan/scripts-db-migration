import { ErrorRequestHandler } from "express";

import { ENV } from "../config/env";
import { HttpError } from "../utils/httpError";
import { sendError } from "../utils/response";

/**
 * Global error handler middleware
 * Handles all errors thrown in the application with proper logging and response formatting
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const isDevelopment = ENV.NODE_ENV === "development";

  // Extract error details
  const statusCode = err instanceof HttpError ? err.statusCode : 500;
  const errorMessage = err instanceof HttpError ? err.message : "error.internal_server";

  // Build error context for logging
  const errorContext = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.originalUrl || req.url,
    ip: req.ip || req.socket.remoteAddress,
    userId: req.user?.id || null,
    statusCode,
    errorType: err.constructor.name,
    message: err.message,
  };

  // Log error with appropriate detail level
  if (isDevelopment) {
    // Development: detailed logging with stack trace
    console.error("\n❌ ==================== ERROR ====================");
    console.error("Context:", JSON.stringify(errorContext, null, 2));
    console.error("Stack:", err.stack);
    console.error("================================================\n");
  } else {
    // Production: structured object (PM2 serializes to JSON automatically)
    console.error({
      level: "error",
      ...errorContext,
      stack: err.stack?.split("\n").slice(0, 3).join(" | "), // First 3 lines only
    });
  }

  // Send response to client
  if (err instanceof HttpError) {
    // Custom HttpError - translate message
    return sendError(res, req.t(errorMessage), false, statusCode);
  } else {
    // Unexpected error - hide details in production
    if (isDevelopment) {
      // Development: show actual error for debugging
      return sendError(res, err.message || "Internal Server Error", false, 500);
    } else {
      // Production: generic message (don't leak internals)
      return sendError(res, req.t("error.internal_server"), false, 500);
    }
  }
};
