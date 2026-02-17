"use client";

import { useState, useEffect, useCallback } from "react";
import type { Slot, Booking } from "@/types";
import { formatDate } from "@/lib/utils";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [newSlot, setNewSlot] = useState({
    productId: "",
    startAt: "",
    endAt: "",
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${password}`,
  };

  const fetchData = useCallback(async () => {
    // Fetch all slots for products 1-6
    const allSlots: Slot[] = [];
    for (let i = 1; i <= 6; i++) {
      const res = await fetch(`/api/slots?productId=${i}`);
      const data = await res.json();
      if (data.slots) allSlots.push(...data.slots);
    }
    setSlots(allSlots);
  }, []);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticated(true);
  };

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/slots", {
      method: "POST",
      headers,
      body: JSON.stringify({
        productId: Number(newSlot.productId),
        startAt: new Date(newSlot.startAt).toISOString(),
        endAt: new Date(newSlot.endAt).toISOString(),
      }),
    });
    if (res.ok) {
      setNewSlot({ productId: "", startAt: "", endAt: "" });
      fetchData();
    }
  };

  const handleDisableSlot = async (id: string) => {
    await fetch(`/api/admin/slots/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isAvailable: false }),
    });
    fetchData();
  };

  const handleCancelBooking = async (id: string) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: "canceled" }),
    });
    fetchData();
  };

  if (!authenticated) {
    return (
      <div className="max-w-sm mx-auto mt-20">
        <h1 className="font-serif text-2xl mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-border px-4 py-3 text-sm bg-background"
            required
          />
          <button
            type="submit"
            className="bg-foreground text-background py-3 text-sm"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Create Slot */}
      <section>
        <h2 className="font-serif text-xl mb-4">Create Slot</h2>
        <form
          onSubmit={handleCreateSlot}
          className="flex flex-wrap gap-3 items-end"
        >
          <label className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Product ID</span>
            <input
              type="number"
              value={newSlot.productId}
              onChange={(e) =>
                setNewSlot((p) => ({ ...p, productId: e.target.value }))
              }
              className="border border-border px-3 py-2 text-sm w-24 bg-background"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Start</span>
            <input
              type="datetime-local"
              value={newSlot.startAt}
              onChange={(e) =>
                setNewSlot((p) => ({ ...p, startAt: e.target.value }))
              }
              className="border border-border px-3 py-2 text-sm bg-background"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">End</span>
            <input
              type="datetime-local"
              value={newSlot.endAt}
              onChange={(e) =>
                setNewSlot((p) => ({ ...p, endAt: e.target.value }))
              }
              className="border border-border px-3 py-2 text-sm bg-background"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-foreground text-background px-6 py-2 text-sm"
          >
            Create
          </button>
        </form>
      </section>

      {/* Slots List */}
      <section>
        <h2 className="font-serif text-xl mb-4">
          Available Slots ({slots.length})
        </h2>
        {slots.length === 0 ? (
          <p className="text-sm text-muted-foreground">No slots found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-medium">ID</th>
                  <th className="py-2 pr-4 font-medium">Product</th>
                  <th className="py-2 pr-4 font-medium">Start</th>
                  <th className="py-2 pr-4 font-medium">Available</th>
                  <th className="py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {slots.map((slot) => (
                  <tr key={slot.id} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-muted-foreground">
                      {slot.id}
                    </td>
                    <td className="py-2 pr-4">{slot.productId}</td>
                    <td className="py-2 pr-4">{formatDate(slot.startAt)}</td>
                    <td className="py-2 pr-4">
                      {slot.isAvailable ? "Yes" : "No"}
                    </td>
                    <td className="py-2">
                      {slot.isAvailable && (
                        <button
                          onClick={() => handleDisableSlot(slot.id)}
                          className="text-accent text-xs hover:underline"
                        >
                          Disable
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Bookings List */}
      <section>
        <h2 className="font-serif text-xl mb-4">
          Bookings ({bookings.length})
        </h2>
        {bookings.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No bookings yet. They will appear here after users book slots.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-2 pr-4 font-medium">ID</th>
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Phone</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                  <th className="py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-muted-foreground">{b.id}</td>
                    <td className="py-2 pr-4">{b.name}</td>
                    <td className="py-2 pr-4">{b.phone}</td>
                    <td className="py-2 pr-4">{b.status}</td>
                    <td className="py-2">
                      {b.status !== "canceled" && (
                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          className="text-accent text-xs hover:underline"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
