import { Router } from "express";
import {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
} from "../controllers/loanController.js";

const router = Router();

router.get("/", getAllLoans);
router.get("/:id", getLoanById);
router.post("/", createLoan);
router.put("/:id", updateLoan);
// Tambahkan endpoint lain sesuai kebutuhan

export default router;
