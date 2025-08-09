import { Router } from "express";
import {
  getAllMusic,
  getMusicById,
  createMusic,
  updateMusic,
  deleteMusic,
} from "../controllers/music.controller";
import { protect, adminOnly } from "../services/middleware";

const router:Router = Router();

router.get("/", getAllMusic);
router.get("/:id", getMusicById);
router.post("/", protect, adminOnly, createMusic);
router.put("/:id", protect, adminOnly, updateMusic);
router.delete("/:id", protect, adminOnly, deleteMusic);

export default router;
