import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

// Create Project
export const createProject = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      title,
      slug,
      description,
      shortSummary,
      imageUrl,
      website,
      repoUrl,
      technologies,
      tags,
      startDate,
      endDate,
      isOngoing,
      role,
      achievements,
      jsonLd,
    } = req.body;

    const project = await prisma.project.create({
      data: {
        userId,
        title,
        slug,
        description,
        shortSummary,
        imageUrl,
        website,
        repoUrl,
        technologies,
        tags,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isOngoing,
        role,
        achievements,
        jsonLd,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get All Projects
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: { user: true }, // include user if needed
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get Project by ID
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: String(req.params.id) },
      include: { user: true },
    });

    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update Project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await prisma.project.update({
      where: { id: String(req.params.id) },
      data: {
        ...req.body,
        startDate: req.body.startDate
          ? new Date(req.body.startDate)
          : undefined,
        endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
      },
    });

    res.json(project);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Delete Project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    await prisma.project.delete({
      where: { id: String(req.params.id) },
    });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
