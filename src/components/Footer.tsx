'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';
import { useI18n } from '@/lib/i18n';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/vega.arena?igsh=bzY3Z3E0bGdvNDIx' },
];

export default function Footer() {
  const { t, isAr } = useI18n();
  const f = t.footer;
  const currentYear = new Date().getFullYear();

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.menu, href: '#menu-section' },
    { label: t.nav.about, href: '#about-section' },
    { label: t.nav.contact, href: '#contact-section' },
  ];

  return (
    <footer
      id="footer"
      className="relative w-full pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 text-[#F8FAFC] border-t border-white/10 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10 rounded-2xl"
        style={{ background: 'radial-gradient(ellipse at center, rgba(7,7,8,0.72) 0%, rgba(7,7,8,0.45) 60%, rgba(7,7,8,0.0) 100%)', backdropFilter: 'blur(2px)' }}
      >

        {/* CTA block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-14 sm:mb-16 md:mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4 sm:mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A66DDB]" />
              <span className="text-[10px] tracking-widest text-[#A66DDB] font-medium uppercase">{f.ctaBadge}</span>
            </div>
            <h2
              className="font-sans font-black leading-[0.9] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              <span className="vega-gradient">{f.ctaHeadline1}</span>
              <br />
              <span className="text-[#F8FAFC]/30 font-light" style={{ fontSize: 'clamp(1.25rem, 4vw, 3rem)' }}>
                {f.ctaHeadline2}{' '}
              </span>
              <br />
              <span className="vega-gradient">{f.ctaHeadline3}</span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:pt-14 flex flex-col items-start lg:items-end gap-3">
            <span className="text-[10px] tracking-widest text-[#F8FAFC]/30 font-medium uppercase">
              {isAr ? 'البريد الإلكتروني' : 'Email Us'}
            </span>
            <Magnetic strength={0.3}>
              <a
                href={`mailto:${f.email}`}
                className="group flex items-center gap-2 sm:gap-3 font-sans font-medium text-[#F8FAFC] hover:text-[#A66DDB] transition-colors duration-300 tracking-tight"
                style={{ fontSize: 'clamp(0.85rem, 2.5vw, 1.75rem)' }}
              >
                {f.email}
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5 text-[#F8FAFC]/40 group-hover:text-[#A66DDB] group-hover:rotate-45 transition-all duration-300 shrink-0" />
              </a>
            </Magnetic>
            <p className="text-xs text-[#64748B] max-w-xs lg:text-right leading-relaxed font-light">
              {isAr ? 'نرد على استفساراتك خلال ٢٤ ساعة.' : 'We respond to all inquiries within 24 hours.'}
            </p>
          </div>
        </div>

        {/* Middle columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 sm:py-10 md:py-12 border-t border-b border-[#1E2230]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <div className="flex flex-col leading-none">
              <span className="font-sans font-black text-xl vega-gradient tracking-widest">VEGA</span>
              <span className="text-[8px] tracking-[0.25em] text-[#F8FAFC]/30 uppercase -mt-0.5">Gaming Arena</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#F8FAFC]/80 max-w-[200px] leading-relaxed font-light">
              {isAr
                ? 'ساحة ألعاب متميزة تجمع أفضل الأجهزة والمشروبات المتخصصة في الرياض.'
                : 'Premium gaming arena with high-end rigs, specialty drinks, and esports events in Baghdad.'}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] tracking-widest text-[#F8FAFC]/30 font-medium uppercase">{f.navTitle}</h4>
            <div className="flex flex-col gap-2 text-xs text-[#F8FAFC]/80">
              {navItems.map(({ label, href }) => (
                <a key={label} href={href} className="hover:text-[#A66DDB] transition-colors w-fit">{label}</a>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] tracking-widest text-[#F8FAFC]/30 font-medium uppercase">{f.connectTitle}</h4>
            <div className="flex flex-col gap-2 text-xs text-[#F8FAFC]/80">
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className="hover:text-[#A66DDB] transition-colors w-fit">{label}</a>
              ))}
            </div>
          </div>

          {/* HQ */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <h4 className="text-[10px] tracking-widest text-[#F8FAFC]/30 font-medium uppercase">{f.hqTitle}</h4>
            <a
              href="https://maps.app.goo.gl/pHabYhpfeahNycsh7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#F8FAFC]/80 hover:text-[#A66DDB] transition-colors leading-relaxed font-light whitespace-pre-line flex items-center gap-1 group"
            >
              {f.hqVal}
              <ArrowUpRight className="h-3 w-3 text-[#F8FAFC]/40 group-hover:text-[#A66DDB] group-hover:rotate-45 transition-all duration-300 shrink-0" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] text-[#F8FAFC]/80 gap-3 mt-6 sm:mt-8">
          <span>© {currentYear} {f.copyright}</span>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-[#A66DDB] transition-colors">{f.privacy}</a>
            <a href="#" className="hover:text-[#A66DDB] transition-colors">{f.terms}</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
