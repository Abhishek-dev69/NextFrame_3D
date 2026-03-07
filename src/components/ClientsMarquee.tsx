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

// Duplicate for seamless infinite loop
const LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

export const ClientsMarquee = () => {
  return (
    <section className="relative bg-black py-16 z-10 overflow-hidden">
      {/* Left / right fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-gray-600">
          Trusted by leading developers
        </p>
      </motion.div>

      {/* Marquee track */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-16 items-center"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            duration: 22,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: "max-content" }}
        >
          {LOGOS.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center w-36 h-20 opacity-60 hover:opacity-100 transition-opacity duration-500"
            >
              <Image
                src={src}
                alt={`Client ${(i % CLIENT_LOGOS.length) + 1}`}
                width={140}
                height={80}
                className="w-full h-full object-contain filter invert"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
