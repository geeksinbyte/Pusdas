import { Router } from "express";
import { getCategories } from "../controllers/bookCategory.js";

const router = Router();

router.get("/", getCategories);

export default router;
