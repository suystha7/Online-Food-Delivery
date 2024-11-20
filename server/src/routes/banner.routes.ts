import { Router } from "express";
import { verifyJwt, verifyPermission } from "../middlewares/auth.middlewares";
import {
  bannerCreateValidator,
  bannerUpdateValidator,
} from "../validators/banner.validators";
import { validate } from "../validators/validate";
import {
  createBanner,
  getAllBanners,
  removeBanner,
  updateBanner,
} from "../controllers/banner.controllers";
import { mongoIdParamValidator } from "../validators/mongodb.validators";
import { upload } from "../middlewares/multer.middlewares";
import { UserRolesEnum } from "../constant";

const router = Router();

router.use(verifyJwt);
router.use(verifyPermission([UserRolesEnum.ADMIN]));

router
  .route("/")
  .post(upload.single("image"), bannerCreateValidator(), validate, createBanner)
  .get(getAllBanners);

router
  .route("/:bannerId")
  .patch(
    upload.single("image"),
    mongoIdParamValidator("bannerId"),
    bannerUpdateValidator(),
    validate,
    updateBanner
  )
  .delete(mongoIdParamValidator("bannerId"), validate, removeBanner);
export default router;
