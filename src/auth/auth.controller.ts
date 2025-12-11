import { NextFunction, Request, RequestHandler, Response } from "express";

import { sendSuccess, sendError } from "../utils/response";
import { validate } from "../utils/validation";

import { loginSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export class AuthController {
  login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { isValid, data, issues } = validate(loginSchema, req.body);
      if (!isValid) {
        const msgKey = issues![0].message;
        return sendError(res, req.t(`auth.${msgKey}` || "inValidFormat"));
      }

      const authState = await authService.getUserByPinPassword(data!);
      if (!authState) {
        return sendError(res, req.t("auth.invalid_credentials"), false, 401);
      }

      const result = await authService.userLogin(req, res, data!.login, authState);
      if (result) {
        return sendSuccess(res, req.t("success"), result);
      }
      return sendError(res, req.t("auth.loginFailed"));
    } catch (error: unknown) {
      console.error("❌ error AuthController login: ", (error as Error).message);
      return next(error);
    }
  };

  checkToken: RequestHandler = async (req: Request, res: Response) => {
    try {
      const result = await authService.userCheck(req);
      if (result) {
        return sendSuccess(res, req.t("success"), result);
      }
      return sendError(res, req.t("token.expired"), false, 401);
    } catch (error: unknown) {
      console.error("❌ error AuthController checkToken: ", (error as Error).message);
      return sendError(res, req.t("token.invalid_token"), false, 401);
    }
  };

  authInfo: RequestHandler = async (req: Request, res: Response) => {
    try {
      const authState = req.user;
      if (!authState) {
        return sendError(res, req.t("token.expired"), false, 401);
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const result = await authService.authInfo(authState, baseUrl);
      if (result) {
        return sendSuccess(res, req.t("success"), result);
      }
      return sendError(res, req.t("token.expired"), false, 401);
    } catch (error: unknown) {
      console.error("❌ error AuthController checkToken: ", (error as Error).message);
      return sendError(res, req.t("token.invalid_token"), false, 401);
    }
  };

  logout: RequestHandler = async (req: Request, res: Response) => {
    try {
      const result = await authService.userLogout(req, res);
      if (result) {
        return sendSuccess(res, req.t("logout.success"));
      }
      return sendError(res, req.t("logout.failed"));
    } catch (error: unknown) {
      console.error("❌ error AuthController checkToken: ", (error as Error).message);
      return sendError(res, req.t("error.unknown"), false, 401);
    }
  };
}
