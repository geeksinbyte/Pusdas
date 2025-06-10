import { Router } from "express";
import { getAllUsers } from "../controllers/userController.js"; // Import userController if needed
const router = Router();

// Contoh endpoint
router.post("/", getAllUsers);

export default router;
