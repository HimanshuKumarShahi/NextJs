import mongoose, { Schema, Document, Model } from "mongoose";

// ================= USER SCHEMA =================
export interface IUser extends Document {
  userId: string;
  displayName: string;
  profilePicUrl?: string;
  lastSeen?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      required: [true, "userId is required"],
      unique: true,
      index: true,
      trim: true,
    },
    displayName: {
      type: String,
      required: [true, "displayName is required"],
      trim: true,
    },
    profilePicUrl: {
      type: String,
      default: "",
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// ================= MESSAGE SCHEMA =================
export interface IMessage extends Document {
  senderId: string;
  senderName: string;
  text: string;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: String,
      required: [true, "senderId is required"],
      index: true,
      trim: true,
    },
    senderName: {
      type: String,
      required: [true, "senderName is required"],
      trim: true,
    },
    text: {
      type: String,
      required: [true, "text message is required"],
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", UserSchema);

export const Message: Model<IMessage> =
  (mongoose.models.Message as Model<IMessage>) ||
  mongoose.model<IMessage>("Message", MessageSchema);

export default { User, Message };
