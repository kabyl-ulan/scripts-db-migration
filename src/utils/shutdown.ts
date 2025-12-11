import { Server } from "http";

import pool from "../config/db";

import { getRedisClient } from "./cache";

/**
 * Global flag to prevent multiple shutdown attempts
 */
let isShuttingDown = false;

/**
 * Check if shutdown is in progress
 */
export function getShutdownStatus(): boolean {
  return isShuttingDown;
}

/**
 * Set shutdown status
 */
export function setShutdownStatus(status: boolean): void {
  isShuttingDown = status;
}

/**
 * Graceful shutdown handler
 * Closes all connections in the correct order:
 * 1. HTTP server (stop accepting new requests, wait for existing to finish)
 * 2. Database connections
 * 3. Redis connection
 *
 * @param server - HTTP server instance
 * @param signal - Signal that triggered shutdown (SIGINT, SIGTERM, etc.)
 */
export async function gracefulShutdown(server: Server, signal: string): Promise<void> {
  // Prevent multiple shutdown calls
  if (isShuttingDown) {
    console.log("⚠️  Shutdown already in progress...");
    return;
  }
  isShuttingDown = true;

  console.log(`\n⚠️  Shutting down (${signal})...`);

  // Force exit after 5 seconds if shutdown hangs (shorter for nodemon compatibility)
  const forceExitTimer = setTimeout(() => {
    console.error("❌ Shutdown timeout - forcing exit");
    process.exit(1);
  }, 5000);

  try {
    // Step 1: Wait for server to stop accepting new connections and finish existing requests
    await Promise.race([
      new Promise<void>((resolve, reject) => {
        server.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      }),
      new Promise<void>((_, reject) =>
        setTimeout(() => reject(new Error("Server close timeout")), 3000)
      ),
    ]);
    console.log("✅ HTTP server closed");

    // Step 2: Close database connections (with timeout)
    await Promise.race([
      pool.end(),
      new Promise<void>((_, reject) =>
        setTimeout(() => reject(new Error("Database close timeout")), 2000)
      ),
    ]);
    console.log("✅ Database connections closed");

    // Step 3: Close Redis connection (with timeout)
    const redisClient = getRedisClient();
    if (redisClient) {
      await Promise.race([
        redisClient.quit(),
        new Promise<void>((_, reject) =>
          setTimeout(() => reject(new Error("Redis close timeout")), 1000)
        ),
      ]);
      console.log("✅ Redis connection closed");
    }

    console.log("✅ Graceful shutdown complete");
    clearTimeout(forceExitTimer);
    process.exit(0);
  } catch (error) {
    console.error("❌ Shutdown error:", error);
    clearTimeout(forceExitTimer);
    process.exit(1);
  }
}
