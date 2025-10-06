import { Request, Response } from "express";
import prisma from "../lib/prisma";

// Create Blog
export const createBlog = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      authorId,
      categoryId,
      seoTitle,
      seoDescription,
      canonicalUrl,
      keywords,
      schemaType,
      readingTime,
      wordCount,
      tags, // Array of tag IDs or slugs
      jsonLD,
    } = req.body;

    if (!title || !slug || !authorId || !categoryId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const blog = await prisma.blog.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        coverImage,
        authorId,
        categoryId,
        seoTitle,
        seoDescription,
        canonicalUrl,
        keywords,
        schemaType,
        readingTime,
        wordCount,
        jsonLD,
      },
    });

    res.status(201).json(blog);
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
};

// Get All Blogs
export const getAllBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { publishedAt: "desc" },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blogs" });
  }
};

// Get Blog by ID
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: String(req.params.id) },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });

    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Failed to get blog" });
  }
};

// Update Blog
export const updateBlog = async (req: Request, res: Response) => {
  try {
    const blog = await prisma.blog.update({
      where: { id: String(req.params.id) },
      data: req.body,
    });

    res.json(blog);
  } catch (error) {
    if (error) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(500).json({ error: "Failed to update blog" });
  }
};

// Delete Blog
export const deleteBlog = async (req: Request, res: Response) => {
  try {
    await prisma.blog.delete({
      where: { id: String(req.params.id) },
    });

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    if (error) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(500).json({ error: "Failed to delete blog" });
  }
};

// Get Blog by Slug
export const getBlogBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ error: "Missing slug parameter" });
  }

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Server error", detail: error });
  }
};
