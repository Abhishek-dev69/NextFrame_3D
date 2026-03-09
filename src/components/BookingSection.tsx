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

const FORMSPREE_URL = "https://formspree.io/f/YOUR_FORMSPREE_ID";

// ─── Mini Calendar ──────────────────────────────────────────────────────────
function Calendar({ selected, onSelect }: { selected: Date | null; onSelect: (d: Date) => void }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <div className="select-none p-1">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5">
          ←
        </button>
        <span className="text-sm font-medium text-white tracking-widest uppercase">
          {MONTHS[viewMonth]} <span className="text-gray-500">{viewYear}</span>
        </span>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5">
          →
        </button>
      </div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-3">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[9px] text-gray-500 font-mono tracking-widest uppercase py-1">
            {d}
          </div>
        ))}
      </div>
      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-1 gap-x-1">
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const past = isPast(day);
          const sel = isSelected(day);
          const isToday = today.getDate() === day && today.getMonth() === viewMonth && today.getFullYear() === viewYear;
          return (
            <button
              key={day}
              onClick={(e) => { e.preventDefault(); !past && onSelect(new Date(viewYear, viewMonth, day)); }}
              disabled={past}
              className={`
                relative mx-auto flex items-center justify-center w-8 h-8 rounded-full text-xs transition-all duration-300
                ${sel ? "bg-gradient-to-tr from-blue-600 to-purple-500 text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.5)] scale-110" : ""}
                ${!sel && !past ? "hover:bg-white/10 text-gray-300 cursor-pointer hover:scale-110" : ""}
                ${past ? "text-gray-700/50 cursor-not-allowed" : ""}
                ${isToday && !sel ? "ring-1 ring-white/30 text-white" : ""}
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

// ─── Input Field Component ──────────────────────────────────────────────────
const FloatingInput = ({ 
  id, label, type, value, onChange, placeholder 
}: { 
  id: string, label: string, type: string, value: string, onChange: any, placeholder: string 
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative group">
      <label 
        htmlFor={id} 
        className={`absolute left-4 transition-all duration-300 pointer-events-none font-mono tracking-widest uppercase z-10
          ${focused || value ? "-top-2.5 text-[9px] text-blue-400 bg-[#0a0a0a] px-1" : "top-3.5 text-xs text-gray-500"}
        `}
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ""}
        className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-700/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all font-light text-sm shadow-inner"
      />
      {/* Hover glow */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-md" />
    </div>
  );
};


// ─── Main Component ──────────────────────────────────────────────────────────
export const BookingSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", mobile: "" });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

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
    } catch (_) {}

    setStatus("success");
  };

  return (
    <section id="contact" className="relative py-16 md:py-32 bg-black px-6 z-10 overflow-hidden">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
              Consultation
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] mb-6">
            Book a{" "}
            <span className="font-semibold italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Demo
            </span>
          </h2>
          <p className="text-gray-400 font-light max-w-lg mx-auto text-[15px] leading-relaxed">
            Reserve a 30-minute session with our founders to discuss your project and view a live 3D Metaframe walkthrough.
          </p>
        </motion.div>

        {/* Form Container */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md mx-auto relative rounded-3xl p-[1px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/30 to-transparent" />
              <div className="relative bg-[#050505] p-12 rounded-3xl text-center border border-white/10 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                >
                  <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-3xl font-light text-white mb-3">Meeting Scheduled</h3>
                <p className="text-gray-400 font-light leading-relaxed mb-6">
                  Check your inbox for the calendar invite. We look forward to showing you the future of real estate.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
                  <span className="text-green-400 text-xs font-mono">CONFIRMED:</span>
                  <span className="text-white text-sm font-medium">
                    {selectedDate?.toLocaleDateString("en-IN", { month: "short", day: "numeric" })} at {selectedSlot}
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="bg-[#050505] border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl relative overflow-hidden"
            >
              {/* Internal glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
                
                {/* Left: Form Fields */}
                <div className="space-y-6 flex flex-col justify-center">
                  <div className="mb-4">
                    <h3 className="text-xl font-medium text-white mb-1">Your Details</h3>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Step 1 of 2</p>
                  </div>
                  
                  <FloatingInput id="name" label="Full Name" type="text" placeholder="e.g. Raj Mehta" value={form.name} onChange={handleChange} />
                  <FloatingInput id="email" label="Work Email" type="email" placeholder="raj@builder.com" value={form.email} onChange={handleChange} />
                  <FloatingInput id="mobile" label="Mobile Number" type="tel" placeholder="+91 98765 43210" value={form.mobile} onChange={handleChange} />
                  <FloatingInput id="subject" label="Project Name" type="text" placeholder="e.g. Sun Signature 2" value={form.subject} onChange={handleChange} />
                </div>

                {/* Right: Date & Time Picker */}
                <div className="flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-white mb-1">Date & Time</h3>
                    <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">Step 2 of 2</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10 hide-scrollbar">
                    {/* Calendar */}
                    <div>
                      <Calendar selected={selectedDate} onSelect={(d) => { setSelectedDate(d); setSelectedSlot(null); }} />
                    </div>

                    {/* Time Slots */}
                    <div className="relative border-l border-white/10 pl-0 sm:pl-8 h-[240px] overflow-y-auto custom-scrollbar flex flex-col">
                      <AnimatePresence mode="wait">
                        {!selectedDate ? (
                          <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <p className="text-gray-600 text-[10px] font-mono tracking-widest uppercase text-center w-2/3">
                              Select a date to view slots
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="slots"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ staggerChildren: 0.05 }}
                            className="grid grid-cols-2 gap-2"
                          >
                            {TIME_SLOTS.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={(e) => { e.preventDefault(); setSelectedSlot(slot); }}
                                className={`
                                  py-2.5 rounded-lg text-[11px] font-mono tracking-wider transition-all duration-300
                                  ${selectedSlot === slot 
                                    ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-[1.03]" 
                                    : "bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10 hover:text-white"
                                  }
                                `}
                              >
                                {slot}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Submit Area */}
                  <div className="mt-auto pt-10">
                    <button
                      type="submit"
                      disabled={status === "submitting" || !selectedDate || !selectedSlot || !form.name || !form.email}
                      className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-semibold rounded-xl text-black bg-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      {/* Button gradient sweep hover effect */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      
                      <span className="relative flex items-center gap-2 tracking-wide uppercase">
                        {status === "submitting" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Confirming...
                          </>
                        ) : (
                          "Book Consultation →"
                        )}
                      </span>
                    </button>
                    <p className="mt-4 text-center text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                      No payment required
                    </p>
                  </div>

                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}} />
    </section>
  );
};
