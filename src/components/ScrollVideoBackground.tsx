'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TOTAL_FRAMES = 324;

export default function ScrollVideoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ frame: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [frameStep, setFrameStep] = useState(1);

  // ── 1. Calculate frame step and preload frames ───────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Mobile/tablet gets 1/3 of the frames (108 frames) to save 67% memory & bandwidth
    const isMobile = window.innerWidth < 1024;
    const step = isMobile ? 3 : 1;
    setFrameStep(step);

    const framesToLoad: number[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i += step) {
      framesToLoad.push(i);
    }

    let settled = 0;
    const onSettle = () => {
      settled++;
      if (settled === framesToLoad.length) setIsLoaded(true);
    };

    framesToLoad.forEach((i) => {
      const img = new Image();
      const idx = String(i).padStart(4, '0');
      img.src = `/frames/frame_${idx}.webp`;
      img.onload = onSettle;
      img.onerror = onSettle;
      imagesRef.current[i] = img;
    });
  }, []);

  // ── 2. Set up GSAP ScrollTrigger once frames are ready ───────────────────────
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 1024;

    // Object-cover draw — fills canvas while preserving aspect ratio
    const drawFrame = (index: number) => {
      // Find the closest preloaded frame index based on step
      const rawIndex = Math.round(index / frameStep) * frameStep;
      const actualIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, rawIndex));
      const img = imagesRef.current[actualIndex];
      if (!img?.width) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const r = Math.max(cw / img.width, ch / img.height);
      const nw = img.width * r;
      const nh = img.height * r;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - nw) / 2, (ch - nh) / 2, nw, nh);
    };

    const resizeCanvas = () => {
      // Mobile optimization: Render at 60% resolution stretched via CSS to boost GPU fillrate
      const scale = isMobile ? 0.6 : 1.0;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      drawFrame(Math.floor(frameRef.current.frame));
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.to(frameRef.current, {
      frame: TOTAL_FRAMES - 1,
      snap: 'frame',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: () => `+=${document.documentElement.scrollHeight - window.innerHeight}`,
        // Faster scrub on mobile (0.3s) for responsive feel; desktop keeps cinematic 1.5s delay
        scrub: isMobile ? 0.3 : 1.5,
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        drawFrame(Math.floor(frameRef.current.frame));
      },
    });

    // Give the DOM time to settle before calculating total scroll height
    const t = setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', resizeCanvas);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isLoaded, frameStep]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none overflow-hidden bg-[#070708]"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070708]/55 via-[#070708]/30 to-[#070708]/70 pointer-events-none" />

      {/* Loading spinner — shown until all 120 frames are decoded */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#070708]">
          <div className="w-8 h-8 border-2 border-[#F8FAFC]/10 border-t-[#F8FAFC]/50 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
