import { body } from "express-validator";

export const categoryCreateValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Category name is required"),
  ];
};

export const categoryUpdateValidator = () => {
  return [
    body("name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Category name is required"),
  ];
};
