import fs from "fs";
import path from "path";

import { ENV } from "../config/env";

const isDevelopment = ENV.NODE_ENV === "development";

/**
 * Validates and normalizes file path to prevent path traversal attacks
 *
 * @param filePath - Path to validate
 * @param baseDir - Optional base directory to restrict access
 * @returns Normalized absolute path
 * @throws Error if path is invalid or contains traversal attempts
 *
 * @example
 * const validPath = validatePath("/path/to/file.txt", "/allowed/dir");
 */
export const validatePath = (filePath: string, baseDir?: string): string => {
  if (!filePath || typeof filePath !== "string") {
    throw new Error("Invalid file path: path must be a non-empty string");
  }

  // Normalize path to resolve . and ..
  const normalizedPath = path.normalize(filePath);

  // Convert to absolute path
  const absolutePath = path.isAbsolute(normalizedPath)
    ? normalizedPath
    : path.resolve(process.cwd(), normalizedPath);

  // If baseDir is specified, ensure the path is within it
  if (baseDir) {
    const normalizedBase = path.resolve(baseDir);
    if (!absolutePath.startsWith(normalizedBase + path.sep) && absolutePath !== normalizedBase) {
      throw new Error(
        `Path traversal detected: ${filePath} is outside allowed directory ${baseDir}`
      );
    }
  }

  // Check for suspicious patterns (additional security layer)
  if (normalizedPath.includes("..") || /\0/.test(filePath)) {
    throw new Error(`Suspicious path pattern detected: ${filePath}`);
  }

  return absolutePath;
};

/**
 * Checks if a file or directory exists and is accessible
 * Uses fs.access() which is faster than fs.stat()
 *
 * @param filePath - Path to check
 * @param baseDir - Optional base directory to restrict access (recommended for security)
 * @returns True if file exists and is accessible, false otherwise
 *
 * @example
 * // Without baseDir (less secure)
 * const exists = await File.exists("/path/to/file.txt");
 *
 * // With baseDir (recommended)
 * const exists = await File.exists("avatar.png", "/var/uploads/avatars");
 */
const exists = async (filePath: string, baseDir?: string): Promise<boolean> => {
  try {
    const validPath = validatePath(filePath, baseDir);
    await fs.promises.access(validPath, fs.constants.F_OK);
    return true;
  } catch (error) {
    const err = error as NodeJS.ErrnoException;

    // ENOENT means file doesn't exist (expected behavior)
    if (err.code === "ENOENT") {
      return false;
    }

    // Other errors (permission denied, path validation failed, etc.)
    if (isDevelopment) {
      console.debug(`File.exists error for ${filePath}:`, err.message);
    }

    return false;
  }
};

/**
 * Deletes a file
 *
 * @param filePath - Path to file to delete
 * @param baseDir - Optional base directory to restrict access (recommended for security)
 * @returns True if file was deleted, false if file doesn't exist or deletion failed
 *
 * @example
 * // Without baseDir (less secure)
 * const deleted = await File.deleteFile("/path/to/file.txt");
 *
 * // With baseDir (recommended)
 * const deleted = await File.deleteFile("old_avatar.png", "/var/uploads/avatars");
 */
const deleteFile = async (filePath: string, baseDir?: string): Promise<boolean> => {
  try {
    const validPath = validatePath(filePath, baseDir);

    // Check if file exists first
    const fileExists = await exists(validPath);
    if (!fileExists) {
      if (isDevelopment) {
        console.debug(`File.deleteFile: file does not exist: ${filePath}`);
      }
      return false;
    }

    await fs.promises.unlink(validPath);

    if (isDevelopment) {
      console.log(`✅ File deleted: ${filePath}`);
    }

    return true;
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    console.error(`❌ File.deleteFile error for ${filePath}:`, err.message);

    // Log stack trace only in development
    if (isDevelopment) {
      console.debug(err.stack);
    }

    return false;
  }
};

const File = {
  exists,
  deleteFile,
  validatePath,
};

export default File;
