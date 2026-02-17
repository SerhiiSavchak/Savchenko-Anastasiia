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
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative bg-background w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto p-10 md:p-14">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-foreground/30 hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X size={18} strokeWidth={1} />
        </button>

        <h2 className="font-serif text-3xl mb-2">{product.title}</h2>
        <p className="text-sm text-foreground/40 mb-10">
          {formatPrice(product.price, product.currency)}
        </p>

        {/* Step: Select slot */}
        {step === "slots" && (
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-6">
              Оберіть час
            </h3>
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 size={18} className="animate-spin text-foreground/30" />
              </div>
            ) : slots.length === 0 ? (
              <p className="text-sm text-foreground/40 py-6">
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
                      <Check size={14} strokeWidth={1.2} />
                    )}
                  </button>
                ))}
              </div>
            )}
            {selectedSlot && (
              <button
                onClick={() => setStep("form")}
                className="w-full bg-foreground text-background py-4 text-[10px] uppercase tracking-[0.2em] transition-opacity hover:opacity-80"
              >
                Далі
              </button>
            )}
          </div>
        )}

        {/* Step: Form */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 mb-1">
              Ваші дані
            </h3>

            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">{"Ім'я *"}</span>
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, name: e.target.value }))
                }
                className="border border-foreground/10 px-4 py-3.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                placeholder="Анастасія"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">Телефон *</span>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, phone: e.target.value }))
                }
                className="border border-foreground/10 px-4 py-3.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                placeholder="+380..."
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">Telegram</span>
              <input
                value={formData.telegram}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, telegram: e.target.value }))
                }
                className="border border-foreground/10 px-4 py-3.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                placeholder="@username"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-[0.15em] text-foreground/40">Email</span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className="border border-foreground/10 px-4 py-3.5 text-sm bg-background focus:outline-none focus:border-foreground transition-colors"
                placeholder="email@example.com"
              />
            </label>

            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setStep("slots")}
                className="flex-1 border border-foreground/10 py-4 text-[10px] uppercase tracking-[0.15em] text-foreground/50 hover:border-foreground/30 hover:text-foreground transition-colors"
              >
                Назад
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-foreground text-background py-4 text-[10px] uppercase tracking-[0.2em] disabled:opacity-40 transition-opacity hover:opacity-80"
              >
                {submitting ? "Відправка..." : "Записатись"}
              </button>
            </div>
          </form>
        )}

        {/* Step: Success */}
        {step === "success" && (
          <div className="text-center py-12">
            <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center border border-foreground/15">
              <Check size={18} strokeWidth={1} />
            </div>
            <h3 className="font-serif text-2xl mb-3">Дякуємо!</h3>
            <p className="text-sm text-foreground/40 mb-10 leading-relaxed">
              {"Ваше бронювання прийнято. Ми зв'яжемось з вами найближчим часом."}
            </p>
            <button
              onClick={onClose}
              className="border border-foreground/10 px-12 py-4 text-[10px] uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              Закрити
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
