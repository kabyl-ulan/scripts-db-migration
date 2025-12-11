import { Request, Response, Router } from "express";

// ─────── Module Routers ─────────
import authRouter from "../auth";
import { sendError } from "../utils/response";

const router = Router();

// ─────── API Routes ─────────
router.use("/auth", authRouter);

// ─────── 404 Handler (must be last) ─────────
/**
 * Catch-all handler for undefined routes
 * Returns localized 404 error message
 */
router.use((req: Request, res: Response) => {
  return sendError(res, req.t("error.notFound"), false, 404);
});

export default router;
