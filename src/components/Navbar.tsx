'use client';

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#commissions', label: 'Commissions' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const shouldReduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Shrink calculations (64px -> 52px, color transitions #2d2926 -> #1a1612)
  const isShrunk = scrollY > 40;
  const navbarHeight = isShrunk ? '52px' : '64px';
  const navbarBg = isShrunk ? '#1a1612' : '#2d2926';

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Trigger active link change when section center crosses viewport center
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navLinks.forEach((link) => {
      const id = link.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    closeMenu();
    const element = document.getElementById('commissions');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      style={{
        height: navbarHeight,
        backgroundColor: navbarBg,
      }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full flex items-center shadow-lg border-b border-white/[0.04]"
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-12 w-full">
        
        {/* Gallery / Editorial styled Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('home');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="text-xl md:text-2xl font-serif tracking-widest text-[#f5f0e8] hover:text-[#c9a96e] transition-colors duration-300"
        >
          RICH ZENZI ART
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isLinkActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative text-xs font-sans font-medium tracking-[0.18em] uppercase text-[#f5f0e8] hover:text-[#c9a96e] transition-colors duration-200 py-2 group"
              >
                {link.label}
                {/* Active Link / Hover sweep-in underline */}
                <span
                  style={{ transformOrigin: 'left' }}
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-[#c9a96e] transition-transform duration-300 ease-[0.4,0,0.2,1] ${
                    isLinkActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  style-override="" // to satisfy TS/React compile
                  {...({
                    style: {
                      transformOrigin: 'left',
                      transform: isLinkActive ? 'scaleX(1)' : 'scaleX(0)',
                    }
                  } as any)}
                />
              </a>
            );
          })}
        </nav>

        {/* CTA and Mobile Toggle Wrapper */}
        <div className="flex items-center space-x-6">
          
          {/* Solid Gold CTA Button */}
          <motion.button
            onClick={handleCtaClick}
            whileHover={
              shouldReduceMotion
                ? {}
                : { y: -2, backgroundColor: '#e8d5a3', letterSpacing: '0.14em' }
            }
            whileTap={shouldReduceMotion ? {} : { y: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="hidden sm:inline-block px-5 py-2 text-xs font-sans font-bold tracking-[0.1em] uppercase bg-[#c9a96e] text-[#2d2926] shadow-md cursor-pointer border-0"
          >
            Commission me
          </motion.button>

          {/* Mobile hamburger menu toggle */}
          <button
            className="xl:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className="w-[22px] h-[1.5px] bg-[#f5f0e8] transition-all duration-300"
              style={{
                transform: isMenuOpen ? 'rotate(45deg) translateY(4.5px)' : 'translateY(-4px)'
              }}
            />
            <span
              className="w-[22px] h-[1.5px] bg-[#f5f0e8] transition-all duration-300 my-[3px]"
              style={{
                opacity: isMenuOpen ? 0 : 1
              }}
            />
            <span
              className="w-[22px] h-[1.5px] bg-[#f5f0e8] transition-all duration-300"
              style={{
                transform: isMenuOpen ? 'rotate(-45deg) translateY(-4.5px)' : 'translateY(4px)'
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="absolute top-full left-0 right-0 overflow-hidden bg-[#1a1612] border-t border-white/[0.04] xl:hidden z-40"
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col space-y-4">
          {navLinks.map((link) => {
            const isLinkActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`py-3 text-sm font-sans font-medium tracking-[0.15em] uppercase border-b border-white/[0.04] transition-all duration-300 pl-0 hover:pl-3 cursor-pointer ${
                  isLinkActive ? 'text-[#c9a96e]' : 'text-[#f5f0e8] hover:text-[#c9a96e]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <button
            onClick={handleCtaClick}
            className="w-full py-4 mt-2 text-center text-sm font-sans font-bold tracking-[0.12em] uppercase bg-[#c9a96e] text-[#2d2926] hover:bg-[#e8d5a3] cursor-pointer transition-colors duration-200"
          >
            Commission me
          </button>
        </nav>
      </motion.div>

      {/* Dark overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 -z-10 xl:hidden"
          onClick={closeMenu}
        />
      )}
    </motion.header>
  );
}
