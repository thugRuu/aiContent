import { Request, Response } from "express";
import Experience from "../types/experience.type";

// Create experience
export const createExperience = async (req: Request, res: Response) => {
  try {
    const newExperience = await Experience.create(req.body);
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(500).json({ message: "Error creating experience", error: err });
  }
};

// Get all experiences
export const getExperiences = async (req: Request, res: Response) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: "Error fetching experiences", error: err });
  }
};

// Get single experience
export const getExperienceById = async (req: Request, res: Response) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience)
      return res.status(404).json({ message: "Experience not found" });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: "Error fetching experience", error: err });
  }
};

// Update experience
export const updateExperience = async (req: Request, res: Response) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExperience)
      return res.status(404).json({ message: "Experience not found" });
    res.json(updatedExperience);
  } catch (err) {
    res.status(500).json({ message: "Error updating experience", error: err });
  }
};

// Delete experience
export const deleteExperience = async (req: Request, res: Response) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience)
      return res.status(404).json({ message: "Experience not found" });
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting experience", error: err });
  }
};
