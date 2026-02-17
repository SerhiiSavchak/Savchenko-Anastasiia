import { BrandLogo } from "@/components/brand-logo";
import { navigation } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="editorial-divider mb-16" />

        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-20">
          <BrandLogo size="md" />

          <nav className="flex flex-wrap gap-x-10 gap-y-3" aria-label="Footer navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover-line text-[11px] uppercase tracking-[0.2em] text-foreground/40 transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-[11px] text-foreground/30 tracking-[0.1em]">
            {new Date().getFullYear()} Усі права захищено
          </span>
          <span className="text-[11px] text-foreground/20 tracking-[0.1em]">
            Kyiv, Ukraine
          </span>
        </div>
      </div>
    </footer>
  );
}
