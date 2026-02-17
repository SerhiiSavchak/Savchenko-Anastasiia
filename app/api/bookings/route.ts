import { NextRequest, NextResponse } from "next/server";
import { createBooking, getSlotById } from "@/lib/db/repository";
import { notifyOwnerTelegram, notifyUserTelegram } from "@/lib/notify/telegram";
import { sendSMS } from "@/lib/notify/sms";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { slotId, productId, name, phone, email, contactChannel, telegram } =
    body;

  if (!slotId || !productId || !name || !phone) {
    return NextResponse.json(
      { error: "slotId, productId, name, phone are required" },
      { status: 400 }
    );
  }

  const slot = getSlotById(slotId);
  if (!slot || !slot.isAvailable) {
    return NextResponse.json(
      { error: "Slot is not available" },
      { status: 409 }
    );
  }

  const booking = createBooking({
    slotId,
    productId,
    name,
    phone,
    email,
    contactChannel: contactChannel ?? "phone",
    telegram,
  });

  // Notifications (fire-and-forget)
  const ownerMsg = `Нове бронювання!\nІм'я: ${name}\nТелефон: ${phone}\nСлот: ${slot.startAt}`;
  const userMsg = `Дякуємо, ${name}! Ваше бронювання підтверджено на ${new Date(slot.startAt).toLocaleString("uk-UA")}.`;

  notifyOwnerTelegram(ownerMsg).catch(() => {});
  sendSMS(phone, userMsg).catch(() => {});

  if (telegram) {
    notifyUserTelegram(telegram, userMsg).catch(() => {});
  }

  return NextResponse.json({ booking }, { status: 201 });
}
