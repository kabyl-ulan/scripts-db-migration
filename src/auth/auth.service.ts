import { Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";

import { md5 } from "../utils/crypto";
import { HttpError } from "../utils/httpError";
import { signToken, verifyToken } from "../utils/jwt";
import { Check, Delete, Login } from "../utils/session";

import { AuthRepository } from "./auth.repository";
import { IAuthState, IUserLoginParams } from "./types";

export class AuthService {
  private authRepository = new AuthRepository();

  async generateAuthToken(user: IAuthState) {
    const token = signToken({
      ...user,
    });

    return { authState: user, token, tokenType: "Bearer" };
  }

  async getUserByPinPassword(data: IUserLoginParams) {
    const { login, password, role } = data;
    const hashPassword = md5(password);
    return await this.authRepository.findUserByPinPasswordAuth({
      login,
      hashPassword,
      id_role: role,
    });
  }

  async userLogin(req: Request, res: Response, login: string, authState: IAuthState) {
    try {
      const result = await this.generateAuthToken(authState);

      const logged = await Login(
        req,
        res,
        authState.role,
        login,
        result.authState.id,
        result.token
      );
      if (logged) {
        return result;
      }
      return null;
    } catch (error: unknown) {
      console.error("❌ AuthService.userLogin error:", (error as Error).message);
      throw error;
    }
  }

  async userCheck(req: Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpError("token.token_required", 401);
    }
    const token = authHeader.split(" ")[1];
    try {
      const authState = verifyToken(token);
      const check = await Check(token, authState.role);
      if (check) {
        return { authState, token, tokenType: "Bearer" };
      }
      return null;
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        throw new HttpError("token.expired", 401);
      }
      console.error("❌ AuthService.userLogin error:", (error as Error).message);
      throw error;
    }
  }

  async authInfo(authState: IAuthState, baseUrl: string) {
    try {
      const authInfo = await this.authRepository.findUserAuthInfo(authState);
      if (authInfo) {
        const { file_name } = authInfo;
        authInfo.file_name = file_name
          ? baseUrl + `/api/settings/avatar/${authInfo.file_name}`
          : null;
        return authInfo;
      }
      return null;
    } catch (error: unknown) {
      console.error("❌ AuthService.authInfo error:", (error as Error).message);
      throw error;
    }
  }

  async userLogout(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return false;
      }
      const token = authHeader.split(" ")[1];

      return Delete(res, token);
    } catch (error: unknown) {
      console.error("❌ AuthService.userLogout error:", (error as Error).message);
      throw error;
    }
  }
}
