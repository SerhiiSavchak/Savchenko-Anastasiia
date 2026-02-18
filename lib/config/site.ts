import type { ExpertiseStat, ContactInfo } from "@/types";

export const siteConfig = {
  name: "Anastasiia Savchenko",
  tagline: "Тілесний коуч. РЕТРИТ. Танці",
  heroTitle: "Простір для трансформації та практики",
  heroSubtitle:
    "Ретрити, менторинг та індивідуальна підтримка для тих, хто готовий до змін",
  aboutText:
    "Анастасія Савченко -- практикуючий спеціаліст із багаторічним досвідом. Працює з тілом, свідомістю та енергією через перевірені методики та індивідуальний підхід. Кожна практика -- це результат реального досвіду, а не теоретичних концепцій.",
  aboutQuote: "Справжня трансформація починається з практики",
};

export const expertiseStats: ExpertiseStat[] = [
  { value: "8+", label: "років практики" },
  { value: "1200+", label: "проведених сесій" },
  { value: "15+", label: "ретритів організовано" },
  { value: "300+", label: "учасників менторингу" },
];

export const contacts: ContactInfo = {
  telegram: "https://t.me/anastasia_savchenko",
  instagram: "https://instagram.com/anastasia_savchenko",
  phone: "+380 XX XXX XX XX",
  email: "hello@savchenko.com",
};

export const navigation = [
  { label: "Про мене", href: "#about" },
  { label: "Напрямки", href: "#directions" },
  { label: "Послуги", href: "#products" },
  { label: "VIP", href: "#vip" },
  { label: "Контакти", href: "#contacts" },
];
