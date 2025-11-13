'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const Hero = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef(null);
  const meshRef = useRef(null);

  // Canvas background strokes animation 
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.75;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const strokes = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: Math.random() * 0.5 - 0.25,
      vy: Math.random() * 0.5 - 0.25,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.3,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      strokes.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255,255,255,${s.alpha})`
          : `rgba(200,200,200,${s.alpha})`;
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.vy *= -1;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDark]);

  // Mesh spinner animation 
  useEffect(() => {
    const meshCanvas = meshRef.current;
    const ctx = meshCanvas.getContext('2d');
    let frameId;

    const resizeMesh = () => {
      meshCanvas.width = 200;
      meshCanvas.height = 200;
    };
    resizeMesh();

    const nodes = Array.from({ length: 10 }, () => ({
      x: Math.random() * 200,
      y: Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const drawMesh = () => {
      ctx.clearRect(0, 0, 200, 200);
      nodes.forEach((n, i) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#fff' : '#333';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(n.x - nodes[j].x, n.y - nodes[j].y);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > 200) n.vx *= -1;
        if (n.y < 0 || n.y > 200) n.vy *= -1;
      });

      frameId = requestAnimationFrame(drawMesh);
    };

    drawMesh();
    return () => cancelAnimationFrame(frameId);
  }, [isDark]);

  return (
    <section
      className={`relative w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 border-b-8 ${
        isDark
          ? 'bg-gray-900 text-gray-100 border-gray-600'
          : 'bg-[var(--primary-bg)] text-[var(--primary-text)] border-gray-200'
      }`}
      style={{ minHeight: '75vh' }}
    >
      {/* Canvas background strokes */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* Small mesh spinner */}
      <canvas
        ref={meshRef}
        className="absolute top-8 md:top-12 w-[200px] h-[200px]"
      />

      {/* Hero Content with text animations */}
      <motion.div
        className="z-10 text-center px-4 py-6 max-w-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="font-serif text-white font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Bringing Art to Life <br />
          <motion.span
            className="text-indigo-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Every Stroke Tells a Story
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-4 text-[var(--muted-text-color)] text-base sm:text-lg md:text-xl lg:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          Explore unique artworks and commissions that blend imagination,
          skill, and creativity. Your next masterpiece starts here.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <button
            className={`font-semibold font-sans px-6 py-3 sm:px-8 sm:py-4 rounded-md transition-all duration-300 transform hover:scale-105 ${
              isDark
                ? 'bg-[var(--primary-bg)] text-white hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)]'
                : 'bg-white text-[var(--primary-bg)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)]'
            }`}
          >
            View Gallery
          </button>
          <button
            className={`font-semibold font-sans px-6 py-3 sm:px-8 sm:py-4 rounded-md transition-all duration-300 transform hover:scale-105 ${
              isDark
                ? 'bg-[var(--primary-bg)] text-white hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)]'
                : 'bg-white text-[var(--primary-bg)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)]'
            }`}
          >
            Commission
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
