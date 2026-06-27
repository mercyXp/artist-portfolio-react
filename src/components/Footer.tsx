'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { FaEnvelope, FaInstagram, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className="w-full py-16 px-6 md:px-12 bg-[#1a1612] text-[#f5f0e8] border-t border-white/[0.03] overflow-hidden"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-white/[0.04] pb-10">
        
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-xl font-serif font-semibold tracking-widest text-[#c9a96e] mb-3">
            RICH ZENZI ART
          </h2>
          <p className="text-xs sm:text-sm text-[#f5f0e8]/70 max-w-xs font-sans font-light leading-relaxed">
            Timeless portraits and raw sketchbook illustrations capturing the beauty and essence of the human spirit.
          </p>
        </div>

        {/* Middle Section */}
        <div className="flex-1">
          <h3 className="font-serif text-sm font-bold text-white mb-3 tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm font-sans font-light">
            <li>
              <a href="#home" className="text-[#f5f0e8]/80 hover:text-[#c9a96e] transition-colors duration-200 tracking-wider">
                Home
              </a>
            </li>
            <li>
              <a href="#gallery" className="text-[#f5f0e8]/80 hover:text-[#c9a96e] transition-colors duration-200 tracking-wider">
                Gallery
              </a>
            </li>
            <li>
              <a href="#commissions" className="text-[#f5f0e8]/80 hover:text-[#c9a96e] transition-colors duration-200 tracking-wider">
                Commissions
              </a>
            </li>
            <li>
              <a href="#contact" className="text-[#f5f0e8]/80 hover:text-[#c9a96e] transition-colors duration-200 tracking-wider">
                Contact
              </a>
            </li>
            <li>
              <a href="/admin" className="text-[#f5f0e8]/45 hover:text-[#c9a96e] transition-colors duration-200 tracking-wider italic">
                Studio Admin
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Follow Me */}
          <div>
            <h3 className="font-serif text-sm font-bold text-white mb-3 tracking-wide">
              Follow Me
            </h3>
            <div className="flex gap-3 flex-wrap">
              {[
                { icon: <FaFacebook />, url: "https://www.facebook.com/munzenzirichart", label: "Facebook" },
                { icon: <FaInstagram />, url: "https://www.instagram.com/richzenziart/", label: "Instagram" },
                { icon: <SiTiktok />, url: "https://tiktok.com/@richzenziart", label: "TikTok" },
                { icon: <FaYoutube />, url: "https://www.youtube.com/@richzenziart", label: "YouTube" }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2.5 rounded-none bg-white/[0.04] hover:bg-[#c9a96e] hover:text-[#2d2926] text-[#f5f0e8]/80 transition-all duration-300 transform hover:-translate-y-1 text-sm border border-white/[0.04] cursor-pointer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Me */}
          <div>
            <h3 className="font-serif text-sm font-bold text-white mb-3 tracking-wide">
              Contact Me
            </h3>
            <div className="flex gap-3 flex-wrap">
              <a
                href="mailto:richzenziart@gmail.com"
                aria-label="Email"
                className="p-2.5 rounded-none bg-white/[0.04] hover:bg-[#c9a96e] hover:text-[#2d2926] text-[#f5f0e8]/80 transition-all duration-300 transform hover:-translate-y-1 text-sm border border-white/[0.04] cursor-pointer"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://wa.me/260760741435"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2.5 rounded-none bg-white/[0.04] hover:bg-[#c9a96e] hover:text-[#2d2926] text-[#f5f0e8]/80 transition-all duration-300 transform hover:-translate-y-1 text-sm border border-white/[0.04] cursor-pointer"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

      </div>

      <p className="mt-8 text-center text-xs text-[#f5f0e8]/40 tracking-wider">
        © {new Date().getFullYear()} Rich Zenzi Art | All Rights Reserved.
      </p>
    </footer>
  );
}
