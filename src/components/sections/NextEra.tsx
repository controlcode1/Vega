'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HoverTilt from '../HoverTilt';
import Magnetic from '../Magnetic';
import FadeIn from '../FadeIn';

export default function NextEra() {
  return (
    <section className="relative w-full py-24 md:py-36 bg-[#0B0C0A] overflow-hidden flex flex-col items-center justify-center">
      {/* Background Lights */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#4A5D3E]/5 blur-[120px] pointer-events-none" />
      
      {/* Huge Editorial Background Typography */}
      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none z-0 px-4">
        <h2 className="font-heading font-black text-center text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-[0.85] tracking-tighter text-[#161B12]/80 uppercase">
          LET'S MOVE<br />
          DESIGN FOR<br />
          THE NEXT ERA
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Floating Overlapping Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch mt-12 mb-16">
          
          {/* Card 1: Left Image Card */}
          <FadeIn delay={0.2} y={50} className="h-full">
            <HoverTilt maxRotate={6} className="h-full">
              <div className="group relative h-[380px] lg:h-[480px] w-full rounded-[2rem] overflow-hidden border border-[#22281E] bg-[#131511] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(74,93,62,0.15)] flex flex-col justify-between p-8">
                {/* Image */}
                <div className="absolute inset-0 bg-[#0B0C0A]/40 group-hover:bg-[#0B0C0A]/10 transition-colors duration-500 z-10" />
                <img
                  src="/abstract_art.png"
                  alt="Abstract Sculpture Design Study"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Content */}
                <div className="relative z-20 flex justify-between items-start">
                  <span className="text-[10px] tracking-widest text-[#F5F6F4]/60 font-bold uppercase">ART & OBJECT</span>
                  <span className="text-xs font-semibold text-[#A3B899] bg-[#0B0C0A]/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">01</span>
                </div>
                
                <div className="relative z-20 mt-auto">
                  <h3 className="font-heading text-xl lg:text-2xl font-black text-[#F5F6F4] uppercase leading-tight mb-2">
                    ORGANIC FORM<br />& CURATION
                  </h3>
                  <p className="text-xs text-[#8D9388] max-w-[240px]">
                    Explorations in physical stone sculpture translations into immersive digital identities.
                  </p>
                </div>
              </div>
            </HoverTilt>
          </FadeIn>

          {/* Card 2: Middle Olive Gradient Info Card */}
          <FadeIn delay={0.4} y={50} className="h-full">
            <HoverTilt maxRotate={6} className="h-full">
              <div className="group relative h-[380px] lg:h-[480px] w-full rounded-[2rem] overflow-hidden border border-[#4A5D3E]/30 bg-gradient-to-br from-[#202E1B] to-[#0E130C] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(74,93,62,0.25)] flex flex-col justify-between p-8">
                {/* Pattern Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#4A5D3E_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                <div className="relative z-20 flex justify-between items-start">
                  <span className="text-[10px] tracking-widest text-[#A3B899] font-bold uppercase">AVANT PHILOSOPHY</span>
                  <span className="text-xs font-semibold text-[#A3B899] bg-[#0B0C0A]/40 px-3 py-1 rounded-full border border-[#4A5D3E]/20">02</span>
                </div>

                <div className="relative z-20 my-auto py-8">
                  <h3 className="font-heading text-2xl lg:text-3xl font-black text-[#F5F6F4] uppercase leading-none mb-4">
                    WE MERGE<br />
                    BRUTALIST CHIC<br />
                    WITH ULTRA<br />
                    MINIMAL LUXURY.
                  </h3>
                  <p className="text-xs lg:text-sm text-[#A3B899]/80 leading-relaxed">
                    Rejecting template frameworks to assemble bespoke interactive web experiences for elite modern global brands.
                  </p>
                </div>

                <div className="relative z-20 mt-auto flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3B899]" />
                  <span className="text-[9px] tracking-wider text-[#A3B899] font-bold uppercase">AWWWARDS NOTABLE AGENCY</span>
                </div>
              </div>
            </HoverTilt>
          </FadeIn>

          {/* Card 3: Right Image Card */}
          <FadeIn delay={0.6} y={50} className="h-full">
            <HoverTilt maxRotate={6} className="h-full">
              <div className="group relative h-[380px] lg:h-[480px] w-full rounded-[2rem] overflow-hidden border border-[#22281E] bg-[#131511] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(74,93,62,0.15)] flex flex-col justify-between p-8">
                {/* Image */}
                <div className="absolute inset-0 bg-[#0B0C0A]/40 group-hover:bg-[#0B0C0A]/10 transition-colors duration-500 z-10" />
                <img
                  src="/luxury_detail.png"
                  alt="Macro Timepiece Mechanical Detail"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Content */}
                <div className="relative z-20 flex justify-between items-start">
                  <span className="text-[10px] tracking-widest text-[#F5F6F4]/60 font-bold uppercase">ENGINEERING</span>
                  <span className="text-xs font-semibold text-[#A3B899] bg-[#0B0C0A]/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/5">03</span>
                </div>

                <div className="relative z-20 mt-auto">
                  <h3 className="font-heading text-xl lg:text-2xl font-black text-[#F5F6F4] uppercase leading-tight mb-2">
                    CHRONO TECH<br />& PRECISION
                  </h3>
                  <p className="text-xs text-[#8D9388] max-w-[240px]">
                    Bespoke engineering solutions with extreme attention to visual details and performance parameters.
                  </p>
                </div>
              </div>
            </HoverTilt>
          </FadeIn>

        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.8} y={30} className="flex justify-center w-full">
          <Magnetic strength={0.4}>
            <a
              href="#cases"
              className="group flex items-center gap-3 bg-[#F5F6F4] text-[#0B0C0A] hover:bg-[#A3B899] hover:text-[#0B0C0A] py-4 px-10 rounded-full font-heading font-bold text-sm tracking-widest uppercase transition-all duration-500 shadow-xl"
            >
              EXPLORE NOW
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
            </a>
          </Magnetic>
        </FadeIn>

      </div>
    </section>
  );
}
