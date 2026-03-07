"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    title: "3D Walkthrough",
    tagline: "See it before it's built",
    description:
      "Transform architectural blueprints into photorealistic 3D walkthroughs. Buyers experience every room, material, and lighting scenario before construction begins — reducing sales cycles by up to 60%.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M6 34L24 10l18 24H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="32" cy="16" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 34l9-9 6 6 5-7 16 10" stroke="currentColor" strokeWidth="1.2" opacity="0.45"/>
      </svg>
    ),
    gradientFrom: "#3b82f6",
    gradientTo: "#1e40af",
    glow: "rgba(59,130,246,0.5)",
    border: "rgba(59,130,246,0.3)",
    bg: "from-blue-900/30",
  },
  {
    id: "02",
    title: "VR Walkthrough",
    tagline: "Full spatial immersion",
    description:
      "Step inside the property using NextFrame Metaglass VR headsets. Walk through corridors, open doors, and feel the spatial proportions of a space that doesn't yet physically exist.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="4" y="14" width="40" height="22" rx="11" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="15" cy="25" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="33" cy="25" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 25h8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M24 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    gradientFrom: "#ef4444",
    gradientTo: "#b91c1c",
    glow: "rgba(239,68,68,0.5)",
    border: "rgba(239,68,68,0.3)",
    bg: "from-red-900/30",
  },
  {
    id: "03",
    title: "Pixel Streaming",
    tagline: "Cloud-rendered, zero install",
    description:
      "Stream high-fidelity 3D environments directly to any browser or smart TV — no app download, no hardware dependency. Your buyers explore on their phone, tablet, or laptop in real time.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="8" width="26" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 32h16M20 28v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="38" cy="14" r="7" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M35.5 14l2 2 3.5-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
    gradientFrom: "#a855f7",
    gradientTo: "#7c3aed",
    glow: "rgba(168,85,247,0.5)",
    border: "rgba(168,85,247,0.3)",
    bg: "from-violet-900/30",
  },
  {
    id: "04",
    title: "Plot Streaming",
    tagline: "Live plot-level visualisation",
    description:
      "Visualise individual plots within a township or layout in real time. Buyers select a plot on an interactive map and instantly see a rendered view from that exact vantage point.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M8 40L24 8l16 32H8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M16 40l8-16 8 16" stroke="currentColor" strokeWidth="1.2" opacity="0.45"/>
        <path d="M8 30h32" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
        <circle cx="24" cy="22" r="2.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    gradientFrom: "#10b981",
    gradientTo: "#065f46",
    glow: "rgba(16,185,129,0.5)",
    border: "rgba(16,185,129,0.3)",
    bg: "from-emerald-900/30",
  },
];

const CARD_WIDTH = 380;
const CARD_GAP = 24;

export const ServicesSection = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const total = services.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP;
    const visible = el.offsetWidth;
    setMaxDrag(Math.max(0, total - visible));
  }, []);

  const goTo = (i: number) => {
    const offset = i * (CARD_WIDTH + CARD_GAP);
    const clamped = Math.min(offset, maxDrag);
    animate(x, -clamped, { type: "spring", stiffness: 260, damping: 32 });
    setActive(i);
  };

  // Keep active dot in sync with drag position
  const onDragEnd = () => {
    setDragging(false);
    const curr = -x.get();
    const idx = Math.round(curr / (CARD_WIDTH + CARD_GAP));
    const clamped = Math.max(0, Math.min(idx, services.length - 1));
    setActive(clamped);
    goTo(clamped);
  };

  return (
    <section id="services" className="relative py-28 bg-black overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.06), transparent 70%)" }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* ── Header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6 md:px-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-white/10 bg-white/4">
              <motion.span
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-white/50"
              />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">What we deliver</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">
              Our{" "}
              <span className="font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Services
              </span>
            </h2>
            <p className="mt-3 text-gray-500 font-light max-w-md">
              Four technologies, one mission — sell before you build.
            </p>
          </div>

          {/* Arrow controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo(Math.max(0, active - 1))}
              disabled={active === 0}
              className="w-11 h-11 rounded-full border border-white/12 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 disabled:opacity-25 transition-all duration-300 active:scale-95"
            >
              ←
            </button>
            <button
              onClick={() => goTo(Math.min(services.length - 1, active + 1))}
              disabled={active === services.length - 1}
              className="w-11 h-11 rounded-full border border-white/12 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 disabled:opacity-25 transition-all duration-300 active:scale-95"
            >
              →
            </button>
          </div>
        </motion.div>

        {/* ── Horizontal track ───────────────────── */}
        <div ref={trackRef} className="overflow-hidden pl-6 md:pl-10">
          <motion.div
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 40 }}
            dragElastic={0.08}
            onDragStart={() => setDragging(true)}
            onDragEnd={onDragEnd}
            style={{ x }}
            className="flex gap-6 cursor-grab active:cursor-grabbing w-max"
          >
            {services.map((svc, i) => (
              <ServiceCard
                key={svc.id}
                svc={svc}
                index={i}
                active={active === i}
                dragging={dragging}
                onClick={() => !dragging && goTo(i)}
              />
            ))}
            {/* Right spacer */}
            <div className="w-6 md:w-10 flex-shrink-0" />
          </motion.div>
        </div>

        {/* ── Progress dots ──────────────────────── */}
        <div className="flex justify-center gap-2 mt-10">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-400"
            >
              <motion.div
                animate={{ width: active === i ? 28 : 8, background: active === i ? "#fff" : "rgba(255,255,255,0.2)" }}
                transition={{ duration: 0.35 }}
                className="h-2 rounded-full"
              />
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium tracking-wide hover:bg-gray-100 active:scale-95 transition-all"
          >
            Start a project <span>↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

function ServiceCard({ svc, index, active, dragging, onClick }: {
  svc: typeof services[0]; index: number; active: boolean; dragging: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.015 }}
      className="flex-shrink-0 relative rounded-3xl overflow-hidden select-none"
      style={{
        width: CARD_WIDTH,
        minHeight: 480,
        cursor: dragging ? "grabbing" : "pointer",
        boxShadow: (hovered || active)
          ? `0 0 0 1px ${svc.border}, 0 28px 70px ${svc.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`
          : `0 0 0 1px rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)`,
        transition: "box-shadow 0.5s ease",
      }}
    >
      {/* Glassmorphism bg */}
      <div
        className="absolute inset-0"
        style={{
          background: (hovered || active)
            ? `linear-gradient(145deg, ${svc.gradientFrom}18 0%, rgba(0,0,0,0.82) 100%)`
            : "linear-gradient(145deg, rgba(255,255,255,0.028) 0%, rgba(0,0,0,0.8) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transition: "background 0.5s ease",
        }}
      />

      {/* Top colour wash */}
      <div
        className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${svc.bg} to-transparent transition-opacity duration-500`}
        style={{ opacity: (hovered || active) ? 1 : 0.4 }}
      />

      {/* Content */}
      <div className="relative p-9 flex flex-col h-full" style={{ minHeight: 480 }}>
        {/* Top row */}
        <div className="flex items-start justify-between mb-8">
          <div
            className="p-3.5 rounded-2xl transition-all duration-500"
            style={{
              background: (hovered || active)
                ? `linear-gradient(135deg, ${svc.gradientFrom}25, transparent)`
                : "rgba(255,255,255,0.06)",
              border: `1px solid ${(hovered || active) ? svc.border : "rgba(255,255,255,0.08)"}`,
              color: (hovered || active) ? svc.gradientFrom : "rgba(255,255,255,0.5)",
              boxShadow: (hovered || active) ? `0 0 28px ${svc.glow}` : "none",
            }}
          >
            {svc.icon}
          </div>
          <span
            className="text-[9px] font-mono px-2.5 py-1 rounded-full border tracking-widest uppercase"
            style={{
              background: `${svc.gradientFrom}12`,
              borderColor: svc.border,
              color: svc.gradientFrom,
            }}
          >
            {svc.id}
          </span>
        </div>

        {/* Ghost number */}
        <div
          className="absolute bottom-8 right-8 text-[110px] font-black leading-none pointer-events-none select-none"
          style={{
            WebkitTextStroke: `1.5px ${svc.gradientFrom}`,
            color: "transparent",
            opacity: (hovered || active) ? 0.12 : 0.04,
            transition: "opacity 0.5s ease",
          }}
        >
          {svc.id}
        </div>

        {/* Text */}
        <h3 className="text-2xl md:text-[26px] font-semibold text-white tracking-tight mb-2">
          {svc.title}
        </h3>
        <p className="text-[11px] font-mono text-white/30 tracking-[0.2em] uppercase mb-5">
          {svc.tagline}
        </p>
        <p className="text-gray-400 font-light leading-relaxed text-[15px] flex-1">
          {svc.description}
        </p>

        {/* CTA link */}
        <AnimatePresence>
          {(hovered || active) && (
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 mt-7 text-xs font-mono tracking-[0.15em] uppercase group/btn"
              style={{ color: svc.gradientFrom }}
            >
              Book a demo
              <span className="group-hover/btn:translate-x-1 transition-transform inline-block">→</span>
            </motion.a>
          )}
        </AnimatePresence>

        {/* Bottom shimmer bar */}
        <div className="mt-6 h-px w-full bg-white/6 relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: `linear-gradient(90deg, ${svc.gradientFrom}, ${svc.gradientTo})` }}
            animate={{ width: (hovered || active) ? "100%" : "20%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 w-20"
            style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)` }}
            animate={{ x: ["-80px", "500px"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
