import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  location?: string;
}

const ExperienceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
    location: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IExperience>("Experience", ExperienceSchema);
