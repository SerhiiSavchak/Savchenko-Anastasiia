import { expertiseStats } from "@/lib/config/site";

export function Expertise() {
  return (
    <section className="py-28 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/40">
            Досвід
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-5">
            Цифри, що говорять
          </h2>
        </div>

        <div className="editorial-divider" />

        <div className="reveal grid grid-cols-2 md:grid-cols-4">
          {expertiseStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-14 md:py-20 ${
                i < expertiseStats.length - 1
                  ? "md:border-r md:border-foreground/10"
                  : ""
              }`}
            >
              <div className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground">
                {stat.value}
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="editorial-divider" />
      </div>
    </section>
  );
}
