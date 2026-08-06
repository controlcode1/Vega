'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ShieldAlert,
  X,
  Coffee,
  Zap,
  Gamepad2,
  ShoppingBag,
  Sparkles,
  Utensils,
  CupSoda,
  Flame,
  Star,
  Package,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Category, MenuItem } from '@/lib/db';

// Specific icon mapping to avoid importing the entire 1000+ lucide icon library
const ICON_MAP: Record<string, React.ElementType> = {
  Coffee,
  Zap,
  Gamepad2,
  ShoppingBag,
  Sparkles,
  Utensils,
  CupSoda,
  Flame,
  Star,
  Package,
};

const getIconComponent = (iconName: string) => {
  return ICON_MAP[iconName] || Coffee;
};

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<Record<string, MenuItem[]>>({});
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { isAr } = useI18n();

  useEffect(() => {
    let isMounted = true;
    async function loadMenu() {
      try {
        const res = await fetch(`/api/menu?_t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch menu');
        const data = await res.json();
        
        if (!isMounted) return;

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
        if (isMounted) setLoading(false);
      }
    }
    
    loadMenu();
    return () => { isMounted = false; };
  }, []);

  // Close modal on Escape key
  const closeModal = useCallback(() => setSelectedItem(null), []);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [closeModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedItem]);

  const getCatName = (cat: Category) =>
    isAr ? cat.nameAr : cat.nameEn;

  return (
    <>
      <Navbar />

      {/* ── Product Modal ── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] flex items-center justify-center px-4"
            style={{ background: 'rgba(7, 7, 8, 0.88)' }}
            onClick={closeModal}
          >
            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-[#1E2230] shadow-2xl transform-gpu"
              style={{ background: 'linear-gradient(160deg, #0E0E12 0%, #12141C 100%)' }}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center border border-[#1E2230] bg-[#0E0E12]/80 text-[#64748B] hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Image */}
              <div className="relative w-full aspect-[4/3] bg-[#121217]">
                <Image
                  src={selectedItem.image}
                  alt={isAr ? selectedItem.nameAr : selectedItem.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-[#0E0E12]/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  {selectedItem.tag && (
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: 'linear-gradient(135deg, #72B4FF, #A66DDB)', color: '#fff' }}
                    >
                      {isAr && selectedItem.tagAr ? selectedItem.tagAr : selectedItem.tag}
                    </span>
                  )}
                  {selectedItem.badge && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#E91E8C]/20 text-[#E91E8C] border border-[#E91E8C]/30">
                      {selectedItem.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 space-y-3" dir={isAr ? 'rtl' : 'ltr'}>
                {/* Name + Price row */}
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-sans font-bold text-lg text-[#F8FAFC] leading-snug flex-1">
                    {isAr ? selectedItem.nameAr : selectedItem.name}
                  </h2>
                  <span
                    className="font-sans font-black text-xl shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #72B4FF, #E91E8C)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {selectedItem.price}
                  </span>
                </div>

                {/* Description */}
                {(isAr ? selectedItem.descriptionAr : selectedItem.description) && (
                  <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
                    {isAr ? selectedItem.descriptionAr : selectedItem.description}
                  </p>
                )}

                {/* Bottom gradient line */}
                <div
                  className="h-px w-full mt-4"
                  style={{ background: 'linear-gradient(to right, #72B4FF, #A66DDB, #E91E8C)' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-h-screen bg-[#070708] relative text-[#F8FAFC] overflow-hidden">
        {/* Optimized GPU Background glows */}
        <div className="absolute top-[30vh] left-[-10vw] w-[500px] h-[500px] rounded-full bg-[#72B4FF]/5 blur-[80px] -z-10 pointer-events-none transform-gpu" />
        <div className="absolute bottom-[20vh] right-[-10vw] w-[400px] h-[400px] rounded-full bg-[#E91E8C]/4 blur-[80px] -z-10 pointer-events-none transform-gpu" />

        {/* ── Hero Cover ── */}
        <div className="relative w-full h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden border-b border-[#1E2230]">
          <Image
            src="/ca4f1475ff5f22a651500f4bdf7b1509.jpg"
            alt="Vega Gaming Arena Menu"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top transform-gpu"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/50 to-transparent" />

          <div className="relative z-10 text-center px-6 max-w-3xl space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-sans font-black tracking-tight"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
            >
              <span className="text-[#F8FAFC] drop-shadow-lg">
                {isAr ? 'القائمة' : 'THE MENU'}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-white border-transparent shadow-lg scale-105'
                        : 'bg-[#0E0E12]/80 text-[#64748B] border-[#1E2230] hover:text-[#F8FAFC] hover:bg-[#12141C]/50'
                    }`}
                    style={isActive ? {
                      background: 'linear-gradient(135deg, #72B4FF, #A66DDB, #E91E8C)',
                      boxShadow: '0 4px 20px rgba(166,109,219,0.35)'
                    } : {}}
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
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
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6"
            >
              {menuItems[activeCategory]?.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col rounded-2xl bg-[#0E0E12] border border-[#1E2230] hover:border-[#A66DDB]/40 transition-all duration-200 overflow-hidden shadow-lg hover:shadow-[0_8px_30px_rgba(166,109,219,0.12)] transform-gpu cursor-pointer active:scale-[0.98]"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* ── Image ── */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#121217]">
                    <Image
                      src={item.image}
                      alt={isAr ? item.nameAr : item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105 transform-gpu"
                      loading="lazy"
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

                    {/* Description — hidden on mobile (shown in modal on tap) */}
                    <p className="text-[10px] sm:text-[11px] md:text-xs text-[#64748B] font-light leading-relaxed flex-1 hidden sm:block">
                      {isAr ? item.descriptionAr : item.description}
                    </p>

                    {/* Mobile tap hint */}
                    <p className="text-[9px] text-[#A66DDB]/60 font-light sm:hidden mt-0.5">
                      {isAr ? 'اضغط للتفاصيل' : 'Tap for details'}
                    </p>
                  </div>

                  {/* Bottom gradient line */}
                  <div
                    className="h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(to right, #72B4FF, #E91E8C)' }}
                  />
                </div>
              ))}
              
              {(!menuItems[activeCategory] || menuItems[activeCategory].length === 0) && (
                <div className="col-span-full py-16 text-center text-[#64748B] font-light">
                  {isAr ? 'لا يوجد منتجات في هذا القسم حالياً.' : 'No products in this category yet.'}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
