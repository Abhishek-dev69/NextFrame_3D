"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Glasses } from "lucide-react";

export const FloatingMetaglassIcon = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger approximately when HeroCanvas scroll finishes (e.g., after 300vh = 3 * window.innerHeight)
      // or set an arbitrary threshold like > 800px.
      const scrollY = window.scrollY;
      const threshold = window.innerHeight * 1.5;
      
      if (scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    // Scroll to bottom form
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-8 right-8 z-50 group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 p-4 rounded-full shadow-2xl transition-colors duration-300"
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-white font-medium text-sm pr-0 group-hover:pr-2 opacity-0 group-hover:opacity-100">
            Book Consultation
          </span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-white"
          >
            <Glasses size={24} />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
