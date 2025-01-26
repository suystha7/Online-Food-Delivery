import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares";
import { mongoIdParamValidator } from "../validators/mongodb.validators";
import { validate } from "../validators/validate";
import {
  getPopularFoods,
  getRecommendedFoods,
  getSimilarFoods,
} from "../controllers/recommendedFood.controllers";

const router = Router();

router
  .route("/")
  .get(
   verifyJwt,
    getRecommendedFoods
  );

router
  .route("/popular")
  .get(
    getPopularFoods
  );

router
  .route("/similar/:foodId")
  .get(mongoIdParamValidator("foodId"), validate, getSimilarFoods);

export default router;
