'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { useState } from 'react';
import ThemeToggleButton from '@/components/ThemeToggleButton';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#commissions', label: 'Commissions' },
    { href: '#process', label: 'Process' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header
        className={`
          sticky top-0 z-50 w-full flex flex-col items-center justify-center overflow-hidden
          backdrop-blur-md shadow-md transition-all duration-300
          ${
            isDark
              ? 'bg-gray-900 text-gray-100'
              : 'bg-[var(--primary-bg)] text-[var(--primary-text)]'
          }
    `   }

    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <h1
          className={`
            text-2xl md:text-3xl font-serif font-semibold tracking-wide
            transition-colors duration-300
            hover:text-[var(--nav-hover)]
          `}
        >
          Rich Zenzi Art
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative transition-all duration-300 hover:text-[var(--nav-hover)] group"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <ThemeToggleButton />

          {/* Hamburger Menu */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden border-t transition-all duration-500 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } bg-[var(--nav-bg)] text-[var(--nav-text)] border-[var(--input-border)]`}
      >
        <nav className="container mx-auto px-6 py-4 text-center">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-2 text-lg font-medium border-b border-[var(--input-border)] hover:text-[var(--nav-hover)] transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}

export default Header;
