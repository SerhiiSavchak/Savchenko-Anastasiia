import Image from "next/image";
import { siteConfig } from "@/lib/config/site";
import type { VIPItem } from "@/types";

interface HeroProps {
  featuredVIP?: VIPItem;
}

export function Hero({ featuredVIP }: HeroProps) {
  const vip = featuredVIP;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background texture */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-30"
        sizes="100vw"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
        <div className="flex flex-col md:flex-row md:items-center gap-12 md:gap-16">
          {/* Text */}
          <div className="flex-1 max-w-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {siteConfig.tagline}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-balance">
              {siteConfig.heroTitle}
            </h1>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              {siteConfig.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#vip"
                className="btn-micro inline-flex items-center justify-center bg-foreground text-background px-8 py-3 text-sm tracking-wide"
              >
                VIP програми
              </a>
              <a
                href="#products"
                className="btn-micro inline-flex items-center justify-center border border-foreground px-8 py-3 text-sm tracking-wide"
              >
                Усі послуги
              </a>
            </div>
          </div>

          {/* Featured VIP card */}
          {vip && (
            <div className="flex-1 max-w-md">
              <div className="relative group">
                <div className="overflow-hidden">
                  <Image
                    src={vip.coverImage}
                    alt={vip.title}
                    width={480}
                    height={600}
                    className="w-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 480px"
                  />
                </div>
                <div className="mt-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-accent">
                    {vip.type === "retreat" ? "Ретрит" : "Менторинг"}
                  </span>
                  <h3 className="font-serif text-xl mt-1">{vip.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {vip.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Thin decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
    </section>
  );
}
