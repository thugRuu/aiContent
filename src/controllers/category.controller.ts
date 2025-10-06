import { Request, Response } from "express";
import prisma from "../lib/prisma";


export const createCategory = async (req: Request, res: Response) => {
  try {
    const {
      name,
      slug,
      description,
      seoTitle,
      seoDescription,
      canonicalUrl,
      imageUrl,
      jsonLD,
    } = req.body;

    // Basic validation
    if (!name || !slug || !description) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, slug, or description" });
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        seoTitle,
        seoDescription,
        canonicalUrl,
        imageUrl,
        jsonLD,
      },
    });

    res.status(201).json(category);
  } catch (error: any) {
    console.error("Create category error:", error);
    if (error.code === "P2002") {
      // Prisma unique constraint violation
      return res
        .status(409)
        .json({ error: "Category name or slug already exists" });
    }
    res.status(500).json({ error: "Failed to create category" });
  }
};
