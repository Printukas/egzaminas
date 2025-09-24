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

//  Visi prisijungę gali matyti įrangą
router.get("/", getAllEquipment);
router.get("/:id", getEquipmentById);

//  Tik prisijungę vartotojai (middleware auth)
router.use(auth);

//  Tik admin gali kurti, atnaujinti ir trinti
router.post("/", createEquipment);
router.put("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);

export default router;
