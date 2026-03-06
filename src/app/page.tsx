"use client";

import { useEffect } from "react";
import { HeroCanvas } from "@/components/HeroCanvas";
import { ServicesSection } from "@/components/ServicesSection";
import { IndustrySolutions } from "@/components/IndustrySolutions";
import { MetaglassesShowcase } from "@/components/MetaglassesShowcase";
import { ContactForm } from "@/components/ContactForm";
import { FloatingMetaglassIcon } from "@/components/FloatingMetaglassIcon";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { useScrollAudio } from "@/hooks/useScrollAudio";

export default function Home() {
  // Initialize Web Audio API hook
  useScrollAudio();

  return (
    <main className="bg-black text-white min-h-screen relative selection:bg-white/20">
      
      {/* Global Grain Polish */}
      <NoiseOverlay />

      <HeroCanvas />
      
      {/* 1. The Metaframe Grid */}
      <ServicesSection />
      
      {/* Spacer to give breathing room before parallax starts */}
      <div className="h-40 bg-gradient-to-b from-black to-[#0a0a0a] border-t border-white/5"></div>
      
      {/* 2. Parallax Use Cases */}
      <IndustrySolutions />
      
      {/* Spacer back to true black */}
      <div className="h-40 bg-gradient-to-b from-[#0a0a0a] to-black"></div>
      
      {/* 3. Exploded Hardware View */}
      <MetaglassesShowcase />

      {/* 4. Consultation CTA */}
      <ContactForm />
      
      <footer className="py-12 text-center text-sm text-gray-600 bg-black border-t border-white/5 relative z-50">
        <p>&copy; {new Date().getFullYear()} NextFrame 3D Metaframes. All rights reserved.</p>
      </footer>

      {/* Persistent CTA trigger */}
      <FloatingMetaglassIcon />
    </main>
  );
}
