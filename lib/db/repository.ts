/**
 * In-memory repository. Ready to swap to Prisma/Postgres.
 * Each collection is a simple Map keyed by id.
 */
import type { Slot, Booking } from "@/types";
import { placeholderSlots } from "@/lib/config/placeholder-data";

/* ── In-memory stores (reset on server restart) ── */
const slots: Map<string, Slot> = new Map(
  placeholderSlots.map((s) => [s.id, { ...s }])
);
const bookings: Map<string, Booking> = new Map();

let slotCounter = placeholderSlots.length;
let bookingCounter = 0;

/* ── Slots ── */

export function getAvailableSlots(
  productId: number,
  from?: string,
  to?: string
): Slot[] {
  const result: Slot[] = [];
  for (const slot of slots.values()) {
    if (slot.productId !== productId) continue;
    if (!slot.isAvailable) continue;
    if (from && new Date(slot.startAt) < new Date(from)) continue;
    if (to && new Date(slot.endAt) > new Date(to)) continue;
    result.push(slot);
  }
  return result.sort(
    (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
  );
}

export function getSlotById(id: string): Slot | undefined {
  return slots.get(id);
}

export function createSlot(
  data: Omit<Slot, "id" | "isAvailable">
): Slot {
  slotCounter++;
  const slot: Slot = { ...data, id: `s${slotCounter}`, isAvailable: true };
  slots.set(slot.id, slot);
  return slot;
}

export function updateSlot(
  id: string,
  updates: Partial<Pick<Slot, "startAt" | "endAt" | "isAvailable">>
): Slot | null {
  const slot = slots.get(id);
  if (!slot) return null;
  Object.assign(slot, updates);
  return slot;
}

/* ── Bookings ── */

export function createBooking(
  data: Omit<Booking, "id" | "status" | "createdAt">
): Booking {
  bookingCounter++;
  const booking: Booking = {
    ...data,
    id: `b${bookingCounter}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  bookings.set(booking.id, booking);

  // Mark slot as unavailable
  const slot = slots.get(data.slotId);
  if (slot) slot.isAvailable = false;

  return booking;
}

export function getBookingById(id: string): Booking | undefined {
  return bookings.get(id);
}

export function updateBooking(
  id: string,
  updates: Partial<Pick<Booking, "status" | "slotId">>
): Booking | null {
  const booking = bookings.get(id);
  if (!booking) return null;

  // If rescheduling, free old slot and occupy new
  if (updates.slotId && updates.slotId !== booking.slotId) {
    const oldSlot = slots.get(booking.slotId);
    if (oldSlot) oldSlot.isAvailable = true;
    const newSlot = slots.get(updates.slotId);
    if (newSlot) newSlot.isAvailable = false;
  }

  // If canceling, free the slot
  if (updates.status === "canceled") {
    const slot = slots.get(booking.slotId);
    if (slot) slot.isAvailable = true;
  }

  Object.assign(booking, updates);
  return booking;
}

export function getAllSlots(): Slot[] {
  return Array.from(slots.values());
}

export function getAllBookings(): Booking[] {
  return Array.from(bookings.values());
}
