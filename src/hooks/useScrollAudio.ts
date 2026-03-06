"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useScroll, useVelocity } from 'framer-motion';

export const useScrollAudio = () => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Nodes
  const dataHumOscRef = useRef<OscillatorNode | null>(null);
  const dataHumGainRef = useRef<GainNode | null>(null);
  
  const roomToneBufferSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const roomToneFilterRef = useRef<BiquadFilterNode | null>(null);
  const roomToneGainRef = useRef<GainNode | null>(null);

  const [initialized, setInitialized] = useState(false);

  const initAudio = useCallback(() => {
    if (initialized) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const humOsc = ctx.createOscillator();
      const humGain = ctx.createGain();
      humOsc.type = 'triangle';
      humOsc.frequency.value = 55;
      humGain.gain.value = 0;
      humOsc.connect(humGain);
      humGain.connect(ctx.destination);
      humOsc.start();
      
      dataHumOscRef.current = humOsc;
      dataHumGainRef.current = humGain;

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
      
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const roomFilter = ctx.createBiquadFilter();
      roomFilter.type = "highpass";
      roomFilter.frequency.value = 8000;
      
      const roomGain = ctx.createGain();
      roomGain.gain.value = 0.05;

      noiseSource.connect(roomFilter);
      roomFilter.connect(roomGain);
      roomGain.connect(ctx.destination);
      noiseSource.start();

      roomToneBufferSourceRef.current = noiseSource;
      roomToneFilterRef.current = roomFilter;
      roomToneGainRef.current = roomGain;

      setInitialized(true);
    } catch (e) {
      console.error("Audio API not supported or blocked", e);
    }
  }, [initialized]);

  useEffect(() => {
    const unlock = () => {
      initAudio();
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('scroll', unlock);
    };
    
    window.addEventListener('click', unlock);
    window.addEventListener('touchstart', unlock);
    window.addEventListener('scroll', unlock);

    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('scroll', unlock);
      
      if (audioCtxRef.current) {
         audioCtxRef.current.close();
      }
    };
  }, [initAudio]);

  // Map velocity to gain and pitch constantly
  useEffect(() => {
    const unsub = scrollVelocity.on("change", (v) => {
      if (!initialized || !audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      
      const speed = Math.abs(v);
      const normalizedSpeed = Math.min(speed / 3000, 1); // 0 to 1 based on scroll speed

      // Data Hum increases in volume and slightly in pitch with speed
      if (dataHumGainRef.current && dataHumOscRef.current) {
        dataHumGainRef.current.gain.setTargetAtTime(
          normalizedSpeed * 0.15, // Max volume 0.15
          ctx.currentTime,
          0.1 // smoothing
        );
        dataHumOscRef.current.frequency.setTargetAtTime(
          55 + (normalizedSpeed * 20), // Pitch bends up slightly
          ctx.currentTime,
          0.1
        );
      }

      // Room tone opens its filter (becomes "clearer") when stopping
      if (roomToneFilterRef.current) {
        const targetFreq = 8000 - (normalizedSpeed * 6000); // Inverse relationship: slower = higher pass freq (more airy, less presence)
        roomToneFilterRef.current.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.5);
      }
    });

    return () => unsub();
  }, [scrollVelocity, initialized]);

  return { initialized, initAudio };
};
