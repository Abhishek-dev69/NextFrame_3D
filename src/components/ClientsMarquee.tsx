"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const CLIENT_LOGOS = [
  "/clients/client_01.webp",
  "/clients/client_02.webp",
  "/clients/client_03.webp",
  "/clients/client_04.webp",
  "/clients/client_05.webp",
  "/clients/client_06.webp",
];

const ROW1 = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];
const ROW2 = [...CLIENT_LOGOS].reverse().concat([...CLIENT_LOGOS].reverse(), [...CLIENT_LOGOS].reverse(), [...CLIENT_LOGOS].reverse());

export const ClientsMarquee = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const springY = useSpring(parallaxY, { stiffness: 80, damping: 20 });

  return (
    <section ref={sectionRef} id="projects" className="relative bg-black py-28 z-10 overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[350px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* ── Section heading ──────────────────────────── */}
      <motion.div
        style={{ y: springY }}
        className="max-w-6xl mx-auto px-6 mb-16 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Animated pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-white/10 bg-white/4">
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-indigo-400"
            />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">
              Trusted partners
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight">
            Our{" "}
            <span className="font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Clients
            </span>
          </h2>
          <p className="mt-5 text-gray-500 font-light max-w-md mx-auto">
            Visionary developers and architects across Gujarat who chose NextFrame
            to sell before they build.
          </p>

          {/* Animated stat row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="flex justify-center gap-10 mt-10"
          >
            {[["6+", "Active Clients"], ["100%", "Satisfaction"], ["₹500Cr+", "Projects Visualised"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-white">{val}</p>
                <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Marquee Row 1 (left-to-right) ───────────── */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center gap-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {ROW1.map((src, i) => (
              <LogoCard key={`r1-${i}`} src={src} index={i} total={CLIENT_LOGOS.length} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Marquee Row 2 (right-to-left) ───────────── */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-hidden">
          <motion.div
            className="flex items-center gap-0"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            style={{ width: "max-content" }}
          >
            {ROW2.map((src, i) => (
              <LogoCard key={`r2-${i}`} src={src} index={i} total={CLIENT_LOGOS.length} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function LogoCard({ src, index, total }: { src: string; index: number; total: number }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, zIndex: 10 }}
      className="flex-shrink-0 relative mx-5 my-3"
      style={{ width: 240, height: 120 }}
    >
      {/* Card glassmorphism container */}
      <div
        className="w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden border border-white/6 transition-all duration-500 hover:border-white/20 group"
        style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(8px)" }}
      >
        {/* Hover shimmer */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)" }}
        />
        <Image
          src={src}
          alt={`Client ${(index % total) + 1}`}
          width={200}
          height={90}
          className="w-[80%] h-[75%] object-contain filter invert opacity-45 group-hover:opacity-95 transition-all duration-500"
        />
      </div>
    </motion.div>
  );
}
