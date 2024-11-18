import { param } from "express-validator";

export const mongoIdValidator = (idName: string) => {
  return [
    param(idName)
      .notEmpty()
      .withMessage(`${idName} is required`)
      .isMongoId()
      .withMessage(`Invalid ${idName}`),
  ];
};
