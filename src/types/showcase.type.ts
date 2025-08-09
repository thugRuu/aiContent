import mongoose, { Schema, Document } from "mongoose";

export interface IShowcase extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  category?: string; // e.g., "Landing", "Gallery", "Hero"
}

const ShowcaseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: true }
);


export default mongoose.model<IShowcase>("Showcase", ShowcaseSchema);
