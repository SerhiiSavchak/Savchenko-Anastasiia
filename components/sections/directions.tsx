const directions = [
  {
    title: "Онлайн",
    description:
      "Практики з будь-якої точки свiту. Zoom-сесiї, вiдеоуроки та пiдтримка у Telegram.",
    number: "01",
  },
  {
    title: "Офлайн",
    description:
      "Очнi практики та груповi заняття у Києвi. Жива енергiя та iндивiдуальний пiдхiд.",
    number: "02",
  },
];

export function Directions() {
  return (
    <section id="directions" className="py-28 md:py-40 bg-card">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="reveal">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Формати
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mt-5 mb-20 leading-[1.1]">
            Напрямки роботи
          </h2>

          {/* Editorial spread: two directions as side-by-side text blocks */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            {directions.map((dir) => (
              <a
                key={dir.number}
                href="#products"
                className="group flex-1"
              >
                <span className="font-serif text-7xl md:text-8xl lg:text-9xl font-light text-accent/20 leading-none">
                  {dir.number}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl font-light mt-4 mb-4">
                  {dir.title}
                </h3>
                <p className="text-muted-foreground leading-[1.8] text-[15px] max-w-sm">
                  {dir.description}
                </p>
                <span className="inline-block mt-6 hover-line text-[11px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-foreground transition-colors">
                  Переглянути послуги
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
