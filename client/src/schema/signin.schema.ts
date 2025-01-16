import { z } from "zod";

export const signinValidationSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email address is required",
    })
    .email({
      message: "Email address is invalid",
    })
    .trim(),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});
