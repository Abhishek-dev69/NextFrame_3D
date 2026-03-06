"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence, useTransform } from "framer-motion";
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
    title: "Structural Metaframe",
    description: "High-tensile carbon-infused steel for unmatched structural integrity."
  },
  {
    id: "processor",
    top: "80%",
    left: "70%",
    title: "NextFrame Metaglass 2.0",
    description: "Edge-computing node rendering real-time spatial physics."
  }
];

export const HeroCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { images, loaded } = useImagePreloader(FRAME_COUNT);
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
    const factor = 0.06;

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
       // Assemble fully by 80% scroll progress so user can see it before it scales away
       const progress = Math.min(1, latest / 0.8);
       targetFrame.current = progress * (FRAME_COUNT - 1);
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

  // Scale down and move towards bottom-right at the very end of the scroll (95% to 100%)
  const scale = useTransform(scrollYProgress, [0.95, 1], [1, 0.1]);
  const x = useTransform(scrollYProgress, [0.95, 1], ["0%", "45%"]);
  const y = useTransform(scrollYProgress, [0.95, 1], ["0%", "45%"]);
  const opacity = useTransform(scrollYProgress, [0.98, 1], [1, 0]);

  return (
    // Height set to 1000vh for a very long, cinematic scroll duration
    <div ref={containerRef} className="relative h-[1000vh] bg-black">
      <motion.div 
        style={{ scale, x, y, opacity }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center transform-origin-center rounded-3xl"
      >
        
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center z-10 text-white font-mono text-sm tracking-widest uppercase">
            Loading NextFrame Experience...
          </div>
        )}
        
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 touch-none will-change-transform"
          style={{ opacity: loaded ? 1 : 0 }}
        />
        
        {/* Gradient Overlay for Text Readability - Simplified to uniform dark wash + bottom gradient  */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

        {/* Overlay Text Content (Fades out via framer motion if needed, or stays static) */}
        <motion.div 
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none"
          animate={{ opacity: activeFrameIndex > 20 ? 0 : 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tighter max-w-5xl mx-auto drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            NextFrame: <br />
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-400 drop-shadow-md">
              Visualizing the Future <br/> of Architecture.
            </span>
          </h1>
          <p className="mt-8 text-lg text-gray-300 font-light tracking-wide uppercase max-w-lg mx-auto">
             Keep scrolling to assemble
          </p>
        </motion.div>

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
