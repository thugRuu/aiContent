import {Router} from "express";
import {createTag,deleteTag,getTagById,getTags,updateTag} from "../controllers/tag.controller";
import { adminOnly, protect } from "../services/middleware";

const router:Router=Router();
router.post("/",protect,adminOnly, createTag);
router.get("/",getTags);
router.get("/:id",getTagById);
router.put("/:id", protect, adminOnly, updateTag);
router.delete("/:id", protect, adminOnly, deleteTag);

export default router;