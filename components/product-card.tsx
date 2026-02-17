"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Clock } from "lucide-react";

const typeLabels: Record<Product["type"], string> = {
  online_practice: "Онлайн-дзвiнок",
  offline_practice: "Офлайн",
  video_lesson: "Вiдеоурок",
};

interface ProductCardProps {
  product: Product;
  onBook: (product: Product) => void;
  onDetail: (product: Product) => void;
}

export function ProductCard({
  product,
  onBook,
  onDetail,
}: ProductCardProps) {
  const isVideo = product.type === "video_lesson";

  function handleCardClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest("a") || target.closest("button")) return;
    onDetail(product);
  }

  return (
    <article
      onClick={handleCardClick}
      className="group cursor-pointer flex flex-col card-hover"
    >
      {/* Image — editorial catalog cover */}
      <div className="relative aspect-[4/5] overflow-hidden mb-4">
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          className="object-cover img-hover"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content — no heavy box, editorial feel */}
      <div className="flex flex-col flex-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {typeLabels[product.type]}
        </span>
        <h3 className="font-serif text-xl md:text-2xl font-light mt-2 mb-2 leading-snug group-hover:text-accent transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]">
          {product.title}
        </h3>
        <p
          className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4"
          style={{ maxWidth: "60ch" }}
        >
          {product.shortDescription}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Clock size={12} strokeWidth={1.2} />
            {product.durationMinutes} хв
          </span>
          <span className="text-accent/40">|</span>
          <span className="font-medium">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>

        {/* CTA — text link or minimal button */}
        {isVideo ? (
          <a
            href={product.telegramBotUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="hover-line text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground self-start mt-auto"
          >
            Перейти в Telegram
          </a>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBook(product);
            }}
            className="hover-line text-[11px] uppercase tracking-[0.18em] text-foreground self-start mt-auto"
          >
            Записатись
          </button>
        )}
      </div>
    </article>
  );
}
