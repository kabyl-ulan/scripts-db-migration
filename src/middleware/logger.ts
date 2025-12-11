import { Request, Response, NextFunction } from "express";

import { ENV } from "../config/env";

// ANSI colors (вынесены за пределы функции для производительности)
const colors = {
  reset: "\x1b[0m",
  gray: "\x1b[90m",
  blue: "\x1b[34m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  white: "\x1b[37m",
};

// Endpoints которые не нужно логировать (уменьшает спам)
const SKIP_PATHS = ["/health", "/ready"];

// Использовать цвета только в development
const useColors = ENV.NODE_ENV !== "production";

/**
 * Get status color based on HTTP status code
 */
const getStatusColor = (status: number): string => {
  if (!useColors) return "";
  if (status >= 500) return colors.red;
  if (status >= 400) return colors.yellow;
  if (status >= 300) return colors.cyan;
  return colors.green;
};

/**
 * Get client IP address (supports proxy)
 */
const getClientIp = (req: Request): string => {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    (req.headers["x-real-ip"] as string) ||
    req.socket.remoteAddress ||
    "unknown"
  );
};

/**
 * Logger middleware - logs HTTP requests with colors, timing, and client info
 */
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Skip logging for health check endpoints
  if (SKIP_PATHS.includes(req.path)) {
    return next();
  }

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { method, path } = req;
    const status = res.statusCode;
    const ip = getClientIp(req);
    const contentLength = res.get("content-length") || "-";

    if (useColors) {
      // Development: colored logs
      const statusColor = getStatusColor(status);
      console.log(
        `${colors.blue}${method}${colors.reset} ` +
          `${colors.white}${path}${colors.reset} ` +
          `${statusColor}${status}${colors.reset} ` +
          `${colors.gray}${duration}ms ${contentLength}b ${ip}${colors.reset}`
      );
    } else {
      // Production: structured object (PM2 serializes to JSON automatically)
      console.log({
        type: "http",
        method,
        path,
        status,
        duration: `${duration}ms`,
        contentLength,
        ip,
        timestamp: new Date().toISOString(),
      });
    }

    // Log slow requests (> 1 second)
    if (duration > 1000) {
      if (useColors) {
        console.warn(`⚠️  SLOW REQUEST: ${method} ${path} took ${duration}ms (IP: ${ip})`);
      } else {
        console.warn({
          type: "slow_request",
          method,
          path,
          duration: `${duration}ms`,
          ip,
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Log server errors (5xx)
    if (status >= 500) {
      if (useColors) {
        console.error(`❌ SERVER ERROR: ${method} ${path} - Status ${status} (IP: ${ip})`);
      } else {
        console.error({
          type: "server_error",
          method,
          path,
          status,
          ip,
          timestamp: new Date().toISOString(),
        });
      }
    }
  });

  next();
};
