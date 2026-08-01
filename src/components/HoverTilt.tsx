'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface HoverTiltProps {
  children: React.ReactNode;
  className?: string;
  maxRotate?: number;
}

export default function HoverTilt({ children, className = '', maxRotate = 8 }: HoverTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width - 0.5) * 2; // scale of -1 to 1
      const yPercent = (y / rect.height - 0.5) * 2; // scale of -1 to 1

      gsap.to(el, {
        rotateY: xPercent * maxRotate,
        rotateX: -yPercent * maxRotate,
        transformPerspective: 1000,
        ease: 'power3.out',
        duration: 0.6,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        ease: 'power3.out',
        duration: 0.8,
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxRotate]);

  return (
    <div ref={ref} className={`transition-shadow duration-300 ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
}
