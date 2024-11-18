import { body } from "express-validator";
import { mongoIdBodyValidator } from "./mongodb.validators";

export const foodCreateValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Food name is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Food description is required"),
    body("price")
      .trim()
      .notEmpty()
      .withMessage("Food price is required")
      .isNumeric()
      .withMessage("Food price must be number")
      .custom((value) => value > 0)
      .withMessage("Food price must be positive number"),
    body("stock")
      .trim()
      .notEmpty()
      .withMessage("Food stock is required")
      .isNumeric()
      .withMessage("Food stock must be number")
      .custom((value) => value >= 0)
      .withMessage("Food stock must be positive number"),
    ...mongoIdBodyValidator("category"),
  ];
};

export const foodUpdateValidator = () => {
  return [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Food name is required"),
    body("description")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Food description is required"),
    body("price")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Food price is required")
      .isNumeric()
      .withMessage("Food price must be number")
      .custom((value) => value > 0)
      .withMessage("Food price must be positive number"),
    body("stock")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Food stock is required")
      .isNumeric()
      .withMessage("Food stock must be number")
      .custom((value) => value >= 0)
      .withMessage("Food stock must be positive number"),
    body("cateogry")
      .optional()
      .notEmpty()
      .withMessage(`Category is required`)
      .isMongoId()
      .withMessage(`Invalid category`),
  ];
};
