import Image from "next/image";
import { siteConfig } from "@/lib/config/site";
import type { VIPItem } from "@/types";

interface HeroProps {
  featuredVIP?: VIPItem;
}

export function Hero({ featuredVIP }: HeroProps) {
  const vip = featuredVIP;

  return (
    <section className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Magazine cover layout: large title over image */}
        <div className="flex flex-col gap-16 md:gap-0">

          {/* Title area -- asymmetric, overlaps image on desktop */}
          <div className="relative z-10 md:max-w-[55%]">
            <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6">
              {siteConfig.tagline}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] font-light text-balance">
              {siteConfig.heroTitle}
            </h1>
            <p className="mt-8 text-muted-foreground leading-relaxed max-w-sm text-[15px]">
              {siteConfig.heroSubtitle}
            </p>
            <div className="mt-10 flex items-center gap-8">
              <a
                href="#vip"
                className="hover-line text-[11px] uppercase tracking-[0.2em] text-foreground"
              >
                VIP програми
              </a>
              <span className="text-muted-foreground/40">|</span>
              <a
                href="#products"
                className="hover-line text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Усi послуги
              </a>
            </div>
          </div>

          {/* Hero image -- floats to the right, partially overlapping */}
          <div className="relative md:absolute md:right-0 md:top-28 md:w-[50%] lg:w-[45%] md:h-[calc(100%-7rem)]">
            <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-full overflow-hidden">
              <Image
                src="/images/hero-bg.jpg"
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="img-caption mt-3">{"Фото з ретриту в Карпатах"}</p>
          </div>

          {/* Featured VIP teaser -- small, editorial, below on mobile */}
          {vip && (
            <div className="relative z-10 md:mt-20 max-w-xs">
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent">
                {vip.type === "retreat" ? "Ретрит" : "Менторинг"}
              </span>
              <h3 className="font-serif text-2xl font-light mt-2 leading-snug">
                {vip.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {vip.shortDescription}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
