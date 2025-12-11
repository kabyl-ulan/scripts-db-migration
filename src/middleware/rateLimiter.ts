import { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";

import { ENV } from "../config/env";
import { getRedisClient } from "../utils/cache";
import { sendError } from "../utils/response";

/**
 * Smart Rate Limiter with automatic store selection
 *
 * - If Redis is available: uses Redis Store (works across PM2 workers and servers)
 * - If Redis is unavailable: uses Memory Store (single process only)
 *
 * Automatically chooses the best option based on environment.
 */

// Get Redis client if available
const redisClient = getRedisClient();
const useRedisStore = ENV.CACHE.CHECK && redisClient;

const createLimiterStore = () => {
  if (useRedisStore && redisClient) {
    return new RedisStore({
      // @ts-expect-error - redis client type mismatch between versions
      client: redisClient,
      prefix: "rate_limit:", // Redis key prefix
    });
  }
  // Falls back to default memory store
  return undefined;
};

/**
 * General API rate limiter
 * Limits: 300 requests per 15 minutes per IP (~20 per minute)
 *
 * This allows for:
 * - Active browsing of universities and specialties
 * - Page reloads without blocking
 * - Multiple simultaneous API calls from frontend
 *
 * Still protects against:
 * - DoS attacks
 * - Scraping bots
 * - Malicious automated requests
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs (~20 per minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  store: createLimiterStore(),
  handler: (req: Request, res: Response) => {
    return sendError(res, req.t("error.tooManyRequests"), false, 429);
  },
});

/**
 * Strict rate limiter for authentication endpoints
 * Limits: 5 requests per 15 minutes per IP (prevents brute force attacks)
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
  store: createLimiterStore(),
  handler: (req: Request, res: Response) => {
    return sendError(res, req.t("error.tooManyLoginAttempts"), false, 429);
  },
});

/**
 * Moderate rate limiter for file upload endpoints
 * Limits: 10 requests per 15 minutes per IP
 */
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 uploads per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  store: createLimiterStore(),
  handler: (req: Request, res: Response) => {
    return sendError(res, req.t("error.tooManyUploads"), false, 429);
  },
});

// Log which store is being used on startup
if (useRedisStore) {
  console.log("✅ Rate limiter: Using Redis store (distributed, production-ready)");
} else {
  console.warn("⚠️  Rate limiter: Using memory store (single instance only, dev mode)");
}
