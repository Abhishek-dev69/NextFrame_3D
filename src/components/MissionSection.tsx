"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Enhanced Buyer Experience",
    description:
      "Buyers walk through a photorealistic version of their future home before a single slab is poured. Emotional connection drives commitment — and commitment drives deposits.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-8 h-8">
        <circle cx="22" cy="18" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 38c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M32 12l4-4M36 16l-4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    glow: "rgba(96,165,250,0.35)",
    gradientFrom: "#3b82f6",
    gradientTo: "#1d4ed8",
    borderColor: "rgba(96,165,250,0.25)",
    bg: "rgba(59,130,246,0.04)",
    label: "Experience",
  },
  {
    number: "02",
    title: "Faster Sales Cycle",
    description:
      "AR and 3D visualization remove uncertainty. Projects using NextFramee Metaframes see average inquiry-to-booking timelines cut by up to 40%.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-8 h-8">
        <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M22 14v8l6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 22h4M32 22h4M22 8v4M22 32v4" stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      </svg>
    ),
    glow: "rgba(248,113,113,0.35)",
    gradientFrom: "#ef4444",
    gradientTo: "#b91c1c",
    borderColor: "rgba(248,113,113,0.25)",
    bg: "rgba(239,68,68,0.04)",
    label: "Speed",
  },
  {
    number: "03",
    title: "Cost Reduction",
    description:
      "Design change requests drop dramatically when buyers can visualize spaces early. Fewer post-construction alterations means leaner project budgets.",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-8 h-8">
        <path d="M12 34V20M20 34V14M28 34V24M36 34V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 10l8 8 8-6 10 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
      </svg>
    ),
    glow: "rgba(52,211,153,0.35)",
    gradientFrom: "#10b981",
    gradientTo: "#065f46",
    borderColor: "rgba(52,211,153,0.25)",
    bg: "rgba(16,185,129,0.04)",
    label: "Efficiency",
  },
];

// 3D tilt helper
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 180, damping: 28 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 180, damping: 28 });
  const ref = React.useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) / r.width);
    y.set((e.clientY - r.top - r.height / 2) / r.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const MissionSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="mission" className="relative py-32 bg-[#050505] px-6 z-10 overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{ background: "radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)" }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-white/10 bg-white/4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">Why NextFramee</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">
            Our{" "}
            <span className="font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Mission
            </span>
          </h2>
          <p className="mt-5 text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
            We exist to collapse the gap between construction and conviction —
            for builders, buyers, and the spaces they will call home.
          </p>
        </motion.div>

        {/* ── Cards ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard>
                <motion.div
                  onHoverStart={() => setHovered(step.number)}
                  onHoverEnd={() => setHovered(null)}
                  className="relative h-full rounded-3xl overflow-hidden cursor-default group"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* ── Neumorphism outer ring ── */}
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      boxShadow: hovered === step.number
                        ? `0 0 0 1px ${step.borderColor}, 0 24px 60px ${step.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`
                        : `0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)`,
                      transition: "box-shadow 0.5s ease",
                    }}
                  />

                  {/* ── Glassmorphism card body ── */}
                  <div
                    className="relative h-full p-9 flex flex-col"
                    style={{
                      background: hovered === step.number
                        ? `linear-gradient(135deg, ${step.bg} 0%, rgba(0,0,0,0.7) 100%)`
                        : "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.6) 100%)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      transition: "background 0.5s ease",
                    }}
                  >
                    {/* Noise texture overlay */}
                    <div className="absolute inset-0 rounded-3xl opacity-[0.015] pointer-events-none"
                      style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

                    {/* Top — icon + label chip */}
                    <div className="flex items-start justify-between mb-8">
                      <div
                        className="p-3 rounded-2xl transition-all duration-500"
                        style={{
                          background: hovered === step.number
                            ? `linear-gradient(135deg, ${step.gradientFrom}22, ${step.gradientTo}11)`
                            : "rgba(255,255,255,0.05)",
                          border: `1px solid ${hovered === step.number ? step.borderColor : "rgba(255,255,255,0.07)"}`,
                          color: hovered === step.number ? step.gradientFrom : "rgba(255,255,255,0.45)",
                          boxShadow: hovered === step.number ? `0 0 20px ${step.glow}` : "none",
                          transition: "all 0.5s ease",
                        }}
                      >
                        {step.icon}
                      </div>
                      <span
                        className="text-[10px] font-mono px-2.5 py-1 rounded-full border tracking-widest uppercase transition-all duration-500"
                        style={{
                          background: `${step.gradientFrom}11`,
                          borderColor: step.borderColor,
                          color: hovered === step.number ? step.gradientFrom : "rgba(255,255,255,0.25)",
                        }}
                      >
                        {step.label}
                      </span>
                    </div>

                    {/* Ghost number */}
                    <div
                      className="absolute bottom-6 right-7 text-[100px] font-black leading-none pointer-events-none select-none"
                      style={{
                        WebkitTextStroke: `1px ${step.gradientFrom}`,
                        color: "transparent",
                        opacity: hovered === step.number ? 0.1 : 0.04,
                        transition: "opacity 0.5s ease",
                      }}
                    >
                      {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed text-sm flex-1">
                      {step.description}
                    </p>

                    {/* Animated bottom bar */}
                    <div className="mt-8 h-px w-full bg-white/5 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${step.gradientFrom}, ${step.gradientTo})` }}
                        animate={{ width: hovered === step.number ? "100%" : "25%" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                      {/* Shimmer sweep */}
                      <motion.div
                        className="absolute inset-y-0 w-16"
                        style={{ background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)` }}
                        animate={{ x: ["-64px", "400px"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
