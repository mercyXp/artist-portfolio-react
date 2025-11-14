'use client';

import { useTheme } from '@/contexts/ThemeContext';

function Gallery() {
  const { isDark } = useTheme();

  const artworks = [
    {
      src: "images/draw-1.jpg",
      title: "The Thinker",
      description: "A study of deep reflection and inner calm.",
      duration: "8 hours",
    },
    {
      src: "images/draw-2.jpg",
      title: "Soul in Motion",
      description: "Capturing life through dynamic expression.",
      duration: "6 hours",
    },
    {
      src: "images/draw-8.jpg",
      title: "Silent Whispers",
      description: "An abstract form of serenity and grace.",
      duration: "5 hours",
    },
    {
      src: "images/draw-3.jpg",
      title: "Urban Mirage",
      description: "A mix of architecture and emotion.",
      duration: "10 hours",
    },
    {
      src: "images/draw-5.jpg",
      title: "Grace in Lines",
      description: "Every stroke tells a story of patience.",
      duration: "7 hours",
    },
    {
      src: "images/draw-7.jpg",
      title: "Nature’s Essence",
      description: "Where detail meets tranquility.",
      duration: "4 hours",
    },
  ];

  return (
    <section
      id="gallery"
      className={`py-16 px-6 transition-colors duration-300 ${
        isDark
          ? 'bg-gray-900 text-gray-100'
          : 'bg-[var(--bg-color)] text-[var(--text-color)]'
      }`}
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4"
          style={{
            color: isDark ? '#f5f5f5' : 'var(--text-color)',
          }}
        >
          Explore My Work
        </h1>
        <p
          className={`text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-[var(--muted-text-color)]'
          }`}
        >
          Every piece below tells a unique story — drawn with passion, precision,
          and purpose. Dive in and experience the art that defines my journey.
        </p>
      </div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
        {artworks.map((art, index) => (
          <div
            key={index}
            className={`relative w-full overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-transform duration-500 hover:scale-105 aspect-[4/3] group ${
              isDark ? 'bg-gray-800' : 'bg-[var(--muted-bg-color)]'
            }`}
          >
            <img
              src={art.src}
              alt={art.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay Info */}
            <div
              className={`absolute inset-0 ${
                isDark ? 'bg-black/60' : 'bg-black/50'
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4`}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                {art.title}
              </h2>
              <p className="text-sm text-gray-200 mb-2">{art.description}</p>
              <p className="text-xs text-gray-300 italic">⏱️ {art.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
