'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { FaArrowRight } from 'react-icons/fa';
import AvatarImg from '/public/images/avatar.jpg'; // Replace with your avatar image path

const AboutMe = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="about"
      className={`py-16 px-6 transition-colors duration-300 ${
        isDark ? 'bg-[#1a1b26] text-gray-100' : 'bg-[var(--bg-color)] text-[var(--text-color)]'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={AvatarImg}
            alt="Richard Munzenzi"
            className="w-48 h-48 rounded-full border-4 border-pink-500 shadow-lg object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4"
            style={{ color: isDark ? '#f5f5f5' : 'var(--text-color)' }}
          >
            Richard Munzenzi
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed mb-6 ${
              isDark ? 'text-gray-300' : 'text-[var(--muted-text-color)]'
            }`}
          >
            I am a Zambian artist passionate about capturing the essence of human
            emotions through sketches and digital art. My work blends traditional
            techniques with modern expression, creating unique and timeless pieces.
          </p>

          {/* Read More Button */}
          <a
            href="https://www.facebook.com/munzenzirichart"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-6 py-3 font-semibold rounded-full transition-colors duration-300 ${
              isDark
                ? 'bg-pink-500 hover:bg-pink-600 text-white'
                : 'bg-pink-500 hover:bg-pink-600 text-white'
            }`}
          >
            Read More
            <FaArrowRight className="ml-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
