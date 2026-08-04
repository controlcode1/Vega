'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { Category, MenuItem } from '@/lib/db';

const getIconComponent = (iconName: string) => {
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.Coffee;
};

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem[]>>({});
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const { lang, isAr } = useI18n();

  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await fetch(`/api/menu?_t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch menu');
        const data = await res.json();
        
        setCategories(data.categories || []);
        
        // Group items by categoryId (case-insensitive & trimmed matching)
        const grouped: Record<string, MenuItem[]> = {};
        (data.categories || []).forEach((cat: Category) => {
          const catIdClean = cat.id.trim().toLowerCase();
          grouped[cat.id] = (data.items || []).filter((item: MenuItem) => 
            item.categoryId && item.categoryId.trim().toLowerCase() === catIdClean
          );
        });
        
        setMenuItems(grouped);
        
        if (data.categories && data.categories.length > 0) {
          setActiveCategory(data.categories[0].id);
        }
      } catch (err) {
        console.error('Error loading menu:', err);
      } finally {
        setLoading(false);
      }
    }
    
    loadMenu();
  }, []);

  const getCatName = (cat: Category) =>
    isAr ? cat.nameAr : cat.nameEn;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#070708] relative text-[#F8FAFC] overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-[30vh] left-[-10vw] w-[600px] h-[600px] rounded-full bg-[#72B4FF]/5 blur-[150px] -z-10" />
        <div className="absolute bottom-[20vh] right-[-10vw] w-[500px] h-[500px] rounded-full bg-[#E91E8C]/4 blur-[120px] -z-10" />

        {/* ── Hero Cover ── */}
        <div className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden border-b border-[#1E2230]">
          <Image
            src="/ca4f1475ff5f22a651500f4bdf7b1509.jpg"
            alt="Vega Gaming Arena Menu"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/50 to-transparent" />

          {/* Back Button - Top Left with Glass Container */}
          <div className="absolute top-24 start-6 md:top-28 md:start-12 z-30">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#A66DDB] hover:text-[#F8FAFC] transition-colors group bg-[#0E0E12]/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-[#1E2230] hover:border-[#A66DDB]/40"
              >
                <ArrowLeft className="w-3 h-3 transform group-hover:-translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:translate-x-1" />
                {isAr ? 'الرئيسية' : 'Back'}
              </Link>
            </motion.div>
          </div>

          <div className="relative z-10 text-center px-6 max-w-3xl space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans font-black tracking-tight"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
            >
              <span className="text-[#F8FAFC] drop-shadow-lg">
                {isAr ? 'القائمة' : 'THE MENU'}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm text-[#F8FAFC] font-light max-w-md mx-auto drop-shadow-md"
            >
              {isAr
                ? 'مشروبات وأكلات مصممة لأعلى مستويات الأداء في ساحة فيغا'
                : 'Precision-crafted fuel for peak gaming performance at Vega Arena'}
            </motion.p>
          </div>

          {/* ── Category Tabs ── */}
          <div className="absolute bottom-0 left-0 right-0 z-20 overflow-x-auto py-4 px-6 md:px-12 bg-gradient-to-t from-[#070708] to-transparent">
            <div className="max-w-4xl mx-auto flex justify-center gap-2 md:gap-3 min-w-max pb-1">
              {!loading && categories.map((cat) => {
                const IconComponent = getIconComponent(cat.icon);
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'text-white border-transparent shadow-lg scale-105'
                        : 'bg-[#0E0E12]/70 text-[#64748B] border-[#1E2230] hover:text-[#F8FAFC] hover:bg-[#12141C]/50'
                    }`}
                    style={isActive ? {
                      background: 'linear-gradient(135deg, #72B4FF, #A66DDB, #E91E8C)',
                      boxShadow: '0 4px 20px rgba(166,109,219,0.35)'
                    } : {}}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    {getCatName(cat)}
                  </button>
                );
              })}
              
              {loading && Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-32 h-9 rounded-full bg-[#0E0E12]/70 border border-[#1E2230] animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Products Grid ── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12 py-16 md:py-24">
          {loading ? (
            // Loading Skeletons
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="flex flex-col rounded-2xl bg-[#0E0E12] border border-[#1E2230] overflow-hidden shadow-lg h-[260px] animate-pulse">
                  <div className="w-full aspect-[4/3] bg-[#121217]" />
                  <div className="p-4 flex-1 space-y-2">
                    <div className="h-4 bg-[#1E2230] rounded w-3/4" />
                    <div className="h-3 bg-[#1E2230] rounded w-1/2" />
                    <div className="h-3 bg-[#1E2230] rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#64748B] space-y-4">
              <ShieldAlert className="w-12 h-12 text-[#A66DDB]" />
              <p>{isAr ? 'لم يتم العثور على أي أقسام بعد.' : 'No menu categories found yet.'}</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6"
              >
                {menuItems[activeCategory]?.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    className="group flex flex-col rounded-2xl bg-[#0E0E12] border border-[#1E2230] hover:border-[#A66DDB]/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_8px_40px_rgba(166,109,219,0.12)]"
                  >
                    {/* ── Image ── */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#121217]">
                      <Image
                        src={item.image}
                        alt={isAr ? item.nameAr : item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-108"
                      />
                      {/* Gradient overlay at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-transparent opacity-60" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                        {item.tag && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                            style={{ background: 'linear-gradient(135deg, #72B4FF, #A66DDB)', color: '#fff' }}>
                            {isAr && item.tagAr ? item.tagAr : item.tag}
                          </span>
                        )}
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#E91E8C]/20 text-[#E91E8C] border border-[#E91E8C]/30">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* ── Info ── */}
                    <div className="flex flex-col flex-1 p-3 sm:p-4 md:p-5 gap-1.5 sm:gap-2">
                      {/* Name + Price */}
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                        <h3 className="font-sans font-bold text-xs sm:text-sm md:text-base text-[#F8FAFC] group-hover:text-[#A66DDB] transition-colors leading-snug flex-1">
                          {isAr ? item.nameAr : item.name}
                        </h3>
                        <span
                          className="font-sans font-black text-xs sm:text-sm md:text-base shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, #72B4FF, #E91E8C)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          {item.price}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-[10px] sm:text-[11px] md:text-xs text-[#64748B] font-light leading-relaxed flex-1 hidden sm:block">
                        {isAr ? item.descriptionAr : item.description}
                      </p>
                    </div>

                    {/* Bottom gradient line */}
                    <div
                      className="h-px w-0 group-hover:w-full transition-all duration-500"
                      style={{ background: 'linear-gradient(to right, #72B4FF, #E91E8C)' }}
                    />
                  </motion.div>
                ))}
                
                {(!menuItems[activeCategory] || menuItems[activeCategory].length === 0) && (
                  <div className="col-span-full py-16 text-center text-[#64748B] font-light">
                    {isAr ? 'لا يوجد منتجات في هذا القسم حالياً.' : 'No products in this category yet.'}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
