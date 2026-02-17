import { Monitor, MapPin } from "lucide-react";

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
    <section id="directions" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Формати
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-4">
            Напрямки роботи
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10">
          {directions.map((dir) => (
            <a
              key={dir.filter}
              href="#products"
              className="group flex flex-col p-10 md:p-14 bg-background transition-colors hover:bg-muted"
            >
              <div className="flex items-start justify-between mb-10">
                <span className="font-serif text-3xl md:text-4xl font-light text-foreground/15">
                  {dir.number}
                </span>
                <dir.icon
                  size={24}
                  className="text-foreground/30 group-hover:text-accent transition-colors"
                  strokeWidth={1}
                />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-light mb-4">{dir.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-base flex-1">
                {dir.description}
              </p>
              <span className="mt-8 hover-line text-xs uppercase tracking-[0.2em] text-foreground/60 group-hover:text-foreground transition-colors self-start">
                Переглянути послуги
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
