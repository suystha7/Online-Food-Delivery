import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares";
import {
  createUpdateRating,
  getAverageRating,
  getRatings,
  removeRating,
} from "../controllers/rating.controllers";
import { ratingCreateValidator } from "../validators/rating.validators";
import { validate } from "../validators/validate";
import { mongoIdParamValidator } from "../validators/mongodb.validators";

const router = Router();

router.route("/average-rating").get(getAverageRating);

router.use(verifyJwt);

router.route("/").get(getRatings);

router
  .route("/:foodId")
  .post(
    mongoIdParamValidator("foodId"),
    ratingCreateValidator(),
    validate,
    createUpdateRating
  );

router
  .route("/:ratingId")
  .delete(mongoIdParamValidator("ratingId"), validate, removeRating);

export default router;
