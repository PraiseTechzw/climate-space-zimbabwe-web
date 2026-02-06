import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#009E60",        // Official Zimbabwe Green
          "green-light": "#6BCF9B", // Secondary Green (derived)
          gold: "#FFD200",         // Official Zimbabwe Gold
          "gold-light": "#FFE580",  // Light Gold (derived)
          cyan: "#00B4F0",         // Official Cyan
          red: "#D40000",          // Official Red
          dark: "#111827",         // Midnight Charcoal
          light: "#F0FDF4",        // Soft Background Green
          surface: "#FFFFFF",      // Clean White
          black: "#000000",        // Pure Black
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
