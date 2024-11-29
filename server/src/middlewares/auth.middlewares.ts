import jwt from "jsonwebtoken";
import { IUser, User } from "../models/user.models";
import ApiError from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { IJwtPayload } from "../types";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) throw new ApiError(401, "Unauthorized request");

  try {
    const payload = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY!
    ) as IJwtPayload;

    const user = await User.findById(payload?._id).select(
      "-emailVerificationToken -emailVerificationExpiry -password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Token has been expired");

    req.user = user;

    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Unauthorized request");
  }
});

export const verifyPermission = (roles: Array<string> = []) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user?._id) throw new ApiError(401, "Unauthorized request");

    if (roles.includes(req.user.role)) next();
    else
      throw new ApiError(403, "You are not authorized to access this resource");
  });
