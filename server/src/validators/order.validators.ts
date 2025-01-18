import { body } from "express-validator";
import { OrderStatusEnum } from "../constant";

export const orderPlaceValidator = () => {
  return [
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
    body("address").trim().notEmpty().withMessage("Address is required"),
    body("city").optional().trim(),
    body("postalCode")
      .optional()
      .trim()
      .isPostalCode("NP")
      .withMessage("Postal code is not valid for addresses within Nepal"),
    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone("ne-NP")
      .withMessage("Invalid phone number format"),
  ];
};

export const orderStatusValidator = () => {
  return [
    body("status")
      .trim()
      .notEmpty()
      .withMessage("Order status is required")
      .isIn(Object.values(OrderStatusEnum))
      .withMessage("Invalid order status"),
  ];
};
