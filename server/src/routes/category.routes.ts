import { Router } from "express";
import {
  categoryCreateValidator,
  categoryUpdateValidator,
} from "../validators/category.validators";
import { validate } from "../validators/validate";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controllers";
import { upload } from "../middlewares/multer.middlewares";
import { verifyJwt, verifyPermission } from "../middlewares/auth.middlewares";
import { mongoIdValidator } from "../validators/mongodb.validators";
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
  .get(mongoIdValidator("categoryId"), validate, getCategoryById)
  .patch(
    verifyJwt,
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdValidator("categoryId"),
    categoryUpdateValidator(),
    validate,
    updateCategory
  )
  .delete(
    verifyJwt,
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdValidator("categoryId"),
    validate,
    deleteCategory
  );

export default router;
