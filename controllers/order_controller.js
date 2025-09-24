import Order from "../models/order.js";
import Equipment from "../models/equipment.js";

function isAdmin(req) {
  return req.user && req.user.role === "admin";
}

export async function createOrder(req, res, next) {
  try {
    const { equipmentId, fromDate, toDate } = req.body;

    if (!fromDate || !toDate) {
      return res.status(400).json({ message: "Reikia nurodyti datas" });
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);
    const now = new Date();

    if (from < now) {
      return res.status(400).json({ message: "Negalima rezervuoti į praeitį" });
    }

    const oneMonthLater = new Date(now);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    if (from > oneMonthLater) {
      return res.status(400).json({ message: "Galima rezervuoti tik 1 mėnesį į priekį" });
    }

    const sixMonthsLater = new Date(from);
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
    if (to > sixMonthsLater) {
      return res.status(400).json({ message: "Maksimali nuoma yra 6 mėnesiai" });
    }

    const minDuration = 1000 * 60 * 60 * 2;
    if (to - from < minDuration) {
      return res.status(400).json({ message: "Minimalus nuomos laikas – 2 valandos" });
    }

    if (to <= from) {
      return res.status(400).json({ message: "Laikas turi būti vėlesnis už pradinį" });
    }

    
    
    const overlapping = await Order.findOne({
      equipment: equipmentId,
      status: { $in: ["laukianti", "patvirtinta"] },
      $or: [{ fromDate: { $lte: to }, toDate: { $gte: from } }],
    });

    if (overlapping) {
      return res.status(400).json({ message: "Autombilis jau yra išnuomotas!" });
    }

    const order = new Order({
      user: req.user.id,
      equipment: equipmentId,
      fromDate: from,
      toDate: to,
      status: "laukianti",
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(" Klaida rezervuojant:", err);
    next(err);
  }
}

export async function getOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("equipment", "name description")
      .sort({ fromDate: 1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function getAllOrders(req, res, next) {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ message: "Tik administratorius gali matyti visas rezervacijas" });
    }
    const orders = await Order.find()
      .populate("user", "username email")
      .populate("equipment", "name description")
      .sort({ fromDate: 1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
}

export async function updateOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Rezervacija nerasta" });

    if (!isAdmin(req) && order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Negalite redaguoti" });
    }

    if (req.body.fromDate) order.fromDate = new Date(req.body.fromDate);
    if (req.body.toDate) order.toDate = new Date(req.body.toDate);

    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ message: "Tik administratorius gali keisti būseną" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Rezervacija nerasta" });

    const validStatuses = ["laukianti", "patvirtinta", "atmesta", "vykdoma"];
    if (!validStatuses.includes(req.body.status)) {
      return res.status(400).json({ message: "Netinkama būsena" });
    }

    order.status = req.body.status;
    await order.save();

    res.json({ message: "Būsena atnaujinta", order });
  } catch (err) {
    next(err);
  }
}


export async function deleteOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Rezervacija nerasta" });

    if (!isAdmin(req) && order.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Negalite atšaukti šios rezervacijos" });
    }

    await order.deleteOne(); 

    res.json({ message: "Rezervacija visiškai pašalinta" });
  } catch (err) {
    next(err);
  }
}
