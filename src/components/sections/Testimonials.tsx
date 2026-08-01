'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import Magnetic from '../Magnetic';
import FadeIn from '../FadeIn';
import TextReveal from '../TextReveal';

const testimonials = [
  {
    quote: "AVANT rebuilt our brand systems from scratch. Their mastery of editorial typography and brutalist luxury layouts gave us a visual moat that increased our conversion rates by 42% in under three months. They did not just design a website; they forged our digital legacy.",
    name: "Alistair Thorne",
    role: "CEO, AETHER FRAGRANCES",
    image: "/client_one.png",
  },
  {
    quote: "They operate at a level of design and engineering precision I've rarely seen in my career. The custom GSAP page transitions are liquid-smooth, and the Next.js foundation is incredibly optimized. Their team understands that performance is a luxury.",
    name: "Elena Rostova",
    role: "CREATIVE DIRECTOR, THE BRUTALIST VILLA",
    image: "", // Will render a sleek typography monogram
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 200, damping: 25 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.3 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      filter: 'blur(4px)',
      transition: {
        x: { type: 'spring', stiffness: 200, damping: 25 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.3 },
      },
    }),
  };

  return (
    <section className="relative w-full py-24 md:py-36 bg-[#0B0C0A] text-[#F5F6F4] overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#A3B899]/3 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-4 justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A3B899]" />
            <span className="text-[10px] tracking-widest text-[#8D9388] font-extrabold uppercase">
              CLIENT TESTIMONIALS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[0.9] uppercase">
            <TextReveal text="Trusted Partners." delay={0.1} />
          </h2>
        </div>

        {/* Testimonial Card Slider */}
        <FadeIn delay={0.2} y={30} className="relative w-full">
          
          <div className="relative overflow-hidden w-full glass rounded-[2.5rem] p-8 sm:p-12 md:p-16 border border-[#22281E] bg-[#131511]/50 backdrop-blur-md">
            
            {/* Quote watermark icon */}
            <Quote className="absolute top-8 right-8 h-20 w-20 text-[#22281E] opacity-20 pointer-events-none" />

            <div className="min-h-[220px] relative flex flex-col justify-between">
              
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full flex flex-col gap-8"
                >
                  <p className="text-base sm:text-xl lg:text-2xl text-[#F5F6F4]/90 leading-relaxed font-light italic">
                    "{testimonials[current].quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    {/* Client image or Initials */}
                    {testimonials[current].image ? (
                      <div className="h-12 w-12 rounded-full overflow-hidden border border-[#22281E]">
                        <img
                          src={testimonials[current].image}
                          alt={testimonials[current].name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-[#1C2219] border border-[#22281E] flex items-center justify-center text-[#A3B899] font-heading font-black text-sm">
                        {testimonials[current].name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}

                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#F5F6F4]">
                        {testimonials[current].name}
                      </span>
                      <span className="text-[10px] tracking-wider text-[#A3B899] font-semibold font-satoshi">
                        {testimonials[current].role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-4 mt-6">
            <Magnetic strength={0.3}>
              <button
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#131511] hover:bg-[#1C2219] border border-[#22281E] text-[#8D9388] hover:text-[#A3B899] transition-colors"
                aria-label="Previous testimony"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <button
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#131511] hover:bg-[#1C2219] border border-[#22281E] text-[#8D9388] hover:text-[#A3B899] transition-colors"
                aria-label="Next testimony"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </Magnetic>
          </div>

        </FadeIn>

      </div>
    </section>
  );
}
