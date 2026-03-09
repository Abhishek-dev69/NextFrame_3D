"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const MetaglassesShowcase = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start center", "end end"],
  });

  // EXPLODED VIEW TRANSFORMS
  // Layer 1: Front Lenses (moves up/left)
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const layer1X = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  // Layer 2: Main Frame & Processor (stays relatively central)
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, 0]);
  const layer2Scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Layer 3: Arms & Audio Drivers (moves down/right)
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const layer3X = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  // LABEL TRANSFORMS (fade in as exploded view separates)
  const labelOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);

  return (
    <section ref={targetRef} className="relative min-h-[150vh] bg-black py-16 md:py-32 flex flex-col items-center">
      
      <div className="text-center mb-40 sticky top-32 z-20 px-6">
        <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
          NextFramee <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">Metaglasses</span>
        </h2>
        <p className="mt-4 text-gray-400 font-light max-w-xl mx-auto">
          The ultimate on-site visualization hardware. Scroll to reveal the architecture inside the architecture.
        </p>
      </div>

      <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-4xl aspect-video mx-auto z-10">
        
        {/* Layer 3: Arms & Audio */}
        <motion.div 
          style={{ y: layer3Y, x: layer3X }} 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {/* Mock Graphic Base */}
          <div className="w-1/2 h-1/3 bg-zinc-900 rounded-[50px] border border-zinc-800 opacity-60 backdrop-blur-3xl" />
          
          <motion.div style={{ opacity: labelOpacity }} className="absolute bottom-10 right-10 flex items-center gap-4">
            <div className="w-16 h-px bg-white/50" />
            <div className="text-right">
              <p className="text-white font-medium text-sm tracking-widest uppercase">Spatial Audio Drivers</p>
              <p className="text-zinc-500 text-xs">Acoustic resonance mapping.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Layer 2: Main Frame / Processor */}
        <motion.div 
          style={{ y: layer2Y, scale: layer2Scale }} 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {/* Mock Graphic Core */}
          <div className="w-3/5 h-2/5 bg-zinc-800 rounded-[40px] shadow-2xl border border-zinc-700/50 backdrop-blur-2xl flex items-center justify-between px-10">
            <div className="w-1/3 h-2/3 bg-black/50 rounded-full" />
            <div className="w-1/3 h-2/3 bg-black/50 rounded-full" />
          </div>

          <motion.div style={{ opacity: labelOpacity }} className="absolute -left-10 md:-left-20 flex items-center gap-4">
            <div className="text-left">
              <p className="text-white font-medium text-sm tracking-widest uppercase">AR Metaframe Processor</p>
              <p className="text-zinc-500 text-xs">Proprietary logic silicon.</p>
            </div>
            <div className="w-16 h-px bg-white/50" />
          </motion.div>
        </motion.div>

        {/* Layer 1: Front Lenses & Cameras */}
        <motion.div 
          style={{ y: layer1Y, x: layer1X, opacity: layer1Opacity }} 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
           {/* Mock Graphic Lenses */}
           <div className="w-[65%] h-[45%] border-2 border-white/10 bg-gradient-to-tr from-white/5 to-transparent rounded-[60px] backdrop-blur-md shadow-[0_0_50px_rgba(255,255,255,0.05)] flex items-start justify-center pt-4" >
             <div className="w-4 h-4 rounded-full bg-zinc-600 border border-zinc-400 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
           </div>

           <motion.div style={{ opacity: labelOpacity }} className="absolute top-10 right-0 md:-right-10 flex items-center gap-4">
            <div className="w-16 h-px bg-white/50" />
            <div className="text-right">
              <p className="text-white font-medium text-sm tracking-widest uppercase">12MP Cinematic Camera</p>
              <p className="text-zinc-500 text-xs">Real-time depth capture.</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
