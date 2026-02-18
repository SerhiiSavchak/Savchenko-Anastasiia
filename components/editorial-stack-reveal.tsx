"use client";

import { useEffect, useRef, useState } from "react";

interface EditorialStackRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Override animation duration (e.g. "950ms") */
  duration?: string;
  /** Delay before animation starts (ms) — for Hero above-the-fold */
  delay?: number;
  /** When true: run animation after delay from mount (for Hero — loader blocks view) */
  triggerOnMount?: boolean;
  /** "magazine" = image slides from side, card rises with bounce */
  variant?: "stack" | "magazine";
  /** IntersectionObserver threshold (0–1) */
  threshold?: number;
  /** Root margin for early/late trigger */
  rootMargin?: string;
}

export function EditorialStackReveal({
  children,
  className = "",
  duration,
  delay = 0,
  triggerOnMount = false,
  variant = "stack",
  threshold = 0.15,
  rootMargin = "0px",
}: EditorialStackRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasReversedRef = useRef(false);

  useEffect(() => {
    if (triggerOnMount) {
      const t = setTimeout(() => setIsInView(true), delay);
      return () => clearTimeout(t);
    }

    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const effectiveDelay = hasReversedRef.current ? 0 : delay;
            const start = () => setIsInView(true);
            if (effectiveDelay > 0) {
              timeoutId = setTimeout(start, effectiveDelay);
            } else {
              start();
            }
          } else {
            hasReversedRef.current = true;
            if (timeoutId) {
              clearTimeout(timeoutId);
              timeoutId = null;
            }
            setIsInView(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [triggerOnMount, threshold, rootMargin, delay]);

  const style = {
    ...(duration ? { "--stack-duration": duration } : {}),
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      className={`stack-reveal stack-reveal-${variant} ${isInView ? "stack-reveal-visible" : ""} ${className}`.trim()}
      data-in-view={isInView}
      style={Object.keys(style).length ? style : undefined}
    >
      {children}
    </div>
  );
}
