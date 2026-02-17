import { siteConfig } from "@/lib/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-serif text-sm">{siteConfig.name}</span>
        <span className="text-xs text-muted-foreground">
          {new Date().getFullYear()} Усі права захищено
        </span>
      </div>
    </footer>
  );
}
