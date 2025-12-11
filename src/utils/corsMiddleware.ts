import cors, { CorsOptions, CorsOptionsDelegate, CorsRequest } from "cors";

import { ENV } from "../config/env";

/**
 * Allowed origins for CORS
 * Configure via ALLOWED_ORIGINS environment variable (comma-separated)
 * Example: ALLOWED_ORIGINS=http://localhost:3000,https://example.com
 *
 * For development, you can allow all origins by setting: ALLOWED_ORIGINS=*
 * WARNING: Never use * in production with credentials: true
 */
const getAllowedOrigins = (): string[] | "*" => {
  const originsEnv = ENV.ALLOWED_ORIGINS;

  // If not set, default to localhost for development
  if (!originsEnv) {
    const isDev = ENV.NODE_ENV !== "production";
    if (isDev) {
      console.warn("⚠️  ALLOWED_ORIGINS not set. Defaulting to localhost for development.");
      return ["http://localhost:3000"];
    }
    console.error("❌ ALLOWED_ORIGINS environment variable is required in production");
    return [];
  }

  // Allow all origins (only for development)
  if (originsEnv === "*") {
    const isProd = ENV.NODE_ENV === "production";
    if (isProd) {
      console.error("❌ ALLOWED_ORIGINS=* is not allowed in production for security reasons");
      return [];
    }
    return "*";
  }

  // Parse comma-separated origins
  return originsEnv
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const ALLOWED_ORIGINS = getAllowedOrigins();

/**
 * CORS options delegate with security best practices
 *
 * Security features:
 * - Origin whitelist validation (prevents unauthorized cross-origin requests)
 * - Strict preflight caching (reduces preflight overhead)
 * - Minimal exposed headers (principle of least privilege)
 * - Proper credentials handling (secure cookie/token transmission)
 *
 * Standards compliance:
 * - RFC 6454 (The Web Origin Concept)
 * - W3C CORS Specification
 * - OWASP CORS Security Cheat Sheet
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
 */
const corsOptionsDelegate: CorsOptionsDelegate<CorsRequest> = (req, callback) => {
  const requestOrigin = req.headers.origin;

  let corsOptions: CorsOptions;

  // Check if origin is allowed
  const isOriginAllowed =
    ALLOWED_ORIGINS === "*" || (requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin));

  if (isOriginAllowed) {
    corsOptions = {
      // Allow the requesting origin (validated against whitelist)
      origin: true,

      // HTTP methods allowed for CORS requests
      // Only include methods your API actually uses
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

      // Headers that can be sent by the client
      // Keep this list minimal for security
      allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],

      // Headers that can be exposed to the browser
      // Only expose headers that the client needs to read
      exposedHeaders: ["Content-Range", "X-Content-Range", "Content-Disposition"],

      // Allow credentials (cookies, authorization headers, TLS client certificates)
      // CRITICAL: Only enable if you're using authentication
      credentials: true,

      // Pass the CORS preflight response to the next handler
      // false = send 204 immediately (recommended for performance)
      preflightContinue: false,

      // Status code for successful OPTIONS requests
      // 204 No Content is standard for preflight
      optionsSuccessStatus: 204,

      // Preflight cache duration in seconds (1 hour)
      // Browsers will cache preflight results to reduce overhead
      // Maximum recommended: 86400 (24 hours)
      maxAge: 3600,
    };
  } else {
    // Origin not allowed - reject the request
    corsOptions = {
      origin: false,
    };

    // Log unauthorized origin attempts (useful for debugging/security monitoring)
    if (requestOrigin) {
      console.warn(`🚫 CORS: Blocked request from unauthorized origin: ${requestOrigin}`);
    }
  }

  callback(null, corsOptions);
};

/**
 * Creates CORS middleware with security-focused configuration
 *
 * Usage in Express:
 * ```typescript
 * import { corsMiddleware } from './utils/corsMiddleware';
 *
 * app.use(corsMiddleware());
 * ```
 *
 * @returns Express CORS middleware
 */
export function corsMiddleware() {
  // Log allowed origins on startup (for debugging)
  if (ALLOWED_ORIGINS === "*") {
    console.warn("⚠️  CORS: Allowing all origins (development mode)");
  } else if (ALLOWED_ORIGINS.length === 0) {
    console.error("❌ CORS: No origins allowed - all requests will be blocked");
  } else {
    console.log(`✅ CORS: Allowed origins: ${ALLOWED_ORIGINS.join(", ")}`);
  }

  return cors(corsOptionsDelegate);
}
