"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Clock, ArrowUpRight } from "lucide-react";

const typeLabels: Record<Product["type"], string> = {
  online_practice: "Онлайн",
  offline_practice: "Офлайн",
  video_lesson: "Вiдеоурок",
};

interface ProductCardProps {
  product: Product;
  onBook: (product: Product) => void;
  layout?: "landscape" | "portrait";
}

export function ProductCard({
  product,
  onBook,
  layout = "portrait",
}: ProductCardProps) {
  const isVideo = product.type === "video_lesson";
  const isLandscape = layout === "landscape";

  return (
    <article
      className={`group flex ${
        isLandscape ? "flex-col md:flex-row gap-8 md:gap-12" : "flex-col gap-6"
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          isLandscape
            ? "md:w-2/5 shrink-0 aspect-[4/3]"
            : "w-full aspect-[4/5]"
        }`}
      >
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes={
            isLandscape
              ? "(max-width: 768px) 100vw, 40vw"
              : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          }
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center flex-1">
        <span className="text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
          {typeLabels[product.type]}
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-light mb-3 text-balance leading-snug">
          {product.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-sm">
          {product.shortDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          <span className="font-medium">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="text-accent/40">|</span>
          <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Clock size={12} strokeWidth={1.2} />
            {product.durationMinutes} хв
          </span>
        </div>

        {/* Action -- text link, not a button */}
        {isVideo ? (
          <a
            href={product.telegramBotUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-line inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors self-start"
          >
            Telegram
            <ArrowUpRight size={12} strokeWidth={1.2} />
          </a>
        ) : (
          <button
            onClick={() => onBook(product)}
            className="hover-line text-[11px] uppercase tracking-[0.18em] text-foreground self-start"
          >
            Записатись
          </button>
        )}
      </div>
    </article>
  );
}
