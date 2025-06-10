import { Router } from "express";
const router = Router();

// Contoh endpoint
router.post("/", (req, res) => {
  res.json({ message: "Create loan endpoint" });
});

export default router;
