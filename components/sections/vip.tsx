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
    <section id="vip" className="py-28 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal text-center mb-24">
          <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/40">
            Ексклюзив
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-5">
            VIP програми
          </h2>
          <p className="mt-6 text-foreground/50 max-w-lg mx-auto leading-relaxed text-base">
            Глибока робота в камерному форматі. Ретрити та менторинг для тих, хто
            готовий до якісних змін.
          </p>
        </div>

        <div className="reveal flex flex-col gap-0">
          {items.map((item, i) => (
            <article key={item.id}>
              {i > 0 && <div className="editorial-divider" />}
              <div
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-10 md:gap-20 items-center py-16 md:py-24`}
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
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                      {item.type === "retreat" ? "Ретрит" : "Менторинг"}
                    </span>
                    <span className="w-px h-3 bg-foreground/15" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                      {formatLabels[item.format]}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-balance leading-[1.08]">
                    {item.title}
                  </h3>
                  <p className="text-foreground/50 leading-relaxed text-base mb-8">
                    {item.shortDescription}
                  </p>

                  {item.price && (
                    <p className="text-sm mb-10">
                      <span className="text-foreground/40">Вартість: </span>
                      <span className="font-medium">{item.price} UAH</span>
                    </p>
                  )}

                  <a
                    href="#contacts"
                    className="inline-flex items-center bg-foreground text-background px-10 py-4 text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-80"
                  >
                    {item.callToActionLabel}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
