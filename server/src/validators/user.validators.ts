import { body } from "express-validator";

export const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8, max: 20 })
      .withMessage(
        "Password must have at least 8 characters and at most 20 characters"
      ),
    body("fullName")
      .trim()
      .notEmpty()
      .withMessage("Fullname is required")
      .isLength({ min: 4 })
      .withMessage("Fullname must be at least 4 characters long"),
    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone("ne-NP")
      .withMessage("Invalid phone number format"),
  ];
};

export const userLoginValidator = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
};

export const userChangePasswordValidtor = () => {
  return [
    body("oldPassword").notEmpty().withMessage("Old password is required"),
    body("newPassword")
      .notEmpty()
      .withMessage("New password is required")
      .isLength({ min: 8, max: 20 })
      .withMessage(
        "Password must have at least 8 characters and at most 20 characters"
      ),
  ];
};

export const userForgotPasswordValidtor = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email address is required")
      .isEmail()
      .withMessage("Invalid email address"),
  ];
};

export const userResetForgottenPasswordValidator = () => {
  return [
    body("newPassword")
      .notEmpty()
      .withMessage("New password is required")
      .isLength({ min: 8, max: 20 })
      .withMessage(
        "Password must have at least 8 characters and at most 20 characters"
      ),
  ];
};

export const userUpdateProfileValidator = () => {
  return [
    body("fullName")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("New fullname is required")
      .isLength({ min: 4 })
      .withMessage("Fullname must be at least 4 characters long")
      .isLength({ max: 20 })
      .withMessage("Fullname must be at most 20 characters long"),
    body("phoneNumber")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .isMobilePhone("ne-NP")
      .withMessage("Invalid phone number format"),
  ];
};
