import { Router } from "express";
import { verifyJwt, verifyPermission } from "../middlewares/auth.middlewares";
import {
  orderPlaceValidator,
  orderStatusValidator,
} from "../validators/order.validators";
import { validate } from "../validators/validate";
import {
  getAllOrdersAdmin,
  getOrderById,
  getOrdersByUserId,
  placeOrder,
  removeOrder,
  updateStatus,
  verifyPayment,
} from "../controllers/order.controllers";
import { mongoIdParamValidator } from "../validators/mongodb.validators";
import { UserRolesEnum } from "../constant";

const router = Router();

router.use(verifyJwt);

router
  .route("/")
  .post(orderPlaceValidator(), validate, placeOrder)
  .get(getOrdersByUserId);

router
  .route("/admin")
  .get(verifyPermission([UserRolesEnum.ADMIN]), getAllOrdersAdmin);

router
  .route("/:orderId")
  .get(mongoIdParamValidator("orderId"), validate, getOrderById)
  .delete(
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdParamValidator("orderId"),
    validate,
    removeOrder
  );

router
  .route("/payment/:orderId")
  .post(
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdParamValidator("orderId"),
    validate,
    verifyPayment
  );

router
  .route("/status/:orderId")
  .post(
    verifyPermission([UserRolesEnum.ADMIN]),
    mongoIdParamValidator("orderId"),
    orderStatusValidator(),
    validate,
    updateStatus
  );

export default router;
