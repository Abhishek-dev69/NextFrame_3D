"use client";

import { HeroCanvas } from "@/components/HeroCanvas";
import { Navbar } from "@/components/Navbar";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { VRGlassesGlimpse } from "@/components/VRGlassesGlimpse";
import { MissionSection } from "@/components/MissionSection";
import { VRGlimpseSection } from "@/components/VRGlimpseSection";
import { IndustrySolutions } from "@/components/IndustrySolutions";
import { MetaglassesShowcase } from "@/components/MetaglassesShowcase";
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

      {/* About Us */}
      <AboutSection />

      {/* 1. The Metaframe Services Grid */}
      <div className="h-20 bg-gradient-to-b from-[#050505] to-black border-t border-white/5" />
      <ServicesSection />

      {/* 2. Our Projects */}
      <div className="h-20 bg-gradient-to-b from-black to-[#050505] border-t border-white/5" />
      <ProjectsSection />

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

      {/* 5. Exploded Hardware View */}
      <div className="h-20 bg-gradient-to-b from-[#0a0a0a] to-black" />
      <MetaglassesShowcase />

      {/* 6. Booking & Consultation */}
      <div id="contact" />
      <BookingSection />

      <footer className="py-12 text-center text-sm text-gray-600 bg-black border-t border-white/5 relative z-50">
        <p>&copy; {new Date().getFullYear()} NextFrame. All rights reserved. Built by Abhishek Singh.</p>
      </footer>

      {/* Persistent floating guide */}
      <FloatingMetaglassIcon />
    </main>
  );
}
