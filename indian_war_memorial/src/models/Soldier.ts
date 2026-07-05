import mongoose, { Schema, Document } from "mongoose";

export interface ISoldier extends Document {
  name: string;
  rank: string;
  regiment: string;
  dateOfBirth?: Date;
  dateOfMartyrdom?: Date;
  medals: string[];
  biography: string;
  imageUrl: string;
  warId?: mongoose.Types.ObjectId;
}

const SoldierSchema = new Schema(
  {
    name: { type: String, required: true },
    rank: { type: String, required: true },
    regiment: { type: String, required: true },
    dateOfBirth: { type: Date },
    dateOfMartyrdom: { type: Date },
    medals: [{ type: String }],
    biography: { type: String, required: true },
    imageUrl: { type: String, required: true },
    warId: { type: Schema.Types.ObjectId, ref: "War" },
  },
  { timestamps: true }
);

export const Soldier = mongoose.models.Soldier || mongoose.model<ISoldier>("Soldier", SoldierSchema);
