"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import type { Product } from "@/types";
import { ProductCard } from "@/components/product-card";
import { BookingModal } from "@/components/booking-modal";
import { ProductDetailModal } from "@/components/product-detail-modal";
import { useMediaQuery } from "@/hooks/use-media-query";

const MOBILE_LIMIT = 6;

type MainFilter = "all" | "online" | "offline";
type OnlineSubFilter = "calls" | "video" | "all";

const mainTabs: { key: MainFilter; label: string }[] = [
  { key: "all", label: "Усi" },
  { key: "online", label: "Онлайн" },
  { key: "offline", label: "Офлайн" },
];

const onlineSubChips: { key: OnlineSubFilter; label: string }[] = [
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
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const isMobile = useMediaQuery("(max-width: 640px)");
  const scrollYRef = useRef<number | null>(null);
  const productsSectionRef = useRef<HTMLElement>(null);

  const handleFilterChange = (fn: () => void) => {
    scrollYRef.current = window.scrollY;
    fn();
  };

  useEffect(() => {
    if (scrollYRef.current !== null) {
      window.scrollTo({ top: scrollYRef.current, behavior: "auto" });
      scrollYRef.current = null;
    }
    const t = setTimeout(() => {
      requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent("flow-anchors-changed"));
      });
    }, 200);
    return () => clearTimeout(t);
  }, [mainFilter, onlineSubFilter, activeTag]);

  // Reset mobile expand when filters change
  useEffect(() => {
    setMobileExpanded(false);
  }, [mainFilter, onlineSubFilter, activeTag]);

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
      if (
        (mainFilter === "all" || mainFilter === "online") &&
        onlineSubFilter !== "all" &&
        !matchesOnlineSubFilter(p, onlineSubFilter)
      )
        return false;
      if (activeTag && p.directionTag !== activeTag) return false;
      return true;
    });
  }, [products, mainFilter, onlineSubFilter, activeTag]);

  const showMobileExpand = isMobile && filtered.length > MOBILE_LIMIT;
  const visibleProducts = filtered.slice(0, MOBILE_LIMIT);
  const hiddenProducts = filtered.slice(MOBILE_LIMIT);

  function handleCollapse() {
    setMobileExpanded(false);
    requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      productsSectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  return (
    <section
      id="products"
      ref={productsSectionRef}
      className="relative py-32 md:py-44"
      style={{ overflowAnchor: "none" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="reveal">
          <span className="section-label">
            Каталог
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-5 mb-12">
            Послуги
          </h2>
        </div>

        {/* Main filter tabs — primary level */}
        <div className="reveal flex flex-wrap items-center gap-3 mb-6" style={{ overflowAnchor: "none" }}>
          {mainTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                handleFilterChange(() => {
                  setMainFilter(tab.key);
                  setActiveTag(null);
                  if (tab.key !== "online") setOnlineSubFilter("all");
                });
              }}
              className={`!cursor-pointer text-[11px] uppercase tracking-[0.18em] transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] px-4 py-2 border ${
                mainFilter === tab.key
                  ? "text-foreground border-foreground bg-foreground/5"
                  : "text-muted-foreground border-border hover:text-background hover:border-foreground hover:bg-foreground active:text-background active:border-foreground active:bg-foreground focus-visible:text-background focus-visible:border-foreground focus-visible:bg-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Subcategories: Онлайн-дзвiнки | Вiдеоуроки — secondary, chip style */}
        {(mainFilter === "all" || mainFilter === "online") && (
          <div className="reveal flex flex-wrap items-center gap-3 mb-6 md:ml-4 md:border-l md:border-border md:pl-6">
            {onlineSubChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={() => {
                  handleFilterChange(() =>
                    setOnlineSubFilter(onlineSubFilter === chip.key ? "all" : chip.key)
                  );
                }}
                className={`!cursor-pointer text-[10px] uppercase tracking-[0.12em] transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] px-3 py-2 border ${
                  onlineSubFilter === chip.key
                    ? "text-foreground border-foreground bg-foreground/5"
                    : "text-muted-foreground border-border hover:text-background hover:border-foreground hover:bg-foreground active:text-background active:border-foreground active:bg-foreground focus-visible:text-background focus-visible:border-foreground focus-visible:bg-foreground"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        )}

        {/* Direction tags — tertiary, subtle chips */}
        {tags.length > 0 && (
          <div className="reveal flex flex-wrap items-center gap-2 mb-12 md:ml-4 md:border-l md:border-border md:pl-6">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  handleFilterChange(() =>
                    setActiveTag(activeTag === tag ? null : tag)
                  );
                }}
                className={`!cursor-pointer text-[10px] uppercase tracking-[0.1em] transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] px-3 py-2 border ${
                  activeTag === tag
                    ? "text-foreground border-foreground bg-foreground/5"
                    : "text-muted-foreground border-border hover:text-background hover:border-foreground hover:bg-foreground active:text-background active:border-foreground active:bg-foreground focus-visible:text-background focus-visible:border-foreground focus-visible:bg-foreground"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Card grid — editorial catalog style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20 min-h-[480px]" style={{ overflowAnchor: "none" }}>
          {(showMobileExpand ? visibleProducts : filtered).map((product, i) => (
            <div key={product.id} className="reveal cursor-pointer" style={{ transitionDelay: `${i * 50}ms` }}>
              <ProductCard
                product={product}
                onBook={setBookingProduct}
                onDetail={setDetailProduct}
              />
            </div>
          ))}
        </div>

        {/* Mobile expandable: hidden items with smooth animation */}
        {showMobileExpand && (
          <div
            className="products-expand-wrapper grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] md:hidden"
            style={{ gridTemplateRows: mobileExpanded ? "1fr" : "0fr" }}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="grid grid-cols-1 gap-12 pt-0 mt-0">
                {hiddenProducts.map((product, i) => (
                  <div key={product.id} className="reveal cursor-pointer" style={{ transitionDelay: `${(MOBILE_LIMIT + i) * 50}ms` }}>
                    <ProductCard
                      product={product}
                      onBook={setBookingProduct}
                      onDetail={setDetailProduct}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Mobile expand/collapse CTA */}
        {showMobileExpand && (
          <div className="flex flex-col items-center gap-3 mt-10 md:hidden">
            <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Показано {mobileExpanded ? filtered.length : MOBILE_LIMIT} з {filtered.length}
            </span>
            <button
              type="button"
              onClick={() => (mobileExpanded ? handleCollapse() : setMobileExpanded(true))}
              className="hover-line cursor-pointer text-[11px] uppercase tracking-[0.15em] text-foreground border-b border-foreground/60 pb-0.5 transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
            >
              {mobileExpanded ? "Згорнути" : "Показати всі"}
            </button>
          </div>
        )}

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
