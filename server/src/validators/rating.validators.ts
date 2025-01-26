import { body } from "express-validator";

export const ratingCreateValidator = () => {
  return [
    body("rating")
      .trim()
      .notEmpty()
      .withMessage("Rating is required")
      .isIn([0, 1, 2, 3, 4, 5])
      .withMessage("Invalid rating"),
  ];
};
