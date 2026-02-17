import { expertiseStats } from "@/lib/config/site";

export function Expertise() {
  return (
    <section className="py-28 md:py-40 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-background/50">
            Досвід
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-4">
            Цифри, що говорять
          </h2>
        </div>

        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
          {expertiseStats.map((stat, i) => (
            <div key={stat.label} className="text-center relative">
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-background/15" />
              )}
              <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-background">
                {stat.value}
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.2em] text-background/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
