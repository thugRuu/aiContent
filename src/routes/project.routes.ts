import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/project.controller"
import { protect, adminOnly } from "../services/middleware";

const router: Router = Router();

// Public routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Admin-only routes
router.post("/", protect, adminOnly, createProject);
router.put("/:id", protect, adminOnly, updateProject);
router.delete("/:id", protect, adminOnly, deleteProject);

export default router;
