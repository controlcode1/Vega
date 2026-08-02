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

  // ── 1. Preload all frames ──────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let settled = 0;
    const onSettle = () => {
      settled++;
      if (settled === TOTAL_FRAMES) setIsLoaded(true);
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = String(i).padStart(4, '0');
      img.src = `/frames/frame_${idx}.webp`;
      img.onload = onSettle;
      img.onerror = onSettle;
      imagesRef.current[i] = img;
    }
  }, []);

  // ── 2. Set up GSAP ScrollTrigger once frames are ready ───────────────────────
  useEffect(() => {
    if (!isLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Object-cover draw — fills canvas while preserving aspect ratio
    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
        scrub: 1.5,
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
  }, [isLoaded]);

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
