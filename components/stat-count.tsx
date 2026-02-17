"use client";

import { useState, useEffect, useRef } from "react";

function parseStatValue(value: string): { num: number; suffix: string } {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] ?? "" };
}

interface StatCountProps {
  value: string;
  duration?: number;
  className?: string;
}

export function StatCount({
  value,
  duration = 2000,
  className = "",
}: StatCountProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const { num, suffix } = parseStatValue(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || num === 0) {
      setDisplayValue(value);
      return;
    }

    let rafId: number;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(num * eased);
      setDisplayValue(`${current}${suffix}`);

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [value, isVisible, num, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
