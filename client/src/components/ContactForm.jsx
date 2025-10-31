import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const ContactForm = () => {
  const { isDark } = useTheme();

  return (
    <section 
      className="w-full py-20 px-6 md:px-20 transition-colors duration-300"
      style={{ 
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-serif font-bold mb-2 transition-colors duration-300"
            style={{ color: 'var(--text-color)' }}
          >
            Get in Touch
          </h2>
          <p 
            className="text-base md:text-lg transition-colors duration-300"
            style={{ color: 'var(--muted-text-color)' }}
          >
            Have a question or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        {/* Form Card */}
        <div 
          className="p-8 md:p-12 rounded-lg shadow-lg transition-colors duration-300 card"
          style={{ 
            backgroundColor: 'var(--card-bg)',
            color: 'var(--card-text)'
          }}
        >
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label 
                className="block mb-1 font-semibold transition-colors duration-300"
                style={{ color: 'var(--text-color)' }}
                htmlFor="name"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="rounded-md p-3 w-full focus:outline-none transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--input-text)',
                  border: '1px solid var(--input-border)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--input-focus-border)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--input-border)';
                }}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label 
                className="block mb-1 font-semibold transition-colors duration-300"
                style={{ color: 'var(--text-color)' }}
                htmlFor="email"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                className="rounded-md p-3 w-full focus:outline-none transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--input-text)',
                  border: '1px solid var(--input-border)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--input-focus-border)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--input-border)';
                }}
                required
              />
            </div>

            {/* Subject */}
            <div>
              <label 
                className="block mb-1 font-semibold transition-colors duration-300"
                style={{ color: 'var(--text-color)' }}
                htmlFor="subject"
              >
                Subject (Optional)
              </label>
              <input
                type="text"
                id="subject"
                placeholder="What's this about?"
                className="rounded-md p-3 w-full focus:outline-none transition-colors duration-300"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--input-text)',
                  border: '1px solid var(--input-border)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--input-focus-border)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--input-border)';
                }}
              />
            </div>

            {/* Message */}
            <div>
              <label 
                className="block mb-1 font-semibold transition-colors duration-300"
                style={{ color: 'var(--text-color)' }}
                htmlFor="message"
              >
                Message *
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your message..."
                className="rounded-md p-3 w-full focus:outline-none transition-colors duration-300 resize-vertical"
                style={{
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--input-text)',
                  border: '1px solid var(--input-border)',
                  resize: 'vertical',
                  minHeight: '120px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--input-focus-border)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--input-border)';
                }}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="font-semibold px-8 py-4 rounded-md transition-all duration-300 hover:scale-105 transform"
              style={{
                backgroundColor: 'var(--primary-bg)',
                color: 'var(--primary-text)',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--accent-bg)';
                e.target.style.color = 'var(--accent-text)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--primary-bg)';
                e.target.style.color = 'var(--primary-text)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;