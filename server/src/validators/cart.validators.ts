import { body } from "express-validator";

export const cartItemQuanitiyAddOrUpdateValidator = () => {
  return [
    body("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ];
};
