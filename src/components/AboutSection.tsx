"use client";

import React from "react";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-32 bg-[#050505] px-6 z-10 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left — Label + Title */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400 mb-6">
            About NextFrame
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
            Redefining the way{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-red-300">
              spaces are visualized.
            </span>
          </h2>

          <div className="mt-8 w-12 h-px bg-gradient-to-r from-blue-500 to-red-400" />
        </motion.div>

        {/* Right — Body Copy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="space-y-6"
        >
          <p className="text-gray-300 font-light leading-relaxed text-lg">
            NextFrame is a specialized VR and 3D visualization company dedicated 
            to transforming architectural blueprints into immersive digital 
            environments that buyers can explore before a single brick is laid.
          </p>
          <p className="text-gray-500 font-light leading-relaxed">
            Founded by Shrey Bhanusali, we partner with real estate developers, 
            architects, and luxury builders across Gujarat to deliver photorealistic 
            walkthroughs, AR metaglass experiences, and interactive metaframe 
            platforms — collapsing the gap between imagination and reality.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 transition-colors duration-300 mt-2"
          >
            Work with us
            <span className="text-lg leading-none">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
