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
    <section id="vip" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Ексклюзив
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mt-3">
            <span className="hand-underline">VIP</span> програми
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed text-sm">
            Глибока робота в камерному форматі. Ретрити та менторинг для тих, хто
            готовий до якісних змін.
          </p>
        </div>

        <div className="reveal flex flex-col gap-16">
          {items.map((item, i) => (
            <article
              key={item.id}
              className={`flex flex-col ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 md:gap-12 items-center`}
            >
              {/* Image */}
              <div className="md:w-1/2">
                <div className="overflow-hidden">
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
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs uppercase tracking-[0.15em] text-accent">
                    {item.type === "retreat" ? "Ретрит" : "Менторинг"}
                  </span>
                  <span className="w-px h-3 bg-border" />
                  <span className="text-xs text-muted-foreground">
                    {formatLabels[item.format]}
                  </span>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl mb-4 text-balance">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {item.shortDescription}
                </p>

                {item.price && (
                  <p className="text-sm mb-6">
                    <span className="text-muted-foreground">Вартість: </span>
                    <span className="font-medium">{item.price} UAH</span>
                  </p>
                )}

                <a
                  href="#contacts"
                  className="btn-micro inline-flex items-center border border-foreground px-8 py-3 text-sm tracking-wide"
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
