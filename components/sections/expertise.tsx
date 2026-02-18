import { expertiseStats } from "@/lib/config/site";
import { StatCount } from "@/components/stat-count";
import { FlowAnchor } from "@/components/FlowLine";

export function Expertise() {
  return (
    <section className="relative py-28 md:py-40">
      {/* Anchor in left gutter to avoid crossing stats */}
      <div className="absolute left-0 top-[20%] w-8 h-px pointer-events-none" aria-hidden>
        <FlowAnchor id="numbers" offsetY={0.5} offsetX={1} />
      </div>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="reveal">
          {/* Asymmetric layout: label left, stats grid right */}
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            <div className="md:w-1/3 shrink-0">
              <span className="section-label">
                Досвiд
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light mt-5 leading-[1.1]">
                Цифри,
                <br />
                що говорять
              </h2>
            </div>

            {/* Stats grid: 2 cols lg, 4 cols xl — consistent at 1024–1440px */}
            <div className="flex-1 grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-12 lg:gap-x-14 lg:gap-y-14 xl:gap-x-12 xl:gap-y-0 md:pt-4 min-w-0">
              {expertiseStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="reveal flex flex-col items-baseline"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <StatCount
                    value={stat.value}
                    duration={2200}
                    className="font-serif text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-light text-foreground leading-none"
                  />
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mt-2 max-w-[140px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
