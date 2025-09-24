import Equipment from "../models/equipment.js";
import Order from "../models/order.js";

export async function createEquipment(req, res, next) {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json(equipment);
  } catch (err) {
    next(err);
  }
}


export async function getAllEquipment(req, res, next) {
  try {
    const items = await Equipment.find();

    
    const orders = await Order.find({
      status: { $in: ["laukianti", "patvirtinta", "vykdoma"] },
    });

    const reservedMap = {};
    orders.forEach((o) => {
      reservedMap[o.equipment.toString()] = true;
    });

    const withStatus = items.map((item) => ({
      ...item.toObject(),
      isReserved: reservedMap[item._id.toString()] || false,
    }));

    res.json(withStatus);
  } catch (err) {
    next(err);
  }
}


export async function getEquipmentById(req, res, next) {
  try {
    const item = await Equipment.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Automobilis nerastas" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

// Admin
export async function updateEquipment(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Tik administratorius gali redaguoti" });
    }
    const item = await Equipment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Automobilis nerastas" });
    res.json(item);
  } catch (err) {
    next(err);
  }
}


export async function deleteEquipment(req, res, next) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Tik administratorius gali ištrinti" });
    }
    const item = await Equipment.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Automobilis nerastas" });
    res.json({ message: "Automobilis sėkmingai pašalintas" });
  } catch (err) {
    next(err);
  }
}
