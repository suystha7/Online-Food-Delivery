import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";
import logger from "../loggers/winstson.loggers";

const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ApiError;

  if (!(err instanceof ApiError)) {
    const statusCode = err instanceof mongoose.Error ? 400 : 500;
    const message = err.message || "Something went wrong";
    error = new ApiError(statusCode, message);
  } else {
    error = new ApiError(err.statusCode, err.message, err.errors);
  }

  logger.error(error.message.trim());

  res.status(error.statusCode).json(error);
};

export default errorHandler;
