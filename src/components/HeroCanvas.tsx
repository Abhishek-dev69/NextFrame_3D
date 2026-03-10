"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";

const FRAME_COUNT = 82;

const hotspots = [
  {
    id: "glass",
    top: "30%",
    left: "60%",
    title: "Photometric Smart Glass",
    description: "Adaptive tinting capable of reducing HVAC load by up to 25%."
  },
  {
    id: "beams",
    top: "65%",
    left: "25%",
    title: "Reinforced 3D Metaframe",
    description: "High-tensile carbon-infused steel for unmatched structural integrity."
  },
  {
    id: "processor",
    top: "80%",
    left: "70%",
    title: "NextFramee Metaglass 2.0",
    description: "Edge-computing node rendering real-time spatial physics."
  }
];

export const HeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { images, loaded, progress } = useImagePreloader(FRAME_COUNT);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Animation State
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);
  const animationFrameId = useRef<number | undefined>(undefined);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  
  // Hotspot State
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Moved renderFrame up so it is defined before usage in effects
  const renderFrame = React.useCallback(
    (index: number) => {
      if (!canvasRef.current || !images[index]) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Use HD internal resolution
      canvas.width = 1920;
      canvas.height = 1080;

      const img = images[index];
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    },
    [images]
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Redraw immediately on resize
      renderFrame(Math.round(currentFrame.current));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, images, renderFrame]); // Re-bind when images load to ensure draw access

  // Interpolation Tick (Lerp)
  useEffect(() => {
    let animationFrameId: number;
    const factor = 0.12;

    const tick = () => {
      currentFrame.current += (targetFrame.current - currentFrame.current) * factor;
      
      if (Math.abs(targetFrame.current - currentFrame.current) > 0.01) {
        renderFrame(Math.round(currentFrame.current));
        
        const intFrame = Math.round(currentFrame.current);
        setActiveFrameIndex((prev) => (prev !== intFrame ? intFrame : prev));
      }
      
      animationFrameId = requestAnimationFrame(tick);
    };

    if (loaded && images.length > 0) {
      renderFrame(0);
      tick();
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [loaded, images, renderFrame]); // Tick depends on rendering logic

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // We update the target, not the actual draw. The tick() loop handles the chase.
    if (loaded && images.length > 0) {
       targetFrame.current = latest * (FRAME_COUNT - 1);
    }
  });

  const playPing = () => {
    try {
       // Super simple synthesized "ping" using web audio for a premium feel
       // eslint-disable-next-line @typescript-eslint/no-explicit-any
       const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
       if (!AudioCtx) return;
       const ctx = new AudioCtx();
       const osc = ctx.createOscillator();
       const gain = ctx.createGain();
       
       osc.type = "sine";
       osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
       osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.1);
       
       gain.gain.setValueAtTime(0.2, ctx.currentTime);
       gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
       
       osc.connect(gain);
       gain.connect(ctx.destination);
       osc.start();
       osc.stop(ctx.currentTime + 0.5);
    } catch(e) { /* ignore if audio context blocked */ }
  };

  const showHotspots = activeFrameIndex > 65;

  // Keep canvas full-screen throughout — no shrink/fade that causes blank

  return (
    // Height set to 1500vh for the most cinematic scroll duration possible
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      <motion.div 
        style={{ touchAction: 'pan-y' }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        
        {/* Shimmer skeleton while loading */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-6 bg-black">
            {/* Logo shimmer placeholder */}
            <div className="relative w-[55vw] max-w-[340px] h-12 rounded-lg overflow-hidden bg-white/5">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
            </div>
            {/* Text lines shimmer */}
            <div className="flex flex-col items-center gap-3 w-full max-w-xs">
              <div className="relative w-[70%] h-3 rounded-full overflow-hidden bg-white/5">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_0.2s_infinite]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
              </div>
              <div className="relative w-[50%] h-2 rounded-full overflow-hidden bg-white/5">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_0.4s_infinite]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-48 h-px bg-white/8 relative overflow-hidden mt-2">
              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-red-400 transition-all duration-300"
                style={{ width: `${progress}%` }} />
            </div>
            <span className="text-white/30 font-mono text-[10px] tracking-[0.3em] uppercase tabular-nums">
              {progress}%
            </span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 pointer-events-none will-change-transform"
          style={{ opacity: loaded ? 1 : 0, transform: "translateZ(0)" }}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* Hero text overlay */}
        <motion.div
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none"
          animate={{ opacity: activeFrameIndex > 20 ? 0 : 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/logo-transparent.png"
            alt="NextFramee"
            width={900}
            height={147}
            className="h-12 sm:h-16 md:h-20 w-auto max-w-[78vw] object-contain mb-3 md:mb-4"
            priority
          />
          <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-[0.1em] md:tracking-[0.15em] uppercase drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] leading-tight">
            EXPERIENCE{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-red-300">
              TOMORROW
            </span>
            {" "}TODAY.
          </h1>
          <div className="mt-6 flex flex-col items-center gap-5">
            <p className="text-xs sm:text-sm text-gray-300 font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase max-w-xs sm:max-w-lg mx-auto">
              Keep scrolling to assemble
            </p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 opacity-80"
            >
              <div className="w-[22px] h-[34px] border-[1.5px] border-white/40 rounded-full flex justify-center p-1">
                <motion.div
                  animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-1 h-1.5 bg-white rounded-full bg-glow-white"
                />
              </div>
              <svg
                className="w-4 h-4 text-white/60"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Background queue progress — shows while loaded but still fetching later frames */}
        {loaded && progress < 100 && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 pointer-events-none">
            <div className="w-32 h-px bg-white/10 relative overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-white/50 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-white/40 font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap">
              Optimizing Metaframe: {progress}%
            </span>
          </div>
        )}

        {/* Hotspots Layer */}
        <AnimatePresence>
          {showHotspots && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1 }}
               className="absolute inset-0 z-30 pointer-events-none"
             >
                {hotspots.map((spot) => (
                  <div 
                    key={spot.id}
                    className="absolute pointer-events-auto"
                    style={{ top: spot.top, left: spot.left }}
                  >
                    <div className="relative group">
                      
                      {/* Pulse Ring */}
                      <div className="absolute -inset-2 bg-white/20 rounded-full animate-ping opacity-75" />
                      
                      {/* Interaction Node */}
                      <button 
                        onClick={() => {
                          playPing();
                          setActiveHotspot(activeHotspot === spot.id ? null : spot.id);
                        }}
                        className="relative w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-zinc-300 hover:scale-125 transition-transform duration-300"
                      />
                      
                      {/* Expandable Info Card */}
                      <AnimatePresence>
                        {activeHotspot === spot.id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute top-8 left-1/2 -translate-x-1/2 w-64 bg-black/60 backdrop-blur-2xl border border-white/20 p-5 rounded-2xl shadow-2xl"
                          >
                             <h4 className="text-white font-medium text-sm mb-2 uppercase tracking-wide">{spot.title}</h4>
                             <p className="text-zinc-400 text-xs leading-relaxed">{spot.description}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>
                  </div>
                ))}
             </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
