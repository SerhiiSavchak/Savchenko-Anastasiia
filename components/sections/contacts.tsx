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
      className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
      aria-label={`Copy ${text}`}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
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
    <section id="contacts" className="py-24 md:py-32 bg-muted">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Контакти
          </span>
          <h2 className="font-serif text-3xl md:text-4xl mt-3">
            {"Зв'яжіться зі мною"}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
            Оберіть зручний спосіб. Відповідаю протягом 24 годин.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 p-6 border border-border bg-background transition-colors hover:bg-foreground hover:text-background"
            >
              <item.icon
                size={20}
                strokeWidth={1.5}
                className="text-accent group-hover:text-background transition-colors"
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground group-hover:text-background/70 transition-colors">
                  {item.label}
                </div>
                <div className="text-sm truncate">{item.displayValue}</div>
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
