"use client";

import { HeroCanvas } from "@/components/HeroCanvas";
import { Navbar } from "@/components/Navbar";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { VRGlassesGlimpse } from "@/components/VRGlassesGlimpse";
import { ClientsMarquee } from "@/components/ClientsMarquee";
import { MissionSection } from "@/components/MissionSection";
import { VRGlimpseSection } from "@/components/VRGlimpseSection";
import { IndustrySolutions } from "@/components/IndustrySolutions";
import { BookingSection } from "@/components/BookingSection";
import { FloatingMetaglassIcon } from "@/components/FloatingMetaglassIcon";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { IntroAnimation } from "@/components/IntroAnimation";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen relative selection:bg-white/20">

      {/* Intro splash — once per session */}
      <IntroAnimation />

      {/* Custom glowing cursor */}
      <CustomCursor />

      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* Global Grain Polish */}
      <NoiseOverlay />

      {/* Sticky Glassmorphism Navigation */}
      <Navbar />

      {/* Hero — Scroll-linked 3D Room Assembly */}
      <HeroCanvas />

      {/* Where We Operate — premium location section */}
      <div className="relative bg-[#050505] border-t border-b border-white/6 overflow-hidden">
        {/* Background large text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[18vw] font-black text-white/[0.018] tracking-tighter uppercase whitespace-nowrap">
            INDIA
          </span>
        </div>

        {/* Scan line decor */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 relative z-10">
          {/* Label */}
          <p className="text-[11px] font-mono tracking-[0.4em] uppercase text-white/50 text-center mb-12">
            Currently operating in
          </p>

          {/* City row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/6">
            {[
              { city: "Nashik", state: "Maharashtra", coord: "20.0059° N, 73.7897° E", color: "#3b82f6" },
              { city: "Mumbai", state: "Maharashtra", coord: "19.0760° N, 72.8777° E", color: "#ef4444" },
              { city: "Vapi", state: "Gujarat", coord: "20.3713° N, 72.9060° E", color: "#10b981" },
            ].map((loc, i) => (
              <div
                key={loc.city}
                className="group relative bg-[#050505] px-10 py-10 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors duration-500"
              >
                {/* Live dot */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                    style={{ backgroundColor: loc.color, animationDelay: `${i * 0.35}s` }}
                  />
                  <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/25">
                    {loc.state}
                  </span>
                </div>

                {/* City name */}
                <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-none transition-all duration-500 group-hover:text-opacity-100"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {loc.city}
                </h3>

                {/* Coordinates */}
                <p className="text-[10px] font-mono text-white/20 tracking-widest">
                  {loc.coord}
                </p>

                {/* Bottom accent */}
                <div
                  className="h-px w-0 group-hover:w-full transition-all duration-700 ease-out mt-2"
                  style={{ backgroundColor: loc.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Us */}
      <AboutSection />


      {/* 1. The Metaframe Services Grid */}
      <div className="h-20 bg-gradient-to-b from-[#050505] to-black border-t border-white/5" />
      <ServicesSection />

      {/* Our Projects — Clients */}
      <div className="h-20 bg-gradient-to-b from-black to-[#050505] border-t border-white/5" />
      <div id="projects" />
      <ClientsMarquee />

      {/* VR Glasses Glimpse — headset scroll reveal */}
      <VRGlassesGlimpse />

      {/* 3. Our Mission */}
      <div className="h-20 bg-gradient-to-b from-[#050505] to-black border-t border-white/5" />
      <MissionSection />

      {/* VR Glimpse — Scroll walkthrough */}
      <VRGlimpseSection />

      {/* 4. Parallax Use Cases */}
      <div className="h-20 bg-gradient-to-b from-black to-[#0a0a0a] border-t border-white/5" />
      <IndustrySolutions />


      {/* 6. Booking & Consultation */}
      <div id="contact" />
      <BookingSection />

      <footer className="py-10 bg-black border-t border-white/5 relative z-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} NextFrame. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[10px] font-mono tracking-[0.2em] uppercase">
            <span className="flex items-center gap-1.5 text-white/25"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-70" />Nashik</span>
            <span className="flex items-center gap-1.5 text-white/25"><span className="w-1.5 h-1.5 rounded-full bg-red-400 opacity-70" />Mumbai</span>
            <span className="flex items-center gap-1.5 text-white/25"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-70" />Vapi</span>
          </div>
          <p className="text-xs text-gray-700">Built by Abhishek Singh</p>
        </div>
      </footer>

      {/* Persistent floating guide */}
      <FloatingMetaglassIcon />
    </main>
  );
}
