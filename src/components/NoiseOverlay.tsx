"use client";

import React, { useEffect, useState } from "react";

export const NoiseOverlay = () => {
  // No need for mounted state for a simple SVG filter that doesn't rely on browser APIs during SSR
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03]">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
};
