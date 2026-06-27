'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function ContactForm() {
  const shouldReduceMotion = useReducedMotion();
  const boxReveal = useScrollReveal({ threshold: 0.1 });

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Status State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    if (!name || !email || !message) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([{ name, email, subject: subject || null, message }]);

      if (dbError) throw new Error(dbError.message);

      setSuccess("Your message was sent successfully! Richard will be in touch soon.");
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.error('Contact error:', err);
      setError(err.message || 'Something went wrong while sending. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 bg-[#2d2926] text-[#f5f0e8] border-b border-[#c9a96e]/10 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-3 block">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Contact
          </h2>
          <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mt-4 mb-6"></div>
          <p className="text-sm sm:text-base leading-relaxed text-[#f5f0e8]/75 font-sans font-light">
            Have a question, feedback, or want to discuss a specific canvas idea? Reach out directly via the ledger below.
          </p>
        </div>

        {/* Card containing Form with scroll reveal */}
        <motion.div
          ref={boxReveal.ref}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion || boxReveal.hasRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-2xl mx-auto p-8 md:p-12 border border-[#c9a96e]/15 bg-[#1a1612] shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="p-4 rounded-none bg-[#c9a96e]/10 border border-[#c9a96e]/30 text-white font-medium text-xs tracking-wide">
                {success}
              </div>
            )}
            {error && (
              <div className="p-4 rounded-none bg-red-500/10 border border-red-500/20 text-red-400 font-medium text-xs tracking-wide">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#f5f0e8]/75">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="p-3 w-full focus:outline-none bg-white/[0.04] focus:bg-white/[0.08] text-sm tracking-wide text-white placeholder-[#f5f0e8]/30 border border-[#c9a96e]/15 transition-all duration-300 rounded-none focus:border-[#c9a96e]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#f5f0e8]/75">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="p-3 w-full focus:outline-none bg-white/[0.04] focus:bg-white/[0.08] text-sm tracking-wide text-white placeholder-[#f5f0e8]/30 border border-[#c9a96e]/15 transition-all duration-300 rounded-none focus:border-[#c9a96e]"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#f5f0e8]/75">
                Subject (Optional)
              </label>
              <input
                type="text"
                id="subject"
                disabled={loading}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="What's this about?"
                className="p-3 w-full focus:outline-none bg-white/[0.04] focus:bg-white/[0.08] text-sm tracking-wide text-white placeholder-[#f5f0e8]/30 border border-[#c9a96e]/15 transition-all duration-300 rounded-none focus:border-[#c9a96e]"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block mb-1.5 font-sans font-bold text-[10px] tracking-widest uppercase text-[#f5f0e8]/75">
                Message *
              </label>
              <textarea
                id="message"
                rows={5}
                required
                disabled={loading}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
                className="p-3 w-full focus:outline-none resize-vertical bg-white/[0.04] focus:bg-white/[0.08] text-sm tracking-wide text-white placeholder-[#f5f0e8]/30 border border-[#c9a96e]/15 transition-all duration-300 rounded-none focus:border-[#c9a96e] min-h-[140px]"
              />
            </div>

            {/* Solid Gold button with explicit Motion tokens */}
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
              className="w-full font-bold text-xs tracking-[0.1em] uppercase px-8 py-4 bg-[#c9a96e] text-[#2d2926] cursor-pointer shadow-md border-0"
            >
              {loading ? 'Sending Message...' : 'Send Message'}
            </motion.button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
