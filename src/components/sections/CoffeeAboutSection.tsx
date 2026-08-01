'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function CoffeeAboutSection() {
  const { t, isAr } = useI18n();
  const a = t.about;

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFeedbackText('');
    }, 1500);
  };

  const stats = [
    { value: '50+', label: a.stat1Label },
    { value: '80+', label: a.stat2Label },
    { value: '20+', label: a.stat3Label },
  ];

  return (
    <section
      id="about-section"
      className="py-20 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-transparent relative overflow-hidden border-t border-[#1E2230]/40"
    >
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#E91E8C]/4 blur-[110px] md:blur-[130px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#72B4FF]/4 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: About copy */}
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

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {stats.map((s, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#0E0E12] border border-[#1E2230] text-center group hover:border-[#A66DDB]/30 transition-colors">
                  <p
                    className="font-sans font-black vega-gradient"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#64748B] font-light mt-1 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#contact-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-medium text-sm text-[#F8FAFC] cursor-pointer transition-all active:scale-95"
              style={{ background: 'linear-gradient(135deg, #72B4FF22, #E91E8C22)', border: '1px solid rgba(166,109,219,0.4)' }}
            >
              {a.cta}
            </a>
          </motion.div>

          {/* Right: Feedback widget */}
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
                    className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
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
                        placeholder={isAr ? 'اكتب رسالتك هنا...' : 'Write a message to the admin...'}
                        className="w-full bg-[#0E0E12] border border-[#1E2230] rounded-xl px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#64748B]/40 focus:border-[#A66DDB]/40 focus:outline-none transition-colors resize-none font-light"
                      />
                    </div>

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
                        {isAr ? `تم إرسال تقييمك بـ ${rating} نجوم.` : `Your ${rating}-star feedback was sent.`}
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
    </section>
  );
}
