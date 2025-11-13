'use client';

import { useTheme } from '@/contexts/ThemeContext';

function Commissions() {
  const { isDark } = useTheme();

  return (
    <section
      id="commissions"
      className={`py-16 px-6 transition-colors duration-300 ${
        isDark
          ? 'bg-gray-900 text-gray-100'
          : 'bg-[var(--bg-color)] text-[var(--text-color)]'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-10 text-center"
          style={{ color: isDark ? '#f5f5f5' : 'var(--text-color)' }}
        >
          Commissions
        </h2>
        <p className="text-lg md:text-xl text-[var(--muted-text-color)] items-center mb-8 text-center">
            Bring Your Imagination to Life — Custom Art Created Just for You!
        </p>
        <form className="space-y-6 p-8 rounded-lg shadow-lg transition-colors duration-300"
          style={{
            backgroundColor: isDark ? 'rgb(31 41 55)' : 'var(--card-bg)',
            color: isDark ? '#f5f5f5' : 'var(--card-text)',
          }}
        >
          <div>
            <label className="block mb-1 font-semibold">Name *</label>
            <input
              type="text"
              placeholder="Your Name"
              className="rounded-md p-3 w-full focus:outline-none"
              style={{
                backgroundColor: isDark ? 'rgb(55 65 81)' : 'var(--input-bg)',
                color: isDark ? '#f5f5f5' : 'var(--input-text)',
                border: '1px solid var(--input-border)',
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email *</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="rounded-md p-3 w-full focus:outline-none"
              style={{
                backgroundColor: isDark ? 'rgb(55 65 81)' : 'var(--input-bg)',
                color: isDark ? '#f5f5f5' : 'var(--input-text)',
                border: '1px solid var(--input-border)',
              }}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Artwork Details *</label>
            <textarea
              rows="5"
              placeholder="Describe your custom artwork request..."
              className="rounded-md p-3 w-full focus:outline-none resize-vertical"
              style={{
                backgroundColor: isDark ? 'rgb(55 65 81)' : 'var(--input-bg)',
                color: isDark ? '#f5f5f5' : 'var(--input-text)',
                border: '1px solid var(--input-border)',
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            className={`px-8 py-4 rounded-md font-semibold transition-all duration-300 hover:scale-105 transform`}
            style={{
              backgroundColor: 'var(--primary-bg)',
              color: 'var(--primary-text)',
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
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
}

export default Commissions;
