import Image from "next/image";
import { siteConfig } from "@/lib/config/site";
import type { VIPItem } from "@/types";
import { FlowAnchor } from "@/components/FlowLine";
import { EditorialStackReveal } from "@/components/editorial-stack-reveal";

interface HeroProps {
  featuredVIP?: VIPItem;
}

export function Hero({ featuredVIP }: HeroProps) {
  const vip = featuredVIP;

  return (
    <section className="hero-section relative min-h-[100dvh] md:min-h-screen pt-20 pb-12 md:pt-16 md:pb-16 overflow-hidden">
      <div className="absolute left-0 top-[12%] w-8 h-px pointer-events-none" aria-hidden>
        <FlowAnchor id="hero" offsetY={0.5} offsetX={1} />
      </div>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 h-full flex flex-col">
        {/* Quiet nav label row — mobile: top, desktop: inside left column above title */}
        <div className="hero-headline flex flex-col md:hidden items-start gap-2 mb-4 flex-shrink-0">
          <span className="text-[8px] uppercase tracking-[0.35em] text-muted-foreground/70">
            {siteConfig.tagline}
          </span>
          <div className="flex items-center gap-6">
            <a href="#products" className="hover-line text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 hover:text-foreground transition-colors">Послуги</a>
            <a href="#vip" className="hover-line text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 hover:text-foreground transition-colors">VIP</a>
            <a href="#contacts" className="hover-line text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 hover:text-foreground transition-colors">Контакти</a>
          </div>
        </div>

        {/* Mobile: double image composition + text below (no overlap) — all in first viewport */}
        <div className="md:hidden flex-1 flex flex-col min-h-0 relative -mx-6 overflow-hidden">
          {/* Image block — main right, secondary overlapping left */}
          <EditorialStackReveal className="relative w-full h-[45vh] min-h-[180px] flex-shrink-0" duration="750ms" delay={200}>
            <div
              className="stack-layer absolute right-6 top-0 w-[92%] h-full overflow-hidden relative"
              style={
                {
                  "--d": "0ms",
                  "--x": "-28px",
                  "--y": "22px",
                  "--r": "1deg",
                  "--s": "0.97",
                } as React.CSSProperties
              }
            >
              <Image
                src="/images/hero-main.png"
                alt=""
                fill
                priority
                className="object-contain object-right-bottom"
                sizes="100vw"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
                style={{
                  background: "linear-gradient(to top, var(--color-background), transparent)",
                }}
                aria-hidden
              />
            </div>
          </EditorialStackReveal>
          {/* Text block — below images, higher z-index, adapted for mobile */}
          <div className="hero-headline hero-delay-1 relative z-20 flex-shrink-0 px-6 pt-3 pb-2 min-w-0">
            <h1 className="font-serif text-2xl leading-[1.15] font-light text-balance break-words">
              {siteConfig.heroTitle}
            </h1>
            <p className="hero-headline hero-delay-2 mt-3 text-muted-foreground leading-relaxed text-[13px] break-words">
              {siteConfig.heroSubtitle}
            </p>
            <div className="hero-headline hero-delay-2 mt-4 flex flex-wrap items-center gap-4">
              <a
                href="#vip"
                className="hover-line text-[10px] uppercase tracking-[0.2em] text-foreground whitespace-nowrap"
              >
                VIP програми
              </a>
              <span className="text-muted-foreground/40">|</span>
              <a
                href="#products"
                className="hover-line text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                Усi послуги
              </a>
            </div>
          </div>
        </div>

        {/* Desktop: editorial split layout */}
        <div className="hidden md:flex flex-row gap-0 min-h-0 flex-1 items-start">
          {/* Left: nav row + H1 + subheading + CTAs */}
          <div className="relative z-10 w-[50%] pr-12 lg:pr-16 flex flex-col justify-center pt-32 lg:pt-36">
            <div className="hero-headline flex flex-row items-center gap-6 mb-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70">
                {siteConfig.tagline}
              </span>
              <span className="text-muted-foreground/30">—</span>
              <div className="flex items-center gap-6">
                <a href="#products" className="hover-line text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 hover:text-foreground transition-colors">Послуги</a>
                <a href="#vip" className="hover-line text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 hover:text-foreground transition-colors">VIP</a>
                <a href="#contacts" className="hover-line text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70 hover:text-foreground transition-colors">Контакти</a>
              </div>
            </div>
            <h1 className="hero-headline font-serif text-6xl lg:text-[5rem] xl:text-[5.5rem] leading-[1.05] font-light text-balance">
              {siteConfig.heroTitle}
            </h1>
            <p className="hero-headline hero-delay-1 mt-5 text-muted-foreground leading-relaxed max-w-md text-[15px]">
              {siteConfig.heroSubtitle}
            </p>
            <div className="hero-headline hero-delay-2 mt-6 flex items-center gap-8">
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

          {/* Right: Editorial image composition — pulled up */}
          <EditorialStackReveal className="relative w-[50%] min-h-[360px] lg:min-h-[440px] -mt-8 lg:-mt-12" duration="800ms" delay={200}>
            <div
              className="stack-layer stack-layer-drift absolute right-0 -top-4 lg:-top-8 w-[110%] aspect-[4/5] overflow-hidden relative"
              style={
                {
                  "--d": "0ms",
                  "--x": "-28px",
                  "--y": "22px",
                  "--r": "1deg",
                  "--s": "0.97",
                } as React.CSSProperties
              }
            >
              <Image
                src="/images/hero-main.png"
                alt=""
                fill
                priority
                className="object-contain object-right-bottom"
                sizes="45vw"
              />
              <div
                className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none"
                style={{
                  background: "linear-gradient(to top, var(--color-background), transparent)",
                }}
                aria-hidden
              />
            </div>
          </EditorialStackReveal>
        </div>

        {/* Featured VIP teaser — editorial block */}
        {vip && (
          <div className="reveal relative z-10 mt-16 md:mt-12 max-w-sm flex-shrink-0">
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
    </section>
  );
}
