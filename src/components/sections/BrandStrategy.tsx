'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from '../Magnetic';
import FadeIn from '../FadeIn';
import TextReveal from '../TextReveal';

const services = [
  {
    num: '01',
    title: 'Strategy',
    desc: 'Positioning, brand architecture, market intelligence, consumer behavior, and core messaging alignment.',
    height: 'lg:mt-0 lg:h-[300px]',
  },
  {
    num: '02',
    title: 'Growth',
    desc: 'Performance audits, search visibility optimization, high-converting product flows, and scalable marketing systems.',
    height: 'lg:mt-8 lg:h-[340px]',
  },
  {
    num: '03',
    title: 'Creative',
    desc: 'Bespoke design systems, high-fashion art direction, custom typography curation, and narrative-driven photography.',
    height: 'lg:mt-0 lg:h-[380px]',
  },
  {
    num: '04',
    title: 'Power',
    desc: 'Production-ready Next.js infrastructure, high-fidelity GSAP animations, fluid WebGL graphics, and flawless rendering speed.',
    height: 'lg:mt-12 lg:h-[320px]',
  },
];

export default function BrandStrategy() {
  return (
    <section
      id="services"
      className="relative w-full py-24 md:py-36 bg-[#F5F6F4] text-[#0B0C0A] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Title */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A5D3E]" />
              <span className="text-[10px] tracking-widest text-[#4A5D3E] font-extrabold uppercase">
                CAPABILITIES
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.9] uppercase text-[#0B0C0A] max-w-xl">
              <TextReveal text="Brand Strategy" delay={0.15} className="text-[#0B0C0A]" />
              <br />
              <span className="text-[#4A5D3E] font-light italic font-satoshi lowercase">&amp; </span>
              <TextReveal text="Product Design." delay={0.3} className="text-[#0B0C0A]" />
            </h2>

            <div className="mt-8">
              <Magnetic strength={0.35}>
                <a
                  href="#contact"
                  className="group relative flex items-center justify-center h-16 px-8 rounded-full bg-[#0B0C0A] text-[#F5F6F4] hover:text-[#0B0C0A] overflow-hidden transition-colors duration-500 font-heading font-bold text-xs tracking-widest uppercase shadow-lg"
                >
                  <span className="absolute inset-0 rounded-full scale-0 bg-[#A3B899] group-hover:scale-100 transition-transform duration-500 ease-[0.16,1,0.3,1]"></span>
                  <span className="relative z-10 flex items-center gap-2">
                    START A PROJECT
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Editorial Paragraph */}
          <div className="lg:col-span-5 lg:pt-8">
            <FadeIn delay={0.4} y={30}>
              <p className="font-sans text-lg sm:text-xl text-[#0B0C0A]/80 leading-relaxed font-light">
                We believe standard designs breed invisibility. We partner with visionaries to craft tailored solutions, establishing structural luxury aesthetics that demand attention, inspire customer loyalty, and scale effortlessly.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Bottom Services Cards Staggered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {services.map((svc, index) => (
            <FadeIn
              key={svc.title}
              delay={0.1 + index * 0.15}
              y={50}
              className={`${svc.height} flex flex-col`}
            >
              <div
                className="group relative flex flex-col justify-between h-full min-h-[280px] p-8 rounded-[2rem] bg-white border border-[#0B0C0A]/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(74,93,62,0.15)] overflow-hidden cursor-pointer"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4A5D3E] to-[#1C2219] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                {/* Card Number */}
                <div className="relative z-20 flex justify-between items-center">
                  <span className="text-[10px] tracking-widest text-[#4A5D3E] group-hover:text-[#A3B899] font-bold transition-colors duration-500 uppercase">
                    SERVICES
                  </span>
                  <span className="text-sm font-semibold text-[#8D9388] group-hover:text-[#A3B899] transition-colors duration-500">
                    {svc.num}
                  </span>
                </div>

                {/* Card Body */}
                <div className="relative z-20 mt-8 mb-4">
                  <h3 className="font-heading text-2xl font-black text-[#0B0C0A] group-hover:text-white transition-colors duration-500 uppercase mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8D9388] group-hover:text-[#A3B899] transition-colors duration-500 leading-relaxed font-light">
                    {svc.desc}
                  </p>
                </div>

                {/* Micro Action Icon */}
                <div className="relative z-20 mt-auto pt-4 flex justify-between items-center border-t border-[#0B0C0A]/5 group-hover:border-white/10 transition-colors duration-500">
                  <span className="text-[10px] tracking-widest text-[#0B0C0A] group-hover:text-white transition-colors duration-500 font-bold uppercase">
                    LEARN MORE
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#0B0C0A] group-hover:text-[#A3B899] transition-all duration-500 group-hover:rotate-45" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
