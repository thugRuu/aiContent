import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  status: "draft" | "published";
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    image: { type: String, required: true },
    githubUrl: { type: String },
    liveUrl: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true }
);

const Project: Model<IProject> = mongoose.model<IProject>(
  "Project",
  projectSchema
);
export default Project;
