import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateBooking, getBookingById } from "@/lib/db/repository";
import { notifyOwnerTelegram, notifyUserTelegram } from "@/lib/notify/telegram";
import { sendSMS } from "@/lib/notify/sms";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  const { id } = await params;
  const body = await req.json();

  const booking = updateBooking(id, body);
  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  // Notify on status change
  const action = body.status === "canceled" ? "скасовано" : "оновлено";
  const msg = `Бронювання ${booking.id} ${action}. Ім'я: ${booking.name}`;

  notifyOwnerTelegram(msg).catch(() => {});
  sendSMS(booking.phone, msg).catch(() => {});
  if (booking.telegram) {
    notifyUserTelegram(booking.telegram, msg).catch(() => {});
  }

  return NextResponse.json({ booking });
}
