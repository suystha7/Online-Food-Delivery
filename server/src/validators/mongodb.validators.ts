import { body, param } from "express-validator";

export const mongoIdParamValidator = (idName: string) => {
  return [
    param(idName)
      .notEmpty()
      .withMessage(`${idName} is required`)
      .isMongoId()
      .withMessage(`Invalid ${idName}`),
  ];
};

export const mongoIdBodyValidator = (idName: string) => {
  return [
    body(idName)
      .notEmpty()
      .withMessage(`${idName} is required`)
      .isMongoId()
      .withMessage(`Invalid ${idName}`),
  ];
};
