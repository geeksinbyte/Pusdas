import { Router } from "express";
const router = Router();

// Contoh endpoint
router.post("/login", (req, res) => {
  res.json({ message: "Login endpoint" });
});

export default router;
