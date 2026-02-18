"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { navigation } from "@/lib/config/site";
import { BrandLogo } from "@/components/brand-logo";

const MENU_ID = "mobile-nav-menu";
const MENU_ANIM_DURATION = 380;

export function Header() {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const pendingScrollRef = useRef<string | null>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const closeAndScrollTo = useCallback((href: string) => {
    if (href.startsWith("#")) {
      pendingScrollRef.current = href;
    }
    setOpen(false);
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
  }, []);

  // Mount/unmount + exit animation
  useEffect(() => {
    if (open) {
      setShowMenu(true);
      setIsClosing(false);
    } else if (showMenu) {
      setIsClosing(true);
      const t = setTimeout(() => {
        setShowMenu(false);
        setIsClosing(false);
      }, MENU_ANIM_DURATION);
      return () => clearTimeout(t);
    }
  }, [open, showMenu]);

  // Scroll lock — keep locked until menu fully closed (after exit animation)
  useEffect(() => {
    if (showMenu && !isClosing) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else if (!showMenu) {
      const pending = pendingScrollRef.current;
      pendingScrollRef.current = null;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      if (pending) {
        requestAnimationFrame(() => {
          document.querySelector(pending)?.scrollIntoView({ behavior: "smooth" });
        });
      } else {
        const scrollY = document.body.style.top ? parseInt(document.body.style.top, 10) : 0;
        if (scrollY) window.scrollTo(0, Math.abs(scrollY));
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    };
  }, [showMenu, isClosing]);

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
    if (!showMenu || isClosing) return;
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
  }, [showMenu, isClosing]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm ${open ? "max-md:hidden" : ""}`}>
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

          {/* Mobile burger — opens menu */}
          <button
            type="button"
            className={`md:hidden mobile-menu-close-btn relative w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 -mr-1 ${
              open ? "bg-foreground text-background focus-visible:ring-background" : "text-foreground focus-visible:ring-foreground/40"
            }`}
            onClick={() => (open ? close() : openMenu())}
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            aria-controls={MENU_ID}
          >
            <span className="sr-only">{open ? "Закрити" : "Меню"}</span>
            <BurgerIcon open={open} />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay menu — outside header so it stays visible when header is hidden */}
      {showMenu && (
        <div
          ref={menuRef}
          id={MENU_ID}
          className="md:hidden fixed inset-0 z-50 min-h-screen h-[100dvh]"
          role="dialog"
          aria-modal="true"
          aria-label="Мобільне меню"
        >
          {/* Backdrop — click to close */}
          <button
            type="button"
            className={`absolute inset-0 z-0 w-full h-full bg-background/95 backdrop-blur-sm ${
              isClosing ? "mobile-menu-backdrop-exit" : "mobile-menu-backdrop-enter"
            }`}
            onClick={close}
            aria-label="Закрити меню"
            tabIndex={-1}
          />

          {/* Panel — centered nav, above backdrop so links are clickable */}
          <div
            className={`absolute inset-0 z-10 flex flex-col pointer-events-none ${
              isClosing ? "mobile-menu-panel-exit" : "mobile-menu-panel-enter"
            }`}
          >
            {/* Close button — top-right, refined editorial style */}
            <div className="absolute top-0 right-0 z-20 pt-[max(1rem,env(safe-area-inset-top))] pr-[max(1rem,env(safe-area-inset-right))] p-4 pointer-events-auto">
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                className="mobile-menu-close-btn w-12 h-12 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2"
                aria-label="Закрити меню"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Centered nav content */}
            <nav
              className="flex-1 flex flex-col justify-center items-center gap-6 sm:gap-8 pointer-events-auto px-6"
              aria-label="Мобільна навігація"
            >
              {navigation.map((item, i) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    closeAndScrollTo(item.href);
                  }}
                  className="mobile-menu-nav-item hover-line text-2xl sm:text-3xl min-[400px]:text-4xl font-light tracking-[0.12em] text-foreground hover:text-foreground py-3 px-4 -mx-4 rounded-sm min-h-[48px] flex items-center justify-center transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2"
                  style={!isClosing ? { animationDelay: `${50 + i * 70}ms` } : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

/** Burger lines morph into X */
function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative w-6 h-5 flex items-center justify-center" aria-hidden>
      <span
        className={`absolute w-6 h-[2px] bg-current rounded-full origin-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
        }`}
      />
      <span
        className={`absolute w-6 h-[2px] bg-current rounded-full origin-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100 top-1/2 -translate-y-1/2"
        }`}
      />
      <span
        className={`absolute w-6 h-[2px] bg-current rounded-full origin-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
        }`}
      />
    </span>
  );
}

/** Clear X icon for close button */
function CloseIcon() {
  return (
    <span className="relative w-6 h-6 flex items-center justify-center" aria-hidden>
      <span className="absolute w-6 h-[2.5px] bg-current rounded-full origin-center rotate-45" />
      <span className="absolute w-6 h-[2.5px] bg-current rounded-full origin-center -rotate-45" />
    </span>
  );
}
