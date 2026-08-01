'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';

export default function CoffeeHero() {
  const { t, isAr } = useI18n();
  const h = t.hero;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-transparent"
    >
      {/* Vega brand glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#72B4FF]/6 blur-[120px] md:blur-[160px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[#E91E8C]/5 blur-[100px] md:blur-[130px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#A66DDB]/3 blur-[180px] -z-10" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-32 md:py-0 flex flex-col justify-center relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-6 md:mb-8"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#A66DDB]" />
          <span className="text-[10px] tracking-[0.3em] text-[#A66DDB] font-medium uppercase">
            {isAr ? 'ساحة الألعاب' : 'Gaming Arena'}
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans font-black leading-[0.88] tracking-tight text-[#F8FAFC] mb-8 md:mb-10"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
        >
          <span className="vega-gradient">{h.headline1}</span>
          <br />
          <span className="text-[#F8FAFC]/80 text-[0.65em]">{h.headline2}</span>
          <br />
          <span className="text-[#F8FAFC]/50 text-[0.6em]">{h.headline3}</span>
        </motion.h1>

        {/* Thin gradient divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          className={`origin-${isAr ? 'right' : 'left'} w-16 md:w-24 h-px bg-gradient-to-r from-[#72B4FF] to-[#E91E8C] mb-8 md:mb-10`}
        />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-row gap-3 flex-wrap"
        >
          <a
            href="#menu-section"
            className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[#F8FAFC] font-sans font-medium text-xs tracking-widest transition-all duration-300 active:scale-95 cursor-pointer overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, #72B4FF22, #E91E8C22)', border: '1px solid rgba(166,109,219,0.4)' }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#72B4FF]/10 to-[#E91E8C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {h.cta1}
          </a>
          <a
            href="#about-section"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#F8FAFC]/10 text-[#F8FAFC]/50 font-sans font-light text-xs tracking-widest hover:text-[#F8FAFC] hover:border-[#F8FAFC]/25 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            {h.cta2}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-25">
        <span className="text-[8px] sm:text-[9px] uppercase tracking-widest text-[#F8FAFC] font-medium">{h.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-px h-4 sm:h-5 bg-gradient-to-b from-[#A66DDB] to-transparent"
        />
      </div>
    </section>
  );
}
