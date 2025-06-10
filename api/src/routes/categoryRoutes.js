import { Router } from "express";
const router = Router();

// Contoh endpoint
router.get("/", (req, res) => {
  res.json({ message: "Get all categories endpoint" });
});

export default router;
