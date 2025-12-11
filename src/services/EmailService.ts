import axios, { AxiosError } from "axios";

import { ENV } from "../config/env";

/**
 * Email request body interface
 */
interface IEmailRequestBody {
  email: string;
  type: string;
  redirect?: boolean;
  message: string;
  content?: string | null;
}

/**
 * Email send response interface
 */
export interface IEmailSendResponse {
  status: number;
}

/**
 * Send email through external email service
 * @param params - Email parameters
 * @returns Promise with response data or false on error
 */
export async function emailSendService({
  email,
  type,
  redirect = false,
  message,
  content = null,
}: IEmailRequestBody): Promise<IEmailSendResponse | false> {
  try {
    const { data } = await axios.post<IEmailSendResponse>(
      ENV.EMAIL.SECUIRITY_URL,
      {
        email,
        type,
        redirect,
        message,
        content,
      },
      {
        timeout: 15000, // 15 seconds timeout
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("❌ emailSendService error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } else {
      console.error("❌ emailSendService error:", (error as Error).message);
    }
    return false;
  }
}
