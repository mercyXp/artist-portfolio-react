'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { ArrowRight } from 'lucide-react';

function AboutMe() {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className={`py-16 px-6 transition-colors duration-300 ${
        isDark
          ? 'bg-gray-900 text-gray-100'
          : 'bg-[var(--bg-color)] text-[var(--text-color)]'
      } min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] lg:min-h-[90vh] flex items-center`}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src="/images/avatar.jpg"
            alt="Richard Munzenzi"
            className="w-48 h-48 rounded-full border-4 border-[var(--primary-bg)] object-cover shadow-lg transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Text Info */}
        <div className="flex-1">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4"
            style={{ color: isDark ? '#f5f5f5' : 'var(--text-color)' }}
          >
            About Me
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed mb-6 ${
              isDark ? 'text-gray-300' : 'text-[var(--muted-text-color)]'
            }`}
          >
            Hi! I'm Richard Munzenzi, a passionate artist capturing the beauty of
            life through sketches, illustrations, and vibrant artwork. Each piece
            tells a story, blending emotion with creativity. Dive into my portfolio
            to explore a world where imagination meets expression.
          </p>

          {/* Read More Button */}
          <button
            className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-colors duration-300 ${
              isDark
                ? 'bg-[var(--primary-bg)] text-white hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)]'
                : 'bg-[var(--primary-bg)] text-white hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)]'
            }`}
          >
            Read More <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
