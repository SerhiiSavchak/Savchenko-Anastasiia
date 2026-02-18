import Image from "next/image";
import type { VIPItem } from "@/types";
import { FlowAnchor } from "@/components/FlowLine";
import { EditorialStackReveal } from "@/components/editorial-stack-reveal";

const formatLabels: Record<string, string> = {
  offline: "Офлайн",
  online: "Онлайн",
  hybrid: "Гiбрид",
};

interface VIPSectionProps {
  items: VIPItem[];
}

export function VIPSection({ items }: VIPSectionProps) {
  return (
    <section id="vip" className="relative py-32 md:py-44 bg-card">
      <div className="absolute right-0 top-[15%] w-8 h-px pointer-events-none" aria-hidden>
        <FlowAnchor id="vip" offsetY={0.5} offsetX={0} />
      </div>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="reveal mb-24">
          <span className="section-label">
            Ексклюзив
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-5 leading-[1.1]">
            VIP програми
          </h2>
          <p className="mt-6 text-muted-foreground leading-[1.8] max-w-md text-[15px]">
            Глибока робота в камерному форматi. Ретрити та менторинг для тих, хто
            готовий до якiсних змiн.
          </p>
        </div>

        {/* Featured story layout: big image + text, magazine spread */}
        <div className="flex flex-col gap-32 md:gap-40">
          {items.map((item, i) => (
            <article key={item.id} className="group relative">
              {/* Large hero image for the story */}
              <EditorialStackReveal
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-10 md:gap-0`}
                variant="magazine"
                duration="1150ms"
              >
                {/* Image slides in from side */}
                <div
                  className={`stack-layer stack-layer-vip-image md:w-[60%] ${
                    i % 2 === 0 ? "md:-mr-12" : "md:-ml-12"
                  } relative z-0`}
                  style={
                    {
                      "--d": "0ms",
                      "--vip-x": i % 2 === 0 ? "-56px" : "56px",
                    } as React.CSSProperties
                  }
                >
                  <div className="overflow-hidden">
                    <Image
                      src={item.coverImage}
                      alt={item.title}
                      width={800}
                      height={560}
                      className="w-full object-cover aspect-[4/3]"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>
                  <p className="img-caption mt-3">
                    {item.type === "retreat"
                      ? "Фото з попереднього ретриту"
                      : "Iндивiдуальна робота"}
                  </p>
                </div>

                {/* Card rises from bottom with bounce */}
                <div
                  className={`stack-layer stack-layer-vip-card md:w-[45%] relative z-10 ${
                    i % 2 === 0 ? "md:-ml-8" : "md:-mr-8"
                  } md:pt-16 lg:pt-24`}
                  style={{ "--d": "180ms" } as React.CSSProperties}
                >
                  <div className="bg-card md:p-12 lg:p-14">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-accent">
                        {item.type === "retreat" ? "Ретрит" : "Менторинг"}
                      </span>
                      <span className="text-muted-foreground/30">|</span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {formatLabels[item.format]}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl md:text-3xl font-light mb-4 leading-[1.1] text-balance">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-[1.8] text-[15px] md:text-base mb-6">
                      {item.shortDescription}
                    </p>

                    {item.price && (
                      <p className="text-sm text-muted-foreground mb-8">
                        Вартiсть: <span className="text-foreground">{item.price} UAH</span>
                      </p>
                    )}

                    <a
                      href="#contacts"
                      className="btn-hover cursor-pointer text-[11px] uppercase tracking-[0.18em] text-foreground border border-foreground px-4 py-2 inline-flex items-center gap-1 transition-colors hover:bg-foreground hover:text-background"
                    >
                      {item.callToActionLabel}
                    </a>
                  </div>
                </div>
              </EditorialStackReveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
