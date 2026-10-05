import { GoogleGenAI } from "@google/genai";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username } = await request.json();

    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (!user.isAcceptingMessage) {
      return Response.json(
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

    return Response.json({ success: true, message: text }, { status: 200 });
  } catch (error) {
    console.error("Error generating personalized messages:", error);
    return Response.json(
      { success: false, message: "Failed to generate message suggestions." },
      { status: 500 },
    );
  }
}
