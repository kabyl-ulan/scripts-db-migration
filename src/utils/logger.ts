/**
 * Logger utility for the accelerator backend
 * Provides consistent logging across the application
 */

const LOG_LEVELS = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
  DEBUG: "DEBUG",
} as const;

type LogLevel = (typeof LOG_LEVELS)[keyof typeof LOG_LEVELS];

const COLORS = {
  ERROR: "\x1b[31m", // Red
  WARN: "\x1b[33m", // Yellow
  INFO: "\x1b[36m", // Cyan
  DEBUG: "\x1b[35m", // Magenta
  RESET: "\x1b[0m",
} as const;

interface LogMetadata {
  [key: string]: any;
}

/**
 * Helper function to safely extract error message from unknown type
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return String(error);
}

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === "development";
  }

  formatMessage(level: LogLevel, message: any, meta: LogMetadata = {}): string {
    const timestamp = new Date().toISOString();
    const pid = process.pid;
    const color = COLORS[level] || "";
    const reset = COLORS.RESET;

    // Normalize meta parameter - ensure it's always a valid object
    let normalizedMeta: LogMetadata = {};
    try {
      if (meta && typeof meta === "object" && !Array.isArray(meta)) {
        normalizedMeta = { ...meta };
      }
    } catch {
      // If spread fails, start fresh
      normalizedMeta = {};
    }

    // Handle case where message is undefined or null
    if (message === undefined || message === null) {
      message = String(message); // Convert to 'undefined' or 'null' string
    }

    // Handle case where message is an object (common mistake)
    let messageStr = message;
    if (typeof message === "object") {
      // If it's an Error object, extract message and stack
      if (message instanceof Error) {
        messageStr = message.message || "Error";
        try {
          normalizedMeta = {
            ...normalizedMeta,
            stack: message.stack,
            name: message.name,
            ...((message as any).code && { code: (message as any).code }),
          };
        } catch {
          // If spreading error properties fails, add them manually
          if (message.stack) normalizedMeta.stack = message.stack;
          normalizedMeta.errorName = message.name;
        }
      } else if (Array.isArray(message)) {
        // Handle arrays
        messageStr = "";
        normalizedMeta.array = message;
      } else {
        // For plain objects, move to metadata
        messageStr = "";
        try {
          normalizedMeta = { ...message, ...normalizedMeta };
        } catch {
          // If object spreading fails, try to extract safe properties
          normalizedMeta.objectData = "[Could not extract object data]";
        }
      }
    } else if (typeof message === "function") {
      messageStr = "[Function]";
    } else if (typeof message === "symbol") {
      messageStr = message.toString();
    } else {
      // Ensure it's a string
      messageStr = String(message);
    }

    let formattedMessage = `${color}[${timestamp}] [${level}] [PID:${pid}]${reset}`;

    if (messageStr) {
      formattedMessage += ` ${messageStr}`;
    }

    // Safely check if normalizedMeta has keys
    try {
      if (
        normalizedMeta &&
        typeof normalizedMeta === "object" &&
        Object.keys(normalizedMeta).length > 0
      ) {
        try {
          // Use JSON.stringify with circular reference handler
          const metaStr = JSON.stringify(normalizedMeta, this.getCircularReplacer());
          formattedMessage += ` ${metaStr}`;
        } catch (err) {
          formattedMessage += ` [Unable to stringify metadata: ${getErrorMessage(err)}]`;
        }
      }
    } catch (err) {
      formattedMessage += ` [Metadata processing error: ${getErrorMessage(err)}]`;
    }

    return formattedMessage;
  }

  // Helper to handle circular references in objects
  getCircularReplacer(): (key: string, value: any) => any {
    const seen = new WeakSet();
    return (_key: string, value: any): any => {
      // Handle primitives
      if (value === null) return null;
      if (value === undefined) return undefined;

      // Handle non-object types
      if (typeof value !== "object") {
        // Handle special types
        if (typeof value === "function") return "[Function]";
        if (typeof value === "symbol") return value.toString();
        if (typeof value === "bigint") return value.toString() + "n";
        return value;
      }

      // Handle circular references
      if (seen.has(value)) {
        return "[Circular]";
      }

      // Only track objects that can be in WeakSet (objects and arrays)
      try {
        seen.add(value);
      } catch {
        // Some objects can't be added to WeakSet
        return "[Complex Object]";
      }

      // Handle special object types
      if (value instanceof Error) {
        return {
          name: value.name,
          message: value.message,
          stack: value.stack,
        };
      }

      if (value instanceof Date) {
        return value.toISOString();
      }

      if (value instanceof RegExp) {
        return value.toString();
      }

      if (value instanceof Map) {
        return {
          _type: "Map",
          entries: Array.from(value.entries()),
        };
      }

      if (value instanceof Set) {
        return {
          _type: "Set",
          values: Array.from(value.values()),
        };
      }

      if (Buffer.isBuffer(value)) {
        return {
          _type: "Buffer",
          length: value.length,
          data: value.toString("base64").substring(0, 100) + (value.length > 100 ? "..." : ""),
        };
      }

      return value;
    };
  }

  // Safe wrapper for all log methods
  safeLog(
    level: LogLevel,
    consoleMethod: (...args: any[]) => void,
    message: any,
    meta: LogMetadata = {}
  ): void {
    try {
      const formatted = this.formatMessage(level, message, meta);
      consoleMethod(formatted);
    } catch (error) {
      // Last resort fallback - log directly to console
      try {
        const timestamp = new Date().toISOString();
        consoleMethod(
          `[${timestamp}] [${level}] [LOGGER ERROR] Failed to format log message:`,
          getErrorMessage(error)
        );
        consoleMethod("Original message:", message);
      } catch {
        // Absolutely last resort
        consoleMethod("[CRITICAL] Logger completely failed");
      }
    }
  }

  log(message: any, meta: LogMetadata = {}): void {
    this.safeLog(LOG_LEVELS.INFO, console.log, message, meta);
  }

  info(message: any, meta: LogMetadata = {}): void {
    this.safeLog(LOG_LEVELS.INFO, console.log, message, meta);
  }

  error(message: any, meta: LogMetadata = {}): void {
    this.safeLog(LOG_LEVELS.ERROR, console.error, message, meta);
  }

  warn(message: any, meta: LogMetadata = {}): void {
    this.safeLog(LOG_LEVELS.WARN, console.warn, message, meta);
  }

  debug(message: any, meta: LogMetadata = {}): void {
    if (this.isDevelopment) {
      this.safeLog(LOG_LEVELS.DEBUG, console.log, message, meta);
    }
  }
}

// Create singleton instance
const logger = new Logger();

export default logger;
