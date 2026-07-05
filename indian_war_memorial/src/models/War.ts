import mongoose, { Schema, Document } from "mongoose";

export interface IWar extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  heroImageUrl?: string;
}

const WarSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    location: { type: String, required: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    heroImageUrl: { type: String },
  },
  { timestamps: true }
);

export const War = mongoose.models.War || mongoose.model<IWar>("War", WarSchema);
