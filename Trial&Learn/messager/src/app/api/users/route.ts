import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/Schema";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, displayName, profilePicUrl } = body;

    if (!userId || !displayName) {
      return NextResponse.json(
        { error: "userId and displayName are required" },
        { status: 400 }
      );
    }

    const user = await User.findOneAndUpdate(
      { userId },
      {
        userId,
        displayName,
        profilePicUrl: profilePicUrl || "",
        lastSeen: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: "Failed to save user", details: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).sort({ updatedAt: -1 }).limit(50);
    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users", details: message },
      { status: 500 }
    );
  }
}
