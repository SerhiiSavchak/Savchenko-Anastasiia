import { siteConfig } from "@/lib/config/site";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal flex flex-col md:flex-row gap-12 md:gap-20 items-start">
          {/* Label */}
          <div className="md:w-1/3">
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Про мене
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-3 text-balance">
              <span className="hand-underline">Практик</span>, а не
              теоретик
            </h2>
          </div>

          {/* Content */}
          <div className="md:w-2/3">
            <p className="text-muted-foreground leading-relaxed text-lg">
              {siteConfig.aboutText}
            </p>
            <blockquote className="mt-8 pl-6 border-l-2 border-accent font-serif text-xl italic text-foreground/80">
              {siteConfig.aboutQuote}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
