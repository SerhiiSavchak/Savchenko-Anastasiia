"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Clock, ArrowUpRight } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

const typeLabels: Record<Product["type"], string> = {
  online_practice: "Онлайн-дзвiнок",
  offline_practice: "Офлайн",
  video_lesson: "Вiдеоурок",
};

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onBook: (product: Product) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onBook,
}: ProductDetailModalProps) {
  const isVideo = product.type === "video_lesson";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div
        className="relative bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-muted-foreground hover:text-foreground transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-110"
          aria-label="Закрити"
        >
          <X size={18} strokeWidth={1.2} />
        </button>

        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={product.coverImage}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>

        <div className="p-8 md:p-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-accent">
            {typeLabels[product.type]}
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light mt-3 mb-4 leading-snug">
            {product.title}
          </h2>
          <p className="text-muted-foreground leading-[1.8] text-[15px] max-w-[60ch]">
            {product.fullDescription ?? product.shortDescription}
          </p>

          <div className="flex items-center gap-4 mt-6 text-sm">
            <span className="font-medium">
              {formatPrice(product.price, product.currency)}
            </span>
            <span className="text-accent/40">|</span>
            <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <Clock size={12} strokeWidth={1.2} />
              {product.durationMinutes} хв
            </span>
          </div>

          <div className="mt-8 flex items-center gap-6">
            {isVideo ? (
              <a
                href={product.telegramBotUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-line btn-hover inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-foreground border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background group/btn"
              >
                Перейти в Telegram
                <ArrowUpRight size={12} strokeWidth={1.2} className="transition-transform duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onBook(product);
                }}
                className="hover-line btn-hover text-[11px] uppercase tracking-[0.18em] text-foreground border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background"
              >
                Записатись
              </button>
            )}
            <button
              onClick={onClose}
              className="hover-line text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground"
            >
              Закрити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
