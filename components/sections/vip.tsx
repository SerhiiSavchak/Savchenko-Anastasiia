import Image from "next/image";
import type { VIPItem } from "@/types";

const formatLabels: Record<string, string> = {
  offline: "Офлайн",
  online: "Онлайн",
  hybrid: "Гібрид",
};

interface VIPSectionProps {
  items: VIPItem[];
}

export function VIPSection({ items }: VIPSectionProps) {
  return (
    <section id="vip" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Ексклюзив
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-4">
            <span className="hand-underline">VIP</span> програми
          </h2>
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto leading-relaxed text-base">
            Глибока робота в камерному форматі. Ретрити та менторинг для тих, хто
            готовий до якісних змін.
          </p>
        </div>

        <div className="reveal flex flex-col gap-24 md:gap-32">
          {items.map((item, i) => (
            <article
              key={item.id}
              className={`flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-10 md:gap-16 items-center`}
            >
              {/* Image */}
              <div className="md:w-1/2">
                <div className={`overflow-hidden ${i % 2 === 0 ? "art-offset" : ""}`}>
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full object-cover aspect-[3/2]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="md:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent">
                    {item.type === "retreat" ? "Ретрит" : "Менторинг"}
                  </span>
                  <span className="w-px h-3 bg-foreground/15" />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {formatLabels[item.format]}
                  </span>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-6 text-balance leading-[1.1]">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base mb-6">
                  {item.shortDescription}
                </p>

                {item.price && (
                  <p className="text-sm mb-8">
                    <span className="text-muted-foreground">Вартість: </span>
                    <span className="font-medium">{item.price} UAH</span>
                  </p>
                )}

                <a
                  href="#contacts"
                  className="btn-micro inline-flex items-center bg-foreground text-background px-10 py-4 text-xs uppercase tracking-[0.2em]"
                >
                  {item.callToActionLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
