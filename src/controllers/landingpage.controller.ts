import { Request, Response } from "express";
import LandingPage from "../types/landingpage.type";

// Get landing page with related data
export const getLandingPage = async (req: Request, res: Response) => {
  try {
    const landingPage = await LandingPage.findOne();

    if (!landingPage) {
      return res.status(404).json({ message: "Landing page not found" });
    }
    res.json({
      landingPage,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching landing page", error: err });
  }
};

//Create or update landing page
export const upsertLandingPage = async (req: Request, res: Response) => {
  try {
    const landingPage = await LandingPage.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });

    res.status(200).json(landingPage);
  } catch (err) {
    res.status(500).json({ message: "Error saving landing page", error: err });
  }
};
