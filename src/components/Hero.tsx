'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface ParticleStroke {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

interface MeshNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const meshRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Canvas background strokes animation 
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.8;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const strokes: ParticleStroke[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 0.3 - 0.15,
      vy: Math.random() * 0.3 - 0.15,
      size: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.3 + 0.15,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      strokes.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        // Slate-gold soft sparkles blending into warm charcoal background
        ctx.fillStyle = `rgba(201, 169, 110, ${s.alpha})`;
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.vy *= -1;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    if (!shouldReduceMotion) {
      animate();
    } else {
      // Draw flat sparkles once without animation for reduced motion users
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      strokes.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${s.alpha * 0.5})`;
        ctx.fill();
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [shouldReduceMotion]);

  // Mesh spinner animation 
  useEffect(() => {
    const meshCanvas = meshRef.current;
    if (!meshCanvas) return;

    const ctx = meshCanvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;

    const resizeMesh = () => {
      meshCanvas.width = 160;
      meshCanvas.height = 160;
    };
    resizeMesh();

    const nodes: MeshNode[] = Array.from({ length: 9 }, () => ({
      x: Math.random() * 160,
      y: Math.random() * 160,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    const drawMesh = () => {
      ctx.clearRect(0, 0, 160, 160);
      nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 169, 110, 0.45)'; // Soft gold nodes
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(n.x - nodes[j].x, n.y - nodes[j].y);
          if (dist < 50) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = 'rgba(201, 169, 110, 0.12)';
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > 160) n.vx *= -1;
        if (n.y < 0 || n.y > 160) n.vy *= -1;
      });

      frameId = requestAnimationFrame(drawMesh);
    };

    if (!shouldReduceMotion) {
      drawMesh();
    } else {
      // Draw static structure once for reduced motion
      nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(201, 169, 110, 0.2)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(n.x - nodes[j].x, n.y - nodes[j].y);
          if (dist < 50) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = 'rgba(201, 169, 110, 0.06)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
    }

    return () => cancelAnimationFrame(frameId);
  }, [shouldReduceMotion]);

  const scrollToGallery = () => {
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden bg-[#2d2926] text-[#f5f0e8] border-b border-[#c9a96e]/10"
      style={{ minHeight: '80vh' }}
    >
      {/* Canvas background sparkles */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40"
      />

      {/* Centerpiece mesh node network */}
      <canvas
        ref={meshRef}
        className="absolute top-12 sm:top-16 w-[160px] h-[160px] pointer-events-none"
      />

      {/* Hero Content with text animations */}
      <div className="z-10 text-center px-6 py-12 max-w-3xl flex flex-col items-center mt-24">
        
        {/* Section label */}
        <span className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#c9a96e] mb-4">
          PORTFOLIO & ATELIER
        </span>

        <h1
          className="font-serif leading-[1.15] text-4xl sm:text-5xl md:text-6xl text-white tracking-wide"
        >
          Bringing Art to Life
        </h1>
        
        <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#c9a96e] mt-3">
          Every Stroke Tells a Story
        </p>

        <p
          className="mt-6 text-[#f5f0e8]/85 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-sans font-light leading-relaxed"
        >
          Explore a gallery where graphite, charcoal, and patience converge. 
          Step inside to view custom illustrations and request bespoke drawings.
        </p>

        {/* Buttons styled with specific Motion Tokens */}
        <div className="flex flex-wrap justify-center gap-5 mt-10">
          
          <motion.button
            onClick={scrollToGallery}
            whileHover={
              shouldReduceMotion
                ? {}
                : { y: -2, borderColor: '#c9a96e', color: '#2d2926', backgroundColor: '#c9a96e' }
            }
            whileTap={shouldReduceMotion ? {} : { y: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="font-semibold text-xs tracking-[0.14em] uppercase px-8 py-3.5 border border-[#c9a96e]/40 bg-transparent text-[#f5f0e8] cursor-pointer"
          >
            View Gallery
          </motion.button>

          <motion.button
            onClick={() => {
              const el = document.getElementById('commissions');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={
              shouldReduceMotion
                ? {}
                : { y: -2, backgroundColor: '#e8d5a3', letterSpacing: '0.14em' }
            }
            whileTap={shouldReduceMotion ? {} : { y: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="font-bold text-xs tracking-[0.1em] uppercase px-8 py-3.5 bg-[#c9a96e] text-[#2d2926] cursor-pointer border-0"
          >
            Commission
          </motion.button>

        </div>
      </div>
    </section>
  );
}
