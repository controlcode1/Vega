'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import HoverTilt from '../HoverTilt';
import Magnetic from '../Magnetic';
import FadeIn from '../FadeIn';
import TextReveal from '../TextReveal';

const projects = [
  {
    num: '01',
    title: 'Aether Fragrances',
    category: 'Luxury Packaging & E-Commerce',
    year: '2025',
    desc: 'Creating an ultra-premium digital flagship and physical fragrance packaging representing olfactory minimalism.',
    image: '/project_fragrance.png',
    link: '#cases',
    accent: '#4A5D3E',
  },
  {
    num: '02',
    title: 'The Brutalist Villa',
    category: 'Spatial Design & Brand Identity',
    year: '2026',
    desc: 'Translating massive concrete brutalist architecture into a luxury architectural photography book and spatial web experience.',
    image: '/project_architecture.png',
    link: '#cases',
    accent: '#A3B899',
  },
];

export default function FeaturedProjects() {
  return (
    <section
      id="cases"
      className="relative w-full py-24 md:py-36 bg-[#0B0C0A] text-[#F5F6F4] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#4A5D3E]/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col items-start mb-16 md:mb-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3B899]" />
            <span className="text-[10px] tracking-widest text-[#8D9388] font-extrabold uppercase">
              SELECTED WORK
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.9] uppercase">
            <TextReveal text="Featured Cases." delay={0.1} />
          </h2>
        </div>

        {/* Project Layouts */}
        <div className="flex flex-col gap-24 md:gap-36">
          {projects.map((proj, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={proj.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                
                {/* Left/Right Project Image Wrapper */}
                <div
                  className={`col-span-1 lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <FadeIn delay={0.2} y={40}>
                    <HoverTilt maxRotate={4}>
                      <a
                        href={proj.link}
                        data-cursor-label="EXPLORE"
                        className="block relative w-full h-[300px] sm:h-[450px] rounded-[2.5rem] overflow-hidden border border-[#22281E] bg-[#131511] group shadow-2xl"
                      >
                        <div className="absolute inset-0 bg-[#0B0C0A]/30 group-hover:bg-[#0B0C0A]/10 transition-colors duration-500 z-10" />
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        />
                        {/* Overlay border framing */}
                        <div className="absolute inset-4 rounded-[1.8rem] border border-white/5 pointer-events-none z-20" />
                      </a>
                    </HoverTilt>
                  </FadeIn>
                </div>

                {/* Left/Right Project Details */}
                <div
                  className={`col-span-1 lg:col-span-5 flex flex-col justify-center ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <FadeIn delay={0.4} y={30}>
                    {/* Index & Year */}
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#8D9388] mb-4">
                      <span className="text-[#A3B899] font-bold font-satoshi text-lg">
                        {proj.num}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[#22281E]" />
                      <span>{proj.category}</span>
                      <span className="h-1 w-1 rounded-full bg-[#22281E]" />
                      <span className="font-satoshi">{proj.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-3xl sm:text-4xl font-black uppercase text-[#F5F6F4] leading-tight mb-4">
                      {proj.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-[#8D9388] leading-relaxed mb-8 font-light">
                      {proj.desc}
                    </p>

                    {/* Case Study CTA */}
                    <div className="flex">
                      <Magnetic strength={0.35}>
                        <a
                          href={proj.link}
                          className="group flex items-center gap-3 bg-[#1C2219] hover:bg-[#4A5D3E] text-[#A3B899] hover:text-[#0B0C0A] py-3.5 px-8 rounded-full font-heading font-bold text-xs tracking-widest uppercase border border-[#22281E] hover:border-[#A3B899] transition-all duration-500"
                        >
                          CASE STUDY
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-[-2px] group-hover:translate-x-[2px]" />
                        </a>
                      </Magnetic>
                    </div>
                  </FadeIn>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
