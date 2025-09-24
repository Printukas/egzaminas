import { Router } from "express";
import {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  updateOrderStatus
} from "../../controllers/order_controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.use(auth);

router.post("/", createOrder);

router.get("/", (req, res, next) => {
  if (req.user.role === "admin") {
    return getAllOrders(req, res, next);
  }
  return getOrders(req, res, next);
});


router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);

router.put("/:id/status", updateOrderStatus);

export default router;
