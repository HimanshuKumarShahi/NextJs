import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Schema";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "100", 10);

    // Retrieve last N messages in chronological order
    const messages = await Message.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    // Reverse to chronological order (oldest to newest)
    const sortedMessages = messages.reverse();

    return NextResponse.json({ success: true, messages: sortedMessages }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages", details: message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { senderId, senderName, text } = body;

    if (!senderId || !senderName || !text) {
      return NextResponse.json(
        { error: "senderId, senderName, and text are required" },
        { status: 400 }
      );
    }

    const newMessage = await Message.create({
      senderId,
      senderName,
      text,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "Failed to save message", details: message },
      { status: 500 }
    );
  }
}
