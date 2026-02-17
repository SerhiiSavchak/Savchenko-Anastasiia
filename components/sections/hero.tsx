import Image from "next/image";
import { siteConfig } from "@/lib/config/site";
import type { VIPItem } from "@/types";

interface HeroProps {
  featuredVIP?: VIPItem;
}

export function Hero({ featuredVIP }: HeroProps) {
  const vip = featuredVIP;

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden pt-24">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-15"
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-20 md:pb-32 pt-32 md:pt-40">
        <div className="flex flex-col md:flex-row md:items-end gap-16 md:gap-24">
          {/* Text */}
          <div className="flex-1 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.35em] text-foreground/40 mb-8">
              {siteConfig.tagline}
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.02] font-normal text-balance">
              {siteConfig.heroTitle}
            </h1>
            <p className="mt-8 text-foreground/50 leading-relaxed max-w-md text-base">
              {siteConfig.heroSubtitle}
            </p>
            <div className="mt-14 flex flex-wrap items-center gap-8">
              <a
                href="#vip"
                className="inline-flex items-center justify-center bg-foreground text-background px-10 py-4 text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
              >
                VIP програми
              </a>
              <a
                href="#products"
                className="hover-line text-[10px] uppercase tracking-[0.25em] text-foreground/40 hover:text-foreground transition-colors"
              >
                Усі послуги
              </a>
            </div>
          </div>

          {/* Featured VIP card */}
          {vip && (
            <div className="flex-1 max-w-sm md:max-w-md">
              <div className="relative group">
                <div className="overflow-hidden">
                  <Image
                    src={vip.coverImage}
                    alt={vip.title}
                    width={480}
                    height={640}
                    className="w-full object-cover aspect-[3/4] transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </div>
                <div className="mt-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                    {vip.type === "retreat" ? "Ретрит" : "Менторинг"}
                  </span>
                  <h3 className="font-serif text-2xl mt-2">{vip.title}</h3>
                  <p className="text-sm text-foreground/50 mt-2 leading-relaxed">
                    {vip.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 right-0 editorial-divider" />
    </section>
  );
}
