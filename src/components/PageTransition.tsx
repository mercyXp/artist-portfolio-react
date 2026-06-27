'use client';

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Cubic bezier array cast to 'any' or parsed explicitly to avoid Framer Motion type check failures
const easeCinematic: any = [0.76, 0, 0.24, 1];

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <>
      {/* Curtain Overlay */}
      <motion.div
        className="fixed inset-0 bg-[#c9a96e] z-[100] origin-left pointer-events-none"
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0],
          originX: ["left", "left", "right", "right"] as any
        }}
        transition={{
          duration: 0.9,
          ease: easeCinematic,
          times: [0, 0.45, 0.46, 0.9],
        }}
      />

      {/* Content Fade in after half duration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.45,
          duration: 0.3,
          ease: "linear"
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
