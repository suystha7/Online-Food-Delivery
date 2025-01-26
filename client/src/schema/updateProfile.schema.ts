import { ALLOWED_IMAGE_FILE_TYPES, MAX_FILE_SIZE } from "@/constants";
import { z } from "zod";

export const updateProfileValidationSchema = z.object({
  fullName: z
    .string()
    .min(1, {
      message: "Fullname is required",
    })
    .min(4, {
      message: "Fullname must be at least 4 characters long",
    }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Invalid email format",
    }),

  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d{10}$/, { message: "Invalid phone number format" }),
  avatar: z
    .custom<FileList>()
    .optional()
    .transform((fileList) => (fileList ? (fileList[0] as File) : undefined))
    .refine(
      (file) => (file ? file.size <= MAX_FILE_SIZE : true),
      "Avatar size should be less than 3 MB"
    )
    .refine(
      (file) => (file ? ALLOWED_IMAGE_FILE_TYPES.includes(file.type) : true),
      "Only file types .jpeg, .jpg, .png are allowed"
    ),
});
