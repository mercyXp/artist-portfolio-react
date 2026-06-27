'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Artwork {
  id?: string;
  src: string;
  title: string;
  description: string;
  duration: string;
}

const fallbackArtworks: Artwork[] = [
  {
    src: "/images/draw-1.jpg",
    title: "The Thinker",
    description: "A study of deep reflection and inner calm.",
    duration: "8 hours",
  },
  {
    src: "/images/draw-2.jpg",
    title: "Soul in Motion",
    description: "Capturing life through dynamic expression.",
    duration: "6 hours",
  },
  {
    src: "/images/draw-8.jpg",
    title: "Silent Whispers",
    description: "An abstract form of serenity and grace.",
    duration: "5 hours",
  },
  {
    src: "/images/draw-3.jpg",
    title: "Urban Mirage",
    description: "A mix of architecture and emotion.",
    duration: "10 hours",
  },
  {
    src: "/images/draw-5.jpg",
    title: "Grace in Lines",
    description: "Every stroke tells a story of patience.",
    duration: "7 hours",
  },
  {
    src: "/images/draw-7.jpg",
    title: "Nature’s Essence",
    description: "Where detail meets tranquility.",
    duration: "4 hours",
  },
];

export default function GalleryGrid() {
  const [artworks, setArtworks] = useState<Artwork[]>(fallbackArtworks);
  const shouldReduceMotion = useReducedMotion();

  // Scroll reveal hook for section headings
  const headerReveal = useScrollReveal({ threshold: 0.1 });
  // Scroll reveal hook for the grid container
  const gridReveal = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    async function fetchArtworks() {
      try {
        const { data, error } = await supabase
          .from('artworks')
          .select('*')
          .order('created_at', { ascending: false });

        if (data && data.length > 0) {
          setArtworks(data);
        }
      } catch (err) {
        console.warn('Could not query artworks. Using offline state:', err);
      }
    }

    fetchArtworks();
  }, []);

  return (
    <section
      id="gallery"
      className="py-24 px-6 md:px-12 bg-[#f5f0e8] text-[#1a1612] border-b border-[#c9a96e]/10 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header with Upward Scroll Reveal */}
        <motion.div
          ref={headerReveal.ref}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion || headerReveal.hasRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-3 block">
            GALLERY / SKETCHBOOK
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2d2926] leading-tight"
          >
            Explore My Work
          </h2>
          <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mt-4 mb-6"></div>
          <p
            className="text-sm sm:text-base leading-relaxed text-[#5a544d] font-sans font-light"
          >
            Every piece below tells a unique story — drawn with passion, precision,
            and purpose. Dive in and experience the art that defines my journey.
          </p>
        </motion.div>

        {/* Artworks Grid - 1px gap grid that looks like framed tiles */}
        <motion.div
          ref={gridReveal.ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[1px] bg-[#c9a96e]/20 p-[1px]"
        >
          {artworks.map((art, index) => {
            return (
              <motion.div
                key={art.id || index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion || gridReveal.hasRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                  delay: shouldReduceMotion ? 0 : index * 0.12, // Stagger children by 120ms
                }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                className="relative overflow-hidden aspect-[3/4] bg-[#e9e2d5] group cursor-pointer"
              >
                <img
                  src={art.src}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(art.title)}`;
                  }}
                />

                {/* Dark Overlay (rgba(26, 22, 18, 0.82)) */}
                <div
                  className="absolute inset-0 bg-[#1a1612]/82 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                >
                  
                  {/* Artwork Title - Playfair Display, 16px, cream */}
                  <motion.h3
                    className="font-serif text-base text-[#f5f0e8] leading-tight mb-2 origin-bottom transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                    style-override=""
                    {...({
                      style: {
                        transitionDelay: shouldReduceMotion ? '0s' : '0.04s',
                      }
                    } as any)}
                  >
                    {art.title}
                  </motion.h3>

                  {/* Description copy (clean, light, staggered) */}
                  <p className="text-xs text-[#f5f0e8]/75 mb-3 font-sans font-light leading-relaxed transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                     style={{ transitionDelay: shouldReduceMotion ? '0s' : '0.08s' }}
                  >
                    {art.description}
                  </p>

                  {/* Time Badge - gold, 11px, uppercase */}
                  <div
                    className="text-[10px] md:text-[11px] font-sans font-bold tracking-widest text-[#c9a96e] uppercase flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                    style={{ transitionDelay: shouldReduceMotion ? '0s' : '0.12s' }}
                  >
                    <span className="text-[9px]">⏱</span> {art.duration}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
