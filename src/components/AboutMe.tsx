'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function AboutMe() {
  const shouldReduceMotion = useReducedMotion();
  
  // Create unique scroll reveal hooks for different elements to enable custom staggering
  const sectionReveal = useScrollReveal({ threshold: 0.15 });

  const handleReadMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const processSection = document.getElementById('process');
    if (processSection) {
      processSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      ref={sectionReveal.ref}
      className="py-12 bg-[#2d2926] border-y border-[#c9a96e]/10 overflow-visible relative z-20"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        
        {/* Floating About Strip */}
        <div className="bg-[#f5f0e8] text-[#1a1612] p-8 md:p-12 shadow-2xl relative -mt-24 mb-6 border border-[#c9a96e]/15 flex flex-col md:flex-row items-center gap-10">
          
          {/* Avatar - Image scroll reveal */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion || sectionReveal.hasRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex-shrink-0"
          >
            <div className="relative w-40 h-48 border border-[#c9a96e] p-1 shadow-md bg-white">
              <img
                src="/images/avatar.jpg"
                alt="Richard Munzenzi"
                className="w-full h-full object-cover grayscale brightness-95"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/initials/svg?seed=Richard%20Munzenzi';
                }}
              />
            </div>
          </motion.div>

          {/* Text Info - Staggered scroll reveal */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            animate={shouldReduceMotion || sectionReveal.hasRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: shouldReduceMotion ? 0 : 0.12 }}
            className="flex-1"
          >
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-2 block">
              THE ARTIST BEHIND THE GRAPHITE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2d2926] mb-4 tracking-wide leading-tight">
              Richard Munzenzi
            </h2>
            
            <p className="text-sm sm:text-base leading-relaxed text-[#5a544d] mb-6 font-sans font-light">
              Hi! I'm Richard Munzenzi, a passionate illustrator capturing the beauty of
              life through sketches, illustrations, and vibrant custom commissions. Each piece
              tells a story, blending emotion with creativity. Dive into my portfolio
              to explore a world where imagination meets expression.
            </p>

            {/* Read More button with explicit Motion tokens */}
            <motion.button
              onClick={handleReadMoreClick}
              whileHover={
                shouldReduceMotion
                  ? {}
                  : { y: -2, borderColor: '#c9a96e', color: '#c9a96e' }
              }
              whileTap={shouldReduceMotion ? {} : { y: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-xs tracking-[0.1em] uppercase border border-[#2d2926] text-[#2d2926] bg-transparent cursor-pointer"
            >
              My Process <ArrowRight size={14} className="text-[#c9a96e]" />
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
