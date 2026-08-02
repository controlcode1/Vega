'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Only bypass Lenis on mobile/tablet screens (< 1024px)
    // Touchscreen laptops/desktops have width >= 1024px and should keep smooth scrolling
    const isMobileScreen = window.innerWidth < 1024;

    if (isMobileScreen) {
      // Bypass Lenis on mobile to allow native, hardware-accelerated momentum scrolling
      ScrollTrigger.refresh();
      return;
    }

    // Initialize Lenis (only on desktop)
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // Hook Lenis into GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Re-initialize ScrollTrigger to recognize heights correctly
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  return <>{children}</>;
}
