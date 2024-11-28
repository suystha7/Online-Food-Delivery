import { body } from "express-validator";

export const bannerCreateValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Banner title is required"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Banner description is required"),
    body("alt")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Banner image alt text is required"),
  ];
};

export const bannerUpdateValidator = () => {
  return [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Banner title is required"),
    body("description")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Banner description is required"),
    body("alt")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Banner image alt text is required"),
  ];
};
