import { expertiseStats } from "@/lib/config/site";

export function Expertise() {
  return (
    <section className="py-24 md:py-32 bg-muted">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Досвід
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mt-3">
            Цифри, що говорять
          </h2>
        </div>

        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {expertiseStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-foreground">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
