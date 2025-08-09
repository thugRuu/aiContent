import { Request, Response } from "express";
import Showcase from "../types/showcase.type";

// Get all showcase images
export const getAllShowcases = async (req: Request, res: Response) => {
  try {
    const showcases = await Showcase.find().sort({ createdAt: -1 });
    res.json(showcases);
  } catch (err) {
    res.status(500).json({ message: "Error fetching showcases", error: err });
  }
};

// Get single showcase image
export const getShowcaseById = async (req: Request, res: Response) => {
  try {
    const showcase = await Showcase.findById(req.params.id);
    if (!showcase)
      return res.status(404).json({ message: "Showcase not found" });
    res.json(showcase);
  } catch (err) {
    res.status(500).json({ message: "Error fetching showcase", error: err });
  }
};

// Create new showcase image
export const createShowcase = async (req: Request, res: Response) => {
  try {
    const showcase = new Showcase(req.body);
    await showcase.save();
    res.status(201).json(showcase);
  } catch (err) {
    res.status(500).json({ message: "Error creating showcase", error: err });
  }
};

// Update showcase image
export const updateShowcase = async (req: Request, res: Response) => {
  try {
    const showcase = await Showcase.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!showcase)
      return res.status(404).json({ message: "Showcase not found" });
    res.json(showcase);
  } catch (err) {
    res.status(500).json({ message: "Error updating showcase", error: err });
  }
};

// Delete showcase image
export const deleteShowcase = async (req: Request, res: Response) => {
  try {
    const showcase = await Showcase.findByIdAndDelete(req.params.id);
    if (!showcase)
      return res.status(404).json({ message: "Showcase not found" });
    res.json({ message: "Showcase deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting showcase", error: err });
  }
};

export const getAllShowcasesByCategory = async (req: Request, res: Response) => {
  try {
    const showcases = await Showcase.findOne({category:req.params.categories})
    if (!showcases){
         return res.status(404).json({ message: "Showcase not found" });
    }
    return res.json(showcases);

  } catch (err) {
    res.status(500).json({ message: "Error fetching showcases", error: err });
  }
};

export const getShowcaseCategories = async (req: Request, res: Response) => {
  try {
    // Get distinct categories from the collection
    const categories = await Showcase.distinct("category");

    // Filter out null or empty categories if you want
    const filteredCategories = categories.filter(
      (cat) => cat && cat.trim() !== ""
    );

    res.json(filteredCategories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories", error: err });
  }
};