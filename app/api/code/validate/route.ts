import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AccessCode from "@/models/AccessCode";

export async function POST(req: Request) {
  const { code } = await req.json();
  await connectDB();

  const valid = await AccessCode.findOne({
    code,
    expiresAt: { $gt: new Date() },
  });

  if (!valid) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
