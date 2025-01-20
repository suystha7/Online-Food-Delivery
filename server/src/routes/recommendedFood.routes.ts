import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares";
import { mongoIdParamValidator } from "../validators/mongodb.validators";
import { validate } from "../validators/validate";
import { getRelatedFoods } from "../controllers/recommendedFood.controllers";

const router = Router();

// router.use(verifyJwt);

router
  .route("/related")
  .get(getRelatedFoods);
// router
//   .route("/related/:categoryId")
//   .get(mongoIdParamValidator("categoryId"), validate, getRelatedFoods);

export default router;
