"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CLIENT_LOGOS = [
  "/clients/client_01.webp",
  "/clients/client_02.webp",
  "/clients/client_03.webp",
  "/clients/client_04.webp",
  "/clients/client_05.webp",
  "/clients/client_06.webp",
];

const LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

export const ClientsMarquee = () => {
  return (
    <section id="projects" className="relative bg-black py-24 z-10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-900/8 rounded-full blur-[120px]" />
      </div>

      {/* ── Section heading ─────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-blue-400 mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Our{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">
              Clients
            </span>
          </h2>
          <p className="mt-4 text-gray-500 font-light max-w-md mx-auto leading-relaxed">
            Developers and architects across Gujarat who chose NextFrame to bring their projects to life.
          </p>
          <div className="mt-6 w-12 h-px bg-gradient-to-r from-blue-500 to-red-400 mx-auto" />
        </motion.div>
      </div>

      {/* ── Marquee ─────────────────────────────────────── */}
      {/* Left / right fades */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden">
        <motion.div
          className="flex items-center gap-24"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
          style={{ width: "max-content" }}
        >
          {LOGOS.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.12, opacity: 1 }}
              className="flex-shrink-0 flex items-center justify-center cursor-pointer"
              style={{ width: 260, height: 130 }}
            >
              <Image
                src={src}
                alt={`Client ${(i % CLIENT_LOGOS.length) + 1}`}
                width={260}
                height={130}
                className="w-full h-full object-contain filter invert opacity-40 hover:opacity-100 transition-all duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
