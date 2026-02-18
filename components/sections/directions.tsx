"use client";

import Image from "next/image";
import Link from "next/link";
import { FlowAnchor } from "@/components/FlowLine";

const directions = [
  {
    title: "Онлайн",
    description:
      "Практики з будь-якої точки свiту. Zoom-сесiї, вiдеоуроки та пiдтримка у Telegram.",
    coverImage: "/images/placeholder-1.jpg",
    caption: "Онлайн-сесiя",
  },
  {
    title: "Офлайн",
    description:
      "Очнi практики та груповi заняття у Львові. Жива енергiя та iндивiдуальний пiдхiд.",
    coverImage: "/images/placeholder-3.jpg",
    caption: "Очна практика",
  },
];

export function Directions() {
  return (
    <section id="directions" className="relative py-28 md:py-40 bg-card">
      <div className="absolute right-0 top-[15%] w-8 h-px pointer-events-none" aria-hidden>
        <FlowAnchor id="directions" offsetY={0.5} offsetX={0} />
      </div>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="reveal">
          <span className="section-label">
            Формати
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light mt-5 mb-20 leading-[1.1]">
            Напрямки роботи
          </h2>
        </div>

        {/* Editorial article previews — image + text, alternating layout */}
        <div className="flex flex-col gap-24 md:gap-32">
          {directions.map((dir, i) => (
            <Link
              key={dir.title}
              href="#products"
              className="group block reveal card-hover"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <article
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-8 md:gap-12 lg:gap-16 items-stretch`}
              >
                {/* Image — editorial preview */}
                <div
                  className={`relative overflow-hidden md:w-[55%] ${
                    i % 2 === 0 ? "md:pr-6" : "md:pl-6"
                  }`}
                >
                  <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                    <Image
                      src={dir.coverImage}
                      alt={dir.title}
                      fill
                      className="object-cover img-hover"
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                    {/* Hover reveal overlay — gradient fade */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                      aria-hidden
                    />
                  </div>
                  <p className="img-caption mt-3">{dir.caption}</p>
                </div>

                {/* Text — article preview content */}
                <div
                  className={`flex flex-col justify-center md:w-[45%] ${
                    i % 2 === 0 ? "md:pl-0" : "md:pr-0"
                  }`}
                >
                  <div className="space-y-4">
                    <h3 className="article-reveal-line font-serif text-2xl md:text-3xl font-light leading-[1.1] group-hover:text-accent pb-1">
                      {dir.title}
                    </h3>
                    <p className="text-muted-foreground leading-[1.8] text-[15px] md:text-base max-w-prose translate-y-0.5 opacity-90 group-hover:opacity-100 transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-y-0">
                      {dir.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground group-hover:text-foreground">
                      <span className="hover-line">Переглянути послуги</span>
                      <span
                        className="inline-block transition-transform duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
