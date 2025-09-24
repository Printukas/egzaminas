import { Router } from "express";
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment
} from "../../controllers/equipment_controller.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", getAllEquipment);
router.get("/:id", getEquipmentById);

router.use(auth);

router.post("/", createEquipment);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);

export default router;
