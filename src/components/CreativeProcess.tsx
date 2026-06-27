'use client';

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { supabase } from "@/lib/supabase";

interface StepItem {
  id?: string;
  title: string;
  desc: string;
  videoUrl: string;
}

const fallbackSteps: StepItem[] = [
  {
    title: "Concept & Sketch",
    desc: "Every artwork begins with a pencil sketch.",
    videoUrl: "https://www.youtube.com/embed/LtL1Brf2N2Q?si=5kiaa0iGFafYxGMC",
  },
  {
    title: "Layering & Detailing",
    desc: "Through patience and precision, each stroke adds emotion and life.",
    videoUrl: "https://www.youtube.com/embed/Fa9CNQ_9bk8?si=Phxb5gFSrei5oQ4n",
  },
  {
    title: "Finishing Touches",
    desc: "I bring depth and contrast to complete a story worth framing.",
    videoUrl: "https://www.youtube.com/embed/u3-U0gSWyA4?si=Yu-Vga-nEG2U-M2Q",
  },
];

export default function CreativeProcess() {
  const shouldReduceMotion = useReducedMotion();
  const [steps, setSteps] = useState<StepItem[]>(fallbackSteps);
  const [loading, setLoading] = useState(true);
  
  const headerReveal = useScrollReveal({ threshold: 0.1 });
  const listReveal = useScrollReveal({ threshold: 0.1 });

  useEffect(() => {
    async function fetchSteps() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('process_steps')
          .select('*')
          .order('sort_order', { ascending: true });

        if (data && data.length > 0) {
          // Map DB structure if needed
          const mapped: StepItem[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            desc: item.desc_text || item.desc,
            videoUrl: item.video_url || item.videoUrl,
          }));
          setSteps(mapped);
        }
      } catch (err) {
        console.warn('Could not query process steps. Using offline fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchSteps();
  }, []);

  return (
    <section
      id="process"
      className="py-24 px-6 md:px-12 bg-[#f5f0e8] text-[#1a1612] border-b border-[#c9a96e]/10 overflow-hidden"
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
            HOW CREATION UNFOLDS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#2d2926] leading-tight">
            My Creative Process
          </h2>
          <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mt-4 mb-6"></div>
          <p className="text-sm sm:text-base leading-relaxed text-[#5a544d] font-sans font-light">
            An look inside the studio. From raw graphite drafts to textured, three-dimensional finishes, here is how each sketch comes together.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div ref={listReveal.ref} className="grid md:grid-cols-1 md:max-w-xl md:mx-auto lg:max-w-none lg:grid-cols-3 gap-10">
          {steps.map((s, i) => {
            const numStr = `0${i + 1}`;
            return (
              <motion.div
                key={s.id || i}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                animate={shouldReduceMotion || listReveal.hasRevealed ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0, 0.2, 1],
                  delay: shouldReduceMotion ? 0 : i * 0.12, // Staggered reveal
                }}
                className="relative p-8 rounded-none border border-[#c9a96e]/20 bg-[#e9e2d5] shadow-sm flex flex-col justify-between"
              >
                {/* Visual Anchor: Italic oversized numerals instead of icon circles */}
                <div className="absolute top-0 right-6 font-serif italic text-6xl text-[#c9a96e]/25 font-bold leading-none -translate-y-4 select-none">
                  {numStr}
                </div>

                <div className="mb-6 relative z-10">
                  <h3 className="font-serif text-lg font-bold text-[#2d2926] mb-3 pr-8">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5a544d] font-sans font-light leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Embedded studio timelapses */}
                <div className="relative w-full h-0 pb-[56.25%] overflow-hidden border border-[#c9a96e]/10 bg-black">
                  <iframe
                    src={s.videoUrl}
                    title={s.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0 grayscale brightness-95"
                  ></iframe>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
