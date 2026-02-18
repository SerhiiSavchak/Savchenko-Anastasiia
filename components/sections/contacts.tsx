"use client";

import { useState } from "react";
import { contacts } from "@/lib/config/site";
import { FlowAnchor } from "@/components/FlowLine";
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
      className="ml-3 text-muted-foreground/40 hover:text-foreground transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:scale-110"
      aria-label={`Copy ${text}`}
    >
      {copied ? (
        <Check size={13} strokeWidth={1.2} />
      ) : (
        <Copy size={13} strokeWidth={1.2} />
      )}
    </button>
  );
}

const contactItems = [
  {
    label: "Telegram",
    value: contacts.telegram,
    displayValue: "@anastasia_savchenko",
    href: contacts.telegram,
    icon: Send,
    copyable: false,
  },
  {
    label: "Instagram",
    value: contacts.instagram,
    displayValue: "@anastasia_savchenko",
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
    <section id="contacts" className="relative py-32 md:py-44">
      {/* Anchor in left gutter to avoid crossing content */}
      <div className="absolute left-0 top-[15%] w-8 h-px pointer-events-none" aria-hidden>
        <FlowAnchor id="contacts" offsetY={0.5} offsetX={1} />
      </div>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* Left: heading */}
          <div className="reveal md:w-2/5 shrink-0">
            <span className="section-label">
              Контакти
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light mt-5 leading-[1.1]">
              {"Зв'яжiться"}<br />зi мною
            </h2>
            <p className="mt-6 text-muted-foreground leading-[1.8] text-[15px] max-w-xs">
              Оберiть зручний спосiб. Вiдповiдаю протягом 24 годин.
            </p>
          </div>

          {/* Right: contact list */}
          <div className="flex-1 md:pt-6">
            {contactItems.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="reveal group flex items-center gap-5 py-6 transition-all duration-[350ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-foreground hover:translate-x-1"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  ...(i > 0 ? { borderTop: "1px solid var(--color-border)" } : {}),
                }}
              >
                <item.icon
                  size={16}
                  strokeWidth={1.2}
                  className="text-accent shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm text-foreground/80 truncate">
                    {item.displayValue}
                  </div>
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
      </div>
    </section>
  );
}
