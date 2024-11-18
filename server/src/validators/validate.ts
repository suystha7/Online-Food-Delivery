import { Result, validationResult } from "express-validator";
import { RequestHandler } from "express";
import ApiError from "../utils/ApiError";

export const validate: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const extractedErrors = errors.array().map((error) => {
    if (error.type === "field") return { [error.path]: error.msg };
    else return { errorMessage: error.msg };
  });

  throw new ApiError(422, "Received data is invalid", extractedErrors);
};
