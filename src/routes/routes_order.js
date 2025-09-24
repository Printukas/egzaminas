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

// Sukurti rezervaciją
router.post("/", createOrder);

// Vienas endpointas tiek user, tiek admin
router.get("/", (req, res, next) => {
  if (req.user.role === "admin") {
    return getAllOrders(req, res, next);
  }
  return getOrders(req, res, next);
});

// Atnaujinti rezervaciją
router.put("/:id", updateOrder);

// Ištrinti rezervaciją
router.delete("/:id", deleteOrder);

// Admin keičia rezervacijos būseną
router.put("/:id/status", updateOrderStatus);

export default router;
