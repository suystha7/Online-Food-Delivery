import crypto from "crypto";
import { User, IUser } from "../models/user.models";
import ApiResponse from "../utils/ApiResponse";
import ApiError from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import {
  sendMail,
  generateEmailVerificationMailgenContent,
  generateResetForgottenPasswordMailgenContent,
} from "../utils/mail";
import {
  getFileStaticPath,
  getFileLocalPath,
  removeLocalFile,
} from "../utils/helpers";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";

export const registerUser = asyncHandler<IUser>(async (req, res) => {
  const { email, password, fullName, phoneNumber } = req.body;

  const alreadyUser = await User.findOne({ email });

  if (alreadyUser) {
    throw new ApiError(409, "User with provided email already exists");
  }

  const newUser = await User.create({
    email,
    password,
    fullName,
    phoneNumber,
  });

  const { unhashedToken, hashedToken, tokenExpiry } =
    newUser.generateTemporaryToken();

  newUser.emailVerificationToken = hashedToken;
  newUser.emailVerificationExpiry = tokenExpiry;
  await newUser.save({ validateBeforeSave: false });

  await sendMail({
    email: newUser.email,
    subject: "Please verify your email address",
    mailgenContent: generateEmailVerificationMailgenContent(
      newUser.fullName,
      `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`
    ),
  });

  const createdUser = await User.findById(newUser._id).select(
    "-emailVerificationToken -emailVerificationExpiry -password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        createdUser,
        "User has been registered successfully and verification email has been sent to your email"
      )
    );
});

export const loginUser = asyncHandler<{ email: string; password: string }>(
  async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new ApiError(400, "User does not exist");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Incorrect password");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          201,
          { user: loggedInUser, accessToken, refreshToken },
          "User has been logged in sucessfully"
        )
      );
  }
);

export const verifyEmail = asyncHandler<any, { verificationToken: string }>(
  async (req, res) => {
    const { verificationToken } = req.params;

    if (!verificationToken) {
      throw new ApiError(400, "Email verification token is missing");
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: {
        $gt: Date.now(),
      },
    });

    if (!user) {
      throw new ApiError(400, "Email verification token is invalid or expired");
    }

    user.emailVerificationToken = "";
    user.emailVerificationExpiry = 0;
    user.isEmailVerified = true;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { isEmailVerified: true },
          "Email has been verified"
        )
      );
  }
);

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        req.user,
        "Current user has been fetched successfully"
      )
    );
});

export const updateProfile = asyncHandler<IUser>(async (req, res) => {
  const { fullName, phoneNumber } = req.body;

  let udpates: Partial<IUser> = {};

  if (fullName) udpates = { ...udpates, fullName };
  if (phoneNumber) udpates = { ...udpates, phoneNumber };

  if (req.file) {
    const cloudinaryResponse = await uploadToCloudinary({
      localFilePath: req.file.path,
    });

    if (!cloudinaryResponse) {
      throw new ApiError(500, "File cannot be uploaded to cloudinary");
    }

    udpates = {
      ...udpates,
      avatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.url,
      },
    };
  }

  const user = await User.findById(req.user?._id);

  if (!user) throw new ApiError(404, "User does not exist");

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        ...udpates,
      },
    },
    { new: true }
  ).select(
    "-emailVerificationToken -emailVerificationExpiry -password -refreshToken"
  );

  // if (req.file && user.avatar.localPath !== "public/images/avatar.jpg") {
  //   removeLocalFile(user.avatar.localPath);
  // }

  if (req.file && user.avatar.public_id) {
    await deleteFromCloudinary({ public_id: user.avatar.public_id });
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        updatedUser,
        "User profile has been updated successfully"
      )
    );
});

export const changeCurrentPassword = asyncHandler<{
  oldPassword: string;
  newPassword: string;
}>(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isOldPasswordCorrect) {
    throw new ApiError(400, "Incorrect old password");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, true, "Password has been changed successfully"));
});

export const forgotPassword = asyncHandler<{ email: string }>(
  async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      throw new ApiError(404, "User with provided email does not exist");
    }

    const { unhashedToken, hashedToken, tokenExpiry } =
      user.generateTemporaryToken();

    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false });

    await sendMail({
      email: user.email,
      subject: "Reset your password",
      mailgenContent: generateResetForgottenPasswordMailgenContent(
        user.fullName,
        `${req.protocol}://${req.get("host")}/api/v1/users/reset-password/${unhashedToken}` //set frontend url
        // `http://localhost:3000/reset-password/${unhashedToken}` //set frontend url
      ),
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          true,
          "Password reset email has been sent to your email"
        )
      );
  }
);

export const resetForgottenPassword = asyncHandler<
  { newPassword: string },
  { resetToken: string }
>(async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Reset password token is invalid or expired");
  }

  user.forgotPasswordToken = "";
  user.forgotPasswordExpiry = 0;
  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, true, "Password has been reset successfully"));
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true,
    }
  );

  const options = {
    http: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, true, "User has been logged out successfully"));
});

export const removeUser = asyncHandler<any, { userId: string }>(
  async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) throw new ApiError(404, "User does not exist");

    await User.findByIdAndDelete(user._id);

    return res
      .status(201)
      .json(new ApiResponse(201, true, "User has been deleted successfully"));
  }
);
