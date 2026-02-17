import type { Metadata, Viewport } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { FirstLoadLoader } from "@/components/first-load-loader";

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anastasia Savchenko",
  description:
    "Простір для трансформації та практики. Ретрити, менторинг та індивідуальна підтримка.",
  openGraph: {
    title: "Anastasia Savchenko",
    description:
      "Простір для трансформації та практики від Анастасії Савченко.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F5F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        <FirstLoadLoader />
        {children}
      </body>
    </html>
  );
}
