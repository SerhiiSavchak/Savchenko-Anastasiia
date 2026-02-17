"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Check } from "lucide-react";
import type { Product, Slot } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";

interface BookingModalProps {
  product: Product;
  onClose: () => void;
}

export function BookingModal({ product, onClose }: BookingModalProps) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<"slots" | "form" | "success">("slots");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    telegram: "",
    contactChannel: "telegram",
  });

  useEffect(() => {
    fetch(`/api/slots?productId=${product.id}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [product.id]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slotId: selectedSlot,
          productId: product.id,
          ...formData,
        }),
      });

      if (res.ok) {
        setStep("success");
      }
    } catch {
      // error handling
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative bg-background w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto p-10 md:p-12">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.2} />
        </button>

        <h2 className="font-serif text-3xl font-light mb-2">{product.title}</h2>
        <p className="text-sm text-muted-foreground mb-8">
          {formatPrice(product.price, product.currency)}
        </p>

        {/* Step: Select slot */}
        {step === "slots" && (
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-5">
              Оберіть час
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={20} className="animate-spin text-muted-foreground" />
              </div>
            ) : slots.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                Немає доступних слотів. Зверніться через контакти.
              </p>
            ) : (
              <div className="flex flex-col gap-2 mb-8">
                {slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`flex items-center justify-between p-4 border text-sm transition-colors text-left ${
                      selectedSlot === slot.id
                        ? "border-foreground bg-foreground/5"
                        : "border-foreground/10 hover:border-foreground/30"
                    }`}
                  >
                    <span>{formatDate(slot.startAt)}</span>
                    {selectedSlot === slot.id && (
                      <Check size={14} className="text-foreground" />
                    )}
                  </button>
                ))}
              </div>
            )}
            {selectedSlot && (
              <button
                onClick={() => setStep("form")}
                className="btn-micro w-full bg-foreground text-background py-3.5 text-xs uppercase tracking-[0.15em]"
              >
                Далі
              </button>
            )}
          </div>
        )}

        {/* Step: Form */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
              Ваші дані
            </h3>

            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{"Ім'я *"}</span>
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className="border border-foreground/15 px-4 py-3.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                placeholder="Анастасія"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Телефон *</span>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, phone: e.target.value }))
                }
                className="border border-foreground/15 px-4 py-3.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                placeholder="+380..."
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Telegram</span>
              <input
                value={formData.telegram}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, telegram: e.target.value }))
                }
                className="border border-foreground/15 px-4 py-3.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                placeholder="@username"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className="border border-foreground/15 px-4 py-3.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                placeholder="email@example.com"
              />
            </label>

            <div className="flex gap-3 mt-3">
              <button
                type="button"
                onClick={() => setStep("slots")}
                className="btn-micro flex-1 border border-foreground/15 py-3.5 text-xs uppercase tracking-[0.1em] hover:border-foreground/40 transition-colors"
              >
                Назад
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-micro flex-1 bg-foreground text-background py-3.5 text-xs uppercase tracking-[0.15em] disabled:opacity-50"
              >
                {submitting ? "Відправка..." : "Записатись"}
              </button>
            </div>
          </form>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="text-center py-10">
            <div className="w-14 h-14 mx-auto mb-6 flex items-center justify-center border border-foreground/20">
              <Check size={20} className="text-foreground" strokeWidth={1.2} />
            </div>
            <h3 className="font-serif text-2xl font-light mb-3">Дякуємо!</h3>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              {"Ваше бронювання прийнято. Ми зв'яжемось з вами найближчим часом."}
            </p>
            <button
              onClick={onClose}
              className="btn-micro border border-foreground/15 px-10 py-3.5 text-xs uppercase tracking-[0.15em] hover:border-foreground/40 transition-colors"
            >
              Закрити
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
