"use client";

import { useEffect, useState } from 'react';

export const useImagePreloader = (frameCount: number) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let loadedCount = 0;

      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const index = i.toString().padStart(3, '0');
        img.src = `/images/sequence/Wireframe_to_living_room_transition_delpmaspu__${index}.png`;
        
        await new Promise((resolve) => {
          img.onload = () => {
            loadedCount++;
            if (loadedCount === frameCount) {
              setLoaded(true);
            }
            resolve(null);
          };
          img.onerror = () => {
            console.error(`Failed to load image at index ${index}`);
            // Resolve anyway to prevent hanging
            loadedCount++;
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

  return { images, loaded };
};
