/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode using .dark-theme or .dark class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Map Tailwind color names to your CSS variables for dynamic theme switching
        bg: "var(--bg-color)",
        text: "var(--text-color)",
        mutedBg: "var(--muted-bg-color)",
        mutedText: "var(--muted-text-color)",

        primary: "var(--primary-bg)",
        primaryText: "var(--primary-text)",
        secondary: "var(--secondary-bg)",
        secondaryText: "var(--secondary-text)",
        accent: "var(--accent-bg)",
        accentText: "var(--accent-text)",
        destructive: "var(--destructive-bg)",
        destructiveText: "var(--destructive-text)",

        cardBg: "var(--card-bg)",
        cardText: "var(--card-text)",
        popoverBg: "var(--popover-bg)",
        popoverText: "var(--popover-text)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["Menlo", "monospace"],
      },
      borderRadius: {
        md: "var(--border-radius)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
};
