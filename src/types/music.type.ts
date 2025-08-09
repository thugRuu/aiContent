import mongoose, { Schema, Document } from "mongoose";

export interface IMusic extends Document {
  title: string;
  artist: string;
  album?: string;
  coverImage: string;
  audioUrl: string;
  genre?: string;
  releaseDate?: Date;
}

const MusicSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String },
    coverImage: { type: String, required: true }, // Image URL
    audioUrl: { type: String, required: true }, // MP3/OGG/WAV file URL
    genre: { type: String },
    releaseDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IMusic>("Music", MusicSchema);
