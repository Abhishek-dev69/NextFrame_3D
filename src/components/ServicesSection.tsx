"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

const services = [
  {
    id: "01",
    title: "3D Walkthrough",
    tagline: "See it before it's built",
    description:
      "Transform architectural blueprints into photorealistic 3D walkthroughs. Buyers experience every room, material, and lighting scenario before construction begins — reducing sales cycles by up to 60%.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M4 28L20 8l16 20H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="28" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 28l8-8 5 5 5-6 14 9" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
      </svg>
    ),
    gradient: "from-[#1a1af8]/30 via-[#0066ff]/10 to-transparent",
    glowColor: "rgba(66,133,244,0.4)",
    borderGlow: "#4285f4",
    chipColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    id: "02",
    title: "VR Walkthrough",
    tagline: "Full spatial immersion",
    description:
      "Step inside the property using NextFrame Metaglass VR headsets. Walk through corridors, open doors, and feel the spatial proportions of a space that doesn't yet physically exist.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="4" y="13" width="32" height="18" rx="9" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="14" cy="22" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="26" cy="22" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 22h4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 9v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    gradient: "from-[#f80000]/25 via-[#ff4444]/8 to-transparent",
    glowColor: "rgba(239,68,68,0.4)",
    borderGlow: "#ef4444",
    chipColor: "bg-red-500/20 text-red-300 border-red-500/30",
  },
  {
    id: "03",
    title: "Pixel Streaming",
    tagline: "Cloud-rendered, zero install",
    description:
      "Stream high-fidelity 3D environments directly to any browser or smart TV — no app download, no hardware dependency. Your buyers explore on their phone, tablet, or laptop in real time.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 28h16M18 24v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="32" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M30 12l1.5 1.5 2.5-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    gradient: "from-[#7c3aed]/25 via-[#a855f7]/8 to-transparent",
    glowColor: "rgba(168,85,247,0.4)",
    borderGlow: "#a855f7",
    chipColor: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
  {
    id: "04",
    title: "Plot Streaming",
    tagline: "Live plot-level visualisation",
    description:
      "Visualise individual plots within a township or layout in real time. Buyers select a plot on an interactive map and instantly see a rendered view from that exact vantage point.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M6 34L20 8l14 26H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 34l7-14 7 14" stroke="currentColor" strokeWidth="1.2" opacity="0.5"/>
        <path d="M6 26h28" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    gradient: "from-[#059669]/25 via-[#10b981]/8 to-transparent",
    glowColor: "rgba(16,185,129,0.4)",
    borderGlow: "#10b981",
    chipColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
];

// 3D tilt card wrapper
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { width, height, left, top } = ref.current!.getBoundingClientRect();
    x.set((e.clientX - left - width / 2) / width);
    y.set((e.clientY - top - height / 2) / height);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const ServicesSection = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-32 bg-black px-6 z-10 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-[150px]" />
      </div>

      {/* Horizontal scan line decor */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* ── Header ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-white/10 bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
              What we deliver
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">
            Our{" "}
            <span className="font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Services
            </span>
          </h2>
          <p className="mt-5 text-gray-500 font-light max-w-lg mx-auto text-base leading-relaxed">
            Four technologies. One mission —&nbsp;
            <span className="text-white/60">sell before you build.</span>
          </p>
        </motion.div>

        {/* ── Cards grid ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((svc, idx) => {
            const isActive = active === svc.id;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 48, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard>
                  <motion.div
                    onClick={() => setActive(isActive ? null : svc.id)}
                    className="relative cursor-pointer rounded-2xl overflow-hidden group"
                    whileTap={{ scale: 0.98 }}
                    layout
                    transition={{ layout: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
                  >
                    {/* Animated gradient border */}
                    <div
                      className="absolute inset-0 rounded-2xl transition-opacity duration-500"
                      style={{
                        padding: "1px",
                        background: isActive
                          ? `linear-gradient(135deg, ${svc.borderGlow}, transparent 60%, ${svc.borderGlow}55)`
                          : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                      }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-[#0a0a0a]" />
                    </div>

                    {/* Glow on active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          style={{
                            boxShadow: `0 0 60px 0 ${svc.glowColor}, inset 0 0 40px 0 ${svc.glowColor}22`,
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Card inner */}
                    <div className="relative p-7 md:p-9">
                      {/* Big ghost number */}
                      <div
                        className="absolute top-4 right-6 text-[88px] font-black leading-none select-none pointer-events-none transition-opacity duration-500"
                        style={{ color: "rgba(255,255,255,0.030)", fontVariantNumeric: "tabular-nums" }}
                      >
                        {svc.id}
                      </div>

                      {/* Colour gradient inside card */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${svc.gradient} transition-opacity duration-500`}
                        style={{ opacity: isActive ? 1 : 0.5 }}
                      />

                      {/* Content */}
                      <div className="relative">
                        {/* Icon + chip row */}
                        <div className="flex items-start justify-between mb-5">
                          <div
                            className="p-3 rounded-xl bg-white/5 border border-white/8 text-white/70 group-hover:text-white group-hover:border-white/15 transition-all duration-300"
                          >
                            {svc.icon}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${svc.chipColor} tracking-widest`}>
                              {svc.id}
                            </span>
                            <motion.div
                              animate={{ rotate: isActive ? 45 : 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center bg-white/4 hover:bg-white/8 transition-colors"
                            >
                              <span className="text-white/50 text-lg leading-none">+</span>
                            </motion.div>
                          </div>
                        </div>

                        {/* Title + tagline */}
                        <h3 className="text-2xl md:text-[26px] font-semibold text-white tracking-tight mb-1">
                          {svc.title}
                        </h3>
                        <p className="text-xs font-mono text-white/35 tracking-widest uppercase mb-0">
                          {svc.tagline}
                        </p>

                        {/* Expandable description */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, y: -8 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -8 }}
                              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pt-5 pb-1">
                                <div className="h-px w-full bg-gradient-to-r from-white/15 to-transparent mb-5" />
                                <p className="text-gray-300 font-light leading-relaxed text-[15px]">
                                  {svc.description}
                                </p>
                                <motion.a
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.22 }}
                                  href="#contact"
                                  onClick={(e) => { e.stopPropagation(); }}
                                  className="inline-flex items-center gap-2 mt-6 text-xs font-mono tracking-[0.15em] uppercase text-white/40 hover:text-white transition-colors duration-300 group/btn"
                                >
                                  Book a demo
                                  <span className="inline-block group-hover/btn:translate-x-1 transition-transform">→</span>
                                </motion.a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Animated shimmer bar at bottom */}
                        <div className="mt-5 h-px w-full bg-white/5 relative overflow-hidden">
                          <motion.div
                            className="absolute inset-y-0 left-0 h-full"
                            style={{ background: svc.borderGlow }}
                            animate={{ width: isActive ? "100%" : "28%" }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          />
                          {/* shimmer */}
                          <motion.div
                            className="absolute inset-y-0 w-16 opacity-60"
                            style={{ background: `linear-gradient(90deg, transparent, ${svc.borderGlow}, transparent)` }}
                            animate={{ x: ["-64px", "500px"] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium tracking-wide hover:bg-gray-100 active:scale-95 transition-all duration-300"
          >
            Start a project
            <span className="text-lg">↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
