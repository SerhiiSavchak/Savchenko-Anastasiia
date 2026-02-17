import Image from "next/image";
import { siteConfig } from "@/lib/config/site";
import { Signature } from "@/components/brand-logo";
import type { VIPItem } from "@/types";

interface HeroProps {
  featuredVIP?: VIPItem;
}

export function Hero({ featuredVIP }: HeroProps) {
  const vip = featuredVIP;

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden pt-24">
      {/* Background texture */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-20"
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10 pb-20 md:pb-28 pt-32 md:pt-40">
        <div className="flex flex-col md:flex-row md:items-end gap-12 md:gap-20">
          {/* Text */}
          <div className="flex-1 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              {siteConfig.tagline}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl leading-[1.05] font-light text-balance">
              {siteConfig.heroTitle}
            </h1>
            <p className="mt-8 text-muted-foreground leading-relaxed max-w-md text-base">
              {siteConfig.heroSubtitle}
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a
                href="#vip"
                className="btn-micro inline-flex items-center justify-center bg-foreground text-background px-10 py-4 text-xs uppercase tracking-[0.2em]"
              >
                VIP програми
              </a>
              <a
                href="#products"
                className="hover-line text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Усі послуги
              </a>
            </div>
            <div className="mt-12">
              <Signature />
            </div>
          </div>

          {/* Featured VIP card */}
          {vip && (
            <div className="flex-1 max-w-sm md:max-w-md">
              <div className="relative group">
                <div className="overflow-hidden art-offset">
                  <Image
                    src={vip.coverImage}
                    alt={vip.title}
                    width={480}
                    height={600}
                    className="w-full object-cover aspect-[3/4] transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </div>
                <div className="mt-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent">
                    {vip.type === "retreat" ? "Ретрит" : "Менторинг"}
                  </span>
                  <h3 className="font-serif text-2xl font-light mt-1">{vip.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {vip.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thin decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/10" />
    </section>
  );
}
