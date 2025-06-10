import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import bookRoutes from "./collectionsRoutes.js";
import loanRoutes from "./loanRoutes.js";
import returnRoutes from "./returnRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

const router = Router();

// Route utama
router.get("/", (req, res) => {
  res.send("Welcome to PUSDAS API");
});

// Daftarkan semua routes
router.use("/v1/auth", authRoutes);
router.use("/v1/users", userRoutes);
router.use("/v1/books", bookRoutes);
router.use("/v1/loans", loanRoutes);
router.use("/v1/return", returnRoutes);
router.use("/v1/categories", categoryRoutes);

export default router;
