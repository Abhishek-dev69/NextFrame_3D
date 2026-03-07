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

// Duplicate 4× for seamless seamless infinite loop
const LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

export const ClientsMarquee = () => {
  return (
    <section className="relative bg-black py-20 z-10 overflow-hidden">
      {/* Edge fade masks */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Subtle top label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center text-[10px] font-mono tracking-[0.35em] uppercase text-white/20 mb-12"
      >
        Trusted Partners
      </motion.p>

      {/* Marquee row */}
      <div className="flex overflow-hidden">
        <motion.div
          className="flex items-center gap-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 28,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ width: "max-content" }}
        >
          {LOGOS.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: 200, height: 100 }}
            >
              <Image
                src={src}
                alt={`Client ${(i % CLIENT_LOGOS.length) + 1}`}
                width={200}
                height={100}
                className="w-full h-full object-contain filter invert opacity-50 hover:opacity-90 transition-all duration-500 hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
