import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createSlot } from "@/lib/db/repository";

export async function POST(req: NextRequest) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  const body = await req.json();
  const { productId, startAt, endAt } = body;

  if (!productId || !startAt || !endAt) {
    return NextResponse.json(
      { error: "productId, startAt, endAt are required" },
      { status: 400 }
    );
  }

  const slot = createSlot({ productId, startAt, endAt });
  return NextResponse.json({ slot }, { status: 201 });
}
