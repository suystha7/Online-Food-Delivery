import { ALLOWED_IMAGE_FILE_TYPES, MAX_FILE_SIZE } from "@/constants";
import { z } from "zod";

export const categoryCreateValidationSchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  mainImage: z
    .custom<FileList>()
    .refine((fileList) => fileList.length === 1, "Category image is required")
    .transform((fileList) => fileList[0] as File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Category image size should be less than 3MB"
    )
    .refine(
      (file) => ALLOWED_IMAGE_FILE_TYPES.includes(file.type),
      "Only allowed image file types are .jpeg, .jpg, .png, .webp"
    ),
});
