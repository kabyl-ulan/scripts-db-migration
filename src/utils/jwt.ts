import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

import { ENV } from "../config/env";

import crypto from "./crypto";

export const signToken = (data: object): string => {
  const payload = { data: crypto.encrypt(JSON.stringify(data)) };
  const options: SignOptions = {
    expiresIn: ENV.JWT.EXPIRES_IN,
  };
  return jwt.sign(payload, ENV.JWT.SECRET, options);
};

export const verifyToken = <T = any>(token: string): T => {
  const decoded = jwt.verify(token, ENV.JWT.SECRET) as JwtPayload & {
    data: string;
  };
  if (!decoded.data) throw new Error("Invalid token payload");
  return JSON.parse(crypto.decrypt(decoded.data)) as T;
};
