"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const industries = [
  {
    role: "Builders",
    value: "Reduce change-order costs by 40% with mechanical-presence metaframes.",
    detail: "Catch design conflicts early. Let buyers approve finishes virtually. Ship projects with fewer surprises and leaner budgets.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <rect x="6" y="20" width="28" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 20V14a8 8 0 0116 0v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="20" cy="27" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
    gradientFrom: "#f97316",
    gradientTo: "#c2410c",
    glow: "rgba(249,115,22,0.3)",
    border: "rgba(249,115,22,0.2)",
    tag: "Construction",
  },
  {
    role: "Real Estate Agents",
    value: "Close pre-construction sales faster with immersive 3D walkthroughs.",
    detail: "Show your clients exactly what they're buying — before it exists. Stand out in a crowded market with technology that speaks louder than floor plans.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M6 34V18l14-10 14 10v16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <rect x="15" y="24" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.3"/>
        <path d="M12 22h2M26 22h2M20 14v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    gradientFrom: "#a855f7",
    gradientTo: "#7c3aed",
    glow: "rgba(168,85,247,0.3)",
    border: "rgba(168,85,247,0.2)",
    tag: "Sales",
  },
  {
    role: "Flat Owners",
    value: "Visualize your future living room with 1:1 scale accuracy before the first brick is laid.",
    detail: "Walk through your home virtually, swap materials, arrange furniture — make it yours before groundbreaking day.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <rect x="6" y="10" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 30v4M26 30v4M10 34h20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
        <rect x="14" y="18" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M14 18l6-6 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.5"/>
      </svg>
    ),
    gradientFrom: "#34d399",
    gradientTo: "#059669",
    glow: "rgba(52,211,153,0.3)",
    border: "rgba(52,211,153,0.2)",
    tag: "Buyers",
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 180, damping: 28 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 28 });

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
    >
      {children}
    </motion.div>
  );
}

export const IndustrySolutions = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-36 bg-[#0a0a0a] overflow-hidden">
      {/* Parallax ghost text */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0"
      >
        {["CATERING TO THE", "FUTURE OF", "REAL ESTATE"].map((line, i) => (
          <h2
            key={i}
            className="text-[11vw] font-black leading-none whitespace-nowrap"
            style={{
              opacity: 0.025,
              color: i % 2 === 0 ? "white" : "transparent",
              WebkitTextStroke: i % 2 !== 0 ? "1px rgba(255,255,255,0.6)" : undefined,
            }}
          >
            {line}
          </h2>
        ))}
      </motion.div>

      {/* Top/bottom fade lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-white/10 bg-white/4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">Who we serve</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">
            Built for{" "}
            <span className="font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Everyone
            </span>
          </h2>
          <p className="mt-5 text-gray-500 font-light max-w-lg mx-auto">
            Three different stakeholders. One powerful platform. Infinite impact.
          </p>
        </motion.div>

        {/* Cards — full-width stack */}
        <div className="flex flex-col gap-5">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`${i === 1 ? "md:ml-auto md:w-[85%]" : i === 2 ? "md:ml-auto md:w-[90%]" : "md:w-full"}`}
            >
              <TiltCard>
                <motion.div
                  onHoverStart={() => setHovered(ind.role)}
                  onHoverEnd={() => setHovered(null)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.35 }}
                  className="relative rounded-3xl overflow-hidden cursor-default group"
                  style={{
                    boxShadow: hovered === ind.role
                      ? `0 0 0 1px ${ind.border}, 0 20px 60px ${ind.glow}, inset 0 1px 0 rgba(255,255,255,0.07)`
                      : `0 0 0 1px rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)`,
                    transition: "box-shadow 0.5s ease",
                  }}
                >
                  {/* Glassmorphism body */}
                  <div
                    className="relative p-8 md:p-10 flex flex-col md:flex-row items-start gap-8"
                    style={{
                      background: hovered === ind.role
                        ? `linear-gradient(135deg, ${ind.gradientFrom}0a 0%, rgba(0,0,0,0.75) 100%)`
                        : "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.7) 100%)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      transition: "background 0.5s ease",
                    }}
                  >
                    {/* Left — icon block */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500"
                        style={{
                          background: hovered === ind.role
                            ? `linear-gradient(135deg, ${ind.gradientFrom}22, ${ind.gradientTo}11)`
                            : "rgba(255,255,255,0.05)",
                          border: `1px solid ${hovered === ind.role ? ind.border : "rgba(255,255,255,0.08)"}`,
                          color: hovered === ind.role ? ind.gradientFrom : "rgba(255,255,255,0.5)",
                          boxShadow: hovered === ind.role ? `0 0 24px ${ind.glow}` : "none",
                        }}
                      >
                        {ind.icon}
                      </div>
                    </div>

                    {/* Middle — content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
                          {ind.role}
                        </h3>
                        <span
                          className="text-[9px] font-mono px-2.5 py-0.5 rounded-full border tracking-widest uppercase"
                          style={{
                            background: `${ind.gradientFrom}12`,
                            borderColor: ind.border,
                            color: ind.gradientFrom,
                          }}
                        >
                          {ind.tag}
                        </span>
                      </div>
                      <p className="text-gray-300 font-light text-base md:text-lg leading-relaxed mb-3">
                        {ind.value}
                      </p>
                      <motion.p
                        animate={{ opacity: hovered === ind.role ? 1 : 0, height: hovered === ind.role ? "auto" : 0 }}
                        className="text-gray-500 font-light text-sm leading-relaxed overflow-hidden"
                        transition={{ duration: 0.4 }}
                      >
                        {ind.detail}
                      </motion.p>
                    </div>

                    {/* Right — animated number */}
                    <div
                      className="flex-shrink-0 text-[64px] font-black leading-none self-center select-none transition-all duration-500"
                      style={{
                        WebkitTextStroke: `1px ${ind.gradientFrom}`,
                        color: "transparent",
                        opacity: hovered === ind.role ? 0.25 : 0.06,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      0{i + 1}
                    </div>

                    {/* Bottom shimmer bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5">
                      <motion.div
                        className="absolute inset-y-0 left-0 h-full"
                        style={{ background: `linear-gradient(90deg, ${ind.gradientFrom}, ${ind.gradientTo})` }}
                        animate={{ width: hovered === ind.role ? "100%" : "20%" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
