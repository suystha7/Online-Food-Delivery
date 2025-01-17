import { z } from "zod";
import { signupValidationSchema } from "./schema/signup.schema";
import { signinValidationSchema } from "./schema/signin.schema";
import { categoryCreateValidationSchema } from "./schema/categoryCreate.schema";
import { foodCreateValidationSchema } from "./schema/foodCreate.schema";
import { selectOptionSchema } from "./schema/selectOption.schema";
import { forgetPasswordValidationSchema } from "./schema/forgetPassword.schema";

export enum ROUTE_PATHS {
  home = "/",
  signup = "/signup",
  signin = "/signin",
  cart = "/cart",
  category = "/admin/category",
  food = "/admin/food",
  adminOrder = "/admin/order",
}

export enum BUTTON_TYPES {
  primaryButton,
  secondaryButton,
  default,
}

export const MAX_FILE_SIZE = 3 * 1024 * 1024;

export const ALLOWED_IMAGE_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export type SignupFormFields = z.infer<typeof signupValidationSchema>;

export type SigninFormFields = z.infer<typeof signinValidationSchema>;

export type ForgetPassFields = z.infer<typeof forgetPasswordValidationSchema>;

export type SelectOptionType<T> = z.infer<
  ReturnType<typeof selectOptionSchema<T>>
>;

export type CategoryCreateFormFields = z.infer<
  typeof categoryCreateValidationSchema
>;

export type FoodCreateFormFields = z.infer<typeof foodCreateValidationSchema>;
