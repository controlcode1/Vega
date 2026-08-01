'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from '../FadeIn';
import TextReveal from '../TextReveal';

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'We immerse ourselves in your market position, auditing competitors, assessing consumer friction points, and extracting the unique visual essence that defines your legacy.',
  },
  {
    num: '02',
    title: 'Strategy',
    desc: 'Establishing the artistic direction, layout wireframes, site hierarchy, and tech stack parameters. We deliver a comprehensive blueprint to ensure absolute conceptual alignment.',
  },
  {
    num: '03',
    title: 'Design',
    desc: 'Crafting premium interactive prototypes with luxury typography, smooth micro-animations, and harmonized color palettes. Iterating until the user experience feels pristine.',
  },
  {
    num: '04',
    title: 'Development',
    desc: 'Converting static layout art into clean, high-performance React code using Next.js, Tailwind CSS, and custom GSAP/Framer Motion engines. Built with strict compliance.',
  },
  {
    num: '05',
    title: 'Launch',
    desc: 'Performing comprehensive SEO optimizations, speed audits, cross-device QA, and analytics tracking integrations. We deploy a premium digital flagship to win the market.',
  },
];

export default function ProcessTimeline() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-36 bg-[#0B0C0A] text-[#F5F6F4] overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Heading & Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A3B899]" />
              <span className="text-[10px] tracking-widest text-[#8D9388] font-extrabold uppercase">
                METHODOLOGY
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[0.9] uppercase mb-6">
              <TextReveal text="Our Process" delay={0.1} />
              <br />
              <span className="text-[#A3B899] font-light italic font-satoshi lowercase">for </span>
              <TextReveal text="Extraordinary" delay={0.25} />
              <br />
              <TextReveal text="Results." delay={0.4} />
            </h2>
            
            <p className="text-sm sm:text-base text-[#8D9388] max-w-sm leading-relaxed font-light">
              We operate with structural transparency. Every stage is highly focused, aiming to eliminate design compromises and deliver a premium build on timeline.
            </p>
          </div>

          {/* Right Column: Timeline Steps */}
          <div className="lg:col-span-7 relative pl-8 sm:pl-12">
            
            {/* Timeline Line Rail */}
            <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-[#22281E] z-0">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-[1px] bg-gradient-to-b from-[#A3B899] via-[#4A5D3E] to-[#1C2219]"
              />
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-12 sm:gap-16 relative z-10">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
                  className="group relative"
                >
                  {/* Glowing Node on the rail */}
                  <div className="absolute -left-[37px] sm:-left-[53px] top-1.5 flex items-center justify-center">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, duration: 0.5 }}
                      className="h-4 w-4 rounded-full bg-[#131511] border-2 border-[#22281E] group-hover:border-[#A3B899] transition-all duration-300 flex items-center justify-center"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-transparent group-hover:bg-[#A3B899] transition-all duration-300" />
                    </motion.div>
                  </div>

                  {/* Header Title */}
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#4A5D3E] group-hover:text-[#A3B899] transition-colors duration-300 font-satoshi">
                      {step.num}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#F5F6F4] group-hover:text-[#A3B899] transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>

                  {/* Content */}
                  <p className="text-xs sm:text-sm text-[#8D9388] leading-relaxed font-light max-w-xl group-hover:text-[#F5F6F4]/90 transition-colors duration-300">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
