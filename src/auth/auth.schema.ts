import { z } from "zod";

import { CODE_FORMAT_REGEX, DATE_DB_FORMAT_REGEX, EMAIL_FORMAT_REGEX } from "../utils/regex";

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
  role: z
    .number({
      required_error: "role_required",
      invalid_type_error: "role_invalid",
    })
    .refine((val) => val === 2 || val === 3 || val === 5 || val === 1, {
      message: "role_invalid",
    }),
});

export const registerSchema = z.object({
  surname: z
    .string({
      required_error: "surname_required",
      invalid_type_error: "surname_required",
    })
    .min(1, { message: "surname_required" }),

  names: z
    .string({
      required_error: "names_required",
      invalid_type_error: "names_required",
    })
    .min(1, { message: "names_required" }),

  patronymic: z.string({ invalid_type_error: "patronymic_invalid" }).nullable().optional(),

  birth_date: z
    .string({
      required_error: "birth_date_required",
      invalid_type_error: "birth_date_invalid",
    })
    .regex(DATE_DB_FORMAT_REGEX, { message: "birth_date_format" }),

  id_gender: z.coerce.number({
    required_error: "id_gender_required",
    invalid_type_error: "id_gender_invalid",
  }),

  passport: z
    .string({
      required_error: "passport_required",
      invalid_type_error: "passport_invalid",
    })
    .min(1, { message: "passport_required" }),

  passport_date: z
    .string({
      required_error: "passport_date_required",
      invalid_type_error: "passport_date_invalid",
    })
    .regex(DATE_DB_FORMAT_REGEX, { message: "passport_date_format" }),

  id_country: z.coerce.number({
    required_error: "id_country_required",
    invalid_type_error: "id_country_invalid",
  }),

  telephone: z.string({
    required_error: "telephone_required",
    invalid_type_error: "telephone_invalid",
  }),

  email: z
    .string({
      required_error: "email_required",
      invalid_type_error: "email_invalid",
    })
    .email({ message: "email_invalid" })
    .regex(EMAIL_FORMAT_REGEX, {
      message: "email_invalid",
    }),

  code: z
    .string({
      required_error: "code_required",
      invalid_type_error: "code_invalid",
    })
    .regex(CODE_FORMAT_REGEX, { message: "code_length" }),

  // password: z
  //   .string({
  //     required_error: "password_required",
  //     invalid_type_error: "password_invalid",
  //   })
  //   .min(6, { message: "password_minLength" })
  //   .max(36, { message: "password_maxLength" }),

  // repeat_password: z
  //   .string({
  //     required_error: "repeat_password_required",
  //     invalid_type_error: "repeat_password_invalid",
  //   })
  //   .min(6, { message: "repeat_password_minLength" })
  //   .max(36, { message: "repeat_password_maxLength" }),

  consent: z.preprocess(
    (val) => {
      if (val === "true") return true;
      if (val === "false") return false;
      return val;
    },
    z.boolean({ required_error: "consent_required", invalid_type_error: "consent_invalid" })
  ),

  token: z.string({ invalid_type_error: "token_invalid" }).nullable().optional(),
});
