import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares";
import { createUpdateRating } from "../controllers/rating.controllers";
import { ratingCreateValidator } from "../validators/rating.validators";
import { validate } from "../validators/validate";
import { mongoIdParamValidator } from "../validators/mongodb.validators";

const router = Router();

router.use(verifyJwt);

router
  .route("/:foodId")
  .post(
    mongoIdParamValidator("foodId"),
    ratingCreateValidator(),
    validate,
    createUpdateRating
  );

export default router;
