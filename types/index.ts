/* ── Strapi Content Types ── */

export type ProductType = "online_practice" | "offline_practice" | "video_lesson";

export interface Product {
  id: number;
  title: string;
  slug: string;
  type: ProductType;
  shortDescription: string;
  fullDescription?: string;
  durationMinutes: number;
  price: number;
  currency: string;
  coverImage: string;
  gallery?: string[];
  videoUrl?: string;
  isFeatured: boolean;
  directionTag?: string;
  bookingRequired: boolean;
  telegramBotUrl?: string;
}

export type VIPItemType = "retreat" | "mentoring";
export type VIPFormat = "offline" | "online" | "hybrid";

export interface VIPItem {
  id: number;
  title: string;
  slug: string;
  type: VIPItemType;
  shortDescription: string;
  price?: string;
  format: VIPFormat;
  coverImage: string;
  details: string;
  callToActionLabel: string;
  contactPreference?: string;
}

/* ── Booking Types ── */

export interface Slot {
  id: string;
  productId: number;
  startAt: string;
  endAt: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  slotId: string;
  productId: number;
  name: string;
  phone: string;
  email?: string;
  contactChannel: string;
  telegram?: string;
  status: "pending" | "confirmed" | "canceled";
  createdAt: string;
}

/* ── Static Section Types ── */

export interface ExpertiseStat {
  value: string;
  label: string;
}

export interface ContactInfo {
  telegram: string;
  instagram: string;
  phone: string;
  email: string;
}
