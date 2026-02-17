"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product-card";
import { BookingModal } from "@/components/booking-modal";
import { ProductDetailModal } from "@/components/product-detail-modal";

type MainFilter = "all" | "online" | "offline";
type OnlineSubFilter = "calls" | "video" | "all";

const mainTabs: { key: MainFilter; label: string }[] = [
  { key: "all", label: "Усi" },
  { key: "online", label: "Онлайн" },
  { key: "offline", label: "Офлайн" },
];

const onlineSubChips: { key: OnlineSubFilter; label: string }[] = [
  { key: "all", label: "Усi" },
  { key: "calls", label: "Онлайн-дзвiнки" },
  { key: "video", label: "Вiдеоуроки" },
];

function matchesMainFilter(product: Product, filter: MainFilter): boolean {
  if (filter === "all") return true;
  if (filter === "online")
    return product.type === "online_practice" || product.type === "video_lesson";
  if (filter === "offline") return product.type === "offline_practice";
  return true;
}

function matchesOnlineSubFilter(
  product: Product,
  subFilter: OnlineSubFilter
): boolean {
  if (subFilter === "all") return true;
  if (subFilter === "calls") return product.type === "online_practice";
  if (subFilter === "video") return product.type === "video_lesson";
  return true;
}

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  const [mainFilter, setMainFilter] = useState<MainFilter>("all");
  const [onlineSubFilter, setOnlineSubFilter] = useState<OnlineSubFilter>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [bookingProduct, setBookingProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.directionTag) set.add(p.directionTag);
    });
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (!matchesMainFilter(p, mainFilter)) return false;
      if (mainFilter === "online" && !matchesOnlineSubFilter(p, onlineSubFilter))
        return false;
      if (activeTag && p.directionTag !== activeTag) return false;
      return true;
    });
  }, [products, mainFilter, onlineSubFilter, activeTag]);

  return (
    <section id="products" className="py-32 md:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="reveal">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Каталог
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-5 mb-12">
            Послуги
          </h2>
        </div>

        {/* Main filter tabs */}
        <div className="reveal flex flex-wrap items-center gap-6 mb-4">
          {mainTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setMainFilter(tab.key);
                setActiveTag(null);
              }}
              className={`text-[11px] uppercase tracking-[0.18em] transition-colors border-b-2 border-transparent pb-1 ${
                mainFilter === tab.key
                  ? "text-foreground border-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Online sub-filter (chips) — only when mainFilter is online */}
        {mainFilter === "online" && (
          <div className="reveal flex flex-wrap items-center gap-3 mb-8">
            {onlineSubChips.map((chip) => (
              <button
                key={chip.key}
                onClick={() => setOnlineSubFilter(chip.key)}
                className={`text-[10px] uppercase tracking-[0.15em] transition-colors px-3 py-1.5 ${
                  onlineSubFilter === chip.key
                    ? "text-foreground border border-foreground"
                    : "text-muted-foreground/70 border border-transparent hover:text-foreground hover:border-border"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* Direction tags — optional, compact */}
        {tags.length > 0 && (
          <div className="reveal flex flex-wrap items-center gap-3 mb-12">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setActiveTag(activeTag === tag ? null : tag)
                }
                className={`text-[10px] uppercase tracking-[0.12em] transition-colors ${
                  activeTag === tag
                    ? "text-foreground"
                    : "text-muted-foreground/60 hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Card grid — editorial catalog style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
          {filtered.map((product, i) => (
            <div key={product.id} className="reveal" style={{ transitionDelay: `${i * 50}ms` }}>
              <ProductCard
                product={product}
                onBook={setBookingProduct}
                onDetail={setDetailProduct}
              />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="reveal text-center text-muted-foreground mt-16 text-sm">
            Немає послуг у цiй категорiї.
          </p>
        )}
      </div>

      {bookingProduct && (
        <BookingModal
          product={bookingProduct}
          onClose={() => setBookingProduct(null)}
        />
      )}

      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onBook={setBookingProduct}
        />
      )}
    </section>
  );
}
