import { siteConfig } from "@/lib/config/site";

export function About() {
  return (
    <section id="about" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          {/* Label */}
          <div className="md:w-1/3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Про мене
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-4 text-balance leading-[1.1]">
              <span className="hand-underline">Практик</span>, а&nbsp;не
              теоретик
            </h2>
          </div>

          {/* Content */}
          <div className="md:w-2/3 md:pt-4">
            <p className="text-muted-foreground leading-relaxed text-lg md:text-xl">
              {siteConfig.aboutText}
            </p>
            <blockquote className="mt-10 pl-8 border-l border-accent/40 font-serif text-2xl md:text-3xl italic text-foreground/70 font-light leading-snug">
              {siteConfig.aboutQuote}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
