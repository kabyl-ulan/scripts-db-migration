import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import fileUpload from "express-fileupload";

// Config
import { connectToDB } from "./config/db";
import { ENV } from "./config/env";
import translator from "./config/i18n";

// Middleware
import { errorHandler } from "./middleware/errorHandler";
import { loggerMiddleware } from "./middleware/logger";
import { normalizeBodyMiddleware } from "./middleware/normalizeBody";

// Routes
import router from "./routes";

// Utils
import { connectToRedis } from "./utils/cache";
import { corsMiddleware } from "./utils/corsMiddleware";
import { refreshMv } from "./utils/cron/refreshMv";
import handleRedirectIndex from "./utils/handleRedirectIndex";
import noCacheMiddleware from "./utils/noCacheMiddleware";
import { gracefulShutdown, getShutdownStatus, setShutdownStatus } from "./utils/shutdown";
import swaggerRoute from "./utils/swagger";
import { withTimeout } from "./utils/timeout";

// Health checks

const app = express();
const PORT = ENV.PORT;

// Security
app.disable("x-powered-by"); // Hide Express signature
app.set("trust proxy", 1);

// Middleware stack
app.use(corsMiddleware());
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(normalizeBodyMiddleware({ emptyAsNull: true }));
app.use(noCacheMiddleware);
app.use(cookieParser());
app.use(loggerMiddleware);
app.use(translator);

// Routes
app.use("/api", router);
app.use("/swagger", swaggerRoute);
app.use("/edugate", express.static("public"));
app.use("/", handleRedirectIndex);

// Error Handler (must be last)
app.use(errorHandler);

// Server instance (will be set after app.listen)
let server: ReturnType<typeof app.listen> | null = null;

// Register shutdown handlers BEFORE starting the server
// Use void to explicitly ignore the promise (async handlers are not awaited)
process.on("SIGINT", () => {
  void (async () => {
    if (server) {
      await gracefulShutdown(server, "SIGINT");
    } else {
      console.log("\n⚠️  Server not started yet, exiting...");
      process.exit(0);
    }
  })();
});

process.on("SIGTERM", () => {
  void (async () => {
    if (server) {
      await gracefulShutdown(server, "SIGTERM");
    } else {
      console.log("\n⚠️  Server not started yet, exiting...");
      process.exit(0);
    }
  })();
});

process.on("message", (msg: any) => {
  // PM2 может передавать объект или строку
  const isShutdownMessage = msg === "shutdown" || msg?.cmd === "shutdown";
  if (isShutdownMessage && server) {
    void gracefulShutdown(server, "PM2");
  }
});

// Start application
async function start() {
  try {
    // Connect with timeout (10 seconds for each)
    await withTimeout(connectToDB(), 10000, "Database connection timeout");
    await withTimeout(connectToRedis(), 10000, "Redis connection timeout");

    refreshMv();

    server = app.listen(PORT, () => {
      console.log(`🚀 Application listening on port: ${PORT}`);
      if (process.send) process.send("ready");
    });

    // Handle server errors (e.g., port already in use)
    server.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use`);
        console.error(`   Run: lsof -i :${PORT} to see which process is using it`);
        process.exit(1);
      }
      console.error("❌ Server error:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Failed to start:", error);
    process.exit(1);
  }
}

// Global error handlers
process.on("uncaughtException", async (error) => {
  console.error("❌ Uncaught Exception:", error);
  console.error("   Application state may be inconsistent. Attempting graceful shutdown...");

  if (!getShutdownStatus()) {
    setShutdownStatus(true);

    // Force exit after 5 seconds if graceful shutdown hangs
    const forceExitTimer = setTimeout(() => {
      console.error("❌ Graceful shutdown timeout - forcing exit");
      process.exit(1);
    }, 5000);
    forceExitTimer.unref();

    try {
      if (server) {
        await gracefulShutdown(server, "uncaughtException");
      } else {
        process.exit(1);
      }
    } catch (shutdownError) {
      console.error("❌ Graceful shutdown failed:", shutdownError);
      process.exit(1);
    }
  }
});

process.on("unhandledRejection", async (error) => {
  console.error("❌ Unhandled Rejection:", error);
  console.error("   This should be handled with try/catch or .catch()");

  if (!getShutdownStatus()) {
    setShutdownStatus(true);

    // Force exit after 5 seconds if graceful shutdown hangs
    const forceExitTimer = setTimeout(() => {
      console.error("❌ Graceful shutdown timeout - forcing exit");
      process.exit(1);
    }, 5000);
    forceExitTimer.unref();

    try {
      if (server) {
        await gracefulShutdown(server, "unhandledRejection");
      } else {
        process.exit(1);
      }
    } catch (shutdownError) {
      console.error("❌ Graceful shutdown failed:", shutdownError);
      process.exit(1);
    }
  }
});

// Export app for testing
export { app };

// Start server
start();
