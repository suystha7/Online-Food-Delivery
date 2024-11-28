import { Router } from "express";
import {
  categoryCreateValidator,
  categoryUpdateValidator,
} from "../validators/category.validators";
import { validate } from "../validators/validate";
import {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategory,
  removeCategory
} from "../controllers/category.controllers";
import { upload } from "../middlewares/multer.middlewares";
import { verifyJwt, verifyPermission } from "../middlewares/auth.middlewares";
import { mongoIdParamValidator } from "../validators/mongodb.validators";
import { UserRolesEnum } from "../constant";

const router = Router();

router
  .route("/")
  .post(
    verifyJwt,
    verifyPermission([UserRolesEnum.ADMIN]),
    upload.single("mainImage"),
    categoryCreateValidator(),
    validate,
    createCategory
  )
  .get(getAllCategories);

router
  .route("/:categoryId")
  .get(mongoIdParamValidator("categoryId"), validate, getCategoryById)
  .patch(
    verifyJwt,
    verifyPermission([UserRolesEnum.ADMIN]),
    upload.single("mainImage"),
    mongoIdParamValidator("categoryId"),
    categoryUpdateValidator(),
    validate,
    updateCategory
  )
  .delete(
    verifyJwt,
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdParamValidator("categoryId"),
    validate,
    removeCategory
  );

export default router;
