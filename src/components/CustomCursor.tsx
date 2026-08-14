'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Skip custom cursor tracking and DOM mutation listening on mobile / touch devices
    const isHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isHoverCapable) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    // Set initial position out of screen
    gsap.set([cursor, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const onMouseMove = (e: MouseEvent) => {
      // Small dot follows immediately
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out',
      });
      // Large ring follows with delay
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Hover states
    const onMouseEnterLink = () => {
      gsap.to(ring, {
        scale: 1.8,
        backgroundColor: 'rgba(74, 93, 62, 0.15)',
        borderColor: 'rgba(163, 184, 153, 0.8)',
        duration: 0.3,
      });
      gsap.to(cursor, {
        scale: 0.5,
        backgroundColor: '#A3B899',
        duration: 0.3,
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(163, 184, 153, 0.4)',
        duration: 0.3,
      });
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: '#A3B899',
        duration: 0.3,
      });
    };

    const onMouseEnterProject = (e: Event) => {
      const label = (e.currentTarget as HTMLElement).getAttribute('data-cursor-label') || 'VIEW';
      ring.innerHTML = `<span class="text-[9px] font-bold tracking-widest text-[#0B0C0A] uppercase">${label}</span>`;
      gsap.to(ring, {
        scale: 3.2,
        backgroundColor: '#F5F6F4',
        borderColor: '#F5F6F4',
        duration: 0.3,
      });
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.2,
      });
    };

    const onMouseLeaveProject = () => {
      ring.innerHTML = '';
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(163, 184, 153, 0.4)',
        duration: 0.3,
      });
      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        backgroundColor: '#A3B899',
        duration: 0.3,
      });
    };

    // Add event listeners to dynamic elements
    const addListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, .interactive-hover');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });

      const projectElements = document.querySelectorAll('[data-cursor-label]');
      projectElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterProject);
        el.removeEventListener('mouseleave', onMouseLeaveProject);
        el.addEventListener('mouseenter', onMouseEnterProject);
        el.addEventListener('mouseleave', onMouseLeaveProject);
      });
    };

    addListeners();

    // Create a MutationObserver to watch for DOM updates and re-bind cursor events
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      const interactiveElements = document.querySelectorAll('a, button, .interactive-hover');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
      const projectElements = document.querySelectorAll('[data-cursor-label]');
      projectElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterProject);
        el.removeEventListener('mouseleave', onMouseLeaveProject);
      });
    };
  }, []);

  return (
    <>
      {/* Small dot cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-2 w-2 rounded-full bg-[#A3B899] mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      {/* Outer ring cursor */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(163,184,153,0.4)] transition-transform duration-75 ease-out hidden md:flex"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}
