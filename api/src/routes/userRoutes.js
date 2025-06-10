import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
} from "../controllers/userController.js"; // Import userController if needed
const router = Router();

// Contoh endpoint
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);

export default router;
