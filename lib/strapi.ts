import type { Product, VIPItem } from "@/types";
import { placeholderProducts, placeholderVIPItems } from "@/lib/config/placeholder-data";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

async function strapiFetch<T>(path: string): Promise<T | null> {
  if (!STRAPI_URL) return null;

  try {
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      headers: {
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

function mapStrapiProduct(item: Record<string, unknown>): Product {
  const attrs = (item.attributes ?? item) as Record<string, unknown>;
  return {
    id: item.id as number,
    title: attrs.title as string,
    slug: attrs.slug as string,
    type: attrs.type as Product["type"],
    shortDescription: attrs.shortDescription as string,
    fullDescription: attrs.fullDescription as string | undefined,
    durationMinutes: attrs.durationMinutes as number,
    price: attrs.price as number,
    currency: (attrs.currency as string) ?? "UAH",
    coverImage: attrs.coverImage as string,
    gallery: attrs.gallery as string[] | undefined,
    videoUrl: attrs.videoUrl as string | undefined,
    isFeatured: attrs.isFeatured as boolean,
    directionTag: attrs.directionTag as string | undefined,
    bookingRequired: attrs.bookingRequired as boolean,
    telegramBotUrl: attrs.telegramBotUrl as string | undefined,
  };
}

function mapStrapiVIPItem(item: Record<string, unknown>): VIPItem {
  const attrs = (item.attributes ?? item) as Record<string, unknown>;
  return {
    id: item.id as number,
    title: attrs.title as string,
    slug: attrs.slug as string,
    type: attrs.type as VIPItem["type"],
    shortDescription: attrs.shortDescription as string,
    price: attrs.price as string | undefined,
    format: attrs.format as VIPItem["format"],
    coverImage: attrs.coverImage as string,
    details: attrs.details as string,
    callToActionLabel: attrs.callToActionLabel as string,
    contactPreference: attrs.contactPreference as string | undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  const data = await strapiFetch<Record<string, unknown>[]>(
    "/products?populate=*&sort=createdAt:desc"
  );
  if (data) return data.map(mapStrapiProduct);
  return placeholderProducts;
}

export async function getVIPItems(): Promise<VIPItem[]> {
  const data = await strapiFetch<Record<string, unknown>[]>(
    "/vip-items?populate=*&sort=createdAt:desc"
  );
  if (data) return data.map(mapStrapiVIPItem);
  return placeholderVIPItems;
}
