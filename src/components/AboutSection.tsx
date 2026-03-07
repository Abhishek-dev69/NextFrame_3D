"use client";

import React from "react";
import { motion } from "framer-motion";

const pillars = [
  {
    label: "Immersive VR",
    desc: "Walk through spaces before they exist — at true 1:1 scale.",
    color: "#3b82f6",
  },
  {
    label: "Real-time Renders",
    desc: "Interactive, photorealistic environments that respond instantly.",
    color: "#a855f7",
  },
  {
    label: "Pre-sale Impact",
    desc: "Help developers close faster with visualizations that convince.",
    color: "#10b981",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-28 bg-[#050505] px-6 z-10 overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px]"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.04) 0%, transparent 70%)" }} />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Top label ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-white/10 bg-white/4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">
              About NextFrame
            </span>
          </div>
        </motion.div>

        {/* ── Main 2-col layout ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20 items-start mb-20">
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-light text-white tracking-tight leading-[1.1]">
              Redefining how{" "}
              <span className="font-bold italic bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300">
                future spaces
              </span>{" "}
              are experienced.
            </h2>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-purple-400" />
              <span className="text-[10px] font-mono text-white/25 tracking-[0.3em] uppercase">
                VR · 3D · Real-time
              </span>
            </div>
          </motion.div>

          {/* Right — body copy */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7"
          >
            <p className="text-gray-300 font-light leading-relaxed text-lg">
              NextFrame is a virtual reality and immersive visualization studio focused on
              transforming how architectural and real estate projects are experienced.
              We create interactive VR walkthroughs and real-time visualizations that allow
              people to explore spaces <em className="text-white not-italic font-normal">before they are built.</em>
            </p>
            <p className="text-gray-400 font-light leading-relaxed">
              Our work helps developers, architects, and designers present their projects in a
              more engaging and realistic way. Instead of relying only on drawings or static
              images, clients can walk through the space, understand scale, and experience the
              design as if it already exists.
            </p>
            <p className="text-gray-500 font-light leading-relaxed text-[15px]">
              At NextFrame, we use real-time technology and immersive storytelling to bring
              future spaces into the present — collapsing the gap between imagination and reality.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 mt-2 px-7 py-3.5 rounded-full bg-white text-black text-sm font-medium tracking-wide hover:bg-gray-100 active:scale-95 transition-all"
            >
              Work with us <span>↗</span>
            </a>
          </motion.div>
        </div>

        {/* ── Pillar cards ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.025] px-7 py-6 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-400"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/30">{p.label}</span>
              </div>
              <p className="text-white/70 font-light text-sm leading-relaxed">{p.desc}</p>
              <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ backgroundColor: p.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
