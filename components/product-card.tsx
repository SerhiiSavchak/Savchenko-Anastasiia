"use client";

import Image from "next/image";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Clock, ExternalLink } from "lucide-react";

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
    <article className="group flex flex-col bg-background transition-colors hover:bg-muted/50">
      <div className="relative overflow-hidden aspect-[3/2]">
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-[0.15em]">
          {typeLabels[product.type]}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-6 md:p-8">
        <h3 className="font-serif text-xl md:text-2xl font-light mb-3 text-balance">{product.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-base font-medium">
              {formatPrice(product.price, product.currency)}
            </span>
            <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Clock size={13} strokeWidth={1.2} />
              {product.durationMinutes} хв
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-foreground/10">
          {isVideo ? (
            <a
              href={product.telegramBotUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-micro inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-foreground/60 hover:text-foreground hover-line"
            >
              Перейти до Telegram
              <ExternalLink size={13} strokeWidth={1.2} />
            </a>
          ) : (
            <button
              onClick={() => onBook(product)}
              className="btn-micro bg-foreground text-background px-6 py-3 text-xs uppercase tracking-[0.15em] w-full"
            >
              Записатись
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
