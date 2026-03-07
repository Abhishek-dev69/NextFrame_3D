"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

const services = [
  {
    id: "01",
    title: "3D Walkthrough",
    tagline: "Cinematic · Room-by-room",
    description: "Transform blueprints into photorealistic 3D walkthroughs. Buyers experience every room, material, and lighting condition before a slab is poured.",
    color: "#3b82f6",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M5 30L20 8l15 22H5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="27" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 30l7-7 5 5 4-6 13 8" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "02",
    title: "VR Walkthrough",
    tagline: "Immersive · True scale",
    description: "Clients walk through the property using NextFrame Metaglass headsets — feel true spatial proportions of a home that hasn't been built yet.",
    color: "#ef4444",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="3" y="12" width="34" height="18" rx="9" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="13" cy="21" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="27" cy="21" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17.5 21h5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "03",
    title: "Pixel Streaming",
    tagline: "Cloud-rendered · Zero install",
    description: "Stream 4K 3D environments directly to any browser or smart TV. No downloads, no hardware dependency. Real-time material customisation.",
    color: "#a855f7",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="5" y="6" width="21" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 26h12M16 22v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="32" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M30 12l1.5 1.5 3-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "04",
    title: "Plot Streaming",
    tagline: "Interactive · Site-level",
    description: "Select any plot on an interactive township map and instantly see a rendered view from that precise vantage point with sunlight and landscape.",
    color: "#10b981",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M6 34L20 6l14 28H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 34l7-14 7 14" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
        <circle cx="20" cy="18" r="2.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
];

// Duplicate 3× for seamless loop
const CARDS = [...services, ...services, ...services];
const CARD_W = 340;
const CARD_GAP = 24;
const TOTAL = services.length * (CARD_W + CARD_GAP);

export const ServicesSection = () => {
  const controls = useAnimationControls();
  const [paused, setPaused] = useState(false);
  const posRef = useRef(0);
  const startedRef = useRef(false);

  const startScroll = (from?: number) => {
    const start = from ?? posRef.current;
    const remaining = TOTAL - (start % TOTAL);
    controls.start({
      x: [start, start - remaining, start - remaining - TOTAL],
      transition: {
        duration: (remaining / TOTAL) * 30 + 30, // pro-rata speed
        ease: "linear",
        times: [0, remaining / (remaining + TOTAL), 1],
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      controls.start({
        x: [0, -TOTAL],
        transition: { duration: 30, ease: "linear", repeat: Infinity, repeatType: "loop" },
      });
    }
  }, [controls]);

  const handleHover = () => {
    if (paused) return;
    setPaused(true);
    controls.stop();
  };

  const handleLeave = () => {
    setPaused(false);
    // Resume from wherever it stopped
    controls.start({
      x: [posRef.current, posRef.current - TOTAL],
      transition: { duration: 30 * (1 - ((Math.abs(posRef.current) % TOTAL) / TOTAL)), ease: "linear", repeat: Infinity, repeatType: "loop" },
    });
  };

  return (
    <section id="services" className="relative py-24 bg-black overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-3">What we deliver</p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Our <span className="font-semibold italic">Services</span>
          </h2>
          <p className="mt-2 text-xs text-white/25 font-mono">Hover to pause · Release to play</p>
        </div>
        <a href="#contact" className="text-sm font-mono text-white/30 hover:text-white transition-colors tracking-wide self-start md:self-auto">
          Start a project ↗
        </a>
      </motion.div>

      {/* Scrolling track */}
      <div
        className="overflow-hidden"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        <motion.div
          animate={controls}
          onUpdate={(latest) => { posRef.current = latest.x as number; }}
          className="flex items-stretch"
          style={{ gap: CARD_GAP, paddingLeft: CARD_GAP, width: "max-content" }}
        >
          {CARDS.map((svc, i) => (
            <ServiceCard key={`${svc.id}-${i}`} svc={svc} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

function ServiceCard({ svc }: { svc: typeof services[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.018 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 relative rounded-2xl overflow-hidden cursor-default"
      style={{
        width: CARD_W,
        minHeight: 340,
        background: hovered
          ? `linear-gradient(145deg, ${svc.color}14 0%, #111 100%)`
          : "#111111",
        border: `1px solid ${hovered ? `${svc.color}45` : "rgba(255,255,255,0.10)"}`,
        boxShadow: hovered
          ? `0 0 0 1px ${svc.color}30, 0 28px 70px ${svc.color}25, 0 8px 32px rgba(0,0,0,0.6)`
          : `0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04) inset`,
        transition: "background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease",
      }}
    >
      {/* Top colour bleed */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none transition-opacity duration-500"
        style={{
          background: `linear-gradient(180deg, ${svc.color}15 0%, transparent 100%)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Ghost number */}
      <div
        className="absolute top-3 right-5 text-[96px] font-black leading-none pointer-events-none select-none transition-all duration-500"
        style={{
          WebkitTextStroke: `1.5px ${svc.color}`,
          color: "transparent",
          opacity: hovered ? 0.2 : 0.07,
        }}
      >
        {svc.id}
      </div>

      {/* Content */}
      <div className="relative p-8 flex flex-col" style={{ minHeight: 340 }}>
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500"
          style={{
            background: hovered ? `${svc.color}20` : "rgba(255,255,255,0.06)",
            border: `1px solid ${hovered ? `${svc.color}40` : "rgba(255,255,255,0.10)"}`,
            color: hovered ? svc.color : "rgba(255,255,255,0.5)",
            boxShadow: hovered ? `0 0 28px ${svc.color}35` : "none",
          }}
        >
          {svc.icon}
        </div>

        <h3 className="text-[22px] font-semibold text-white tracking-tight mb-1">{svc.title}</h3>
        <p
          className="text-[10px] font-mono tracking-[0.22em] uppercase mb-4 transition-colors duration-300"
          style={{ color: hovered ? svc.color : "rgba(255,255,255,0.28)" }}
        >
          {svc.tagline}
        </p>
        <p className="text-gray-400 font-light text-[14px] leading-relaxed flex-1">{svc.description}</p>

        {/* Bottom bar */}
        <div className="mt-7 h-px w-full bg-white/8 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: `linear-gradient(90deg, ${svc.color}, ${svc.color}70)` }}
            animate={{ width: hovered ? "100%" : "22%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute inset-y-0 w-16"
            style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)` }}
            animate={{ x: ["-64px", "400px"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear", repeatDelay: 0.8 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

