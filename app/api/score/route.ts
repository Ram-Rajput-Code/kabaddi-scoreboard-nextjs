import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Score from "@/models/Score";

export async function POST(req: Request) {
  const { teamA, teamB } = await req.json();
  await connectDB();

  const score = await Score.findOneAndUpdate(
    {},
    { teamA, teamB },
    { upsert: true, new: true }
  );

  return NextResponse.json(score);
}
