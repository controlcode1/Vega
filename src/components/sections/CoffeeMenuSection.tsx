'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function CoffeeMenuSection() {
  const { t } = useI18n();
  const m = t.menu;

  const categories = [
    { key: 'XP Boost', label: m.tabs.coffee },
    { key: 'Mana', label: m.tabs.energy },
    { key: 'Loot', label: m.tabs.food },
  ];

  return (
    <section
      id="menu-section"
      className="py-20 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-transparent relative overflow-hidden border-t border-[#1E2230]/40"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#72B4FF]/3 blur-[120px] md:blur-[150px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-[#E91E8C]/3 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#A66DDB] font-medium">
            {m.badge}
          </span>
          <h2
            className="font-sans font-black leading-tight text-[#F8FAFC] mt-3"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            <span className="vega-gradient">{m.title}</span>
          </h2>
          <p className="text-[#64748B] font-sans font-light text-sm sm:text-base mt-3 max-w-xl">
            {m.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative w-full max-w-lg mx-auto lg:max-w-none"
          >
            <div className="rounded-2xl overflow-hidden border border-[#1E2230] shadow-2xl group relative">
              <Image
                src="/gaming_omen.jpg"
                alt="Vega Gaming Arena"
                width={800}
                height={1000}
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
              {/* Vega corner markers */}
              <div className="absolute top-5 left-5 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-[#72B4FF]/40" />
              <div className="absolute bottom-5 right-5 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-[#E91E8C]/40" />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6 md:space-y-8 relative rounded-2xl p-6 sm:p-8"
            style={{ background: 'linear-gradient(135deg, rgba(7,7,8,0.75) 0%, rgba(14,10,25,0.70) 100%)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.04)' }}
          >
            {/* Items preview */}
            <div className="space-y-3">
              {m.items.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4 py-3 border-b border-[#1E2230]/50 group hover:border-[#A66DDB]/30 transition-colors">
                  <div>
                    <p className="text-sm text-[#F8FAFC] font-medium group-hover:text-[#A66DDB] transition-colors">{item.name}</p>
                    <p className="text-xs text-[#64748B] font-light mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-sm text-[#A66DDB] font-medium shrink-0">{item.price}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/menu"
              className="
                inline-flex items-center gap-2.5
                px-6 sm:px-8 py-3.5 sm:py-4
                rounded-full self-start
                font-sans font-medium text-sm text-[#F8FAFC]
                transition-all duration-300
                active:scale-95 cursor-pointer tracking-wide
                group
              "
              style={{ background: 'linear-gradient(135deg, #72B4FF22, #E91E8C22)', border: '1px solid rgba(166,109,219,0.4)' }}
            >
              {m.tabs.all}
              <svg className="w-4 h-4 opacity-60 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
