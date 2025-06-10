import { Router } from "express";
import { getAllUsers, createUser } from "../controllers/userController.js"; // Import userController if needed
const router = Router();

// Contoh endpoint
router.get("/", getAllUsers);
router.post("/", createUser);

export default router;
