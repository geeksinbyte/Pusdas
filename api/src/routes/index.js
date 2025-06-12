import { Router } from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import bookRoutes from "./collectionsRoutes.js";
import loanRoutes from "./loanRoutes.js";
import returnRoutes from "./returnRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import profileRoutes from "./profileRoutes.js";

const router = Router();

// Route publik
router.use("/v1/auth", authRoutes);

// Route yang memerlukan autentikasi
router.use(verifyJWT);
router.use("/v1/profile", profileRoutes);
router.use("/v1/users", userRoutes);
router.use("/v1/books", bookRoutes);
router.use("/v1/loans", loanRoutes);
router.use("/v1/return", returnRoutes);
router.use("/v1/categories", categoryRoutes);

export default router;
