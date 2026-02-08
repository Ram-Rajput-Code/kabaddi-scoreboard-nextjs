import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import AccessCode from "@/models/AccessCode";
import { generateCode } from "@/lib/generateCode";

export async function POST() {
  await connectDB();

  const code = generateCode();
  const expiresAt = new Date(Date.now() + 84 * 60 * 60 * 1000);

  await AccessCode.create({ code, expiresAt });

  return NextResponse.json({ code, expiresAt });
}
