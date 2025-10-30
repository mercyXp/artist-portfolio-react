'use client';

import { useState } from 'react';
import ThemeToggleButton from '@/components/ThemeToggleButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#catalogue', label: 'Catalogue' },
    { href: '#commissions', label: 'Commissions' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[var(--primary-bg)] text-[var(--primary-text)] shadow-md transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-serif tracking-wide text-[var(--primary-text)]">
          Rich Zenzi Art
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[var(--accent-text)] transition-colors duration-300"
            >
              | {link.label} |
            </a>
          ))}
        </nav>

        {/* Right side - Theme Toggle and Hamburger */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <div className="ml-4">
            <ThemeToggleButton />
          </div>

          {/* Hamburger Menu Button - Mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-[var(--primary-text)] transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[var(--primary-text)] transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[var(--primary-text)] transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden bg-[var(--primary-bg)] border-t border-[var(--border-color)] transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 text-lg hover:text-[var(--accent-text)] transition-colors duration-300 border-b border-[var(--border-color)]"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}
    </header>
  );
};

export default Header;