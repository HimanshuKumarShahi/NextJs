import mongoose, { Schema } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  email: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Username is required."],
    unique: true,
  },
});

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);
export default User;