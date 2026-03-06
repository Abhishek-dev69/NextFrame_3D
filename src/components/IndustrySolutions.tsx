"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const industries = [
  {
    role: "Builders",
    value: "Reduce change-order costs by 40% with mechanical-presence metaframes.",
  },
  {
    role: "Real Estate Agents",
    value: "Close pre-construction sales faster with immersive 3D walkthroughs.",
  },
  {
    role: "Flat Owners",
    value: "Visualize your future living room with 1:1 scale accuracy before the first brick is laid.",
  },
];

export const IndustrySolutions = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Create a parallax scroll setup relative to this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background typography moves slower (parallax)
  const bgTypographyY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={containerRef} className="relative py-40 bg-[#0a0a0a] overflow-hidden">
      
      {/* Background Parallax Layer */}
      <motion.div 
        style={{ y: bgTypographyY }}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-5 pointer-events-none select-none z-0 overflow-hidden"
      >
        <h2 className="text-[12vw] md:text-[8vw] font-bold text-white leading-none whitespace-nowrap">CATERING TO THE</h2>
        <h2 className="text-[12vw] md:text-[8vw] font-bold text-transparent text-stroke-white leading-none whitespace-nowrap outline-text" 
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>FUTURE OF</h2>
        <h2 className="text-[12vw] md:text-[8vw] font-bold text-white leading-none whitespace-nowrap">REAL ESTATE</h2>
      </motion.div>

      {/* Foreground Content Layer */}
      <motion.div 
        style={{ y: cardsY }}
        className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center gap-6"
      >
        {industries.map((ind, i) => (
          <div 
            key={i} 
            className="ml-auto w-full md:w-2/3 lg:w-1/2"
          >
            <motion.div 
              initial={{ opacity: 0, clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", x: 20 }}
              whileInView={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black/60 backdrop-blur-md border-[0.5px] border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden group"
            >
               <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gray-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
               <div className="pl-6 border-l border-white/5">
                 <h4 className="text-xl font-medium text-white mb-2 uppercase tracking-wide">{ind.role}</h4>
                 <p className="text-gray-400 font-light leading-relaxed text-lg">{ind.value}</p>
               </div>
            </motion.div>
          </div>
        ))}
      </motion.div>

    </section>
  );
};
