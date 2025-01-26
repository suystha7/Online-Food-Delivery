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
import { Cart } from "./cart.models";

export interface IImage {
  public_id: string;
  url: string;
}

export interface IUser extends Document {
  _id: string;
  avatar: IImage;
  email: string;
  emailVerificationToken: string;
  emailVerificationExpiry: number;
  forgotPasswordToken: string;
  forgotPasswordExpiry: number;
  fullName: string;
  isEmailVerified: boolean;
  password: string;
  phoneNumber: string;
  refreshToken: string;
  role: UserRolesType;

  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateTemporaryToken: () => {
    unhashedToken: string;
    hashedToken: string;
    tokenExpiry: number;
  };
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}

export const imageSchema = new Schema<IImage>({
  public_id: { type: String },
  url: { type: String },
});

const userSchema = new Schema<IUser>(
  {
    avatar: {
      type: imageSchema,
      default: {
        public_id: "",
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
    emailVerificationExpiry: { type: Number },
    forgotPasswordToken: { type: String },
    forgotPasswordExpiry: { type: Number },
    fullName: {
      type: String,
      required: true,
    },
    isEmailVerified: { type: Boolean, default: false },
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
  { methods: {}, timestamps: true }
);

userSchema.pre(
  "save",
  async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
);

userSchema.post("save", async function (user, next) {
  const cart = await Cart.findOne({ owner: user._id });

  if (!cart) await Cart.create({ owner: user._id, items: [] });

  next();
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY!,
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
    process.env.REFRESH_TOKEN_SECRET_KEY!,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateTemporaryToken = function (): {
  unhashedToken: string;
  hashedToken: string;
  tokenExpiry: number;
} {
  const unhashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + TEMPORARY_TOKEN_EXPIRY;

  return { unhashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model<IUser>("User", userSchema);
