"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useScroll } from "framer-motion";

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 99999,
        background: "linear-gradient(90deg, #3b82f6, #a855f7, #ef4444)",
      }}
    />
  );
};
