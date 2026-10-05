import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return Response.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 },
    );
  }

  const user: User = session.user as User;

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const userMessages = await UserModel.aggregate([
      // 1. Match the specific user
      { $match: { _id: userId } },

      // 2. Deconstruct the messages array so we can sort individual message objects
      { $unwind: "$messages" },

      // 3. Sort messages by their creation date in descending order (newest first)
      { $sort: { "messages.createdAt": -1 } },

      // 4. Re-group them back into a single document holding the sorted array
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);


    if (!userMessages || userMessages.length === 0) {
      return Response.json({ success: true, messages: [] }, { status: 200 });
    }

    return Response.json(
      {
        success: true,
        messages: userMessages[0].messages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "An unexpected error occurred while fetching messages:",
      error,
    );
    return Response.json(
      { success: false, message: "Error fetching messages" },
      { status: 500 },
    );
  }
}
