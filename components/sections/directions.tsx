import { Monitor, MapPin, ArrowRight } from "lucide-react";

const directions = [
  {
    title: "Онлайн",
    description:
      "Практики з будь-якої точки світу. Zoom-сесії, відеоуроки та підтримка у Telegram.",
    icon: Monitor,
    filter: "online",
    number: "01",
  },
  {
    title: "Офлайн",
    description:
      "Очні практики та групові заняття у Києві. Жива енергія та індивідуальний підхід.",
    icon: MapPin,
    filter: "offline",
    number: "02",
  },
];

export function Directions() {
  return (
    <section id="directions" className="py-28 md:py-44 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.35em] text-background/40">
            Формати
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-5">
            Напрямки роботи
          </h2>
        </div>

        <div className="reveal">
          {directions.map((dir, i) => (
            <a
              key={dir.filter}
              href="#products"
              className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-12 py-12 md:py-16 transition-opacity hover:opacity-70"
              style={i > 0 ? { borderTop: "1px solid rgba(255,255,255,0.1)" } : undefined}
            >
              <span className="font-serif text-4xl md:text-5xl text-background/15 md:w-20 shrink-0">
                {dir.number}
              </span>

              <div className="flex items-center gap-4 md:w-48 shrink-0">
                <dir.icon size={20} strokeWidth={1} className="text-background/40" />
                <h3 className="font-serif text-3xl md:text-4xl">{dir.title}</h3>
              </div>

              <p className="text-background/50 leading-relaxed text-base flex-1">
                {dir.description}
              </p>

              <ArrowRight size={18} strokeWidth={1} className="text-background/20 group-hover:text-background/60 transition-colors shrink-0 hidden md:block" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
