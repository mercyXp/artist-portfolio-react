/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode via 'dark' class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Core Palette */
        bg: '#ffffff',
        text: '#1a1a1a',
        mutedBg: '#e8eaed',
        mutedText: '#595959',

        primary: '#0c3283',
        primaryText: '#fafafa',
        secondary: '#e6e6e6',
        secondaryText: '#1f1f1f',
        accent: '#e2e4e9',
        accentText: '#0b2c75',
        destructive: '#960d0d',
        destructiveText: '#fafafa',

        cardBg: '#fafafa',
        cardText: '#1a1a1a',
        popoverBg: '#f0f0f0',
        popoverText: '#1a1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Menlo', 'monospace'],
      },
      borderRadius: {
        md: '0.5rem',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
    },
  },
  plugins: [],
}

