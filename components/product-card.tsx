"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Clock, ArrowUpRight } from "lucide-react";

const typeLabels: Record<Product["type"], string> = {
  online_practice: "Онлайн",
  offline_practice: "Офлайн",
  video_lesson: "Відеоурок",
};

interface ProductCardProps {
  product: Product;
  onBook: (product: Product) => void;
}

export function ProductCard({ product, onBook }: ProductCardProps) {
  const isVideo = product.type === "video_lesson";

  return (
    <article className="group flex flex-col bg-background">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/2]">
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[9px] uppercase tracking-[0.2em]">
          {typeLabels[product.type]}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <h3 className="font-serif text-xl md:text-2xl mb-3 text-balance">{product.title}</h3>
        <p className="text-sm text-foreground/50 leading-relaxed flex-1 mb-6">
          {product.shortDescription}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-base font-medium">
            {formatPrice(product.price, product.currency)}
          </span>
          <span className="w-px h-3 bg-foreground/15" />
          <span className="flex items-center gap-1.5 text-foreground/40 text-xs">
            <Clock size={12} strokeWidth={1.2} />
            {product.durationMinutes} хв
          </span>
        </div>

        {/* Action */}
        <div className="pt-6 border-t border-foreground/10">
          {isVideo ? (
            <a
              href={product.telegramBotUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground transition-colors hover-line"
            >
              Telegram
              <ArrowUpRight size={12} strokeWidth={1.2} />
            </a>
          ) : (
            <button
              onClick={() => onBook(product)}
              className="w-full bg-foreground text-background py-3.5 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
            >
              Записатись
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
