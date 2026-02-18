"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config/site";

const STORAGE_KEY = "savchenko-first-load-done";
const DURATION_MS = 900;
const FADE_MS = 400;

export function FirstLoadLoader() {
  const [phase, setPhase] = useState<"pending" | "show" | "fade" | "done">(
    "pending"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const forceShow = new URLSearchParams(window.location.search).has("loader");
    const isDev = process.env.NODE_ENV === "development";
    const done = forceShow || isDev ? null : localStorage.getItem(STORAGE_KEY);

    if (done) {
      setPhase("done");
      return;
    }

    setPhase("show");

    const fadeTimer = setTimeout(() => {
      setPhase("fade");
    }, DURATION_MS);

    const doneTimer = setTimeout(() => {
      if (!forceShow && !isDev) localStorage.setItem(STORAGE_KEY, "1");
      setPhase("done");
    }, DURATION_MS + FADE_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <div
      className={`first-load-loader fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <span className="loader-text font-serif text-xl tracking-[0.35em] font-light uppercase text-foreground">
          {siteConfig.name}
        </span>
        <div className="loader-line" />
      </div>
    </div>
  );
}
