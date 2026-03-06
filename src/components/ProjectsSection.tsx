"use client";

import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Sun Signature 2",
    location: "Vapi, Gujarat",
    type: "Luxury Residential",
    description: "Full 3D metaframe walkthrough for a premium high-rise development overlooking the Vapi coastline.",
    color: "from-blue-900/30 to-transparent",
  },
  {
    title: "Rudraksh River Villa",
    location: "Baroda, Gujarat",
    type: "Ultra-Luxury Villa",
    description: "AR Metaglass experience enabling buyers to inhabit a completed river-facing villa while in the shell stage.",
    color: "from-red-900/30 to-transparent",
  },
  {
    title: "Odhav Residency",
    location: "Surat, Gujarat",
    type: "Mid-Range Residential",
    description: "Real-time photometric staging with dynamic material swapping — 3 material palettes, live lighting simulation.",
    color: "from-indigo-900/30 to-transparent",
  },
  {
    title: "Neo Vista",
    location: "Vapi, Gujarat",
    type: "Commercial Complex",
    description: "Complete digital twin of a mixed-use commercial campus with interactive floor-plan navigation.",
    color: "from-purple-900/30 to-transparent",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-32 bg-black px-6 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-2xl"
        >
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-blue-400 mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Our{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
              Projects
            </span>
          </h2>
          <p className="mt-4 text-gray-400 font-light leading-relaxed">
            Each project is a story of how raw architecture became something a buyer could feel, touch, and fall in love with.
          </p>
        </motion.div>

        {/* 2-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl hover:border-white/25 transition-all duration-500"
            >
              {/* Gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} pointer-events-none`} />

              {/* Card body */}
              <div className="relative z-10 p-10 flex flex-col justify-between min-h-[280px]">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono tracking-widest text-gray-500 uppercase">
                      {project.type}
                    </span>
                    <span className="text-xs font-mono text-gray-600 tracking-wide">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-light text-white mb-1">{project.title}</h3>
                  <p className="text-sm text-blue-400 font-mono tracking-wide mb-4">{project.location}</p>
                  <p className="text-gray-400 font-light leading-relaxed text-sm">{project.description}</p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent group-hover:from-white/40 transition-all duration-700" />
                  <a
                    href="#contact"
                    className="ml-6 flex items-center gap-2 text-xs text-white/60 hover:text-white font-mono tracking-widest uppercase transition-colors duration-300"
                  >
                    View Metaframe
                    <span className="text-base leading-none group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
