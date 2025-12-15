import { z } from "zod";

export const loginSchema = z.object({
  login: z
    .string({
      required_error: "login_required",
      invalid_type_error: "login_required",
    })
    .min(1, { message: "login_required" }),
  password: z
    .string({
      required_error: "password_required",
      invalid_type_error: "password_required",
    })
    .min(1, { message: "password_required" }),
});

export type ILoginInput = z.infer<typeof loginSchema>;
