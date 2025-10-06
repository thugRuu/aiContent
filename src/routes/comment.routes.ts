import {Router} from "express";
import {createComment,deleteComment,getCommentById,getComments,updateComment} from "../controllers/comment.controller";
import { adminOnly, protect } from "../services/middleware";

const router:Router=Router();
router.post("/", createComment);
router.get("/",getComments);
router.get("/:id",getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;