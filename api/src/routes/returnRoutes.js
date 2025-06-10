import { Router } from "express";
import { returnBook } from "../controllers/returnBook.js";

const router = Router();

router.post("/", returnBook);

export default router;
