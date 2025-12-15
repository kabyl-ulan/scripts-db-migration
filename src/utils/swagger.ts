import { Router, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "../config/swagger";

const router = Router();

const swaggerUiOptions = {
  explorer: true,
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "App API Documentation",
  customfavIcon: "/favicon.ico",
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    tryItOutEnabled: true,
    parameters: {
      lang: "ru",
    },
  },
};

// Middleware to disable caching for Swagger docs
const noCacheMiddleware = (_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
};

router.use(
  "/api-docs",
  noCacheMiddleware,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default router;
