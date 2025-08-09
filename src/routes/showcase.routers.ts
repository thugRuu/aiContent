import { Router } from "express";
import {
  getAllShowcases,
  getShowcaseById,
  createShowcase,
  updateShowcase,
  deleteShowcase,
  getShowcaseCategories,
  getAllShowcasesByCategory 
} from "../controllers/showcase.controller";
import { protect, adminOnly } from "../services/middleware";

const router:Router = Router();

router.get("/", getAllShowcases);
router.get("/categories", getShowcaseCategories); 
router.get("/:id", getShowcaseById);
router.get("/category/:category",getAllShowcasesByCategory)
router.post("/", protect, adminOnly, createShowcase);
router.put("/:id", protect, adminOnly, updateShowcase);
router.delete("/:id", protect, adminOnly, deleteShowcase);

export default router;
