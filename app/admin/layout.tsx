import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Anastasia Savchenko",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <span className="font-serif text-lg">Admin Panel</span>
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Back to site
          </a>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
