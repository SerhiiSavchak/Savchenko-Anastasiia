"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product-card";
import { BookingModal } from "@/components/booking-modal";

type FilterTab = "all" | "online" | "offline" | "video";

const tabs: { key: FilterTab; label: string }[] = [
  { key: "all", label: "Усі" },
  { key: "online", label: "Онлайн" },
  { key: "offline", label: "Офлайн" },
  { key: "video", label: "Відеоуроки" },
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
    <section id="products" className="py-28 md:py-40 bg-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Каталог
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-4">Послуги</h2>
        </div>

        {/* Tabs */}
        <div className="reveal flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setActiveTag(null);
              }}
              className={`px-6 py-2.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                activeTab === tab.key
                  ? "bg-foreground text-background"
                  : "border border-foreground/15 text-muted-foreground hover:text-foreground hover:border-foreground/40"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Direction tag chips */}
        {tags.length > 0 && (
          <div className="reveal flex flex-wrap justify-center gap-2 mb-12">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.1em] transition-colors ${
                  activeTag === tag
                    ? "bg-accent text-accent-foreground"
                    : "border border-foreground/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/10">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBook={setBookingProduct}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-8 text-sm">
            Немає послуг у цій категорії.
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
