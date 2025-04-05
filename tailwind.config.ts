// tailwind.config.ts
import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      colors: {
        // Keep full Tailwind palette
        ...colors,
        logoMatch: "#17c9f8",
        // Custom palette overrides
        primary: {
          DEFAULT: "#1A2238",   // Midnight blue
          light: "#9DAAF2",     // Light blue
          dark: "#0F172A",      // Dark slate
        },
        secondary: "#FF6B6B",     // Coral red
        accent: "#22D3EE",        // Cyan / teal
        background: "#F1F5F9",    // Light mode background
        "background-dark": "#0F172A", // Dark mode background
        muted: "#94A3B8",         // Subtle text or UI elements
      },
    },
    keyframes: {
      'fade-in-up': {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },    
    animation: {
      'fade-in-up': 'fade-in-up 0.6s ease-out',
    },
  },
  plugins: [require("tailgrids/plugin")],
};
export default config;