import { Router } from "express";
import {
  createExperience,
  getExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller";
import { protect, adminOnly } from "../services/middleware";

const router:Router = Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceById);
router.post("/", protect, adminOnly, createExperience);
router.put("/:id", protect, adminOnly, updateExperience);
router.delete("/:id", protect, adminOnly, deleteExperience);

export default router;
