import { Request, Response } from "express";
import Music from "../types/music.type";

// Get all songs
export const getAllMusic = async (req: Request, res: Response) => {
  try {
    const songs = await Music.find().sort({ createdAt: -1 });
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching music", error: err });
  }
};

// Get single song
export const getMusicById = async (req: Request, res: Response) => {
  try {
    const song = await Music.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: "Error fetching song", error: err });
  }
};

// Create new song
export const createMusic = async (req: Request, res: Response) => {
  try {
    const song = new Music(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(500).json({ message: "Error creating song", error: err });
  }
};

// Update song
export const updateMusic = async (req: Request, res: Response) => {
  try {
    const song = await Music.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: "Error updating song", error: err });
  }
};

// Delete song
export const deleteMusic = async (req: Request, res: Response) => {
  try {
    const song = await Music.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json({ message: "Song deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting song", error: err });
  }
};
