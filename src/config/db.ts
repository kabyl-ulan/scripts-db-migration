import { Pool, QueryResult, QueryResultRow } from "pg";

import { decrypt } from "../utils/crypto";

import { ENV } from "./env";

/**
 * Decrypts and validates database connection string
 * @returns Decrypted connection string
 * @throws Error if decryption fails with helpful message
 */
const getConnectionString = (): string => {
  try {
    const encrypted = ENV.DB.CONNECTION_STRING;

    if (!encrypted) {
      throw new Error("DB_CONNECTION_STRING is not set in environment variables");
    }

    const decrypted = decrypt(encrypted);

    if (!decrypted || typeof decrypted !== "string") {
      throw new Error("Decrypted connection string is invalid");
    }

    // Validate it looks like a PostgreSQL connection string
    if (!decrypted.startsWith("postgres://") && !decrypted.startsWith("postgresql://")) {
      console.warn(
        "⚠️  Warning: DB connection string doesn't start with postgres:// or postgresql://"
      );
    }

    return decrypted;
  } catch (error) {
    console.error("❌ Failed to decrypt DB_CONNECTION_STRING");
    console.error("This usually means:");
    console.error("1. DB_CONNECTION_STRING in .env is not encrypted");
    console.error("2. ENC_KEY_BASE64 or ENC_IV_BASE64 are incorrect");
    console.error("3. DB_CONNECTION_STRING was encrypted with different keys");
    console.error("\nError details:", error instanceof Error ? error.message : error);
    throw error;
  }
};

const pool = new Pool({
  connectionString: getConnectionString(),
});

export const dbQuery = async <T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  try {
    if (ENV.NODE_ENV === "development") {
      console.log("PG query:", { text, params });
    }
    return await pool.query<T>(text, params);
  } catch (error) {
    console.error("❌ PG ERROR =>", error);
    console.log("PG query:", { text, params });
    throw error;
  }
};

export const connectToDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Connected to database");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  }
};
export default pool;
