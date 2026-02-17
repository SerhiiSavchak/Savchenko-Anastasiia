import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "UAH"): string {
  return `${price.toLocaleString("uk-UA")} ${currency}`;
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("uk-UA", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}
