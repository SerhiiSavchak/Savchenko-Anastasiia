import { Monitor, MapPin } from "lucide-react";

const directions = [
  {
    title: "Онлайн",
    description:
      "Практики з будь-якої точки світу. Zoom-сесії, відеоуроки та підтримка у Telegram.",
    icon: Monitor,
    filter: "online",
  },
  {
    title: "Офлайн",
    description:
      "Очні практики та групові заняття у Києві. Жива енергія та індивідуальний підхід.",
    icon: MapPin,
    filter: "offline",
  },
];

export function Directions() {
  return (
    <section id="directions" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Формати
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mt-3">
            Напрямки роботи
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8">
          {directions.map((dir) => (
            <a
              key={dir.filter}
              href={`#products`}
              className="group flex flex-col p-8 md:p-10 border border-border transition-colors hover:bg-muted"
            >
              <dir.icon
                size={28}
                className="text-accent mb-6"
                strokeWidth={1.5}
              />
              <h3 className="font-serif text-2xl mb-3">{dir.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                {dir.description}
              </p>
              <span className="mt-6 text-sm text-accent hover-line self-start">
                Переглянути послуги
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
