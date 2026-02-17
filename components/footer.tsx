import { BrandLogo, Signature } from "@/components/brand-logo";
import { navigation } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-16">
          <div className="flex flex-col gap-4">
            <BrandLogo size="md" />
            <Signature className="ml-1" />
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer navigation">
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
        </div>

        {/* Bottom row */}
        <div className="h-px bg-foreground/10 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground tracking-wide">
            {new Date().getFullYear()} Усі права захищено
          </span>
          <span className="text-xs text-muted-foreground/50 tracking-wide">
            Kyiv, Ukraine
          </span>
        </div>
      </div>
    </footer>
  );
}
