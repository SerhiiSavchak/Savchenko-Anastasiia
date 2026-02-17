"use client";

import { useState } from "react";
import { navigation } from "@/lib/config/site";
import { BrandLogo } from "@/components/brand-logo";
import { Menu, X } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <BrandLogo size="sm" />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover-line text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} strokeWidth={1.2} /> : <Menu size={22} strokeWidth={1.2} />}
        </button>
      </div>

      {/* Thin bottom line */}
      <div className="h-px bg-foreground/10" />

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden bg-background px-6 py-8 border-b border-border" aria-label="Mobile navigation">
          <div className="flex flex-col gap-6">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
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
