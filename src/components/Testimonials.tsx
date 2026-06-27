'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
}

const items: TestimonialItem[] = [
  {
    quote: "Richard’s art captured my mother’s smile perfectly — it brought tears to our eyes.",
    name: "Chipo M.",
    title: "Lusaka, Zambia",
  },
  {
    quote: "A true master of pencil and soul — his portraits feel alive.",
    name: "Daniel K.",
    title: "Art Collector",
  },
  {
    quote: "Every piece tells a story. You don’t just see it, you feel it.",
    name: "Lina P.",
    title: "Client",
  },
];

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();
  const headerReveal = useScrollReveal({ threshold: 0.1 });
  const gridReveal = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id="testimonials"
      className="py-24 px-6 md:px-12 bg-[#2d2926] text-[#f5f0e8] border-b border-[#c9a96e]/10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          ref={headerReveal.ref}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion || headerReveal.hasRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-3 block">
            COLLECTOR FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            What People Say
          </h2>
          <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mt-4 mb-6"></div>
          <p className="text-sm sm:text-base leading-relaxed text-[#f5f0e8]/75 font-sans font-light">
            Real experiences from people who have bought, collected, or commissioned pieces from my workbench.
          </p>
        </motion.div>

        {/* Testimonials grid cards with staggered scroll reveal */}
        <div ref={gridReveal.ref} className="grid gap-8 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.article
              key={i}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={shouldReduceMotion || gridReveal.hasRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
                delay: shouldReduceMotion ? 0 : i * 0.12,
              }}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
              className="p-8 border border-[#c9a96e]/15 bg-[#1a1612] relative flex flex-col justify-between"
            >
              {/* Elegant Playfair display italic font for quotes */}
              <p className="font-serif italic text-[#f5f0e8]/85 text-base sm:text-lg mb-6 leading-relaxed relative z-10">
                “{t.quote}”
              </p>
              
              <div>
                {/* Divider */}
                <div className="w-8 h-[1px] bg-[#c9a96e]/40 mb-3" />
                <h4 className="font-serif text-sm font-bold tracking-wide text-white">{t.name}</h4>
                <p className="text-[10px] sm:text-xs tracking-wider uppercase text-[#c9a96e] mt-0.5">{t.title}</p>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
