import { siteConfig } from "@/lib/config/site";

export function About() {
  return (
    <section id="about" className="py-32 md:py-44 bg-card">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="reveal">
          {/* Article intro spread: narrow column like a magazine article */}
          <div className="max-w-2xl mx-auto md:mx-0 md:ml-[15%]">
            <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Про мене
            </span>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-6 leading-[1.1] text-balance">
              Практик, а&nbsp;не теоретик
            </h2>

            <p className="mt-10 text-muted-foreground leading-[1.8] text-[15px] md:text-base">
              {siteConfig.aboutText}
            </p>

            <blockquote className="mt-12 font-serif text-2xl md:text-3xl lg:text-4xl italic font-light text-foreground/70 leading-snug max-w-lg">
              {siteConfig.aboutQuote}
            </blockquote>

            <div className="mt-8 w-12 h-px bg-accent/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
