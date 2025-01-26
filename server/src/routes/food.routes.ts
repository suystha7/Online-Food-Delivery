import { Router } from "express";
import { verifyJwt, verifyPermission } from "../middlewares/auth.middlewares";
import { UserRolesEnum } from "../constant";
import {
  foodCreateValidator,
  foodUpdateValidator,
} from "../validators/food.validators";
import { validate } from "../validators/validate";
import {
  createFood,
  getAllFoods,
  getFoodById,
  getFoodsByCategory,
  updateFood,
  removeFood,
  getFoodIds,
} from "../controllers/food.controllers";
import { upload } from "../middlewares/multer.middlewares";
import { mongoIdParamValidator } from "../validators/mongodb.validators";

const router = Router();

router.route("/id/").get(getFoodIds)

router
  .route("/")
  .post(
    verifyJwt,
    verifyPermission([UserRolesEnum.ADMIN]),
    upload.fields([
      {
        name: "mainImage",
        maxCount: 1,
      },
      {
        name: "subImages[]",
        maxCount: 4,
      },
    ]),
    foodCreateValidator(),
    validate,
    createFood
  )
  .get(getAllFoods);

router
  .route("/category/:categoryId")
  .get(mongoIdParamValidator("categoryId"), validate, getFoodsByCategory);

router
  .route("/:foodId")
  .get(mongoIdParamValidator("foodId"), validate, getFoodById)
  .patch(
    verifyJwt,
    verifyPermission([UserRolesEnum.ADMIN]),
    upload.fields([
      {
        name: "mainImage",
        maxCount: 1,
      },
      {
        name: "subImages[]",
        maxCount: 4,
      },
    ]),
    mongoIdParamValidator("foodId"),
    foodUpdateValidator(),
    validate,
    updateFood
  )
  .delete(mongoIdParamValidator("foodId"), validate, removeFood);

export default router;
