"use client";

import { useEffect, useState, useRef } from 'react';

const INITIAL_FRAMES = 30; // Show animation after this many frames loaded

export const useImagePreloader = (frameCount: number) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);        // true once initial 30 frames ready
  const [progress, setProgress] = useState(0);         // 0–100, total background progress
  const imagesRef = useRef<HTMLImageElement[]>([]);     // mutable ref for background queue writes

  useEffect(() => {
    const allImages = new Array<HTMLImageElement>(frameCount);
    imagesRef.current = allImages;

    let initialReady = false;
    let totalLoaded = 0;

    const loadFrame = (i: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        const index = i.toString().padStart(3, '0');
        img.src = `/images/sequence/frame_${index}.webp`;

        const onFinish = () => {
          allImages[i] = img;
          totalLoaded++;
          setProgress(Math.round((totalLoaded / frameCount) * 100));

          // As soon as first INITIAL_FRAMES are done, unlock the UI
          if (!initialReady && totalLoaded >= INITIAL_FRAMES) {
            initialReady = true;
            // Snapshot current array into state to trigger render
            setImages([...allImages]);
            setLoaded(true);
          } else if (totalLoaded > INITIAL_FRAMES) {
            // Keep updating images array for later frames
            setImages([...allImages]);
          }

          resolve();
        };

        img.onload = onFinish;
        img.onerror = () => {
          // Still resolve even on error so we don't block queue
          allImages[i] = new Image(); // empty placeholder
          totalLoaded++;
          setProgress(Math.round((totalLoaded / frameCount) * 100));
          resolve();
        };
      });
    };

    const run = async () => {
      // Phase 1: Load first INITIAL_FRAMES sequentially for guaranteed ordering
      for (let i = 0; i < INITIAL_FRAMES && i < frameCount; i++) {
        await loadFrame(i);
      }
      // Phase 2: Load remaining frames in background concurrently (batches of 8)
      const remaining: number[] = [];
      for (let i = INITIAL_FRAMES; i < frameCount; i++) remaining.push(i);

      while (remaining.length > 0) {
        const batch = remaining.splice(0, 8);
        await Promise.all(batch.map(loadFrame));
      }
    };

    run();
  }, [frameCount]);

  return { images, loaded, progress };
};
