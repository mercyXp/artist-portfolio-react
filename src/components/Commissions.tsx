'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Commissions() {
  const shouldReduceMotion = useReducedMotion();
  const formReveal = useScrollReveal({ threshold: 0.1 });

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');

  // Status State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    if (!name || !email || !details) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const { error: dbError } = await supabase
        .from('commissions')
        .insert([{ name, email, details }]);

      if (dbError) throw new Error(dbError.message);

      setSuccess('Your request was submitted successfully! Richard will contact you via email shortly.');
      setName('');
      setEmail('');
      setDetails('');
    } catch (err: any) {
      console.error('Commission error:', err);
      setError(err.message || 'Something went wrong while submitting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="commissions"
      className="py-24 px-6 md:px-12 bg-[#f5f0e8] text-[#1a1612] border-b border-[#c9a96e]/10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-3 block">
            CUSTOM REQUESTS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2d2926] leading-tight">
            Commissions
          </h2>
          <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mt-4 mb-6"></div>
          <p className="text-sm sm:text-base leading-relaxed text-[#5a544d] font-sans font-light">
            Bring Your Imagination to Life — Custom Art Created Just for You! Whether a graphite portrait or a charcoal composition, request your bespoke sketch below.
          </p>
        </div>

        {/* Form panel with scroll reveal */}
        <motion.div
          ref={formReveal.ref}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion || formReveal.hasRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 md:p-10 border border-[#c9a96e]/20 bg-[#e9e2d5] shadow-sm rounded-none"
          >
            {success && (
              <div className="p-4 rounded-none bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-[#2d2926] font-medium text-xs tracking-wide">
                {success}
              </div>
            )}
            {error && (
              <div className="p-4 rounded-none bg-red-500/10 border border-red-500/20 text-red-700 font-medium text-xs tracking-wide">
                {error}
              </div>
            )}

            <div>
              <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                Name *
              </label>
              <input
                type="text"
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="p-3 w-full focus:outline-none bg-white/40 focus:bg-white text-sm tracking-wide text-[#1a1612] placeholder-[#5a544d]/50 border border-[#c9a96e]/20 transition-all duration-300 rounded-none focus:border-[#c9a96e]"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                Email *
              </label>
              <input
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="p-3 w-full focus:outline-none bg-white/40 focus:bg-white text-sm tracking-wide text-[#1a1612] placeholder-[#5a544d]/50 border border-[#c9a96e]/20 transition-all duration-300 rounded-none focus:border-[#c9a96e]"
              />
            </div>

            <div>
              <label className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#5a544d]">
                Artwork Details *
              </label>
              <textarea
                rows={5}
                required
                disabled={loading}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe your custom artwork request (subject matter, dimensions, style, desired timeline)..."
                className="p-3 w-full focus:outline-none resize-vertical bg-white/40 focus:bg-white text-sm tracking-wide text-[#1a1612] placeholder-[#5a544d]/50 border border-[#c9a96e]/20 transition-all duration-300 rounded-none focus:border-[#c9a96e] min-h-[140px]"
              />
            </div>

            {/* Custom CTA styled with specific Motion Tokens */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : { y: -2, backgroundColor: '#e8d5a3', letterSpacing: '0.14em' }
              }
              whileTap={shouldReduceMotion ? {} : { y: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="w-full md:w-auto font-bold text-xs tracking-[0.1em] uppercase px-8 py-4 bg-[#c9a96e] text-[#2d2926] cursor-pointer shadow-md border-0"
            >
              {loading ? 'Submitting request...' : 'Submit Request'}
            </motion.button>

          </form>
        </motion.div>

      </div>
    </section>
  );
}
