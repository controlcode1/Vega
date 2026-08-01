'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import FadeIn from '../FadeIn';

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

function Counter({ value, suffix = '', duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    // Cap steps to avoid freezing on very large values
    const steps = Math.min(end, 60);
    const increment = end / steps;
    const incrementTime = totalMiliseconds / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep += 1;
      const nextCount = Math.floor(increment * currentStep);
      
      if (currentStep >= steps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(nextCount);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  {
    num: 100,
    suffix: '+',
    label: 'PROJECTS COMPLETED',
    desc: 'Award-winning digital platforms and spatial designs delivered globally.',
  },
  {
    num: 95,
    suffix: '%',
    label: 'SUCCESS RATE',
    desc: 'Retention rate representing partners who scale their digital margins with us.',
  },
  {
    num: 20,
    suffix: '+',
    label: 'COUNTRIES SERVED',
    desc: 'Collaborations spanning North America, Europe, Asia, and Middle East.',
  },
];

export default function StatsCounter() {
  return (
    <section className="relative w-full py-20 md:py-28 bg-[#131511] text-[#F5F6F4] border-y border-[#22281E] overflow-hidden">
      {/* Lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4A5D3E]/3 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <FadeIn
              key={stat.label}
              delay={index * 0.15}
              y={30}
              className="group p-8 rounded-[2rem] bg-[#0B0C0A]/40 border border-[#22281E]/60 hover:border-[#4A5D3E]/20 transition-all duration-500 hover:shadow-2xl"
            >
              {/* Stat Number */}
              <div className="font-heading text-6xl sm:text-7xl xl:text-8xl font-black text-[#A3B899] mb-4 tracking-tighter">
                <Counter value={stat.num} suffix={stat.suffix} />
              </div>
              
              {/* Divider */}
              <div className="h-[1px] w-12 bg-[#22281E] group-hover:w-full transition-all duration-500 mb-4" />

              {/* Label */}
              <h3 className="font-heading text-[10px] tracking-widest text-[#8D9388] font-extrabold uppercase mb-2">
                {stat.label}
              </h3>

              {/* Details */}
              <p className="text-xs text-[#8D9388]/80 leading-relaxed font-light">
                {stat.desc}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
