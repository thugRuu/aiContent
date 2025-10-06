import { Router } from "express";
import {
    createCategory
} from "../controllers/category.controller";
import { adminOnly, protect } from "../services/middleware";

const router:Router = Router();


router.post("/", protect, adminOnly, createCategory);

export default router;
