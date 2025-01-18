import { z } from "zod";

export const shippingValidationSchema = z.object({
  fullName: z.string().min(1, {
    message: "Fullname is required",
  }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^\d{10}$/, { message: "Invalid phone number format" }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
  city: z.string().optional(),
  postalCode: z.string().optional(),
});
