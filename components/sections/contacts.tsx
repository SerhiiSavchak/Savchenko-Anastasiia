"use client";

import { useState, useEffect, useRef } from "react";
import { contacts } from "@/lib/config/site";
import { FlowAnchor } from "@/components/FlowLine";
import { Send, Instagram, Phone, Mail, Copy, Check } from "lucide-react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="contacts-copy-btn"
      aria-label={`Скопіювати ${text}`}
    >
      {copied ? (
        <Check size={14} strokeWidth={1.2} aria-hidden />
      ) : (
        <Copy size={14} strokeWidth={1.2} aria-hidden />
      )}
    </button>
  );
}

/** Touch feedback: show line draw for ~700ms after tap (mobile) */
function useTouchFeedback() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchStart = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveId(id);
    timeoutRef.current = setTimeout(() => {
      setActiveId(null);
      timeoutRef.current = null;
    }, 700);
  };

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return { activeId, handleTouchStart };
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { activeId, handleTouchStart } = useTouchFeedback();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className={`relative py-32 md:py-44 contacts-section-inner ${isVisible ? "contacts-section-visible" : ""}`}
    >
      {/* Anchor in left gutter to avoid crossing content */}
      <div className="absolute left-0 top-[15%] w-8 h-px pointer-events-none" aria-hidden>
        <FlowAnchor id="contacts" offsetY={0.5} offsetX={1} />
      </div>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          {/* Left: heading */}
          <div className="contacts-heading md:w-2/5 shrink-0">
            <span className="section-label">Контакти</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light mt-5 leading-[1.1]">
              {"Зв'яжiться"}
              <br />
              зi мною
            </h2>
            <p className="mt-6 text-muted-foreground leading-[1.8] text-[15px] max-w-xs">
              Оберiть зручний спосiб. Вiдповiдаю протягом 24 годин.
            </p>
          </div>

          {/* Right: contact list with route line */}
          <div className="flex-1 md:pt-6 relative contacts-list-wrapper">
            {/* Route line accent */}
            <div className="contacts-route-line" aria-hidden />

            <div className="relative pl-4 md:pl-6">
              {contactItems.map((item) => (
                <div key={item.label} className="contacts-item">
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={`contacts-item-link group ${activeId === item.label ? "contacts-item-active" : ""}`}
                    onTouchStart={() => handleTouchStart(item.label)}
                  >
                    <item.icon
                      size={16}
                      strokeWidth={1.2}
                      className="text-accent shrink-0"
                      aria-hidden
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm text-foreground/80 truncate">
                        {item.displayValue}
                      </div>
                    </div>
                    {item.copyable && <CopyButton text={item.value} />}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
