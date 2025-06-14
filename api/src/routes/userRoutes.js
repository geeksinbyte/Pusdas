import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/userController.js"; // Import userController if needed
const router = Router();

// Contoh endpoint
router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;
