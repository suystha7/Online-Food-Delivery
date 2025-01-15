import { z } from "zod";

export const signupValidationSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: "Fullname is required" })
      .min(4, {
        message: "Fullname must be at least 4 characters",
      })
      .trim(),
    phoneNumber: z
      .string()
      .min(1, { message: "Phone number is required" })
      .regex(/^\d{10}$/, { message: "Invalid phone number format" }),
    email: z
      .string()
      .min(1, { message: "Email address is required" })
      .email({ message: "Email address is invalid" })
      .trim(),
    password: z
      .string()
      .trim()
      .min(1, {
        message: "Password is required",
      })
      .min(8, { message: "Password must have at least 8 characters" })
      .max(20, { message: "Password must have at most 20 characters" }),
    confirmPassword: z.string().trim().min(1, {
      message: "Confirm password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });
