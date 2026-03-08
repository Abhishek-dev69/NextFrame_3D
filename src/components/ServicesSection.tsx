"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    id: "01",
    title: "3D Walkthrough",
    tagline: "Cinematic · Room-by-room",
    description: "A realistic video presentation of a property that shows how the space will look before it is built. It allows buyers to see the layout, interiors, lighting, and overall design in a cinematic way. Instead of imagining the project from drawings or floor plans, clients can visually experience the property and understand the spaces much more clearly.",
    image: "/services/walkthrough.jpeg",
    color: "#3b82f6",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M5 30L20 8l15 22H5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="27" cy="14" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 30l7-7 5 5 4-6 13 8" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
      </svg>
    ),
  },
  {
    id: "02",
    title: "VR Walkthrough",
    tagline: "Immersive · True scale",
    description: "A VR walkthrough lets clients explore a property using a virtual reality headset. They can look around in every direction and feel like they are actually standing inside the apartment, villa, or building. This immersive experience helps buyers understand the size, design, and layout of the property much better than traditional presentations.",
    image: "/services/vrwalkthrough.jpeg",
    color: "#ef4444",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="3" y="12" width="34" height="18" rx="9" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="13" cy="21" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="27" cy="21" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M17.5 21h5" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: "03",
    title: "Pixel Streaming",
    tagline: "Cloud-rendered · Zero install",
    description: "Pixel Streaming allows users to experience a high-quality 3D property directly on their phone, tablet, laptop, or TV without installing any software. The 3D environment runs on a powerful server and streams to the device in real time. This makes it easy for clients to interact with the project from anywhere while enjoying smooth visuals.",
    image: "/services/pixelstreaming.jpeg",
    color: "#a855f7",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <rect x="5" y="6" width="21" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 26h12M16 22v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="32" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M30 12l1.5 1.5 3-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "04",
    title: "Plot Streaming",
    tagline: "Interactive · Site-level",
    description: "Plot Streaming is a digital way to present land layouts and plotted developments. Sales teams can show the entire master plan, roads, and individual plots on a tablet or screen, making it easier for clients to understand the project. It helps buyers clearly visualize the layout and choose plots with more confidence.",
    image: "/services/plotstreaming.jpeg",
    color: "#10b981",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8">
        <path d="M6 34L20 6l14 28H6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M13 34l7-14 7 14" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
        <circle cx="20" cy="18" r="2.5" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
  },
];

export const ServicesSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section 
      id="services" 
      className="relative py-32 bg-black overflow-hidden flex flex-col items-center"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Atmospheric backgrounds */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <motion.div
        layout
        className="flex flex-col items-center text-center justify-center gap-4 mb-16 z-20 pointer-events-none px-6"
      >
        <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-1">What we deliver</p>
        <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.1]">
          Our <span className="font-semibold italic bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Services</span>
        </h2>
        <p className="mt-2 text-xs text-white/40 font-mono tracking-widest uppercase">
          <span className="hidden lg:inline">Hover to expand deck</span>
          <span className="lg:hidden">Tap to expand deck</span>
        </p>
      </motion.div>

      {/* Deck Container */}
      <motion.div 
        layout
        className="flex flex-col lg:flex-row items-center justify-center relative z-10 w-full px-6 py-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
      >
        {services.map((svc, i) => (
          <ServiceCard 
            key={svc.id} 
            svc={svc} 
            index={i} 
            isHovered={isHovered} 
          />
        ))}
      </motion.div>
    </section>
  );
};

function ServiceCard({ svc, index, isHovered }: any) {
  return (
    <motion.div
      layout
      initial={false}
      animate={{
        scale: isHovered ? 1 : 1 - (index * 0.04),
        rotate: isHovered ? (index % 2 === 0 ? -1 : 1) : index * 3,
        y: isHovered ? 0 : index * -15,   // Shift upwards slightly for a physical deck look
        x: isHovered ? 0 : index * 8,     // Shift right slightly
        zIndex: 10 - index,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 25, 
        delay: isHovered ? index * 0.05 : 0 
      }}
      className={`
        relative w-[300px] h-[380px] flex-shrink-0 cursor-pointer rounded-2xl overflow-hidden
        ${!isHovered && index > 0 ? "mt-[-380px] lg:mt-0 lg:ml-[-300px]" : "mt-6 lg:mt-0 lg:ml-6"}
      `}
      style={{
        background: isHovered
          ? `linear-gradient(145deg, ${svc.color}14 0%, #0a0a0a 100%)`
          : "#0a0a0a",
        border: `1px solid ${isHovered ? `${svc.color}35` : "rgba(255,255,255,0.08)"}`,
        boxShadow: isHovered
          ? `0 0 0 1px ${svc.color}20, 0 20px 40px ${svc.color}15, 0 8px 32px rgba(0,0,0,0.8)`
          : `0 4px 24px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.06) inset`,
      }}
    >
      {/* Background Image (only visible on the expanded card) */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ opacity: isHovered ? 0.35 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <img 
          src={svc.image} 
          alt={svc.title}
          className="w-full h-full object-cover mix-blend-luminosity"
        />
        {/* Heavy gradient mask so the image doesn't drown out text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
      </motion.div>

      {/* Top colour bleed */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none transition-opacity duration-500 z-0"
        style={{
          background: `linear-gradient(180deg, ${svc.color}25 0%, transparent 100%)`,
          opacity: isHovered ? 1 : 0.3,
        }}
      />

      {/* Ghost number */}
      <div
        className="absolute top-4 right-6 text-[80px] font-black leading-none pointer-events-none select-none transition-all duration-500 z-0"
        style={{
          WebkitTextStroke: `1px ${svc.color}`,
          color: "transparent",
          opacity: isHovered ? 0.3 : 0.08,
        }}
      >
        {svc.id}
      </div>

      {/* Content */}
      <div className="relative p-7 flex flex-col h-full z-10">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 bg-[#111] border border-white/5"
          style={{
            color: isHovered ? svc.color : "rgba(255,255,255,0.5)",
            borderColor: isHovered ? `${svc.color}40` : "rgba(255,255,255,0.05)",
            boxShadow: isHovered ? `0 0 20px ${svc.color}30` : "none",
          }}
        >
          {svc.icon}
        </div>

        <h3 className="text-xl font-semibold text-white tracking-tight mb-1">{svc.title}</h3>
        <p
          className="text-[9px] font-mono tracking-[0.2em] uppercase mb-4 transition-colors duration-300"
          style={{ color: isHovered ? svc.color : "rgba(255,255,255,0.3)" }}
        >
          {svc.tagline}
        </p>
        <p className="text-gray-400 font-light text-[13.5px] leading-relaxed flex-1">
          {svc.description}
        </p>
      </div>

      {/* Hover glow overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-0"
        animate={{ opacity: isHovered ? 0.1 : 0 }}
        style={{
          background: `radial-gradient(circle at 50% 120%, ${svc.color}, transparent 60%)`
        }}
      />
    </motion.div>
  );
}
