import dotenv from "dotenv";
import { StringValue } from "ms";

import { getEnv } from "../utils/env";

dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3000", 10),

  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "",

  COOKIE_NAME: process.env.COOKIE_NAME || "sid",

  ENC_KEY_BASE64: getEnv("ENC_KEY_BASE64"),
  ENC_IV_BASE64: getEnv("ENC_IV_BASE64"),

  DB: {
    CONNECTION_STRING: getEnv("DB_CONNECTION_STRING"),
  },

  JWT: {
    SECRET: getEnv("JWT_SECRET"),
    EXPIRES_IN: (process.env.JWT_EXPIRES_IN || "10h") as StringValue,
  },

  CACHE: {
    CHECK: process.env.CACHE_CHECK === "true",
    CONNECTION_STRING: process.env.CACHE_CONNECTION_STRING || "",
  },

  EMAIL: {
    SECUIRITY_URL: getEnv("EMAIL_SECUIRITY_URL"),
    TYPE_CONFIRM: getEnv("EMAIL_TYPE_CONFIRM"),
    TYPE_RECOVER: getEnv("EMAIL_TYPE_RECOVER"),
    TYPE_INFO: getEnv("EMAIL_TYPE_INFO"),
  },

  RECAPTCHA_CHECK: getEnv("RECAPTCHA_CHECK") === "true",
  RECAPTCHA_SECRET: getEnv("RECAPTCHA_SECRET"),

  FILE_AVATAR_PATH: getEnv("FILE_AVATAR_PATH"),
  FILE_DOCUMENT_PATH: getEnv("FILE_DOCUMENT_PATH"),
};
