"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Enhanced Buyer Experience",
    description:
      "Buyers walk through a photorealistic version of their future home before a single slab is poured. Emotional connection drives commitment — and commitment drives deposits.",
    accent: "from-blue-500 to-blue-700",
  },
  {
    number: "02",
    title: "Faster Sales Cycle",
    description:
      "AR and 3D visualization remove uncertainty. Projects using NextFrame Metaframes see average inquiry-to-booking timelines cut by up to 40%.",
    accent: "from-red-400 to-red-600",
  },
  {
    number: "03",
    title: "Cost Reduction",
    description:
      "Design change requests drop dramatically when buyers can visualize spaces early. Fewer post-construction alterations means leaner project budgets.",
    accent: "from-gray-400 to-gray-600",
  },
];

export const MissionSection = () => {
  return (
    <section id="mission" className="relative py-32 bg-[#050505] px-6 z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-red-400 mb-4">
            Why NextFrame
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Our{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
              Mission
            </span>
          </h2>
          <p className="mt-4 text-gray-400 font-light max-w-xl mx-auto leading-relaxed">
            We exist to collapse the gap between construction and conviction —
            for builders, buyers, and the spaces they will call home.
          </p>
        </motion.div>

        {/* 3-step card layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative group rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl p-10 hover:border-white/20 transition-all duration-500"
            >
              {/* Step number with gradient */}
              <div className={`text-5xl font-black bg-gradient-to-b ${step.accent} bg-clip-text text-transparent mb-8 leading-none`}>
                {step.number}
              </div>

              <h3 className="text-xl font-light text-white mb-4 leading-snug">
                {step.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed text-sm">
                {step.description}
              </p>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r ${step.accent} opacity-30 group-hover:opacity-70 transition-opacity duration-500`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
