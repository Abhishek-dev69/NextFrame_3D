"use client";

import { useEffect, useState } from 'react';

export const useImagePreloader = (frameCount: number) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const index = i.toString().padStart(3, '0');
        img.src = `/images/sequence/frame_${index}.png`;
        
        await new Promise((resolve) => {
          img.onload = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / frameCount) * 100));
            if (loadedCount === frameCount) {
              setLoaded(true);
            }
            resolve(null);
          };
          img.onerror = () => {
            console.error(`Failed to load image at index ${index}`);
            // Resolve anyway to prevent hanging
            loadedCount++;
            setProgress(Math.round((loadedCount / frameCount) * 100));
            if (loadedCount === frameCount) {
              setLoaded(true);
            }
            resolve(null);
          };
        });
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    loadImages();
  }, [frameCount]);

  return { images, loaded, progress };
};
