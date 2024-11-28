import { Router } from "express";
import { cartItemQuanitiyAddOrUpdateValidator } from "../validators/cart.validators";
import { verifyJwt } from "../middlewares/auth.middlewares";
import {
  addOrUpdateItemQuanitity,
  clearCart,
  getUserCart,
  removeItemFromCart,
} from "../controllers/cart.controllers";
import { mongoIdParamValidator } from "../validators/mongodb.validators";
import { validate } from "../validators/validate";

const router = Router();

router.use(verifyJwt);

router.route("/").get(getUserCart);

router
  .route("/item/:foodId")
  .post(
    mongoIdParamValidator("foodId"),
    cartItemQuanitiyAddOrUpdateValidator(),
    validate,
    addOrUpdateItemQuanitity
  )
  .delete(mongoIdParamValidator("foodId"), validate, removeItemFromCart);

router.route("/clear").delete(clearCart);

export default router;
