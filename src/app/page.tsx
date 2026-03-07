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

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen relative selection:bg-white/20">

      {/* Global Grain Polish */}
      <NoiseOverlay />

      {/* Sticky Glassmorphism Navigation */}
      <Navbar />

      {/* Hero — Scroll-linked 3D Room Assembly */}
      <HeroCanvas />

      {/* Location strip */}
      <div className="relative bg-black border-t border-b border-white/6 py-3 overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <div className="flex items-center gap-0" style={{ animation: 'none' }}>
          <div className="flex items-center gap-8 px-8 whitespace-nowrap text-[11px] font-mono tracking-[0.25em] uppercase text-white/30">
            <span className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-white/30 inline-block" />Currently operating in</span>
            <span className="flex items-center gap-2 text-white/60"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />Nashik</span>
            <span className="text-white/15">·</span>
            <span className="flex items-center gap-2 text-white/60"><span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" style={{ animationDelay: '0.4s' }} />Mumbai</span>
            <span className="text-white/15">·</span>
            <span className="flex items-center gap-2 text-white/60"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" style={{ animationDelay: '0.8s' }} />Vapi</span>
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
