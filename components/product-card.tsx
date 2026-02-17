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
    <article className="group flex flex-col border border-border transition-colors hover:bg-muted/50">
      <div className="relative overflow-hidden aspect-[3/2]">
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 text-xs tracking-wide">
          {typeLabels[product.type]}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-serif text-lg mb-2 text-balance">{product.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="font-medium">
              {formatPrice(product.price, product.currency)}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Clock size={14} strokeWidth={1.5} />
              {product.durationMinutes} хв
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          {isVideo ? (
            <a
              href={product.telegramBotUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-micro inline-flex items-center gap-2 text-sm text-accent hover-line"
            >
              Перейти до Telegram
              <ExternalLink size={14} strokeWidth={1.5} />
            </a>
          ) : (
            <button
              onClick={() => onBook(product)}
              className="btn-micro bg-foreground text-background px-6 py-2.5 text-sm tracking-wide w-full"
            >
              Записатись
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
