import { Request, Response } from "express";
import prisma from "../lib/prisma";


// Create Profile
export const createProfile = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      fullName,
      bio,
      jobTitle,
      company,
      location,
      website,
      imageUrl,
      socialLinks,
      jsonLD,
    } = req.body;

    const profile = await prisma.profile.create({
      data: {
        userId,
        fullName,
        bio,
        jobTitle,
        company,
        location,
        website,
        imageUrl,
        socialLinks,
        jsonLD,
      },
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error creating profile", error });
  }
};

// Get All Profiles
export const getProfiles = async (_req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        user: true,
        expertise: true,
        comments: true,
      },
    });
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profiles", error });
  }
};

// Get Profile by ID
export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = (req.params);
    const profile = await prisma.profile.findUnique({
      where: { userId:String(id) },
      include: {
        user: true,
        expertise: true,
        comments: true,
      },
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Update Profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProfile = await prisma.profile.update({
      where:{ userId:String(id)},
      data: req.body,
    });

    res.json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error updating profile", error });
  }
};

// Delete Profile
export const deleteProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.profile.delete({
      where: { userId: String(id) },
    });

    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting profile", error });
  }
};
