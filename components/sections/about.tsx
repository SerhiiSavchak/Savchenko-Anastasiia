import { siteConfig } from "@/lib/config/site";

export function About() {
  return (
    <section id="about" className="py-32 md:py-44 bg-card">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="max-w-2xl mx-auto md:mx-0 md:ml-[15%]">
          <div className="reveal">
            <span className="section-label">
              Про мене
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light mt-6 leading-[1.1] text-balance">
              Практик, а&nbsp;не теоретик
            </h2>
          </div>
          <p className="reveal mt-10 text-muted-foreground leading-[1.8] text-[15px] md:text-base" style={{ transitionDelay: "100ms" }}>
            {siteConfig.aboutText}
          </p>
          <blockquote className="reveal mt-12 font-serif text-2xl md:text-3xl lg:text-4xl italic font-light text-foreground/70 leading-snug max-w-lg" style={{ transitionDelay: "200ms" }}>
            {siteConfig.aboutQuote}
          </blockquote>
          <div className="reveal mt-8 w-12 h-px bg-accent/40" style={{ transitionDelay: "300ms" }} />
        </div>
      </div>
    </section>
  );
}
