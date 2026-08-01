"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "../Magnetic";
import TextReveal from "../TextReveal";
import FadeIn from "../FadeIn";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register scrolltrigger
    gsap.registerPlugin(ScrollTrigger);

    const image = imageRef.current;
    const trigger = triggerRef.current;

    if (image && trigger) {
      gsap.fromTo(
        image,
        { scale: 1 },
        {
          scale: 1.18,
          ease: "none",
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }
  }, []);

  return (
    <section
      ref={triggerRef}
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center bg-[#0B0C0A] overflow-hidden pt-28 pb-12"
    >
      {/* Background gradients */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 rounded-full bg-[#4A5D3E]/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 -translate-y-1/2 w-80 h-80 rounded-full bg-[#A3B899]/5 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 xl:gap-8 items-stretch relative z-10">
        {/* LEFT COLUMN: Agency Tag, Title, Circular Button, Stats Card */}
        <div className="lg:col-span-5 flex flex-col justify-between py-6">
          <div className="flex flex-col items-start">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#A3B899] animate-pulse" />
              <span className="text-[10px] tracking-widest text-[#A3B899] font-extrabold uppercase">
                CREATIVE DIGITAL LAB
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tighter uppercase leading-[0.88] text-[#F5F6F4]">
              <TextReveal text="DESIGN THAT" delay={0.1} />
              <br />
              <TextReveal
                text="CAPTIVATES"
                delay={0.3}
                className="text-[#A3B899]"
              />
              <br />
              <span className="inline-flex items-center gap-2">
                <TextReveal text="TODAY" delay={0.4} />
                <motion.span
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="font-light italic text-[#8D9388] font-satoshi lowercase"
                >
                  &amp;
                </motion.span>
              </span>
              <br />
              <TextReveal text="INSPIRES" delay={0.5} />
              <br />
              <TextReveal text="TOMORROW" delay={0.6} />
              <span className="text-[#A3B899]">.</span>
            </h1>

            {/* Circular CTA Button */}
            <FadeIn delay={0.8} y={20}>
              <div className="mt-8 md:mt-12 flex items-center gap-4">
                <Magnetic strength={0.35}>
                  <a
                    href="#cases"
                    className="relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-[#1C2219] hover:bg-[#4A5D3E] border border-[#22281E] hover:border-[#A3B899] text-[#F5F6F4] hover:text-[#0B0C0A] transition-all duration-500 group"
                  >
                    <span className="absolute inset-0 rounded-full scale-0 bg-[#A3B899] group-hover:scale-100 transition-transform duration-500 ease-[0.16,1,0.3,1]"></span>
                    <ArrowUpRight className="h-8 w-8 relative z-10 transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                </Magnetic>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#F5F6F4]">
                    VIEW PORTFOLIO
                  </span>
                  <span className="text-[10px] text-[#8D9388]">
                    AWARDS NOMINATED CASE STUDIES
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Stats Card */}
          <FadeIn delay={1.0} y={30} className="mt-12 lg:mt-auto">
            <div className="p-6 rounded-[1.5rem] bg-[#131511] border border-[#22281E]/80 max-w-xs flex items-center gap-5 hover:border-[#4A5D3E]/30 transition-colors duration-300">
              <div className="relative flex items-center justify-center h-16 w-16 rounded-full bg-[#1C2219] text-[#A3B899] font-heading font-black text-2xl">
                95%
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="transparent"
                    className="text-[#4A5D3E]/10"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray="176"
                    strokeDashoffset="8.8"
                    className="text-[#A3B899]"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#F5F6F4]">
                  CLIENT RETENTION
                </span>
                <span className="text-[10px] text-[#8D9388] leading-tight">
                  Long-term design partnerships based on performance.
                </span>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* CENTER COLUMN: Central Fashion Portrait */}
        <div className="lg:col-span-4 flex items-center justify-center py-6 min-h-[400px] lg:min-h-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="w-full h-full min-h-[450px] lg:h-[80%] rounded-[2.5rem] overflow-hidden border border-[#22281E] relative group shadow-2xl"
          >
            <div className="absolute inset-0 bg-[#0B0C0A]/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <img
              ref={imageRef}
              src="/gaming_omen.png"
              alt="Gaming Omen - Phantom Warrior"
              loading="eager"
              className="w-full h-full object-cover object-top transition-transform duration-500 ease-out"
            />
            {/* Visual Frame */}
            <div className="absolute inset-4 rounded-[1.8rem] border border-white/5 pointer-events-none z-20" />
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Service lists, Social Icons */}
        <div className="lg:col-span-3 flex flex-col justify-between py-6 lg:text-right lg:items-end">
          {/* Services List */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="group"
            >
              <h3 className="font-heading text-sm font-bold tracking-widest text-[#A3B899] mb-1">
                BRANDING
              </h3>
              <p className="text-xs text-[#8D9388] max-w-xs lg:ml-auto">
                Forging iconic conceptual frameworks and timeless design systems
                that set industry benchmarks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="group"
            >
              <h3 className="font-heading text-sm font-bold tracking-widest text-[#A3B899] mb-1">
                ART DIRECTION
              </h3>
              <p className="text-xs text-[#8D9388] max-w-xs lg:ml-auto">
                Curating cinematic visual narratives and artistic layouts across
                print, digital, and physical spaces.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="group"
            >
              <h3 className="font-heading text-sm font-bold tracking-widest text-[#A3B899] mb-1">
                DIGITAL IDENTITY
              </h3>
              <p className="text-xs text-[#8D9388] max-w-xs lg:ml-auto">
                Crafting state-of-the-art interactive web platforms with liquid
                animations and immersive UX.
              </p>
            </motion.div>
          </div>

          {/* Social Icons */}
          <FadeIn delay={1.1} y={20} className="mt-12 lg:mt-auto">
            <div className="flex items-center gap-4 lg:justify-end">
              <span className="text-[10px] tracking-widest text-[#8D9388] font-bold uppercase mr-2 hidden sm:inline">
                FOLLOW US
              </span>

              <Magnetic strength={0.4}>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#131511] border border-[#22281E] text-[#8D9388] hover:text-[#A3B899] hover:border-[#4A5D3E] transition-all"
                  aria-label="Twitter"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </Magnetic>

              <Magnetic strength={0.4}>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#131511] border border-[#22281E] text-[#8D9388] hover:text-[#A3B899] hover:border-[#4A5D3E] transition-all"
                  aria-label="Dribbble"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.15-1.95-.775-3.905-.512 1.602 4.385 2.25 5.58 2.285 5.64 1.018-1.447 1.62-3.216 1.62-5.128zm-2.827 6.416c-.05-.102-.79-1.423-2.47-5.83-5.263 1.545-6.966 4.606-7.066 4.793C10.024 21.6 11.026 21.75 12 21.75c3.075 0 5.827-1.107 7.293-2.75zm-10.573.962c.115-.225 2.05-3.86 7.158-5.307-.12-3.13-.884-5.69-1.253-6.857-4.887 1.5-9.356 1.455-9.8 1.455-.07 1.956.417 3.792 1.3 5.353.14-.047 3.518-1.206 5.86.388-1.42 3.99-3.132 4.908-3.265 4.968zm-3.52-9.42c.43 0 4.36.035 8.795-1.3-.395-.87-1.106-2.583-1.637-3.86-3.832 1.52-5.918 4.293-6.05 4.478.237.24.536.467.892.682zm7.625-5.986c.552 1.282 1.253 2.923 1.625 3.738 3.712-1.077 5.166-.27 5.27-.215A9.702 9.702 0 0012 2.25c-3.11 0-5.9 1.135-7.373 2.806 1.603-1.446 5.845-2.22 8.163-1.037z" />
                  </svg>
                </a>
              </Magnetic>

              <Magnetic strength={0.4}>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#131511] border border-[#22281E] text-[#8D9388] hover:text-[#A3B899] hover:border-[#4A5D3E] transition-all"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                  </svg>
                </a>
              </Magnetic>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
