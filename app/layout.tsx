import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAVCHENKO",
  description:
    "Практики, ретрити, менторинг. Простір для трансформації від Анастасії Савченко.",
  openGraph: {
    title: "SAVCHENKO",
    description:
      "Простір для трансформації та практики від Анастасії Савченко.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
