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
    container: {
      // Optional: Center container by default
      center: true,
      padding: "1rem", // Default padding for container
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Define semantic color names using CSS variables (defined in globals.css)
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))", // Focus ring
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))", // Text on primary bg
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          // For errors
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          // Subtle backgrounds/text
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          // Hover states, highlights
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          // Popovers, cards
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          // Card backgrounds
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Specific colors for dashboard elements
        positive: "hsl(var(--positive))", // Green for positive changes
        negative: "hsl(var(--negative))", // Red for negative changes
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // Optional: Add custom fonts via next/font in layout.tsx
      // fontFamily: {
      //   sans: ["var(--font-sans)", ...fontFamily.sans],
      // },
      keyframes: {
        // Keep or add animations
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-subtle": {
          // Example subtle pulse
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".8" },
        },
      },
      animation: {
        // Keep or add animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-subtle": "pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
} satisfies Config;

export default config;
