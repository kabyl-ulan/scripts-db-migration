import axios from "axios";

import { ENV } from "../config/env";

/**
 * Проверяет reCAPTCHA v2/v3 через Google API
 * @param responseToken - токен с клиента (g-recaptcha-response)
 * @param remoteIp - IP пользователя (необязательно)
 * @returns true, если проверка успешна, иначе false
 */
export async function verifyRecaptcha(
  responseToken: string,
  data?: {
    key?: string;
    ip?: string;
  }
): Promise<boolean> {
  const isCheck = ENV.RECAPTCHA_CHECK;
  try {
    if (!isCheck) {
      return true;
    }
    const secretKey = data?.key || ENV.RECAPTCHA_SECRET;
    const url = `https://www.google.com/recaptcha/api/siteverify`;
    const params = new URLSearchParams();
    params.append("secret", secretKey);
    params.append("response", responseToken);
    if (data?.ip) params.append("remoteip", data.ip);
    const { data: result } = await axios.post(url, params);
    return !!result.success;
  } catch (error: any) {
    console.error("❌ verifyRecaptcha error:", error.message);
    throw new Error(error);
  }
}
