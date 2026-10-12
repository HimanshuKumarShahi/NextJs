import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
