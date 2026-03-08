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
import { ContactForm } from "@/components/ContactForm";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { IntroAnimation } from "@/components/IntroAnimation";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BookDemoCTA } from "@/components/BookDemoCTA";
import { ParallaxGrid } from "@/components/ParallaxGrid";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen relative selection:bg-white/20">

      {/* Intro splash — once per session */}
      <IntroAnimation />

      {/* Custom glowing cursor */}
      <CustomCursor />

      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* Smooth scroll engine */}
      <SmoothScroll />

      {/* Parallax dot grid — behind everything */}
      <ParallaxGrid />

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/6">
            {[
              { city: "Nashik", state: "Maharashtra", coord: "20.0059° N, 73.7897° E", color: "#3b82f6" },
              { city: "Mumbai", state: "Maharashtra", coord: "19.0760° N, 72.8777° E", color: "#ef4444" },
              { city: "Vapi", state: "Gujarat", coord: "20.3713° N, 72.9060° E", color: "#10b981" },
              { city: "Ahmedabad", state: "Gujarat", coord: "23.0225° N, 72.5714° E", color: "#f59e0b" },
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

      {/* 7. Contact Us Full Form */}
      <div className="h-20 bg-gradient-to-b from-[#050505] to-black border-t border-white/5" />
      <ContactForm />

      <footer className="py-10 bg-black border-t border-white/5 relative z-50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} NextFrame. All rights reserved.</p>
            <a 
              href="https://www.instagram.com/nextframee.tech?igsh=d2dsbWQ1MzZld2lu" 
              target="_blank" 
              rel="noreferrer"
              className="text-gray-600 hover:text-pink-400 object-contain transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] font-mono tracking-[0.2em] uppercase">
            <span className="flex items-center gap-1.5 text-white/25"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-70" />Nashik</span>
            <span className="flex items-center gap-1.5 text-white/25"><span className="w-1.5 h-1.5 rounded-full bg-red-400 opacity-70" />Mumbai</span>
            <span className="flex items-center gap-1.5 text-white/25"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-70" />Vapi</span>
            <span className="flex items-center gap-1.5 text-white/25"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 opacity-70" />Ahmedabad</span>
          </div>
          <p className="text-xs text-gray-700">Built by Abhishek Singh</p>
        </div>
      </footer>

      {/* Book Demo floating CTA */}
      <BookDemoCTA />
    </main>
  );
}
