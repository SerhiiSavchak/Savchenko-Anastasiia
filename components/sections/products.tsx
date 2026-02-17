"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product-card";
import { BookingModal } from "@/components/booking-modal";

type FilterTab = "all" | "online" | "offline" | "video";

const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "Усi" },
  { key: "online", label: "Онлайн" },
  { key: "offline", label: "Офлайн" },
  { key: "video", label: "Вiдеоуроки" },
];

function matchesTab(product: Product, tab: FilterTab): boolean {
  if (tab === "all") return true;
  if (tab === "online") return product.type === "online_practice";
  if (tab === "offline") return product.type === "offline_practice";
  if (tab === "video") return product.type === "video_lesson";
  return true;
}

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [bookingProduct, setBookingProduct] = useState<Product | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.directionTag) set.add(p.directionTag);
    });
    return Array.from(set);
  }, [products]);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          matchesTab(p, activeTab) &&
          (!activeTag || p.directionTag === activeTag)
      ),
    [products, activeTab, activeTag]
  );

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

        {/* Filter tabs -- quiet text links, not buttons */}
        <div className="reveal flex flex-wrap items-center gap-6 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setActiveTag(null);
              }}
              className={`text-[11px] uppercase tracking-[0.18em] transition-colors ${
                activeTab === tab.key
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Direction tags */}
        {tags.length > 0 && (
          <div className="reveal flex flex-wrap items-center gap-4 mb-16">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-[10px] uppercase tracking-[0.15em] transition-colors ${
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

        {/* Catalog spread -- alternating layouts */}
        <div className="flex flex-col gap-20 md:gap-28">
          {filtered.map((product, i) => (
            <div key={product.id}>
              {i > 0 && <div className="h-px bg-border mb-20 md:mb-28" />}
              <div
                className={`${
                  i % 3 === 0
                    ? "md:max-w-[70%]"
                    : i % 3 === 1
                    ? "md:max-w-[70%] md:ml-auto"
                    : "md:max-w-[55%] md:mx-auto"
                }`}
              >
                <ProductCard
                  product={product}
                  onBook={setBookingProduct}
                  layout={i % 2 === 0 ? "landscape" : "portrait"}
                />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-16 text-sm">
            Немає послуг у цiй категорiї.
          </p>
        )}
      </div>

      {/* Booking Modal */}
      {bookingProduct && (
        <BookingModal
          product={bookingProduct}
          onClose={() => setBookingProduct(null)}
        />
      )}
    </section>
  );
}
