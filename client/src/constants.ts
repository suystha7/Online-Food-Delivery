import { z } from "zod";
import { signupValidationSchema } from "./schema/signup.schema";
import { signinValidationSchema } from "./schema/signin.schema";
import { categoryCreateValidationSchema, categoryUpdateValidationSchema } from "./schema/categoryCreate.schema";
import { foodCreateValidationSchema } from "./schema/foodCreate.schema";
import { selectOptionSchema } from "./schema/selectOption.schema";
import { shippingValidationSchema } from "./schema/shipping.schema";
import { updateProfileValidationSchema } from "./schema/updateProfile.schema";
import { changePasswordValidationSchema } from "./schema/changePassword.schema";
import { resetPasswordValidationSchema } from "./schema/resetForgottenPassword.schema";
import { forgotPasswordValidationSchema } from "./schema/forgetPassword.schema";

export enum ROUTE_PATHS {
  home = "/",
  signup = "/signup",
  signin = "/signin",
  cart = "/cart",
  shipping = "/shipping-details",
  orderReview = "/order-review",
  payment = "/payment",
  orderSuccess = "/order-success",
  myOrders = "/my-orders",
  category = "/admin/category",
  food = "/admin/food",
  adminOrder = "/admin/order",
}

export interface INavItemOptions {
  id: number | string;
  text: string;
  navigateTo: string;
}

export enum BUTTON_TYPES {
  primaryButton,
  secondaryButton,
  redButton,
  default,
}

export const MAX_FILE_SIZE = 3 * 1024 * 1024;

export const DELIVERY_CHARGES = 75;

export const ALLOWED_IMAGE_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg",
];

export type SignupFormFields = z.infer<typeof signupValidationSchema>;

export type SigninFormFields = z.infer<typeof signinValidationSchema>;

export type UpdateProfileFormFields = z.infer<
  typeof updateProfileValidationSchema
>;

export type ChangePasswordFormFields = z.infer<
  typeof changePasswordValidationSchema
>;

export type ForgotPasswordFormFields = z.infer<
  typeof forgotPasswordValidationSchema
>;

export type ResetPasswordFormFields = z.infer<
  typeof resetPasswordValidationSchema
>;

export type SelectOptionType<T> = z.infer<
  ReturnType<typeof selectOptionSchema<T>>
>;

export type CategoryCreateFormFields = z.infer<
  typeof categoryCreateValidationSchema
>;

export type CategoryUpdateFormFields = z.infer<
  typeof categoryUpdateValidationSchema
>;

export type FoodCreateFormFields = z.infer<typeof foodCreateValidationSchema>;

export type ShippingFormFields = z.infer<typeof shippingValidationSchema>;
