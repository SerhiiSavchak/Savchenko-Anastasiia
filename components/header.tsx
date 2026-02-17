"use client";

import { useState } from "react";
import { navigation } from "@/lib/config/site";
import { BrandLogo } from "@/components/brand-logo";
import { Menu, X } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 lg:px-12">
        <BrandLogo size="sm" />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover-line text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground transition-transform duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105 active:scale-95"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} strokeWidth={1.2} /> : <Menu size={22} strokeWidth={1.2} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden bg-background px-6 pb-8 pt-2" aria-label="Mobile navigation">
          <div className="flex flex-col gap-5">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.1em] text-muted-foreground hover:text-foreground transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:translate-x-0.5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
