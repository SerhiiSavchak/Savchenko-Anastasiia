import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateSlot } from "@/lib/db/repository";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  const { id } = await params;
  const body = await req.json();

  const slot = updateSlot(id, body);
  if (!slot) {
    return NextResponse.json({ error: "Slot not found" }, { status: 404 });
  }

  return NextResponse.json({ slot });
}
