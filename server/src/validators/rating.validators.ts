import { body } from "express-validator";

export const ratingCreateValidator = () => {
  return [
    body("rating")
      .trim()
      .notEmpty()
      .withMessage("Rating is required")
      .isIn([0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5])
      .withMessage("Invalid rating"),
  ];
};
