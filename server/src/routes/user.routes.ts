import { Router } from "express";
import {
  userLoginValidator,
  userRegisterValidator,
  userChangePasswordValidtor,
  userForgotPasswordValidtor,
  userResetForgottenPasswordValidator,
  userUpdateProfileValidator,
} from "../validators/user.validators";
import { validate } from "../validators/validate";
import {
  loginUser,
  registerUser,
  verifyEmail,
  getCurrentUser,
  forgotPassword,
  changeCurrentPassword,
  resetForgottenPassword,
  logoutUser,
  removeUser,
  updateProfile,
} from "../controllers/user.controllers";
import { verifyJwt } from "../middlewares/auth.middlewares";
import { mongoIdParamValidator } from "../validators/mongodb.validators";
import { upload } from "../middlewares/multer.middlewares";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/verify-email/:verificationToken").get(verifyEmail);

router.route("/current-user").get(verifyJwt, getCurrentUser);

router
  .route("/profile")
  .patch(
    verifyJwt,
    upload.single("avatar"),
    userUpdateProfileValidator(),
    validate,
    updateProfile
  );

router
  .route("/change-password")
  .post(
    verifyJwt,
    userChangePasswordValidtor(),
    validate,
    changeCurrentPassword
  );
router
  .route("/forgot-password")
  .post(userForgotPasswordValidtor(), validate, forgotPassword);
router
  .route("/reset-password/:resetToken")
  .post(
    userResetForgottenPasswordValidator(),
    validate,
    resetForgottenPassword
  );

router.route("/logout").post(verifyJwt, logoutUser);

router
  .route("/:userId")
  .delete(verifyJwt, mongoIdParamValidator("userId"), validate, removeUser);

export default router;
