import express, { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
getBlogBySlug   
} from "../controllers/blog.controller";
import { adminOnly, protect } from "../services/middleware";

const router:Router = Router();

// Public route
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.get("/slug/:slug",getBlogBySlug)

// Protected routes
router.post("/", protect, adminOnly, createBlog);
router.put("/:id",protect, adminOnly, updateBlog);
router.delete("/:id",protect, adminOnly, deleteBlog);

export default router;
