import { Request, Response } from "express";
import prisma from "../lib/prisma";

// Create Tag
export const createTag = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const tag = await prisma.tag.create({
      data: { name },
    });

    res.status(201).json(tag);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Tag name already exists" });
    }
    res.status(500).json({ message: "Error creating tag", error: error.message });
  }
};

// Get All Tags
export const getTags = async (_req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany({
      include: { blog: true }, // get related blogs too
    });
    res.json(tags);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching tags", error: error.message });
  }
};

// Get Single Tag by ID
export const getTagById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tag = await prisma.tag.findUnique({
      where: { id:String(id) },
      include: { blog: true },
    });

    if (!tag) return res.status(404).json({ message: "Tag not found" });

    res.json(tag);
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching tag", error: error.message });
  }
};

// Update Tag
export const updateTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const tag = await prisma.tag.update({
      where: { id:String(id) },
      data: { name },
    });

    res.json(tag);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(500).json({ message: "Error updating tag", error: error.message });
  }
};

// Delete Tag
export const deleteTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.tag.delete({
      where: { id:String(id) },
    });

    res.json({ message: "Tag deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(500).json({ message: "Error deleting tag", error: error.message });
  }
};