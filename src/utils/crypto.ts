import crypto from "crypto";

import { ENV } from "../config/env";

/**
 * Cryptographic utilities for encryption, decryption, and hashing
 *
 * Security features:
 * - AES-256-CBC encryption (industry standard)
 * - Random IV generation for each encryption (prevents pattern analysis)
 * - SHA-256 hashing (secure alternative to MD5)
 * - Comprehensive error handling
 * - Input validation
 *
 * Standards compliance:
 * - NIST SP 800-38A (Block Cipher Modes)
 * - OWASP Cryptographic Storage Cheat Sheet
 * - FIPS 140-2 approved algorithms
 *
 * @see https://csrc.nist.gov/publications/detail/sp/800-38a/final
 * @see https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html
 */

/**
 * AES-256-CBC algorithm
 * - Key size: 256 bits (32 bytes)
 * - Block size: 128 bits (16 bytes)
 * - IV size: 128 bits (16 bytes)
 */
const ALGORITHM = "aes-256-cbc" as const;
const KEY_LENGTH = 32; // 256 bits
const IV_LENGTH = 16; // 128 bits

/**
 * Encryption key and IV from environment variables
 * Keys should be generated using: crypto.randomBytes(32).toString('base64')
 * IVs should be generated using: crypto.randomBytes(16).toString('base64')
 */
const keyBase64 = ENV.ENC_KEY_BASE64;
const ivBase64 = ENV.ENC_IV_BASE64;

/**
 * Validates and initializes encryption key
 * @throws Error if key is invalid or has wrong length
 */
const getSecurityKey = (): Buffer => {
  if (!keyBase64) {
    throw new Error(
      "ENC_KEY_BASE64 is not set. Generate with: crypto.randomBytes(32).toString('base64')"
    );
  }

  try {
    const key = Buffer.from(keyBase64, "base64");
    if (key.length !== KEY_LENGTH) {
      throw new Error(
        `Invalid encryption key length: ${key.length} bytes (expected ${KEY_LENGTH})`
      );
    }
    return key;
  } catch (error) {
    throw new Error(
      `Failed to parse ENC_KEY_BASE64: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

/**
 * Validates and initializes initialization vector
 * @throws Error if IV is invalid or has wrong length
 */
const getInitVector = (): Buffer => {
  if (!ivBase64) {
    throw new Error(
      "ENC_IV_BASE64 is not set. Generate with: crypto.randomBytes(16).toString('base64')"
    );
  }

  try {
    const iv = Buffer.from(ivBase64, "base64");
    if (iv.length !== IV_LENGTH) {
      throw new Error(`Invalid IV length: ${iv.length} bytes (expected ${IV_LENGTH})`);
    }
    return iv;
  } catch (error) {
    throw new Error(
      `Failed to parse ENC_IV_BASE64: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
};

// Initialize and validate keys on module load
const securityKey = getSecurityKey();
const initVector = getInitVector();

/**
 * Encrypts plaintext using AES-256-CBC with random IV
 *
 * IMPORTANT: This function generates a random IV for each encryption,
 * which is prepended to the ciphertext. This ensures that encrypting
 * the same plaintext twice produces different ciphertexts.
 *
 * Output format: [IV (16 bytes)][Encrypted Data]
 *
 * @param plainText - Text to encrypt
 * @returns Base64-encoded string containing IV + encrypted data
 * @throws Error if encryption fails or input is invalid
 *
 * @example
 * const encrypted = encrypt("sensitive data");
 * const decrypted = decrypt(encrypted); // "sensitive data"
 */
export function encrypt(plainText: string): string {
  if (!plainText) {
    throw new Error("Cannot encrypt empty string");
  }

  try {
    // Generate random IV for each encryption (best practice)
    const randomIV = crypto.randomBytes(IV_LENGTH);

    // Create cipher with random IV
    const cipher = crypto.createCipheriv(ALGORITHM, securityKey, randomIV);

    // Encrypt the data
    const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);

    // Prepend IV to encrypted data (IV doesn't need to be secret)
    const result = Buffer.concat([randomIV, encrypted]);

    return result.toString("base64");
  } catch (error) {
    throw new Error(
      `Encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Checks if a string contains only printable ASCII/UTF-8 characters
 * Used to validate decryption results
 */
const isPrintableString = (str: string): boolean => {
  // Allow common printable characters including connection strings
  // Allow alphanumeric, punctuation, whitespace, and common URL characters
  return /^[\x20-\x7E\s\u0080-\uFFFF]*$/.test(str);
};

/**
 * Decrypts ciphertext (auto-detects format)
 *
 * Supports two formats:
 * 1. New format: [IV (16 bytes)][Encrypted Data] - with random IV
 * 2. Legacy format: [Encrypted Data] - with static IV
 *
 * The function automatically detects which format is used by attempting
 * to decrypt with both methods and validating the result.
 *
 * @param cipherTextBase64 - Base64-encoded encrypted string
 * @returns Decrypted plaintext
 * @throws Error if decryption fails or data is corrupted
 *
 * @example
 * // Works with both new and legacy encrypted data
 * const encrypted = encrypt("sensitive data");
 * const decrypted = decrypt(encrypted); // "sensitive data"
 *
 * const legacyEncrypted = encryptLegacy("old data");
 * const legacyDecrypted = decrypt(legacyEncrypted); // "old data"
 */
export function decrypt(cipherTextBase64: string): string {
  if (!cipherTextBase64) {
    throw new Error("Cannot decrypt empty string");
  }

  const errors: string[] = [];

  try {
    // Decode base64
    const buffer = Buffer.from(cipherTextBase64, "base64");

    // Try legacy format first (more common for existing data)
    try {
      const decipher = crypto.createDecipheriv(ALGORITHM, securityKey, initVector);
      const decrypted = Buffer.concat([decipher.update(buffer), decipher.final()]);
      const result = decrypted.toString("utf8");

      // Validate the result contains printable characters
      if (isPrintableString(result)) {
        return result;
      }
      errors.push("Legacy format: Result contains non-printable characters");
    } catch (error) {
      errors.push(`Legacy format: ${error instanceof Error ? error.message : "Decryption failed"}`);
    }

    // Try new format (with random IV)
    // New format has IV prepended, so minimum length is IV_LENGTH + some encrypted data
    if (buffer.length >= IV_LENGTH + 16) {
      try {
        const iv = buffer.subarray(0, IV_LENGTH);
        const encryptedData = buffer.subarray(IV_LENGTH);

        const decipher = crypto.createDecipheriv(ALGORITHM, securityKey, iv);
        const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
        const result = decrypted.toString("utf8");

        // Validate the result contains printable characters
        if (isPrintableString(result)) {
          return result;
        }
        errors.push("New format: Result contains non-printable characters");
      } catch (error) {
        errors.push(`New format: ${error instanceof Error ? error.message : "Decryption failed"}`);
      }
    } else {
      errors.push(
        `New format: Buffer too short (${buffer.length} bytes, need at least ${IV_LENGTH + 16})`
      );
    }

    // Both methods failed
    throw new Error("Decryption failed with both legacy and new formats.\n" + errors.join("\n"));
  } catch (error) {
    throw new Error(
      `Decryption failed: ${error instanceof Error ? error.message : "Unknown error"}. ` +
        "Data may be corrupted or encrypted with a different key."
    );
  }
}

/**
 * Encrypts plaintext using static IV (for backward compatibility)
 *
 * ⚠️ DEPRECATED: Use encrypt() instead for better security
 *
 * This function uses a static IV, making encryption deterministic.
 * Only use this for compatibility with existing encrypted data.
 *
 * @deprecated Use encrypt() with random IV instead
 * @param plainText - Text to encrypt
 * @returns Base64-encoded encrypted string
 */
export function encryptLegacy(plainText: string): string {
  if (!plainText) {
    throw new Error("Cannot encrypt empty string");
  }

  try {
    const cipher = crypto.createCipheriv(ALGORITHM, securityKey, initVector);
    const encrypted = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
    return encrypted.toString("base64");
  } catch (error) {
    throw new Error(
      `Legacy encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Decrypts ciphertext encrypted with encryptLegacy() (static IV)
 *
 * ⚠️ DEPRECATED: Use decrypt() instead
 *
 * @deprecated Use decrypt() instead
 * @param cipherTextBase64 - Base64-encoded encrypted string
 * @returns Decrypted plaintext
 */
export function decryptLegacy(cipherTextBase64: string): string {
  if (!cipherTextBase64) {
    throw new Error("Cannot decrypt empty string");
  }

  try {
    const encryptedText = Buffer.from(cipherTextBase64, "base64");
    const decipher = crypto.createDecipheriv(ALGORITHM, securityKey, initVector);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return decrypted.toString("utf8");
  } catch (error) {
    throw new Error(
      `Legacy decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generates SHA-256 hash of input string
 *
 * SHA-256 is cryptographically secure (unlike MD5/SHA-1)
 * Suitable for:
 * - File integrity checking
 * - Digital signatures
 * - Password hashing (with salt and iterations)
 *
 * NOT suitable for:
 * - Password storage alone (use bcrypt/argon2 instead)
 *
 * @param value - String to hash
 * @returns Hex-encoded hash (64 characters)
 *
 * @example
 * sha256("hello world") // "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
 */
export function sha256(value: string): string {
  if (value === undefined || value === null) {
    throw new Error("Cannot hash undefined or null value");
  }

  try {
    return crypto.createHash("sha256").update(value, "utf8").digest("hex");
  } catch (error) {
    throw new Error(
      `SHA-256 hashing failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generates MD5 hash of input string
 *
 * ⚠️ DEPRECATED: MD5 is cryptographically broken
 * Use sha256() instead for new code
 *
 * Only use MD5 for:
 * - Legacy compatibility
 * - Non-security checksums
 * - ETags for caching
 *
 * NEVER use for:
 * - Password hashing
 * - Digital signatures
 * - Security-critical operations
 *
 * @deprecated Use sha256() instead
 * @param value - String to hash
 * @returns Hex-encoded hash (32 characters)
 */
export function md5(value: string): string {
  if (value === undefined || value === null) {
    throw new Error("Cannot hash undefined or null value");
  }

  try {
    return crypto.createHash("md5").update(value, "utf8").digest("hex");
  } catch (error) {
    throw new Error(
      `MD5 hashing failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Generates cryptographically secure random bytes
 *
 * @param length - Number of bytes to generate
 * @returns Base64-encoded random bytes
 *
 * @example
 * // Generate encryption key
 * const key = randomBytes(32); // 256-bit key
 *
 * // Generate IV
 * const iv = randomBytes(16); // 128-bit IV
 *
 * // Generate secure token
 * const token = randomBytes(32);
 */
export function randomBytes(length: number): string {
  if (length <= 0) {
    throw new Error("Length must be positive");
  }

  try {
    return crypto.randomBytes(length).toString("base64");
  } catch (error) {
    throw new Error(
      `Random bytes generation failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Default export for backward compatibility
 */
export default {
  encrypt,
  decrypt,
  encryptLegacy,
  decryptLegacy,
  sha256,
  md5,
  randomBytes,
};
