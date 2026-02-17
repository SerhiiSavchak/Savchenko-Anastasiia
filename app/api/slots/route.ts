import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/db/repository";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "productId is required" },
      { status: 400 }
    );
  }

  const from = searchParams.get("from") ?? undefined;
  const to = searchParams.get("to") ?? undefined;

  const slots = getAvailableSlots(Number(productId), from, to);
  return NextResponse.json({ slots });
}
