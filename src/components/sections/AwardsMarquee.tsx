'use client';

import React from 'react';
import FadeIn from '../FadeIn';

const awards = [
  'AWWWARDS SOTD',
  'CSSDA BEST UI/UX',
  'THE FWA DEV AWARD',
  'AWARDS WINNING STUDIO',
  'CSSDA INNOVATIVE',
  'AWWWARDS DESIGN NOMINEE',
  'FWA SITE OF THE MONTH',
];

export default function AwardsMarquee() {
  // Triple the items to make sure the loop is seamless across wide screens
  const marqueeItems = [...awards, ...awards, ...awards];

  return (
    <section className="relative w-full py-16 bg-[#131511] text-[#F5F6F4] border-b border-[#22281E] overflow-hidden">
      
      {/* Subtle Marquee Overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#131511] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#131511] to-transparent z-10 pointer-events-none" />

      <FadeIn delay={0.1} y={20} className="w-full">
        <div className="w-full flex items-center overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee">
            {marqueeItems.map((award, index) => (
              <div
                key={index}
                className="flex items-center gap-6 md:gap-12 px-6 md:px-12 pointer-events-none select-none"
              >
                {/* Text */}
                <span className="font-heading text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tighter uppercase text-[#8D9388]/40 hover:text-[#A3B899] transition-colors duration-300">
                  {award}
                </span>
                
                {/* Dot Bullet */}
                <span className="h-2 w-2 rounded-full bg-[#4A5D3E]" />
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
