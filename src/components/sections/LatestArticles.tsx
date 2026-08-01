'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import HoverTilt from '../HoverTilt';
import Magnetic from '../Magnetic';
import FadeIn from '../FadeIn';
import TextReveal from '../TextReveal';

const articles = [
  {
    category: 'ART DIRECTION',
    date: 'JULY 24, 2026',
    title: 'The Return of Organic Forms in Digital Art Direction',
    image: '/abstract_art.png',
  },
  {
    category: 'ENGINEERING',
    date: 'JUNE 18, 2026',
    title: 'Chronometry & Code: Engineering Precision Interactions',
    image: '/luxury_detail.png',
  },
  {
    category: 'BRANDING',
    date: 'MAY 05, 2026',
    title: 'Olfactory Minimalism: Brand Identity of Aether',
    image: '/project_fragrance.png',
  },
];

export default function LatestArticles() {
  return (
    <section className="relative w-full py-24 md:py-36 bg-[#0B0C0A] text-[#F5F6F4] overflow-hidden">
      {/* Light glow */}
      <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-[#4A5D3E]/3 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-start mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3B899]" />
            <span className="text-[10px] tracking-widest text-[#8D9388] font-extrabold uppercase">
              JOURNAL & JOURNALISM
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.9] uppercase">
            <TextReveal text="Latest Articles." delay={0.1} />
          </h2>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <FadeIn
              key={art.title}
              delay={0.15 * idx}
              y={40}
              className="group cursor-pointer flex flex-col h-full"
            >
              <HoverTilt maxRotate={5} className="flex-grow flex flex-col">
                <div className="flex flex-col h-full bg-[#131511] border border-[#22281E]/60 rounded-[2rem] p-6 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(74,93,62,0.15)] hover:border-[#4A5D3E]/20">
                  
                  {/* Article Image Container */}
                  <div className="relative w-full h-[200px] rounded-[1.5rem] overflow-hidden mb-6 bg-[#0B0C0A]">
                    <div className="absolute inset-0 bg-[#0B0C0A]/30 group-hover:bg-[#0B0C0A]/10 transition-colors duration-500 z-10" />
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-[10px] font-bold text-[#8D9388] mb-3">
                    <span className="text-[#A3B899]">{art.category}</span>
                    <span className="h-1 w-1 rounded-full bg-[#22281E]" />
                    <span className="font-satoshi">{art.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-black text-[#F5F6F4] group-hover:text-[#A3B899] transition-colors duration-300 uppercase leading-snug mb-6 flex-grow">
                    {art.title}
                  </h3>

                  {/* Divider and Arrow */}
                  <div className="pt-4 border-t border-[#22281E] flex items-center justify-between mt-auto">
                    <span className="text-[9px] tracking-wider font-extrabold text-[#8D9388] group-hover:text-[#F5F6F4] transition-colors duration-300 uppercase">
                      READ ARTICLE
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#8D9388] group-hover:text-[#A3B899] transition-all duration-300 group-hover:rotate-45" />
                  </div>

                </div>
              </HoverTilt>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
