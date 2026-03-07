"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Detect hoverable elements
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest("a, button, [role=button], input, textarea, select, label");
      setHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);

    const loop = () => {
      // Dot snaps to cursor
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Ring lerps behind
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.style.cursor = "";
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [visible]);

  const isMobile = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  if (isMobile) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: hovering ? "#ef4444" : "#fff",
          boxShadow: hovering
            ? "0 0 10px #ef4444, 0 0 20px #ef444480"
            : "0 0 8px rgba(255,255,255,0.9)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s, background 0.25s, box-shadow 0.25s",
          scale: clicking ? "0.6" : hovering ? "1.5" : "1",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1.5px solid ${hovering ? "#ef444480" : "rgba(255,255,255,0.35)"}`,
          opacity: visible ? 1 : 0,
          transform: clicking ? "scale(0.8)" : hovering ? "scale(1.4)" : "scale(1)",
          transition: "opacity 0.3s, border-color 0.25s, transform 0.2s",
        }}
      />
    </>
  );
};
