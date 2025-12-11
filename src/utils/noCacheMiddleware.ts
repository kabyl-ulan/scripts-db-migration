import { NextFunction, Request, Response } from "express";

/**
 * Middleware to disable caching for API responses
 *
 * Implements HTTP caching headers according to RFC 9111 (HTTP Caching)
 * and OWASP security best practices for sensitive API endpoints.
 *
 * Headers explanation:
 * - Cache-Control: Controls caching behavior in browsers and proxies
 *   - no-store: Prevents any caching of the response
 *   - no-cache: Requires validation before using cached response
 *   - must-revalidate: Cache must verify with origin server when stale
 *   - private: Response is user-specific, not for shared caches
 * - Pragma: Legacy HTTP/1.0 header for backwards compatibility
 * - Expires: HTTP/1.0 date header set to past date (prevents caching)
 *
 * @see https://tools.ietf.org/html/rfc9111 (HTTP Caching)
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
 */
const noCacheMiddleware = (_req: Request, res: Response, next: NextFunction): void => {
  // Modern HTTP/1.1+ cache control (RFC 9111)
  // no-store: Most important - prevents storing any part of response
  // no-cache: Forces revalidation even if cached
  // must-revalidate: Strict cache validation requirement
  // private: Response is for single user, not shared caches (CDN/proxies)
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");

  // Legacy HTTP/1.0 support (for very old clients/proxies)
  res.setHeader("Pragma", "no-cache");

  // HTTP/1.0 expiration date set to Unix epoch (prevents caching)
  // Using proper HTTP-date format per RFC 9110
  res.setHeader("Expires", "Thu, 01 Jan 1970 00:00:00 GMT");

  next();
};

export default noCacheMiddleware;
