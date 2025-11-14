/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", ".dark-theme"],

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Cormorant Garamond", "Playfair Display", "Cinzel", "serif"],
      },

      colors: {
        bg: "var(--bg-color)",
        text: "var(--text-color)",

        muted: {
          bg: "var(--muted-bg-color)",
          text: "var(--muted-text-color)",
        },

        primary: {
          DEFAULT: "var(--primary-accent)",
          hover: "var(--primary-accent-hover)",
        },

        nav: {
          bg: "var(--nav-bg)",
          text: "var(--nav-text)",
        },

        hero: {
          bg: "var(--hero-bg)",
          text: "var(--hero-text)",
        },

        footer: {
          bg: "var(--footer-bg)",
          text: "var(--footer-text)",
        },

        card: {
          bg: "var(--card-bg)",
          text: "var(--card-text)",
        },

        input: {
          border: "var(--input-border)",
        },
      },

      borderRadius: {
        general: "var(--border-radius)",
      },

      transitionDuration: {
        fast: "var(--transition-speed)",
      },
    },
  },

  plugins: [],
};
