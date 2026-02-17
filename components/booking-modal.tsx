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
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal -- warm paper background */}
      <div className="relative bg-background w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto p-10 md:p-14">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1.2} />
        </button>

        <h2 className="font-serif text-3xl font-light mb-2">{product.title}</h2>
        <p className="text-sm text-muted-foreground mb-10">
          {formatPrice(product.price, product.currency)}
        </p>

        {/* Step: Select slot */}
        {step === "slots" && (
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-6">
              Оберiть час
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 size={18} className="animate-spin text-muted-foreground" />
              </div>
            ) : slots.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6">
                Немає доступних слотiв. Звернiться через контакти.
              </p>
            ) : (
              <div className="flex flex-col gap-2 mb-8">
                {slots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`flex items-center justify-between p-4 border text-sm transition-colors text-left ${
                      selectedSlot === slot.id
                        ? "border-foreground bg-muted"
                        : "border-border hover:border-accent"
                    }`}
                  >
                    <span>{formatDate(slot.startAt)}</span>
                    {selectedSlot === slot.id && (
                      <Check size={14} strokeWidth={1.2} />
                    )}
                  </button>
                ))}
              </div>
            )}
            {selectedSlot && (
              <button
                onClick={() => setStep("form")}
                className="hover-line text-[11px] uppercase tracking-[0.18em] text-foreground"
              >
                Далi
              </button>
            )}
          </div>
        )}

        {/* Step: Form */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
              Вашi данi
            </h3>

            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                {"Iм'я *"}
              </span>
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className="border border-border px-4 py-3.5 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors"
                placeholder="Анастасiя"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Телефон *
              </span>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, phone: e.target.value }))
                }
                className="border border-border px-4 py-3.5 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors"
                placeholder="+380..."
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Telegram
              </span>
              <input
                value={formData.telegram}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, telegram: e.target.value }))
                }
                className="border border-border px-4 py-3.5 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors"
                placeholder="@username"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Email
              </span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className="border border-border px-4 py-3.5 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors"
                placeholder="email@example.com"
              />
            </label>

            <div className="flex items-center gap-8 mt-4">
              <button
                type="button"
                onClick={() => setStep("slots")}
                className="hover-line text-[11px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Назад
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="hover-line text-[11px] uppercase tracking-[0.18em] text-foreground disabled:opacity-40"
              >
                {submitting ? "Вiдправка..." : "Записатись"}
              </button>
            </div>
          </form>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="text-center py-12">
            <div className="w-10 h-px bg-accent mx-auto mb-8" />
            <h3 className="font-serif text-2xl font-light mb-3">Дякуємо!</h3>
            <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
              {"Ваше бронювання прийнято. Ми зв'яжемось з вами найближчим часом."}
            </p>
            <button
              onClick={onClose}
              className="hover-line text-[11px] uppercase tracking-[0.18em] text-foreground"
            >
              Закрити
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
