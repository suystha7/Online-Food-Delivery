import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  REGEX_PATTERNS,
  TEMPORARY_TOKEN_EXPIRY,
  UserRolesEnum,
  UserRolesType,
} from "../constant";

export interface IImage {
  url: string;
  localPath: string;
}

export interface IUser extends Document {
  // avatar: {
  //   url: string;
  //   localPath: string;
  // };
  _id: string;
  avatar: IImage;
  email: string;
  emailVerificationToken: string;
  emailVerificationExpiry: string;
  forgotPasswordToken: string;
  forgotPasswordExpiry: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  refreshToken: string;
  role: UserRolesType;
}

export const imageSchema = new Schema<IImage>({
  url: { type: String },
  localPath: { type: String },
});

const userSchema = new Schema<IUser>(
  {
    avatar: {
      type: imageSchema,
      default: {
        url: "",
        localPath: "",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    emailVerificationToken: { type: String },
    emailVerificationExpiry: { type: String },
    forgotPasswordToken: { type: String },
    forgotPasswordExpiry: { type: String },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [REGEX_PATTERNS.phoneNumber, "Invalid phone number format"],
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(UserRolesEnum),
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre(
  "save",
  async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
);

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateTemporaryToken = function (): {
  unHashedToken: string;
  hashedToken: string;
  tokenExpiry: number;
} {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + TEMPORARY_TOKEN_EXPIRY;

  return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model<IUser>("User", userSchema);
