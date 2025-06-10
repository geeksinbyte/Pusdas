import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import bookRoutes from "./bookRoutes.js";
import loanRoutes from "./loanRoutes.js";
import returnRoutes from "./returnRoutes.js";
import categoryRoutes from "./categoryRoutes.js";

const router = Router();

// Route utama (misal health check)
router.get("/", (req, res) => {
  res.send("Welcome to PUSDAS API");
});

// Daftarkan semua routes
router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/books", bookRoutes);
router.use("/api/v1/loans", loanRoutes);
router.use("/api/v1/returns", returnRoutes);
router.use("/api/v1/categories", categoryRoutes);

export default router;
