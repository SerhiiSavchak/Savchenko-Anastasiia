"use client";

import { useState } from "react";
import { contacts } from "@/lib/config/site";
import { Send, Instagram, Phone, Mail, Copy, Check } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-background/30 hover:text-background/70 transition-colors"
      aria-label={`Copy ${text}`}
    >
      {copied ? <Check size={14} strokeWidth={1.2} /> : <Copy size={14} strokeWidth={1.2} />}
    </button>
  );
}

const contactItems = [
  {
    label: "Telegram",
    value: contacts.telegram,
    displayValue: "@anastasiia_savchenko",
    href: contacts.telegram,
    icon: Send,
    copyable: false,
  },
  {
    label: "Instagram",
    value: contacts.instagram,
    displayValue: "@anastasiia_savchenko",
    href: contacts.instagram,
    icon: Instagram,
    copyable: false,
  },
  {
    label: "Телефон",
    value: contacts.phone,
    displayValue: contacts.phone,
    href: `tel:${contacts.phone.replace(/\s/g, "")}`,
    icon: Phone,
    copyable: true,
  },
  {
    label: "Email",
    value: contacts.email,
    displayValue: contacts.email,
    href: `mailto:${contacts.email}`,
    icon: Mail,
    copyable: true,
  },
];

export function Contacts() {
  return (
    <section id="contacts" className="py-28 md:py-44 bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="reveal text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.35em] text-background/40">
            Контакти
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mt-5">
            {"Зв'яжіться зі мною"}
          </h2>
          <p className="mt-6 text-background/50 max-w-md mx-auto text-base leading-relaxed">
            Оберіть зручний спосіб. Відповідаю протягом 24 годин.
          </p>
        </div>

        <div className="reveal max-w-2xl mx-auto">
          {contactItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-6 py-6 transition-opacity hover:opacity-70"
              style={i > 0 ? { borderTop: "1px solid rgba(255,255,255,0.08)" } : undefined}
            >
              <item.icon
                size={18}
                strokeWidth={1}
                className="text-background/30 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-[0.2em] text-background/30 mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-background/80 truncate">{item.displayValue}</div>
              </div>
              {item.copyable && (
                <span onClick={(e) => e.preventDefault()}>
                  <CopyButton text={item.value} />
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
