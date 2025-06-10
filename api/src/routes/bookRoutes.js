import { Router } from "express";
const router = Router();

// Contoh endpoint
router.get("/", (req, res) => {
  res.json({ message: "Get all books endpoint" });
});

export default router;
