import { Router } from "express";
const router = Router();

// Contoh endpoint
router.post("/", (req, res) => {
  res.json({ message: "Return book endpoint" });
});

export default router;
