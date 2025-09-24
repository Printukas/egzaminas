import { Router } from "express";

const router = Router();

//API
router.get("/", (req, res) => {
  res.json({ message: "Automobilių rezervacijos API" });
});

export default router;
