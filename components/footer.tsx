import { BrandLogo } from "@/components/brand-logo";
import { navigation } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="pt-24 pb-16 bg-card">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Top */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-20">
          <BrandLogo size="md" />

          <nav className="flex flex-wrap gap-x-10 gap-y-3" aria-label="Footer navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover-line text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-[11px] text-muted-foreground tracking-wide">
            {new Date().getFullYear()} Усi права захищено
          </span>
          <span className="text-[11px] text-muted-foreground/60 tracking-wide">
            Kyiv, Ukraine
          </span>
        </div>
      </div>
    </footer>
  );
}
