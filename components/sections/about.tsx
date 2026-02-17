import { siteConfig } from "@/lib/config/site";

export function About() {
  return (
    <section id="about" className="py-28 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal flex flex-col md:flex-row gap-16 md:gap-28 items-start">
          {/* Label */}
          <div className="md:w-1/3">
            <span className="text-[10px] uppercase tracking-[0.35em] text-foreground/40">
              Про мене
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-5 text-balance leading-[1.08]">
              Практик, а&nbsp;не теоретик
            </h2>
          </div>

          {/* Content */}
          <div className="md:w-2/3 md:pt-6">
            <p className="text-foreground/60 leading-relaxed text-lg md:text-xl">
              {siteConfig.aboutText}
            </p>
            <div className="editorial-divider mt-10 mb-10" />
            <blockquote className="font-serif text-2xl md:text-3xl italic text-foreground/80 leading-snug">
              {siteConfig.aboutQuote}
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
