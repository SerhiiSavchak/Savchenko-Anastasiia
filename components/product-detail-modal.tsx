"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Clock } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

const typeLabels: Record<Product["type"], string> = {
  online_practice: "Онлайн-дзвiнок",
  offline_practice: "Офлайн",
  video_lesson: "Вiдеоурок",
};

const EXTENDED_DESCRIPTION_FALLBACK =
  "Практика для відновлення балансу тіла та розуму. Індивідуальний підхід, увага до деталей та підтримка на кожному етапі. Підходить для початківців та досвідчених практиків. Ми створимо безпечний простір для глибокої роботи з собою, де кожен крок буде підтриманий та осмислений. Сесія включає вступну частину, основну практику та час для питань. Рекомендується зручний одяг та килимок.";

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
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setIsVisible(true), 10);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  function handleClose() {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(onClose, 400);
  }

  const description =
    product.fullDescription ??
    (product.shortDescription
      ? `${product.shortDescription} ${EXTENDED_DESCRIPTION_FALLBACK}`
      : EXTENDED_DESCRIPTION_FALLBACK);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-5">
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{
          opacity: isClosing ? 0 : isVisible ? 1 : 0,
        }}
        onClick={handleClose}
        aria-hidden
      />

      <div
        className="product-detail-modal relative bg-background w-full max-w-[min(672px,calc(100vw-1.5rem))] max-h-[92vh] md:max-h-[85vh] overflow-hidden flex flex-col origin-center transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{
          opacity: isClosing ? 0 : isVisible ? 1 : 0,
          transform: isClosing
            ? "scale(0.92) translateY(12px)"
            : isVisible
              ? "scale(1) translateY(0)"
              : "scale(0.92) translateY(12px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: image + close button */}
        <div className="relative flex-shrink-0">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] min-[1100px]:aspect-[2.5/1] overflow-hidden">
            <Image
              src={product.coverImage}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1100px) 672px, 672px"
            />
          </div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 cursor-pointer text-muted-foreground hover:text-foreground transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-110"
            aria-label="Закрити"
          >
            <X size={18} strokeWidth={1.2} />
          </button>
        </div>

        {/* Content wrapper: header block + scrollable body + footer */}
        <div className="flex flex-col flex-1 min-h-0 min-w-0">
          {/* Header block (title) — fixed */}
          <div className="flex-shrink-0 px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4 min-[1100px]:py-4 min-[1280px]:px-8 min-[1280px]:py-5 min-[1440px]:px-10 min-[1440px]:py-6 border-b border-border/60">
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent">
              {typeLabels[product.type]}
            </span>
            <h2 className="font-serif text-lg sm:text-xl md:text-xl min-[1100px]:text-2xl font-light mt-1 leading-tight break-words">
              {product.title}
            </h2>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overflow-x-hidden modal-desc-scroll">
            <div className="px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4 min-[1100px]:py-4 min-[1280px]:px-8 min-[1280px]:py-5 min-[1440px]:px-10 min-[1440px]:py-6">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2 flex-shrink-0">
                Опис послуги
              </h3>
              <p className="text-muted-foreground leading-[1.8] text-[14px] sm:text-[15px] md:text-base max-w-[65ch] break-words">
                {description}
              </p>
            </div>
          </div>

          {/* Footer: meta + CTA — fixed, always visible */}
          <div className="flex-shrink-0 px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-4 min-[1100px]:py-4 min-[1280px]:px-8 min-[1280px]:py-5 min-[1440px]:px-10 min-[1440px]:py-6 border-t border-border/60 flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-4 text-sm flex-shrink-0">
              <span className="font-medium">
                {formatPrice(product.price, product.currency)}
              </span>
              <span className="text-accent/40">|</span>
              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <Clock size={12} strokeWidth={1.2} />
                {product.durationMinutes} хв
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {isVideo ? (
              <a
                href={product.telegramBotUrl ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover cursor-pointer inline-flex items-center justify-center text-[9px] min-[400px]:text-[10px] uppercase tracking-[0.06em] min-[400px]:tracking-[0.08em] text-foreground border border-foreground px-2.5 py-1.5 min-[400px]:px-3 min-[400px]:py-2 transition-colors hover:bg-foreground hover:text-background active:bg-foreground active:text-background focus-visible:bg-foreground focus-visible:text-background whitespace-nowrap"
              >
                <span className="hidden min-[1280px]:inline">Перейти в Telegram</span>
                <span className="min-[1280px]:hidden">Telegram</span>
              </a>
            ) : (
              <button
                onClick={() => {
                  handleClose();
                  onBook(product);
                }}
                className="btn-hover cursor-pointer text-[11px] uppercase tracking-[0.18em] text-foreground border border-foreground px-6 py-3 transition-colors hover:bg-foreground hover:text-background active:bg-foreground active:text-background focus-visible:bg-foreground focus-visible:text-background"
              >
                Записатись
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer text-[11px] uppercase tracking-[0.15em] text-muted-foreground border border-border px-4 py-2 transition-colors hover:text-background hover:border-foreground hover:bg-foreground active:text-background active:border-foreground active:bg-foreground focus-visible:text-background focus-visible:border-foreground focus-visible:bg-foreground"
            >
              Закрити
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
