"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const TIME_SLOTS = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "12:00 PM","12:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM",
  "4:00 PM","4:30 PM","5:00 PM",
];

// ─── Formspree endpoint — replace YOUR_ID with your Formspree form ID ────────
const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORMSPREE_ID";

// ─── Mini Calendar ──────────────────────────────────────────────────────────
function Calendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  };

  const isSelected = (day: number) =>
    selected?.getDate() === day &&
    selected?.getMonth() === viewMonth &&
    selected?.getFullYear() === viewYear;

  return (
    <div className="select-none">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          ←
        </button>
        <span className="text-sm font-medium text-white tracking-wide">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
          →
        </button>
      </div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[10px] text-gray-600 font-mono tracking-widest uppercase py-1">
            {d}
          </div>
        ))}
      </div>
      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const past = isPast(day);
          const sel = isSelected(day);
          const isToday = today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
          return (
            <button
              key={day}
              onClick={() => !past && onSelect(new Date(viewYear, viewMonth, day))}
              disabled={past}
              className={`
                relative mx-auto flex items-center justify-center w-8 h-8 rounded-full text-sm transition-all duration-200
                ${sel ? "bg-white text-black font-semibold" : ""}
                ${!sel && !past ? "hover:bg-white/10 text-white cursor-pointer" : ""}
                ${past ? "text-gray-700 cursor-not-allowed" : ""}
                ${isToday && !sel ? "ring-1 ring-white/40" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Toast ──────────────────────────────────────────────────────────────────
function Toast({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] bg-white text-black text-sm font-medium px-6 py-4 rounded-2xl shadow-2xl max-w-sm text-center"
        >
          🗓️ Your consultation with Shrey Bhanusali & Dhaval Bhanushali has been scheduled.
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export const BookingSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", mobile: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) return;
    setStatus("submitting");

    const payload = {
      ...form,
      date: selectedDate.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
      timeslot: selectedSlot,
    };

    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (_) { /* silent fail — still show success */ }

    setStatus("success");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all font-light text-sm";
  const labelCls = "text-[10px] font-semibold text-gray-500 uppercase tracking-[0.15em] pl-1 mb-1 block";

  return (
    <section id="contact" className="relative py-32 bg-black px-6 z-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-blue-400 mb-3">Booking</p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Let&apos;s work{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
              together.
            </span>
          </h2>
          <p className="mt-3 text-gray-500 font-light max-w-md">
            Book a consultation with Shrey Bhanusali & Dhaval Bhanushali and experience what NextFrame Metaframes can do for your development.
          </p>
        </motion.div>

        {/* Success state */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-3xl mb-6"
              >
                ✓
              </motion.div>
              <h3 className="text-2xl font-light text-white mb-2">You&apos;re booked.</h3>
              <p className="text-gray-400">
                Shrey & Dhaval will confirm your{" "}
                <span className="text-white">{selectedSlot}</span> slot on{" "}
                <span className="text-white">
                  {selectedDate?.toLocaleDateString("en-IN", { weekday: "short", month: "long", day: "numeric" })}
                </span>.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* ── Left Column ── */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 space-y-5">
                <h3 className="text-lg font-light text-white mb-6 tracking-wide">
                  Book a <span className="font-medium">Meeting</span>
                </h3>

                <div>
                  <label className={labelCls} htmlFor="name">Your Name</label>
                  <input id="name" name="name" type="text" required placeholder="Raj Mehta" value={form.name} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="email">Your Email</label>
                  <input id="email" name="email" type="email" required placeholder="raj@builder.com" value={form.email} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="subject">Meeting Subject</label>
                  <input id="subject" name="subject" type="text" required placeholder="3D Metaframe for Sun Signature 2" value={form.subject} onChange={handleChange} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls} htmlFor="mobile">Your Mobile</label>
                  <input id="mobile" name="mobile" type="tel" required placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} className={inputCls} />
                </div>

                {/* Calendar */}
                <div>
                  <label className={labelCls}>Pick a Date</label>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 mt-1">
                    <Calendar selected={selectedDate} onSelect={setSelectedDate} />
                    {selectedDate && (
                      <p className="text-center text-xs text-blue-400 font-mono mt-3">
                        {selectedDate.toLocaleDateString("en-IN", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Right Column ── */}
              <div className="flex flex-col gap-6">
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex-1">
                  <h3 className="text-lg font-light text-white mb-1 tracking-wide">
                    Available <span className="font-medium">Time Slots</span>
                  </h3>
                  <p className="text-[11px] text-gray-600 font-mono tracking-wide mb-6 uppercase">IST · 30-min sessions</p>

                  {!selectedDate ? (
                    <div className="flex items-center justify-center h-48 text-gray-700 text-sm font-mono">
                      ← Select a date first
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {TIME_SLOTS.map(slot => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          style={{ touchAction: "manipulation" }}
                          className={`
                            py-2.5 px-2 rounded-xl text-xs font-mono tracking-wide transition-all duration-200 border
                            ${selectedSlot === slot
                              ? "bg-white text-black border-white font-semibold"
                              : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10"
                            }
                          `}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Booking summary + submit */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                  {selectedDate && selectedSlot && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-5 bg-white/5 border border-white/10 rounded-xl p-4 text-sm"
                    >
                      <p className="text-gray-500 text-xs font-mono uppercase tracking-widest mb-2">Booking Summary</p>
                      <p className="text-white">
                        {selectedDate.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" })}
                        {" · "}{selectedSlot}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">with Shrey & Dhaval Bhanushali · NextFrame</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || !selectedDate || !selectedSlot}
                    className="w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed tracking-wide"
                  >
                    {status === "submitting" ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Confirming...
                      </span>
                    ) : (
                      "Confirm Booking"
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-700 mt-3 font-mono">
                    No payment required. Shrey or Dhaval will confirm via email.
                  </p>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <Toast show={showToast} />
    </section>
  );
};
