'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Lang = 'en' | 'ar';

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof translations['en'];
  isAr: boolean;
}

export const translations = {
  en: {
    brandName: 'VEGA',
    brandSub: 'GAMING ARENA',
    // Navbar
    nav: {
      home: 'Home',
      menu: 'Menu',
      about: 'About',
      contact: 'Contact',
      inquiries: 'Inquiries',
    },
    // Hero
    hero: {
      headline1: 'VEGA',
      headline2: 'GAMING',
      headline3: 'ARENA',
      cta1: 'Explore Menu',
      cta2: 'Our Story',
      scroll: 'Scroll',
    },
    // Menu
    menu: {
      badge: 'Refuel Station',
      title: 'The Menu',
      subtitle: 'Precision-crafted fuel for peak gaming performance',
      tabs: {
        all: 'All',
        coffee: 'Coffee',
        food: 'Food',
        energy: 'Energy',
      },
      items: [
        { name: 'Vega Espresso', desc: 'Double shot, dark roast — high intensity', tag: 'COFFEE', price: '3,500 IQD' },
        { name: 'Starfield Latte', desc: 'Smooth blend with vanilla & oat milk', tag: 'COFFEE', price: '4,000 IQD' },
        { name: 'Planet Cold Brew', desc: '24-hr steeped, ready to launch', tag: 'COFFEE', price: '4,500 IQD' },
        { name: 'Galaxy Matcha', desc: 'Premium ceremonial grade, 2x caffeine', tag: 'COFFEE', price: '5,000 IQD' },
        { name: 'Boss Burger', desc: 'Wagyu patty, truffle aioli, cheddar', tag: 'FOOD', price: '12,000 IQD' },
        { name: 'Arena Wrap', desc: 'Grilled chicken, jalapeños, cosmic sauce', tag: 'FOOD', price: '9,000 IQD' },
        { name: 'Nebula Nachos', desc: 'Loaded chips with guac & salsa', tag: 'FOOD', price: '7,000 IQD' },
        { name: 'Nova Energy', desc: 'Natural caffeine + B-vitamins boost', tag: 'ENERGY', price: '6,000 IQD' },
      ],
    },
    // About
    about: {
      badge: 'Our Story',
      title: 'Where Galaxies\nMeet Gaming',
      body: 'Vega Gaming Arena was built for those who play at a different level. A space where elite setups, specialty drinks, and the energy of a community that never stops pushing forward come together.',
      stat1Label: 'Gaming Stations',
      stat2Label: 'Specialty Drinks',
      stat3Label: 'Tournaments / Year',
      cta: 'View Full Story',
    },
    // Contact
    contact: {
      badge: 'Connect',
      title: 'Let\'s Play',
      subtitle: 'Book a station, reserve for events, or just drop by.',
      namePlaceholder: 'Full Name',
      emailPlaceholder: 'Email Address',
      msgPlaceholder: 'Your Message',
      send: 'Send Message',
      location: 'Location',
      locationVal: 'Baghdad, Iraq',
      hours: 'Hours',
      hoursVal: 'Daily 8:00 AM – 4:00 AM',
    },
    // Footer
    footer: {
      ctaBadge: 'Join Us Today',
      ctaHeadline1: 'SAY HELLO',
      ctaHeadline2: 'to the arena.',
      ctaHeadline3: 'VEGA.',
      email: 'vegaarenastar@gmail.com',
      navTitle: 'Navigation',
      connectTitle: 'Connect',
      hqTitle: 'Location',
      hqVal: 'Baghdad\nIraq',
      copyright: 'VEGA GAMING ARENA. ALL RIGHTS RESERVED.',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    langToggle: 'عربي',
  },
  ar: {
    brandName: 'فيغا',
    brandSub: 'ساحة الألعاب',
    // Navbar
    nav: {
      home: 'الرئيسية',
      menu: 'القائمة',
      about: 'من نحن',
      contact: 'تواصل معنا',
      inquiries: 'الاستفسارات',
    },
    // Hero
    hero: {
      headline1: 'فيغا',
      headline2: 'ساحة',
      headline3: 'الألعاب',
      cta1: 'استكشف القائمة',
      cta2: 'قصتنا',
      scroll: 'اسحب',
    },
    // Menu
    menu: {
      badge: 'محطة الطاقة',
      title: 'القائمة',
      subtitle: 'مشروبات وأكلات مصممة لأعلى مستويات الأداء',
      tabs: {
        all: 'الكل',
        coffee: 'القهوة',
        food: 'الأكل',
        energy: 'الطاقة',
      },
      items: [
        { name: 'إسبريسو فيغا', desc: 'شوت مزدوج، تحميص غامق — كثافة عالية', tag: 'COFFEE', price: '٣٬٥٠٠ د.ع' },
        { name: 'لاتيه نجوم', desc: 'مزيج ناعم مع فانيليا وحليب الشوفان', tag: 'COFFEE', price: '٤٬٠٠٠ د.ع' },
        { name: 'كولد برو الكوكب', desc: 'مُنقع ٢٤ ساعة، جاهز للانطلاق', tag: 'COFFEE', price: '٤٬٥٠٠ د.ع' },
        { name: 'ماتشا المجرة', desc: 'درجة احتفالية ممتازة، ضعف الكافيين', tag: 'COFFEE', price: '٥٬٠٠٠ د.ع' },
        { name: 'برغر البوس', desc: 'واغيو مع ترافل أيولي وشيدر', tag: 'FOOD', price: '١٢٬٠٠٠ د.ع' },
        { name: 'راب الساحة', desc: 'دجاج مشوي مع هالابينيو وصوص كوني', tag: 'FOOD', price: '٩٬٠٠٠ د.ع' },
        { name: 'ناتشوز النيبولا', desc: 'رقائق محملة مع غواكامولي وصلصة', tag: 'FOOD', price: '٧٬٠٠٠ د.ع' },
        { name: 'طاقة نوفا', desc: 'كافيين طبيعي + فيتامينات B للدفعة', tag: 'ENERGY', price: '٦٬٠٠٠ د.ع' },
      ],
    },
    // About
    about: {
      badge: 'قصتنا',
      title: 'حيث تلتقي\nالمجرات بالألعاب',
      body: 'بُنيت فيغا للاعبين الذين يلعبون على مستوى مختلف. مكان تتلاقى فيه الأجهزة المتطورة والمشروبات المتخصصة وطاقة مجتمع لا يتوقف أبداً.',
      stat1Label: 'محطة ألعاب',
      stat2Label: 'مشروب متخصص',
      stat3Label: 'بطولة / سنة',
      cta: 'اقرأ القصة كاملة',
    },
    // Contact
    contact: {
      badge: 'تواصل',
      title: 'هيا نلعب',
      subtitle: 'احجز محطة، أو استفسر عن فعاليات، أو تفضل بزيارتنا.',
      namePlaceholder: 'الاسم الكامل',
      emailPlaceholder: 'البريد الإلكتروني',
      msgPlaceholder: 'رسالتك',
      send: 'إرسال الرسالة',
      location: 'الموقع',
      locationVal: 'بغداد، العراق',
      hours: 'أوقات العمل',
      hoursVal: 'يومياً ٨:٠٠ ص – ٤:٠٠ ص',
    },
    // Footer
    footer: {
      ctaBadge: 'انضم إلينا اليوم',
      ctaHeadline1: 'قل مرحبا',
      ctaHeadline2: 'بالساحة.',
      ctaHeadline3: 'فيغا.',
      email: 'vegaarenastar@gmail.com',
      navTitle: 'التنقل',
      connectTitle: 'تابعنا',
      hqTitle: 'الموقع',
      hqVal: 'بغداد\nالعراق',
      copyright: 'فيغا ساحة الألعاب. جميع الحقوق محفوظة.',
      privacy: 'الخصوصية',
      terms: 'الشروط',
    },
    langToggle: 'English',
  },
} as const;

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  isAr: false,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('vega-lang') as Lang | null;
    if (saved === 'ar' || saved === 'en') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('vega-lang', l);
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] as unknown as typeof translations['en'], isAr: lang === 'ar' }}>
      <div
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        lang={lang}
        className={lang === 'ar' ? 'font-arabic' : ''}
      >
        {children}
      </div>
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
