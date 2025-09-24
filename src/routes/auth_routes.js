import { Router } from "express";
import { registerUser, loginUser } from "../../controllers/auth_controller.js";

const router = Router();

// API endpointai (POST)
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
