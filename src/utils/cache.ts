import { createClient, RedisClientType } from "redis";

import { ENV } from "../config/env";

import { decrypt } from "./crypto";

const isCheck = ENV.CACHE.CHECK;
const NODE_ENV = ENV.NODE_ENV;

/**
 * Decrypts Redis connection string (only if cache is enabled)
 * @returns Decrypted connection URL or empty string if cache disabled
 */
const getRedisConnectionURL = (): string => {
  // If cache is disabled, return empty string (won't be used)
  if (!isCheck) {
    return "";
  }

  try {
    const encrypted = ENV.CACHE.CONNECTION_STRING;

    if (!encrypted) {
      console.warn("⚠️  CACHE_CONNECTION_STRING is not set, but CACHE_CHECK=true");
      return "";
    }

    const decrypted = decrypt(encrypted);

    if (!decrypted || typeof decrypted !== "string") {
      throw new Error("Decrypted Redis connection string is invalid");
    }

    // Validate it looks like a Redis connection string
    if (!decrypted.startsWith("redis://") && !decrypted.startsWith("rediss://")) {
      console.warn("⚠️  Warning: Redis connection string doesn't start with redis:// or rediss://");
    }

    return decrypted;
  } catch (error) {
    console.error("❌ Failed to decrypt CACHE_CONNECTION_STRING");
    console.error("This usually means:");
    console.error("1. CACHE_CONNECTION_STRING in .env is not encrypted");
    console.error("2. ENC_KEY_BASE64 or ENC_IV_BASE64 are incorrect");
    console.error("3. CACHE_CONNECTION_STRING was encrypted with different keys");
    console.error("\nError details:", error instanceof Error ? error.message : error);
    throw error;
  }
};

const connectionURL = getRedisConnectionURL();

let redisClient: RedisClientType;

/**
 * Get Redis client instance
 * Returns undefined if Redis is not enabled or not connected
 */
export const getRedisClient = (): RedisClientType | undefined => {
  return isCheck ? redisClient : undefined;
};

export const connectToRedis = async () => {
  try {
    if (isCheck) {
      redisClient = createClient({
        url: connectionURL,
      });

      redisClient.on("error", (error) => {
        console.error(`❌ redisClient on Error: ${error}`);
      });

      await redisClient.connect();
      console.log("✅ Connected to redis");
    }
  } catch (error) {
    console.error(`❌ Failed to connect to redis: ${error}`);
  }
};

async function get(key: string): Promise<any> {
  try {
    if (!isCheck) return null;
    const result = await redisClient.get(key);
    if (NODE_ENV === "development") {
      console.log("CACHE query: ", { key, method: "get" });
    }
    if (result) return JSON.parse(result);
    return null;
  } catch (err) {
    console.error("❌ CACHE ERROR=>", err);
    console.error("❌ CACHE query: ", { key, method: "get" });
    return null;
  }
}

async function set(key: string, value: any, expireSeconds?: number): Promise<boolean> {
  try {
    if (!isCheck) return false;
    await redisClient.set(key, JSON.stringify(value), {
      EX: expireSeconds || 900,
      NX: true,
    });
    if (NODE_ENV === "development") {
      console.log("CACHE query: ", { key, method: "set" });
    }
    return true;
  } catch (err) {
    console.error("❌ CACHE ERROR=>", err);
    console.error("❌ CACHE query: ", { key, method: "set" });
    return false;
  }
}

async function del(key: string): Promise<boolean> {
  try {
    if (!isCheck) return false;
    await redisClient.del(key);
    if (NODE_ENV === "development") {
      console.log("CACHE query: ", { key, method: "del" });
    }
    return true;
  } catch (err) {
    console.error("❌ CACHE ERROR=>", err);
    console.error("❌ CACHE query: ", { key, method: "del" });
    return false;
  }
}

/**
 * Get all keys matching a pattern
 *
 * WARNING: Uses KEYS command which blocks Redis!
 * TODO: Replace with SCAN for production use.
 * SCAN implementation requires proper cursor handling based on your Redis client version.
 *
 * @param pattern - Pattern to match (e.g., "user:*")
 * @returns Array of matching keys
 */
async function keys(pattern: string = "*"): Promise<string[]> {
  try {
    if (!isCheck) return [];

    // WARNING: KEYS blocks Redis. Consider replacing with SCAN in production.
    // Example SCAN implementation (adjust types based on your redis client):
    // const found: string[] = [];
    // let cursor = 0;
    // do {
    //   const result = await redisClient.scan(cursor, { MATCH: pattern, COUNT: 100 });
    //   cursor = result.cursor;
    //   found.push(...result.keys);
    // } while (cursor !== 0);

    const keys = await redisClient.keys(pattern);

    if (NODE_ENV === "development") {
      console.log("CACHE query: ", { pattern, method: "keys", count: keys.length });
      if (keys.length > 1000) {
        console.warn("⚠️  Large number of keys! Consider using SCAN instead of KEYS");
      }
    }
    return keys;
  } catch (err) {
    console.error("❌ CACHE ERROR=>", err);
    return [];
  }
}

/**
 * Delete all keys matching a pattern
 *
 * WARNING: Uses keys() function which internally uses KEYS command (blocking).
 * For large datasets, consider implementing SCAN-based deletion.
 *
 * @param pattern - Pattern to match (e.g., "user:*")
 * @returns Number of keys deleted
 */
async function deletePattern(pattern: string): Promise<number> {
  try {
    if (!isCheck) return 0;

    const keysToDelete = await keys(pattern);
    if (keysToDelete.length === 0) return 0;

    const result = await redisClient.del(keysToDelete);
    if (NODE_ENV === "development") {
      console.log("CACHE query: ", { pattern, method: "deletePattern", deleted: result });
    }
    return result;
  } catch (err) {
    console.error("❌ CACHE ERROR=>", err);
    return 0;
  }
}

/**
 * Clear all cache (use with caution!)
 * @returns true if successful
 */
async function flushAll(): Promise<boolean> {
  try {
    if (!isCheck) return false;
    await redisClient.flushAll();
    if (NODE_ENV === "development") {
      console.log("CACHE query: ", { method: "flushAll" });
    }
    return true;
  } catch (err) {
    console.error("❌ CACHE ERROR=>", err);
    return false;
  }
}

/**
 * Get TTL (time to live) for a key in seconds
 * @param key - Key to check
 * @returns TTL in seconds, -1 if no expiry, -2 if key doesn't exist
 */
async function ttl(key: string): Promise<number> {
  try {
    if (!isCheck) return -2;
    const result = await redisClient.ttl(key);
    if (NODE_ENV === "development") {
      console.log("CACHE query: ", { key, method: "ttl", result });
    }
    return result;
  } catch (err) {
    console.error("❌ CACHE ERROR=>", err);
    return -2;
  }
}

/**
 * Check if key exists
 * @param key - Key to check
 * @returns true if exists, false otherwise
 */
async function exists(key: string): Promise<boolean> {
  try {
    if (!isCheck) return false;
    const result = await redisClient.exists(key);
    return result === 1;
  } catch (err) {
    console.error("❌ CACHE ERROR=>", err);
    return false;
  }
}

/**
 * Get cache statistics
 * @returns Object with cache info
 */
async function getStats(): Promise<{
  totalKeys: number;
  memoryUsed: string;
  uptime: number;
  connected: boolean;
}> {
  try {
    if (!isCheck || !redisClient) {
      return { totalKeys: 0, memoryUsed: "0", uptime: 0, connected: false };
    }

    const info = await redisClient.info("memory");
    const dbSize = await redisClient.dbSize();
    const serverInfo = await redisClient.info("server");

    const memoryMatch = info.match(/used_memory_human:(.+)/);
    const uptimeMatch = serverInfo.match(/uptime_in_seconds:(\d+)/);

    return {
      totalKeys: dbSize,
      memoryUsed: memoryMatch ? memoryMatch[1].trim() : "unknown",
      uptime: uptimeMatch ? parseInt(uptimeMatch[1]) : 0,
      connected: redisClient.isOpen,
    };
  } catch (err) {
    console.error("❌ CACHE ERROR=>", err);
    return { totalKeys: 0, memoryUsed: "0", uptime: 0, connected: false };
  }
}

const Cache = {
  get,
  set,
  del,
  keys,
  deletePattern,
  flushAll,
  ttl,
  exists,
  getStats,
};

export default Cache;
