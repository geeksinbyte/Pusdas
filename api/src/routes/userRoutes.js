import { Router } from "express";
const router = Router();

// Contoh endpoint
router.post("/", (req, res) => {
  res.json({ message: "Create user endpoint" });
});

export default router;
