import mongoose, { Schema, Document } from "mongoose";

export interface ILandingPage extends Document {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
  email: string;
  phone?: string;
  location?: string;
  socials: {
    platform: string;
    url: string;
  }[];
}

const LandingPageSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    profileImage: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    socials: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ILandingPage>("LandingPage", LandingPageSchema);
