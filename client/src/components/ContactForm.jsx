'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

function ContactForm() {
  const { isDark } = useTheme();

  return (
    <section
      id="contact"
      className={`py-16 px-6 md:px-20 transition-colors duration-300 ${
        isDark ? 'bg-gray-900 text-gray-100' : 'bg-[var(--bg-color)] text-[var(--text-color)]'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
         <h2
            className={`text-4xl md:text-5xl font-serif font-bold mb-4 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            Get in Touch
        </h2>

          <p className={`text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-[var(--muted-text-color)]'}`}>
            Have a question or want a custom piece? Let's bring your ideas to life!
          </p>
        </div>

        {/* Form Card */}
        <div
          className={`p-8 md:p-12 rounded-xl shadow-xl transition-colors duration-300 ${
            isDark ? 'bg-gray-800 text-gray-100' : 'bg-[var(--card-bg)] text-[var(--card-text)]'
          }`}
        >
          <form className="space-y-6">
            {[
              { label: 'Name *', id: 'name', type: 'text', placeholder: 'Your name', required: true },
              { label: 'Email *', id: 'email', type: 'email', placeholder: 'your@email.com', required: true },
              { label: 'Subject (Optional)', id: 'subject', type: 'text', placeholder: "What's this about?", required: false },
            ].map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className={`block mb-1 font-semibold transition-colors duration-300 ${
                    isDark ? 'text-gray-100' : 'text-[var(--text-color)]'
                  }`}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`rounded-lg p-3 w-full focus:outline-none focus:border-[var(--accent-bg)] transition-colors duration-300 border ${
                    isDark ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-[var(--input-bg)] text-[var(--input-text)] border-[var(--input-border)]'
                  }`}
                />
              </div>
            ))}

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className={`block mb-1 font-semibold transition-colors duration-300 ${
                  isDark ? 'text-gray-100' : 'text-[var(--text-color)]'
                }`}
              >
                Message *
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your message..."
                required
                className={`rounded-lg p-3 w-full focus:outline-none focus:border-[var(--accent-bg)] transition-colors duration-300 resize-vertical min-h-[140px] border ${
                  isDark ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-[var(--input-bg)] text-[var(--input-text)] border-[var(--input-border)]'
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full md:w-auto font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isDark
                  ? 'bg-[var(--primary-bg)] text-white hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)]'
                  : 'bg-[var(--primary-bg)] text-white hover:bg-[var(--accent-bg)] hover:text-[var(--accent-text)]'
              }`}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
