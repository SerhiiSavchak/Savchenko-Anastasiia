"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { navigation } from "@/lib/config/site";
import { BrandLogo } from "@/components/brand-logo";
import { Menu, X } from "lucide-react";

const MENU_ID = "mobile-nav-menu";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
  }, []);

  // Scroll lock
  useEffect(() => {
    if (open) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      const scrollY = document.body.style.top ? parseInt(document.body.style.top, 10) : 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      if (scrollY) window.scrollTo(0, Math.abs(scrollY));
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    };
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Focus trap (close button + nav links)
  useEffect(() => {
    if (!open) return;
    const closeBtn = closeBtnRef.current;
    const menuEl = menuRef.current;
    const navFocusables = menuEl
      ? Array.from(
          menuEl.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        )
      : [];
    const allFocusables = closeBtn ? [closeBtn, ...navFocusables] : navFocusables;
    const first = allFocusables[0];
    const last = allFocusables[allFocusables.length - 1];

    closeBtn?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !first || !last) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

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
          ref={closeBtnRef}
          type="button"
          className="md:hidden relative w-10 h-10 flex items-center justify-center text-foreground transition-transform duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
          onClick={() => (open ? close() : openMenu())}
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={open}
          aria-controls={MENU_ID}
        >
          <span className="sr-only">{open ? "Закрити" : "Меню"}</span>
          <span className="relative w-6 h-5 flex items-center justify-center">
            {open ? (
              <X
                size={24}
                strokeWidth={1.5}
                className="mobile-menu-icon-enter text-foreground"
                aria-hidden
              />
            ) : (
              <Menu size={24} strokeWidth={1.5} className="text-foreground" aria-hidden />
            )}
          </span>
        </button>
      </div>

      {/* Mobile full-screen overlay menu */}
      {open && (
        <div
          ref={menuRef}
          id={MENU_ID}
          className="md:hidden fixed inset-0 z-40 bg-background"
          style={{ height: "100dvh", height: "100vh" }}
          role="dialog"
          aria-modal="true"
          aria-label="Мобільне меню"
        >
          {/* Backdrop / overlay — click to close */}
          <button
            type="button"
            className="absolute inset-0 w-full h-full bg-background"
            onClick={close}
            aria-label="Закрити меню"
            tabIndex={-1}
          />

          {/* Content — pointer-events-none so backdrop receives clicks on empty area */}
          <div className="relative z-10 flex flex-col h-full px-6 pt-24 pb-12 mobile-menu-content-enter pointer-events-none">
            <nav
              className="flex flex-col gap-8 flex-1 pointer-events-auto"
              aria-label="Мобільна навігація"
            >
              {navigation.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="mobile-menu-nav-item hover-line text-2xl font-light tracking-[0.12em] text-foreground hover:text-foreground transition-colors duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 rounded-sm"
                  style={{ animationDelay: `${80 + i * 60}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
