import { z } from "zod";

export const forgetPasswordValidationSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email address is required",
    })
    .email({
      message: "Email address is invalid",
    })
    .trim(),
});
