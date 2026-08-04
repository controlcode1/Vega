'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle2, MessageSquare, X, ChevronRight, User } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

interface FeedbackEntry {
  id: string;
  name: string;
  text: string;
  rating: number;
  createdAt: string;
}

function StarRow({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const cls = size === 'md' ? 'w-3.5 h-3.5' : 'w-3 h-3';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${cls} transition-colors ${
            n <= rating ? 'fill-[#A66DDB] text-[#A66DDB]' : 'text-[#1E2230] fill-transparent'
          }`}
        />
      ))}
    </div>
  );
}

export default function CoffeeAboutSection() {
  const { t, isAr } = useI18n();
  const a = t.about;

  // ── Form state ──
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ── Public approved testimonials ──
  const [testimonials, setTestimonials] = useState<FeedbackEntry[]>([]);
  const [showModal, setShowModal] = useState(false);

  const loadTestimonials = useCallback(async () => {
    try {
      const res = await fetch('/api/feedback', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data.feedback || []);
      }
    } catch { /* silently fail */ }
  }, []);

  useEffect(() => { loadTestimonials(); }, [loadTestimonials]);

  useEffect(() => {
    if (!showModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim() || !name.trim()) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), text: feedbackText.trim(), rating }),
      });
      if (!res.ok) {
        const d = await res.json();
        setSubmitError(d.error || 'Error sending feedback');
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setFeedbackText('');
    } catch {
      setSubmitError(isAr ? 'خطأ في الاتصال بالخادم' : 'Connection error, try again');
      setIsSubmitting(false);
    }
  };

  // Preview: 4 most-recent approved (displayed in 2×2 grid)
  const preview = testimonials.slice(0, 4);

  return (
    <section
      id="about-section"
      className="py-20 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-transparent relative overflow-hidden border-t border-[#1E2230]/40"
    >
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#E91E8C]/4 blur-[110px] md:blur-[130px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#72B4FF]/4 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Left: About copy + Testimonials ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-[#A66DDB] font-medium">
              {a.badge}
            </span>

            <h2
              className="font-sans font-black leading-tight text-[#F8FAFC]"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
            >
              {a.title.split('\n').map((line, i) => (
                <span key={i}>
                  {i === 0 ? <span className="vega-gradient">{line}</span> : line}
                  {i < a.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>

            <p className="text-[#64748B] font-sans font-light leading-relaxed text-sm sm:text-base max-w-xl">
              {a.body}
            </p>

            {/* ── Testimonials header ── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#F8FAFC]/30 font-medium flex items-center gap-1.5">
                  <MessageSquare className="w-3 h-3" />
                  {isAr ? 'آراء الزوار' : 'Visitor Feedback'}
                </span>
                {testimonials.length > 0 && (
                  <span className="text-[10px] text-[#A66DDB] bg-[#A66DDB]/10 px-2 py-0.5 rounded-full border border-[#A66DDB]/20">
                    {testimonials.length} {isAr ? 'تقييم' : 'reviews'}
                  </span>
                )}
              </div>

              {preview.length === 0 ? (
                <div className="p-5 rounded-2xl bg-[#0E0E12] border border-[#1E2230] text-center text-[#64748B] text-xs font-light">
                  {isAr ? 'لا يوجد تقييمات معتمدة بعد.' : 'No approved reviews yet — be the first!'}
                </div>
              ) : (
                /* 2-column grid of compact cards */
                <div className="grid grid-cols-2 gap-2.5">
                  {preview.map((fb, i) => (
                    <motion.div
                      key={fb.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="p-3.5 rounded-xl bg-[#0E0E12] border border-[#1E2230] hover:border-[#A66DDB]/30 transition-colors"
                    >
                      <StarRow rating={fb.rating} />
                      <p className="text-[11px] font-semibold text-[#A66DDB] mt-2 truncate">
                        {fb.name}
                      </p>
                      <p className="text-[11px] text-[#F8FAFC]/70 font-light mt-0.5 leading-relaxed line-clamp-2">
                        {fb.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* View Full Feedback button */}
              {testimonials.length > 0 && (
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-medium text-sm text-[#F8FAFC] cursor-pointer transition-all active:scale-95 group"
                  style={{ background: 'linear-gradient(135deg, #72B4FF22, #E91E8C22)', border: '1px solid rgba(166,109,219,0.4)' }}
                >
                  {isAr ? 'عرض جميع التقييمات' : 'View Full Feedback'}
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </motion.div>

          {/* ── Right: Feedback form ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="glass border-[#F8FAFC]/5 p-6 sm:p-8 rounded-3xl shadow-2xl overflow-hidden relative vega-glow">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#A66DDB]/6 rounded-full blur-2xl" />

              <h3 className="text-base sm:text-lg font-sans font-medium text-[#F8FAFC] mb-1">
                {isAr ? 'أرسل تقييمك' : 'Send Feedback'}
              </h3>
              <p className="text-xs text-[#64748B] font-light mb-6">
                {isAr ? 'رسالتك تصل مباشرة إلى لوحة الإدارة.' : 'Your message goes directly to our admin dashboard.'}
              </p>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="feedback-form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    {/* Name field */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#F8FAFC]/40 mb-2 font-medium">
                        {isAr ? 'الاسم' : 'Your Name'}
                      </label>
                      <div className="relative">
                        <User className="absolute top-1/2 -translate-y-1/2 start-3 w-3.5 h-3.5 text-[#64748B]" />
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={isAr ? 'اكتب اسمك...' : 'Enter your name...'}
                          className="w-full bg-[#0E0E12] border border-[#1E2230] rounded-xl ps-9 pe-4 py-2.5 text-sm text-[#F8FAFC] placeholder-[#64748B]/40 focus:border-[#A66DDB]/40 focus:outline-none transition-colors font-light"
                        />
                      </div>
                    </div>

                    {/* Star rating */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#F8FAFC]/40 mb-2 font-medium">
                        {isAr ? 'التقييم' : 'Rating'}
                      </label>
                      <div className="flex gap-1.5 sm:gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setRating(num)}
                            onMouseEnter={() => setHoverRating(num)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="outline-none transition-transform duration-100 hover:scale-125 cursor-pointer p-0.5"
                          >
                            <Star
                              className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                                num <= (hoverRating || rating)
                                  ? 'fill-[#A66DDB] text-[#A66DDB]'
                                  : 'text-[#1E2230] fill-transparent'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#F8FAFC]/40 mb-2 font-medium">
                        {isAr ? 'رسالتك' : 'Your Message'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Write your feedback...'}
                        className="w-full bg-[#0E0E12] border border-[#1E2230] rounded-xl px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#64748B]/40 focus:border-[#A66DDB]/40 focus:outline-none transition-colors resize-none font-light"
                      />
                    </div>

                    {submitError && (
                      <p className="text-xs text-red-400 bg-red-950/20 border border-red-500/20 rounded-lg px-3 py-2">
                        {submitError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-sans font-medium text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer active:scale-95 transition-all"
                      style={{ background: 'linear-gradient(135deg, #72B4FF, #A66DDB, #E91E8C)' }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {isAr ? 'يُرسل...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          {isAr ? 'إرسال' : 'Send to Admin'}
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#A66DDB]/15 flex items-center justify-center text-[#A66DDB] border border-[#A66DDB]/30">
                      <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-sans font-medium text-[#F8FAFC]">
                        {isAr ? 'تم الإرسال!' : 'Message Sent'}
                      </h4>
                      <p className="text-xs text-[#64748B] font-light mt-1 max-w-[240px] mx-auto">
                        {isAr
                          ? `شكراً ${name}! سيظهر تقييمك بعد موافقة الإدارة.`
                          : `Thanks ${name}! Your feedback will appear after admin approval.`}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-[#F8FAFC]/40 hover:text-[#A66DDB] cursor-pointer font-light transition-colors"
                    >
                      {isAr ? 'إرسال رسالة أخرى' : 'Send another message'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Full Feedback Modal ── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />

            <motion.div
              className="relative z-10 w-full max-w-2xl max-h-[80vh] flex flex-col rounded-3xl border border-[#1E2230] shadow-2xl overflow-hidden"
              style={{ background: 'linear-gradient(145deg, rgba(14,14,20,0.97) 0%, rgba(8,8,12,0.99) 100%)' }}
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#1E2230]">
                <div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#A66DDB]" />
                    <h3 className="font-sans font-bold text-base text-[#F8FAFC]">
                      {isAr ? 'جميع التقييمات' : 'All Feedback'}
                    </h3>
                  </div>
                  <p className="text-[10px] text-[#64748B] mt-0.5 font-light">
                    {testimonials.length} {isAr ? 'تقييم معتمد' : 'approved reviews'}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full border border-[#1E2230] flex items-center justify-center text-[#64748B] hover:text-[#F8FAFC] hover:border-[#A66DDB]/40 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 2-col scrollable grid */}
              <div className="overflow-y-auto flex-1 p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {testimonials.map((fb, i) => (
                    <motion.div
                      key={fb.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="p-4 rounded-2xl bg-[#0E0E12] border border-[#1E2230] hover:border-[#A66DDB]/20 transition-colors flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <StarRow rating={fb.rating} size="md" />
                        <span className="text-[9px] text-[#64748B] font-light font-mono">
                          {new Date(fb.createdAt).toLocaleDateString(isAr ? 'ar-IQ' : 'en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-[#A66DDB]">{fb.name}</p>
                      <p className="text-xs text-[#F8FAFC]/75 font-light leading-relaxed">
                        {fb.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
