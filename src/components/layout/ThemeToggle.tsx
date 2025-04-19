// src/components/layout/ThemeToggle.tsx
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa6"; // Using react-icons

// Optional: Reuse Button component if you created one, or use a standard button
// import Button from '@/components/ui/Button';

const ThemeToggle: React.FC = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so we can safely show the UI
  // This prevents hydration mismatch issues with the theme state
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder or null on the server/initial render
    // to avoid hydration mismatch before theme is known client-side
    return (
      <div className="h-9 w-9 animate-pulse rounded-md bg-gray-300 dark:bg-gray-700"></div> // Placeholder
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[var(--background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-800 h-9 w-9 p-0" // Basic button styling, adapt if using a Button component
    >
      {theme === "light" ? (
        <FaSun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <FaMoon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span> {/* For accessibility */}
    </button>
  );
};

export default ThemeToggle;
