"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    title: "3D Walkthrough",
    tagline: "Cinematic · Room-by-room",
    description:
      "Transform blueprints into photorealistic 3D walkthroughs. Buyers experience every room, material, and lighting scenario before ground is broken — compressing sales cycles by up to 60%.",
    highlights: ["192-frame HD sequence", "Custom material library", "Day / night lighting", "Delivered in 48 hrs"],
    color: "#3b82f6",
  },
  {
    id: "02",
    title: "VR Walkthrough",
    tagline: "Immersive · True scale",
    description:
      "Clients walk through the property using NextFrame Metaglass headsets — feel the true spatial proportions of a home that hasn't been built yet. The most convincing sales tool in real estate.",
    highlights: ["1:1 spatial accuracy", "Metaglass headset ready", "On-site buyer sessions", "Zero app install"],
    color: "#ef4444",
  },
  {
    id: "03",
    title: "Pixel Streaming",
    tagline: "Cloud-rendered · Zero install",
    description:
      "Stream 4K 3D environments directly to any browser or smart TV. No downloads, no hardware. Buyers explore their future home from anywhere in the world with real-time material customisation.",
    highlights: ["Browser-native", "4K cloud rendering", "Smart TV compatible", "Real-time colour swap"],
    color: "#a855f7",
  },
  {
    id: "04",
    title: "Plot Streaming",
    tagline: "Interactive · Site-level",
    description:
      "Select any plot on an interactive township map and instantly see a rendered view from that precise vantage point — complete with sunlight, shadows, neighbours, and landscape context.",
    highlights: ["Interactive plot map", "Per-plot camera lock", "Sun & shadow sim", "Landscape integration"],
    color: "#10b981",
  },
];

export const ServicesSection = () => {
  const [open, setOpen] = useState<string | null>("01");

  return (
    <section id="services" className="relative py-24 bg-black">
      {/* Scan lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16"
        >
          <div>
            <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-3">What we deliver</p>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Our <span className="font-semibold italic">Services</span>
            </h2>
          </div>
          <a href="#contact" className="text-sm font-mono text-white/30 hover:text-white transition-colors tracking-wide">
            Start a project ↗
          </a>
        </motion.div>

        {/* Accordion rows */}
        <div className="flex flex-col">
          {services.map((svc, i) => {
            const isOpen = open === svc.id;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-white/8 last:border-b last:border-b-white/8"
              >
                {/* Row trigger */}
                <button
                  onClick={() => setOpen(isOpen ? null : svc.id)}
                  className="w-full flex items-center gap-6 md:gap-10 py-6 md:py-8 group text-left"
                >
                  {/* Large number */}
                  <span
                    className="text-[40px] md:text-[56px] font-black leading-none transition-all duration-500 flex-shrink-0 tabular-nums"
                    style={{
                      WebkitTextStroke: isOpen ? "0px" : `1px ${svc.color}60`,
                      color: isOpen ? svc.color : "transparent",
                      textShadow: isOpen ? `0 0 40px ${svc.color}60` : "none",
                    }}
                  >
                    {svc.id}
                  </span>

                  {/* Title + tagline */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-2xl md:text-4xl font-semibold tracking-tight transition-colors duration-300"
                      style={{ color: isOpen ? "white" : "rgba(255,255,255,0.5)" }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      className="text-xs font-mono tracking-widest uppercase mt-1 transition-opacity duration-300"
                      style={{ color: svc.color, opacity: isOpen ? 1 : 0.4 }}
                    >
                      {svc.tagline}
                    </p>
                  </div>

                  {/* Toggle icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-shrink-0 w-9 h-9 rounded-full border border-white/12 flex items-center justify-center group-hover:border-white/25 transition-colors"
                  >
                    <span className="text-white/40 text-lg leading-none group-hover:text-white/60 transition-colors">+</span>
                  </motion.div>
                </button>

                {/* Expandable content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pl-0 md:pl-[calc(56px+40px)]">
                        {/* Accent line */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "60px" }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="h-px mb-7"
                          style={{ backgroundColor: svc.color }}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-start">
                          {/* Description */}
                          <motion.p
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.12 }}
                            className="text-gray-400 font-light leading-relaxed text-base max-w-xl"
                          >
                            {svc.description}
                          </motion.p>

                          {/* Feature grid */}
                          <motion.div
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.18 }}
                            className="grid grid-cols-2 gap-x-8 gap-y-2.5 flex-shrink-0"
                          >
                            {svc.highlights.map((h, j) => (
                              <motion.div
                                key={h}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.22 + j * 0.05 }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: svc.color }} />
                                <span className="text-xs text-white/45 font-light whitespace-nowrap">{h}</span>
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>

                        {/* CTA */}
                        <motion.a
                          href="#contact"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.35 }}
                          className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase hover:opacity-80 transition-opacity"
                          style={{
                            background: `${svc.color}12`,
                            border: `1px solid ${svc.color}28`,
                            color: svc.color,
                          }}
                        >
                          Book a demo →
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
