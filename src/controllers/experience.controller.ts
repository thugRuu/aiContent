import { Request, Response } from "express";
import prisma from "../lib/prisma";

// Create experience
export const createExperience = async (req: Request, res: Response) => {
  try {
    const {
      profileId,
      title,
      company,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      technologies,
      achievements,
      jsonLd,
    } = req.body;

    const newExperience = await prisma.experience.create({
      data: {
        profileId,
        title,
        company,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        isCurrent,
        description,
        technologies,
        achievements,
        jsonLd,
      },
    });

    res.status(201).json(newExperience);
  } catch (err) {
    res.status(500).json({
      message: "Error creating experience",
      error: (err as Error).message,
    });
  }
};

// Get all experiences
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { startDate: "desc" },
    });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching experiences",
      error: (err as Error).message,
    });
  }
};

// Get single experience
export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const experience = await prisma.experience.findUnique({
      where: { id: String(req.params.id) },
    });

    if (!experience)
      return res.status(404).json({ message: "Experience not found" });

    res.json(experience);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching experience",
      error: (err as Error).message,
    });
  }
};

// Update experience
export const updateExperience = async (req: Request, res: Response) => {
  try {
    const updatedExperience = await prisma.experience.update({
      where: { id: String(req.params.id) },
      data: {
        ...req.body,
        startDate: req.body.startDate
          ? new Date(req.body.startDate)
          : undefined,
        endDate: req.body.endDate ? new Date(req.body.endDate) : undefined,
      },
    });

    res.json(updatedExperience);
  } catch (err) {
    res.status(500).json({
      message: "Error updating experience",
      error: (err as Error).message,
    });
  }
};

// Delete experience
export const deleteExperience = async (req: Request, res: Response) => {
  try {
    await prisma.experience.delete({
      where: { id: String(req.params.id) },
    });

    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting experience",
      error: (err as Error).message,
    });
  }
};
