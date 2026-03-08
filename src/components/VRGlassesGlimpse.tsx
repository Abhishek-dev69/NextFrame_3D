"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

const FRAME_COUNT = 82;
const FRAME_PATH = (i: number) =>
  `/images/vrglassesglimpse/glasses_frame_${i.toString().padStart(3, "0")}.webp`;

// ─── Easing utility (ease-in-out cubic) ─────────────────────────────────────
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ─── Preloader hook ──────────────────────────────────────────────────────────
function useGlassesPreloader(count: number) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const all = new Array<HTMLImageElement>(count);
    let done = 0;

    const loadOne = (i: number): Promise<void> =>
      new Promise((res) => {
        const img = new Image();
        img.src = FRAME_PATH(i);
        const finish = () => {
          all[i] = img;
          done++;
          setProgress(Math.round((done / count) * 100));
          // Unlock UI after first 20 frames
          if (done === 20) { setImages([...all]); setLoaded(true); }
          else if (done > 20) setImages([...all]);
          res();
        };
        img.onload = finish;
        img.onerror = finish;
      });

    const run = async () => {
      for (let i = 0; i < Math.min(20, count); i++) await loadOne(i);
      const rest = Array.from({ length: count - 20 }, (_, k) => k + 20);
      while (rest.length) await Promise.all(rest.splice(0, 8).map(loadOne));
    };
    run();
  }, [count]);

  return { images, loaded, progress };
}

// ─── Spec chips shown as glassmorphism cards ─────────────────────────────────
const specs = [
  { label: "Display", value: "4K Micro-OLED", icon: "◈" },
  { label: "FOV", value: "120° Ultra-Wide", icon: "⊙" },
  { label: "Latency", value: "< 2ms Spatial", icon: "◎" },
  { label: "Platform", value: "NextFrame OS", icon: "⬡" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export const VRGlassesGlimpse = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const rafId = useRef<number | undefined>(undefined);
  const isVisible = useRef(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);

  const { images, loaded, progress } = useGlassesPreloader(FRAME_COUNT);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Opacity for section header (fades in on enter, fades out on exit)
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);

  // ── Render canvas frame ──────────────────────────────────────────────────
  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const img = images[index];
      if (!canvas || !img?.complete || img.naturalWidth === 0) return;
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

  // ── Lerp animation loop — pauses when off-screen (Intersection Observer) ──
  useEffect(() => {
    // Intersection Observer to pause RAF when section is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    const LERP = 0.07;
    const tick = () => {
      if (isVisible.current) {
        currentFrame.current += (targetFrame.current - currentFrame.current) * LERP;
        if (Math.abs(targetFrame.current - currentFrame.current) > 0.04) {
          const idx = Math.round(currentFrame.current);
          renderFrame(idx);
          setFrameIndex(idx);
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };

    if (loaded && images.length > 0) {
      renderFrame(0);
      tick();
    }
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, [loaded, images, renderFrame]);

  // ── Scroll → eased frame index ──────────────────────────────────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loaded) return;
    const eased = easeInOutCubic(Math.min(1, latest));
    targetFrame.current = eased * (FRAME_COUNT - 1);
  });

  // Trigger spec cards after section enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-black z-10">
      {/* ── Section header (above scroll zone) ─────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-400 mb-4">
            Hardware
          </p>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            The{" "}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-white to-blue-300">
              NextFrame Metaglass
            </span>
          </h2>
          <p className="mt-4 text-gray-500 font-light max-w-xl mx-auto">
            Scroll to witness the headset that puts your buyers inside the property — before a single wall goes up.
          </p>
        </motion.div>
      </div>

      {/* ── 450vh scroll zone ───────────────────────────────────────────── */}
      <div ref={containerRef} className="relative h-[450vh]" style={{ touchAction: "pan-y" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">

          {/* Loading bar */}
          {!loaded && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black gap-4">
              <span className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase">
                Loading Metaglass Render
              </span>
              <div className="w-48 h-px bg-white/10 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-red-400 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-white font-mono text-sm tabular-nums">{progress}%</span>
            </div>
          )}

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain will-change-transform"
            style={{
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s ease",
              pointerEvents: "none",
              transform: "translateZ(0)",
            }}
          />

          {/* ── Glassmorphism overlays ─────────────────────────────────── */}
          {loaded && (
            <>
              {/* Scroll progress strip — top */}
              <motion.div
                style={{ opacity: headerOpacity }}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
              >
                <div className="w-32 md:w-48 h-px bg-white/10 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-white/50"
                    style={{ width: `${(frameIndex / (FRAME_COUNT - 1)) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-white/30 tracking-widest tabular-nums">
                  {Math.round((frameIndex / (FRAME_COUNT - 1)) * 100)}%
                </span>
              </motion.div>

              {/* Left side — Product name plate */}
              <div className="absolute left-3 md:left-10 top-1/2 -translate-y-1/2 z-20">
                <div
                  className="p-2.5 md:p-4 rounded-xl md:rounded-2xl"
                  style={{
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p className="text-[7px] md:text-[9px] font-mono text-white/30 tracking-[0.2em] uppercase mb-0.5 md:mb-1">Model</p>
                  <p className="text-white text-xs md:text-sm font-medium tracking-wide">Metaglass 2.0</p>
                  <p className="text-white/40 text-[8px] md:text-[10px] font-mono mt-0.5 md:mt-1">by NextFrame</p>
                </div>
              </div>

              {/* Right side — Spec cards */}
              <AnimatePresence>
                {sectionVisible && (
                <div className="absolute right-3 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 md:gap-2">
                    {specs.map((spec, i) => (
                      <motion.div
                        key={spec.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                        style={{
                          background: "rgba(0,0,0,0.45)",
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                        className="px-2 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl flex items-center gap-2 md:gap-3 min-w-[110px] md:min-w-[160px]"
                      >
                        <span className="text-white/30 text-xs md:text-base">{spec.icon}</span>
                        <div>
                          <p className="text-[7px] md:text-[8px] font-mono text-white/30 tracking-widest uppercase">{spec.label}</p>
                          <p className="text-white/80 text-[10px] md:text-xs font-medium">{spec.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Bottom — tagline */}
              <motion.div
                style={{ opacity: headerOpacity }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center"
              >
                <div
                  className="px-5 py-3 rounded-2xl"
                  style={{
                    background: "rgba(0,0,0,0.50)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p className="text-[10px] font-mono text-white/40 tracking-[0.25em] uppercase">
                    See through the future of real estate
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="h-20 bg-gradient-to-b from-black to-[#050505]" />
    </section>
  );
};
