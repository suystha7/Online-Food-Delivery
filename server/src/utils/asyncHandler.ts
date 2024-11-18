import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export function asyncHandler<B = any, P = ParamsDictionary, Q = qs.ParsedQs>(
  requestHandlerFn: (
    req: Request<P, any, B, Q>,
    res: Response,
    next: NextFunction
  ) => void
) {
  return (req: Request<P, any, B, Q>, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandlerFn(req, res, next)).catch((error) =>
      next(error)
    );
  };
}
