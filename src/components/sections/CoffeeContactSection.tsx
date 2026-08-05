'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Send, Navigation, CheckCircle2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function CoffeeContactSection() {
  const { t, isAr } = useI18n();
  const c = t.contact;

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to send.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(isAr ? 'حدث خطأ أثناء الإرسال. حاول مجدداً.' : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const infoCards = [
    { icon: MapPin, title: c.location, body: c.locationVal },
    { icon: Clock, title: c.hours, body: c.hoursVal },
  ];

  return (
    <section
      id="contact-section"
      className="py-20 md:py-32 px-5 sm:px-8 md:px-12 lg:px-16 bg-transparent relative overflow-hidden border-t border-[#1E2230]/40"
    >
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-[#A66DDB]/3 blur-[110px] md:blur-[130px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] rounded-full bg-[#E91E8C]/3 blur-[90px] -z-10" />

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
            {c.badge}
          </span>
          <h2
            className="font-sans font-black leading-tight mt-3"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}
          >
            <span className="vega-gradient">{c.title}</span>
          </h2>
          <p className="text-[#64748B] font-sans font-light text-sm sm:text-base mt-3 max-w-lg">
            {c.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">

          {/* Left: Info cards + map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {infoCards.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl bg-[#0E0E12] border border-[#1E2230] hover:border-[#A66DDB]/30 transition-colors">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #72B4FF22, #E91E8C22)', border: '1px solid rgba(166,109,219,0.3)' }}>
                  <Icon className="w-4 h-4 text-[#A66DDB]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-sans font-medium text-[#F8FAFC]">{title}</h4>
                  <p className="text-xs text-[#64748B] mt-1 font-light leading-relaxed whitespace-pre-line">{body}</p>
                </div>
              </div>
            ))}

            {/* Mini map - Embedded Google Maps */}
            <div className="relative flex-1 min-h-[220px] rounded-2xl overflow-hidden border border-[#1E2230] h-[250px] lg:h-auto lg:min-h-[250px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d208.39341524888124!2d44.42387799388313!3d33.31111168590754!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1557810002286ad9%3A0x66eff30aeb83b1aa!2z2YLYp9i52Kkg2KfZhNi52KfYqCDZgdmK2KzYpyBWZWdhIGdhbWluZyBhcmVuYQ!5e0!3m2!1sar!2siq!4v1785849096722!5m2!1sar!2siq"
                className="absolute inset-0 w-full h-full border-0 grayscale invert opacity-75 contrast-125"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="glass p-3 rounded-xl flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[#F8FAFC]/40">Vega Gaming Arena</p>
                    <p className="text-xs text-[#F8FAFC] font-medium mt-0.5">{isAr ? 'بغداد، العراق' : 'Baghdad, Iraq'}</p>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/AAeoG4YkCYsFfgfm8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 transition-opacity hover:opacity-80"
                    style={{ background: 'linear-gradient(135deg, #72B4FF, #E91E8C)' }}
                  >
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glass p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl vega-glow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#72B4FF]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#E91E8C]/5 rounded-full blur-3xl" />

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#F8FAFC]/40 mb-2 font-medium">
                        {c.namePlaceholder}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder={c.namePlaceholder}
                        className="w-full bg-[#0E0E12] border border-[#1E2230] rounded-xl px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#64748B]/40 focus:border-[#A66DDB]/40 focus:outline-none transition-colors font-light"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#F8FAFC]/40 mb-2 font-medium">
                        {c.emailPlaceholder}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder={c.emailPlaceholder}
                        className="w-full bg-[#0E0E12] border border-[#1E2230] rounded-xl px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#64748B]/40 focus:border-[#A66DDB]/40 focus:outline-none transition-colors font-light"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#F8FAFC]/40 mb-2 font-medium">
                      {c.msgPlaceholder}
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder={c.msgPlaceholder}
                      className="w-full bg-[#0E0E12] border border-[#1E2230] rounded-xl px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#64748B]/40 focus:border-[#A66DDB]/40 focus:outline-none transition-colors resize-none font-light"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-sans font-semibold text-sm shadow-lg disabled:opacity-50 cursor-pointer active:scale-95 transition-all duration-300 group"
                    style={{ background: 'linear-gradient(135deg, #72B4FF, #A66DDB, #E91E8C)' }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {isAr ? 'يُرسل...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        {c.send}
                      </>
                    )}
                  </button>

                  {/* Error message */}
                  {error && (
                    <p className="text-center text-sm text-[#E91E8C] font-light animate-pulse">
                      {error}
                    </p>
                  )}
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 relative z-10">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #72B4FF22, #E91E8C22)', border: '1px solid rgba(166,109,219,0.4)' }}>
                    <CheckCircle2 className="w-8 h-8 text-[#A66DDB]" />
                  </div>
                  <h4 className="text-lg font-sans font-semibold text-[#F8FAFC]">
                    {isAr ? 'تم الإرسال! 🎮' : 'Message Sent! 🎮'}
                  </h4>
                  <p className="text-sm text-[#64748B] font-light max-w-xs">
                    {isAr ? 'شكراً لتواصلك. سنرد عليك قريباً.' : "We'll get back to you within 24 hours."}
                  </p>
                  <button
                    onClick={() => { setIsSubmitted(false); setForm({ name: '', email: '', message: '' }); }}
                    className="text-xs text-[#A66DDB] hover:text-[#F8FAFC] cursor-pointer font-light transition-colors"
                  >
                    {isAr ? 'إرسال رسالة أخرى' : 'Send another message'}
                  </button>
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
