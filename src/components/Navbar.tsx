'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Magnetic from './Magnetic';
import { useI18n } from '@/lib/i18n';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, t, isAr } = useI18n();

  const navItems = [
    { name: t.nav.home, href: '#home' },
    { name: t.nav.menu, href: '#menu-section' },
    { name: t.nav.about, href: '#about-section' },
    { name: t.nav.contact, href: '#contact-section' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getHref = (href: string) => pathname === '/' ? href : '/' + href;

  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-6 px-4 sm:px-6 md:px-12">
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between rounded-full py-2.5 sm:py-3 px-4 sm:px-6 md:px-8 transition-all duration-500 ${
            isScrolled
              ? 'glass shadow-2xl backdrop-blur-md'
              : 'bg-transparent border-transparent'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative group flex flex-col leading-none">
              <span className="vega-gradient font-sans font-black text-xl sm:text-2xl tracking-widest">
                VEGA
              </span>
              <span className="text-[7px] sm:text-[8px] tracking-[0.3em] text-[#F8FAFC]/40 font-light uppercase -mt-0.5">
                Gaming Arena
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#72B4FF] to-[#E91E8C] transition-all duration-300 group-hover:w-full" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Magnetic key={item.name} strength={0.25}>
                <a
                  href={getHref(item.href)}
                  className="font-sans text-sm font-light text-[#64748B] hover:text-[#F8FAFC] transition-colors py-2 px-1 relative group tracking-wide"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gradient-to-r from-[#72B4FF] to-[#E91E8C] transition-all duration-300 group-hover:w-full" />
                </a>
              </Magnetic>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <Magnetic strength={0.2}>
              <button
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#A66DDB]/30 text-[#A66DDB] hover:border-[#A66DDB]/70 hover:text-[#F8FAFC] transition-all duration-300 text-xs font-medium cursor-pointer"
                aria-label="Switch Language"
              >
                <Globe className="h-3 w-3 shrink-0" />
                <span className={isAr ? '' : 'font-arabic'}>
                  {t.langToggle}
                </span>
              </button>
            </Magnetic>

            {/* Hamburger */}
            <Magnetic strength={0.3}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#0E0E12] text-[#F8FAFC]/60 border border-[#1E2230] hover:border-[#A66DDB]/40 transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#070708] flex flex-col justify-between overflow-hidden"
          >
            {/* Background gradient glow */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#72B4FF]/5 blur-[140px] -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[#E91E8C]/5 blur-[120px] -z-10" />

            {/* Top label row */}
            <div className="flex justify-between items-center pt-24 sm:pt-28 px-6 sm:px-10 md:px-16">
              <span className="text-[9px] sm:text-[10px] tracking-widest text-[#F8FAFC]/30 font-medium uppercase vega-gradient">VEGA</span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-[#F8FAFC]/30 font-medium uppercase">Gaming Arena</span>
            </div>

            {/* Nav links */}
            <div className="flex-1 flex items-center px-6 sm:px-10 md:px-16">
              <ul className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full">
                {navItems.map((item, idx) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: isAr ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.08, duration: 0.45 }}
                  >
                    <a
                      href={getHref(item.href)}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-3 sm:gap-4 font-sans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F8FAFC]/30 hover:text-[#F8FAFC] transition-colors"
                    >
                      <span className="text-sm sm:text-base md:text-xl font-sans font-light text-[#F8FAFC]/20 group-hover:text-[#A66DDB]/60 transition-colors tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span className="group-hover:vega-gradient transition-all">{item.name}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Bottom row */}
            <div className="px-6 sm:px-10 md:px-16 pb-8 sm:pb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-[#1E2230] pt-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-[#F8FAFC]/30 font-medium">{t.nav.inquiries}</span>
                <a href="mailto:hello@vegagaming.iq" className="text-sm sm:text-base font-light text-[#F8FAFC] hover:text-[#A66DDB] transition-colors">
                  hello@vegagaming.iq
                </a>
              </div>
              <div className="flex gap-4 sm:gap-6 text-xs text-[#64748B]">
                {['Instagram', 'Discord', 'Twitch'].map((s) => (
                  <a key={s} href="#" className="hover:text-[#F8FAFC] transition-colors">{s}</a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
