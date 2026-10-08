import { GoogleGenAI } from "@google/genai";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json().catch(() => ({}));
    const username = body.username;

    if (!username) {
      return NextResponse.json(
        { success: false, message: "Username is required" },
        { status: 400 },
      );
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (!user.isAcceptingMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "This user is not accepting messages right now.",
        },
        { status: 403 },
      );
    }

    const prompt =
      `You are generating anonymous message ideas for a user named "${username}". ` +
      `Based on the fact that this is an anonymous feedback platform, create 3 short, unique, and highly intriguing questions specifically tailored to ask "${username}". ` +
      `Format exactly as a single string separated by '||'. No quotes, no numbers, no bullet points.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
    });

    const text = response.text;

    return NextResponse.json({ success: true, message: text }, { status: 200 });
  } catch (error) {
    console.error("Gemini AI Error:", error);

    const fallbackMessages =
      "If you could travel anywhere tomorrow, where would it be?||What is a hidden talent you have?||What's the best advice you've ever received?";

    return NextResponse.json(
      { success: true, message: fallbackMessages },
      { status: 200 },
    );
  }
}
