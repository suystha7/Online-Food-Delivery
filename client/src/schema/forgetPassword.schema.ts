import { z } from "zod";

<<<<<<< HEAD
export const forgotPasswordValidationSchema = z.object({
=======
export const forgetPasswordValidationSchema = z.object({
>>>>>>> 174a7dcb8b891ad8f2d006e79549b5fa12dad7aa
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
