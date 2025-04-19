// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Ensure paths cover all files using Tailwind classes
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // In Tailwind v4, theme customizations are often done via CSS variables,
  // but you can still extend the theme here if needed.
  theme: {
    extend: {
      // Example: Extend colors if needed beyond CSS variables
      colors: {
        primary: {
          light: "var(--color-primary-light)",
          DEFAULT: "var(--color-primary-default)",
          dark: "var(--color-primary-dark)",
        },
        secondary: "var(--color-secondary)",
        // Define more custom color variables here
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Add custom fonts, spacing, animations etc. here
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  // Plugins are less common in v4 core, but might be needed for specific libraries
  plugins: [
    // require('@tailwindcss/forms'), // Example if needed
  ],
  // Dark mode is often handled via CSS variables and prefers-color-scheme
  // or a class applied higher up (e.g., by next-themes).
  // darkMode: 'class', // Keep this if using next-themes class strategy
};

export default config;
