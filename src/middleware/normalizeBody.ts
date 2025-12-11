import { RequestHandler } from "express";

import { ENV } from "../config/env";
import { normalizeFormData } from "../utils/normalizeFormData";

interface NormalizeBodyOptions {
  emptyAsNull?: boolean;
  maxDepth?: number;
  logChanges?: boolean;
}

/**
 * Normalizes request body data
 * - Trims all strings
 * - Converts empty strings to null (if emptyAsNull=true)
 * - Converts "null"/"undefined" strings to null
 * - Handles nested objects and arrays recursively
 * - Skips files and buffers
 */
export function normalizeBodyMiddleware(opts?: NormalizeBodyOptions): RequestHandler {
  const options = {
    emptyAsNull: opts?.emptyAsNull ?? true,
    maxDepth: opts?.maxDepth ?? 10, // Защита от DoS
    logChanges: opts?.logChanges ?? false,
  };

  return (req, _res, next) => {
    try {
      // Skip if no body (GET requests, etc.)
      if (!req.body) {
        return next();
      }

      // Skip if body is not an object (rare, but possible)
      if (typeof req.body !== "object" || req.body === null) {
        return next();
      }

      // Skip if multipart/form-data with files (already handled by express-fileupload)
      const contentType = req.headers["content-type"] || "";
      const hasFiles = req.files && Object.keys(req.files).length > 0;
      if (contentType.includes("multipart/form-data") && hasFiles) {
        return next();
      }

      // Store original body for logging (only in development)
      const originalBody =
        options.logChanges && ENV.NODE_ENV === "development" ? JSON.stringify(req.body) : null;

      // Normalize body
      req.body = normalizeFormData(req.body, {
        emptyAsNull: options.emptyAsNull,
        maxDepth: options.maxDepth,
      });

      // Log changes in development
      if (options.logChanges && ENV.NODE_ENV === "development" && originalBody) {
        const normalizedBody = JSON.stringify(req.body);
        if (originalBody !== normalizedBody) {
          console.log("📝 Body normalized:", {
            url: req.url,
            method: req.method,
            before: originalBody,
            after: normalizedBody,
          });
        }
      }

      next();
    } catch (err) {
      // Log normalization errors
      console.error("❌ Body normalization error:", err);
      next(err);
    }
  };
}
