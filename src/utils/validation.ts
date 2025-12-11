import { ZodType, ZodIssue } from "zod";

export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  issues?: ZodIssue[];
}

export function validate<TInput = any, TOutput = TInput>(
  schema: ZodType<TOutput, any, TInput>,
  payload: unknown
): ValidationResult<TOutput> {
  const result = schema.safeParse(payload as TInput);
  if (result.success) {
    return { isValid: true, data: result.data };
  }
  return { isValid: false, issues: result.error.issues };
}
