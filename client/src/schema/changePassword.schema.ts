import { z } from "zod";

export const changePasswordValidationSchema = z.object({
  oldPassword: z.string().min(1, {
    message: "Old password is required",
  }),
  newPassword: z
    .string()
    .min(1, {
      message: "New Password is required",
    })
    .min(8, { message: "Password must have at least 8 characters" })
    .max(20, { message: "Password must have at most 20 characters" }),
});
