"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const VR_FRAME_COUNT = 82;

// ─── Dedicated preloader for VR frames ───────────────────────────────────────
function useVRPreloader(count: number) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const all = new Array<HTMLImageElement>(count);
    let done = 0;

    const loadOne = (i: number): Promise<void> =>
      new Promise((res) => {
        const img = new Image();
        img.src = `/images/vr-glimpse/vr_frame_${i.toString().padStart(3, "0")}.webp`;
        const finish = () => {
          all[i] = img;
          done++;
          setProgress(Math.round((done / count) * 100));
          if (done === count) { setImages([...all]); setLoaded(true); }
          res();
        };
        img.onload = finish;
        img.onerror = finish; // don't block on missing frames
      });

    const run = async () => {
      // Load first 20 sequentially for instant reveal
      for (let i = 0; i < Math.min(20, count); i++) await loadOne(i);
      setImages([...all]);
      setLoaded(true);
      // Rest in batches of 8
      const rest = Array.from({ length: count - 20 }, (_, i) => i + 20);
      while (rest.length > 0) await Promise.all(rest.splice(0, 8).map(loadOne));
    };
    run();
  }, [count]);

  return { images, loaded, progress };
}

// ─── Compass HUD ─────────────────────────────────────────────────────────────
const Compass = ({ rotation }: { rotation: number }) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-[9px] font-mono text-white/50 tracking-[0.2em] uppercase">Bearing</span>
    <div className="relative w-28 h-8 overflow-hidden flex items-center justify-center">
      {/* Tick marks */}
      <div
        className="flex items-center gap-0"
        style={{ transform: `translateX(${-rotation * 0.55}px)`, transition: "transform 0.1s linear" }}
      >
        {["W","","","","","N","","","","","E","","","","","S","","","","","W","","","","","N"].map((label, i) => (
          <div key={i} className="flex flex-col items-center" style={{ width: 14 }}>
            <div className={`bg-white/50 ${label ? "h-3 w-px" : "h-1.5 w-px opacity-30"}`} />
            {label && <span className="text-[7px] font-mono text-white/60 mt-0.5">{label}</span>}
          </div>
        ))}
      </div>
      {/* Center crosshair */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/80" />
    </div>
  </div>
);

// ─── Minimap HUD ─────────────────────────────────────────────────────────────
const Minimap = ({ progress }: { progress: number }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-2.5 w-24">
    <p className="text-[8px] font-mono text-white/40 tracking-widest uppercase mb-1.5">Floorplan</p>
    <svg viewBox="0 0 80 60" className="w-full h-auto opacity-60">
      {/* Outer room */}
      <rect x="2" y="2" width="76" height="56" fill="none" stroke="white" strokeWidth="1" opacity="0.4" />
      {/* Inner walls */}
      <line x1="40" y1="2" x2="40" y2="35" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="2" y1="35" x2="76" y2="35" stroke="white" strokeWidth="0.8" opacity="0.3" />
      <line x1="55" y1="35" x2="55" y2="58" stroke="white" strokeWidth="0.8" opacity="0.3" />
      {/* Door openings */}
      <line x1="38" y1="35" x2="42" y2="35" stroke="black" strokeWidth="1.5" />
      {/* Camera dot — moves with progress */}
      <circle
        cx={5 + Math.round(progress * 0.7) * 1}
        cy={30 + Math.sin(progress * 0.1) * 10}
        r="2.5"
        fill="white"
        opacity="0.9"
      />
      {/* FOV cone */}
      <path
        d={`M ${5 + Math.round(progress * 0.7)} ${30 + Math.sin(progress * 0.1) * 10} l 12 -7 l 0 14 z`}
        fill="white"
        opacity="0.15"
      />
    </svg>
  </div>
);

// ─── Live Badge ───────────────────────────────────────────────────────────────
const LiveBadge = () => {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
      <span
        className="w-2 h-2 rounded-full bg-red-500 transition-opacity duration-300"
        style={{
          opacity: blink ? 1 : 0.3,
          boxShadow: blink ? "0 0 8px rgba(239,68,68,0.8)" : "none",
        }}
      />
      <span className="text-[10px] font-mono text-white/70 tracking-[0.15em] uppercase">Live VR</span>
    </div>
  );
};

// ─── Main Section ────────────────────────────────────────────────────────────
export const VRGlimpseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const rafId = useRef<number | undefined>(undefined);
  const [frameIndex, setFrameIndex] = useState(0);

  const { images, loaded, progress: loadProgress } = useVRPreloader(VR_FRAME_COUNT);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const img = images[index];
      if (!canvas || !img) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = 1920;
      canvas.height = 1080;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const cx = (canvas.width - img.width * ratio) / 2;
      const cy = (canvas.height - img.height * ratio) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    },
    [images]
  );

  // Lerp animation loop
  useEffect(() => {
    const FACTOR = 0.08;
    const tick = () => {
      currentFrame.current += (targetFrame.current - currentFrame.current) * FACTOR;
      if (Math.abs(targetFrame.current - currentFrame.current) > 0.05) {
        const idx = Math.round(currentFrame.current);
        renderFrame(idx);
        setFrameIndex(idx);
      }
      rafId.current = requestAnimationFrame(tick);
    };
    if (loaded && images.length > 0) {
      renderFrame(0);
      tick();
    }
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, [loaded, images, renderFrame]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (loaded) {
      targetFrame.current = Math.min(1, latest) * (VR_FRAME_COUNT - 1);
    }
  });

  // Compass rotation: maps frame 0→81 to 0→360°
  const compassRotation = (frameIndex / (VR_FRAME_COUNT - 1)) * 360;

  return (
    <section className="relative bg-[#050505] z-10">
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-blue-400 mb-4">
            Interactive Experience
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            A Small{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-red-300">
              Glimpse
            </span>{" "}
            of our VR Experience
          </h2>
          <p className="mt-4 text-gray-500 font-light max-w-xl mx-auto">
            Scroll through a live walkthrough of a NextFrame Metaframe interior. This is what your buyers will experience.
          </p>
        </motion.div>
      </div>

      {/* Scroll-linked canvas container — 600vh for deliberate pacing */}
      <div ref={containerRef} className="relative h-[600vh]" style={{ touchAction: "pan-y" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Loading state */}
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black gap-4">
              <span className="text-white/40 font-mono text-xs tracking-[0.3em] uppercase">
                Calibrating VR Environment
              </span>
              <div className="w-48 h-px bg-white/10 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-blue-400 transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="text-white font-mono text-sm tabular-nums">{loadProgress}%</span>
            </div>
          )}

          {/* VR Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s ease",
              pointerEvents: "none",
              transform: "translateZ(0)",
            }}
          />

          {/* Dark vignette overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* ── HUD Layer ── */}
          {loaded && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Top-center — Compass */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2">
                <Compass rotation={compassRotation} />
              </div>

              {/* Top-right — Minimap */}
              <div className="absolute top-5 right-5">
                <Minimap progress={frameIndex} />
              </div>

              {/* Top-left — Frame counter */}
              <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2">
                <p className="text-[9px] font-mono text-white/40 tracking-widest uppercase">Frame</p>
                <p className="text-sm font-mono text-white tabular-nums">
                  {String(frameIndex).padStart(3, "0")} / {String(VR_FRAME_COUNT - 1).padStart(3, "0")}
                </p>
              </div>

              {/* Bottom-left — Live badge */}
              <div className="absolute bottom-8 left-6">
                <LiveBadge />
              </div>

              {/* Bottom-right — scroll hint */}
              <div className="absolute bottom-8 right-6 text-[10px] font-mono text-white/30 tracking-widest uppercase flex items-center gap-2">
                <span className="w-4 h-px bg-white/20" />
                Scroll to walk
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="h-20 bg-gradient-to-b from-black to-[#050505]" />
    </section>
  );
};
