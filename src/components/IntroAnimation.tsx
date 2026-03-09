"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const IntroAnimation = () => {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Only show once per session
    const seen = sessionStorage.getItem("nf_intro");
    if (!seen) {
      setShow(true);
      // Block scroll during intro
      document.body.style.overflow = "hidden";
      sessionStorage.setItem("nf_intro", "1");
    }
  }, []);

  const handleComplete = () => {
    document.body.style.overflow = "";
    setDone(true);
  };

  if (!show || done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[120px]"
              style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)" }} />
          </div>

          {/* Logo sequence */}
          <motion.div
            className="relative flex flex-col items-center gap-6"
            onAnimationComplete={handleComplete}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1.05, 1.15] }}
            transition={{ duration: 2, times: [0, 0.3, 0.7, 1], ease: "easeInOut" }}
          >
            <Image
              src="/logo-transparent.png"
              alt="NextFramee"
              width={480}
              height={80}
              className="w-[60vw] max-w-[420px] h-auto object-contain drop-shadow-[0_0_60px_rgba(59,130,246,0.5)]"
              priority
            />
            {/* Loading bar */}
            <motion.div className="w-32 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-red-400"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 1.4, delay: 0.2, ease: "easeInOut" }}
              />
            </motion.div>
            <motion.p
              className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/30"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, times: [0, 0.4, 1] }}
            >
              Initialising experience
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
