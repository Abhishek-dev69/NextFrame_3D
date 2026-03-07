"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    title: "3D Walkthrough",
    tagline: "Cinematic room-by-room experience",
    description:
      "Transform architectural blueprints into photorealistic, interactive 3D walkthroughs. Buyers experience every room, material finish, and lighting condition before a single slab is poured — compressing sales cycles by up to 60%.",
    highlights: ["192-frame HD sequence", "Custom material library", "Day/night lighting toggle", "Delivered in 48 hrs"],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <path d="M4 24L16 6l12 18H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <circle cx="22" cy="11" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M4 24l6-6 4 4 4-5 10 7" stroke="currentColor" strokeWidth="1.1" opacity="0.4"/>
      </svg>
    ),
    color: "#3b82f6",
  },
  {
    id: "02",
    title: "VR Walkthrough",
    tagline: "Full spatial immersion, pre-construction",
    description:
      "Step inside the property using NextFrame Metaglass headsets. Clients walk through corridors, interact with doors and fixtures, and feel the true proportions of a space that doesn't yet physically exist.",
    highlights: ["1:1 spatial accuracy", "Metaglass headset compatible", "On-site buyer sessions", "No app install required"],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <rect x="2" y="10" width="28" height="14" rx="7" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="10" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="22" cy="17" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M13.5 17h5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
    color: "#ef4444",
  },
  {
    id: "03",
    title: "Pixel Streaming",
    tagline: "Cloud-rendered, zero install",
    description:
      "Stream high-fidelity 3D environments directly to any browser or smart TV. No downloads, no hardware dependency. Your buyers experience the property on their phone, tablet, or laptop in real time from anywhere in the world.",
    highlights: ["Browser-native, no app", "4K cloud rendering", "Smart TV compatible", "Real-time material swap"],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <rect x="4" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 22h10M13 19v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="26" cy="9" r="5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M24 9l1.3 1.3 2.7-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    color: "#a855f7",
  },
  {
    id: "04",
    title: "Plot Streaming",
    tagline: "Live plot-level site visualisation",
    description:
      "Visualise individual plots within a township or residential layout in real time. Buyers pick a plot on an interactive site map and instantly see a rendered view from that exact vantage point, with horizon, neighbours, and sunlight.",
    highlights: ["Interactive site map", "Per-plot camera positions", "Sun & shadow simulation", "Landscape integration"],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
        <path d="M5 27L16 5l11 22H5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M10 27l6-12 6 12" stroke="currentColor" strokeWidth="1.1" opacity="0.4"/>
        <circle cx="16" cy="14" r="1.8" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    color: "#10b981",
  },
];

export const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const svc = services[active];

  return (
    <section id="services" className="relative py-28 bg-black overflow-hidden">
      {/* Subtle top/bottom lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* ── Header row ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-3">
              What we deliver
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Our{" "}
              <span className="font-semibold italic">Services</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="self-start md:self-auto inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-300 font-mono tracking-wide"
          >
            Start a project <span>↗</span>
          </a>
        </motion.div>

        {/* ── Main layout — left tabs + right panel ─ */}
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-0 border border-white/8 rounded-2xl overflow-hidden">

          {/* Left — service list */}
          <div className="border-b md:border-b-0 md:border-r border-white/8">
            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-6 py-5 flex items-center gap-4 transition-colors duration-300 relative border-b border-white/6 last:border-b-0 group
                    ${isActive ? "bg-white/4" : "hover:bg-white/[0.02]"}`}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* Active indicator bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[2px] rounded-r"
                    animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                    style={{ backgroundColor: s.color }}
                  />

                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      background: isActive ? `${s.color}18` : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isActive ? `${s.color}35` : "rgba(255,255,255,0.07)"}`,
                      color: isActive ? s.color : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {s.icon}
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p className={`text-sm font-medium truncate transition-colors duration-300 ${isActive ? "text-white" : "text-white/50 group-hover:text-white/70"}`}>
                      {s.title}
                    </p>
                    <p className="text-[11px] text-white/25 font-light truncate mt-0.5">
                      {s.tagline}
                    </p>
                  </div>

                  {/* Number */}
                  <span className="ml-auto text-[10px] font-mono text-white/15 flex-shrink-0">
                    {s.id}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right — detail panel */}
          <div className="relative overflow-hidden" style={{ minHeight: 380 }}>
            {/* Colour glow bg */}
            <div
              className="absolute inset-0 transition-all duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 80% 50%, ${svc.color}0c 0%, transparent 60%)`,
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-8 md:p-12 h-full flex flex-col justify-between"
              >
                {/* Top */}
                <div>
                  {/* Service number */}
                  <p className="text-[10px] font-mono tracking-[0.3em] text-white/20 mb-6">
                    {svc.id} / 04
                  </p>

                  <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">
                    {svc.title}
                  </h3>
                  <p
                    className="text-xs font-mono tracking-widest uppercase mb-6"
                    style={{ color: svc.color }}
                  >
                    {svc.tagline}
                  </p>

                  <p className="text-gray-400 font-light leading-relaxed text-[15px] max-w-xl">
                    {svc.description}
                  </p>
                </div>

                {/* Bottom — highlights */}
                <div className="mt-10">
                  <div className="h-px w-full bg-white/6 mb-8" />
                  <div className="grid grid-cols-2 gap-3">
                    {svc.highlights.map((h, i) => (
                      <motion.div
                        key={h}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                        className="flex items-center gap-2.5"
                      >
                        <div
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: svc.color }}
                        />
                        <span className="text-xs text-white/50 font-light">{h}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.a
                    href="#contact"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 hover:opacity-80"
                    style={{
                      background: `${svc.color}14`,
                      border: `1px solid ${svc.color}30`,
                      color: svc.color,
                    }}
                  >
                    Book a demo →
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right arrow nav */}
            <div className="absolute bottom-8 right-8 flex gap-2">
              <button
                onClick={() => setActive((a) => Math.max(0, a - 1))}
                disabled={active === 0}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/25 disabled:opacity-20 transition-all text-xs"
              >
                ←
              </button>
              <button
                onClick={() => setActive((a) => Math.min(services.length - 1, a + 1))}
                disabled={active === services.length - 1}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/25 disabled:opacity-20 transition-all text-xs"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
