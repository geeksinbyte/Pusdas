import { Router } from "express";
import { returnBook } from "../controllers/returnController.js";

const router = Router();

router.post("/", returnBook);

export default router;
