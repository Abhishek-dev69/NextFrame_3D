"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "01",
    title: "3D Walkthrough",
    short: "Cinematic 3D room assembly",
    description:
      "Transform architectural blueprints into photorealistic 3D walkthroughs. Buyers experience every room, material, and lighting scenario before construction begins — reducing sales cycles by up to 60%.",
    icon: "◈",
    color: "from-blue-500/20 to-blue-900/10",
    accent: "bg-blue-400",
    border: "border-blue-500/20",
  },
  {
    id: "02",
    title: "VR Walkthrough",
    short: "Full-immersion spatial experience",
    description:
      "Step inside the property using NextFrame Metaglass VR headsets. Walk through corridors, open doors, and feel the spatial proportions of a space that doesn't yet physically exist.",
    icon: "⊙",
    color: "from-red-500/20 to-red-900/10",
    accent: "bg-red-400",
    border: "border-red-500/20",
  },
  {
    id: "03",
    title: "Pixel Streaming",
    short: "Cloud-rendered, zero install",
    description:
      "Stream high-fidelity 3D environments directly to any browser or smart TV — no app download, no hardware dependency. Your buyers explore on their phone, tablet, or laptop in real time.",
    icon: "◎",
    color: "from-violet-500/20 to-violet-900/10",
    accent: "bg-violet-400",
    border: "border-violet-500/20",
  },
  {
    id: "04",
    title: "Plot Streaming",
    short: "Live plot-level site visualisation",
    description:
      "Visualise individual plots within a township or layout in real time. Buyers select a plot on an interactive map and instantly see a rendered view from that exact vantage point.",
    icon: "⬡",
    color: "from-emerald-500/20 to-emerald-900/10",
    accent: "bg-emerald-400",
    border: "border-emerald-500/20",
  },
];

export const ServicesSection = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-32 bg-black px-6 z-10 overflow-hidden">
      {/* Subtle ambient blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/[0.015] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30 mb-4"
          >
            What we offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-white tracking-tight"
          >
            Our{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Services
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-5 text-gray-500 font-light max-w-xl mx-auto"
          >
            Tap any card to explore. Four technologies. One mission — sell before you build.
          </motion.p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {services.map((svc) => {
            const isActive = active === svc.id;
            return (
              <motion.div
                key={svc.id}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 60, damping: 18 } },
                }}
                onClick={() => setActive(isActive ? null : svc.id)}
                className={`relative cursor-pointer rounded-3xl border transition-all duration-500 select-none overflow-hidden
                  ${isActive ? `${svc.border} shadow-2xl` : "border-white/8 hover:border-white/20"}`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                {/* Card background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${svc.color} transition-opacity duration-500`}
                  style={{ opacity: isActive ? 1 : 0.4 }}
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

                <div className="relative p-8 md:p-10">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span
                        className="text-2xl text-white/60"
                        style={{ fontFamily: "monospace" }}
                      >
                        {svc.icon}
                      </span>
                      <span className="text-[10px] font-mono text-white/25 tracking-widest">
                        {svc.id}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center"
                    >
                      <span className="text-white/40 text-lg leading-none">+</span>
                    </motion.div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-1 tracking-tight">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-white/40 font-light">{svc.short}</p>

                  {/* Expanded detail — slides down */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`h-px w-12 ${svc.accent} mb-4 opacity-60`} />
                        <p className="text-gray-300 font-light leading-relaxed text-[15px]">
                          {svc.description}
                        </p>
                        <motion.button
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-6 text-xs font-mono tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            const el = document.getElementById("contact");
                            el?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Book a demo →
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 h-px transition-all duration-700 ${svc.accent} opacity-30`}
                    style={{ width: isActive ? "100%" : "30%" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
