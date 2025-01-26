import { ALLOWED_IMAGE_FILE_TYPES, MAX_FILE_SIZE } from "@/constants";
import { optional, z } from "zod";
import { selectOptionSchema } from "./selectOption.schema";

export const foodCreateValidationSchema = z.object({
  name: z.string().min(1, { message: "Food name is required" }),

  category: selectOptionSchema<string>()
    .nullable()
    .refine((value) => Boolean(value), {
      message: "Food category is required",
    }),

  description: z.string().min(1, { message: "Food description is required" }),

  price: z
    .string()
    .min(1, {
      message: "Food price is required",
    })
    .refine((val) => parseInt(val) > 0, {
      message: "Food price must be positive number",
    }),

  stock: z
    .string()
    .min(1, {
      message: "Food price is required",
    })
    .refine((val) => parseInt(val) > 0, {
      message: "Food price must be positive number",
    }),

  discount: z
    .string()
    .optional()
    .refine((val) => (val ? parseInt(val) >= 0 : true), {
      message: "Food discount must be positive number",
    }),

  mainImage: z
    .custom<FileList>()
    .refine((fileList) => fileList.length === 1, "Food main image is required")
    .transform((fileList) => fileList[0] as File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Food image size should be less than 3MB"
    )
    .refine((file) => ALLOWED_IMAGE_FILE_TYPES.includes(file.type), {
      message: "Only allowed image file types are .jpeg, .jpg, .png, .webp",
    }),

  subImages: z
    .custom<FileList>()
    .optional()
    .refine((fileList) => (fileList ? fileList.length <= 4 : true), {
      message: "Food sub images cannot be more than 4",
    })
    .refine((fileList) => {
      if (fileList) {
        for (let i = 0; i < fileList?.length; i++) {
          if (fileList[i].size > MAX_FILE_SIZE) {
            return false;
          }
        }
      }
      return true;
    }, "Avatar size should be less than 3 MB"),
  // .refine(
  //   (file) => (file ? ALLOWED_IMAGE_FILE_TYPES.includes(file.type) : true),
  //   "Only file types .jpeg, .jpg, .png are allowed"
  // ),
});

export const foodUpdateValidationSchema = z.object({
  name: z.string().optional(),

  category: selectOptionSchema<string>().nullable(),
  description: z.string().optional(),
  price: z
    .string()
    .optional()
    .refine((val) => (val ? parseInt(val) > 0 : true), {
      message: "Food price must be positive number",
    }),
  stock: z
    .string()
    .optional()
    .refine((val) => (val ? parseInt(val) > 0 : true), {
      message: "Food price must be positive number",
    }),
  discount: z
    .string()
    .optional()
    .refine((val) => (val ? parseInt(val) >= 0 : true), {
      message: "Food discount must be positive number",
    }),
  mainImage: z
    .custom<FileList>()
    .optional()
    .transform((fileList) => (fileList ? (fileList[0] as File) : undefined))
    .refine(
      (file) => (file ? file.size <= MAX_FILE_SIZE : true),
      "Food image size should be less than 3MB"
    )
    .refine(
      (file) => (file ? ALLOWED_IMAGE_FILE_TYPES.includes(file.type) : true),
      "Only allowed image file types are .jpeg, .jpg, .png, .webp"
    ),

  subImages: z
    .custom<FileList>()
    .optional()
    .refine((fileList) => (fileList ? fileList.length <= 4 : true), {
      message: "Food sub images cannot be more than 4",
    })
    .refine((fileList) => {
      if (fileList) {
        for (let i = 0; i < fileList?.length; i++) {
          if (fileList[i].size > MAX_FILE_SIZE) {
            return false;
          }
        }
      }
      return true;
    }, "Avatar size should be less than 3 MB"),
  // .refine(
  //   (file) => (file ? ALLOWED_IMAGE_FILE_TYPES.includes(file.type) : true),
  //   "Only file types .jpeg, .jpg, .png are allowed"
  // ),
});
