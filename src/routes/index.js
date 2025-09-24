import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Automobilių rezervacijos API" });
});

export default router;
