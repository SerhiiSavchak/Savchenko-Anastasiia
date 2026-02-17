import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

/**
 * Stub admin auth. Checks Authorization: Bearer <password> header.
 * Replace with proper auth (NextAuth, etc.) in production.
 */
export function requireAdmin(req: NextRequest): NextResponse | null {
  const auth = req.headers.get("authorization");
  const token = auth?.replace("Bearer ", "");

  if (token !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
