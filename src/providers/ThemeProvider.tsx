// src/providers/ThemeProvider.tsx
"use client"; // This component needs to be a client component

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Note: React 19 might simplify context provider setup, but for
  // compatibility and clarity with next-themes, this structure is standard.
  return (
    <NextThemesProvider
      attribute="class" // Apply theme class to html tag
      defaultTheme="system" // Default to system preference
      enableSystem // Allow system preference detection
      disableTransitionOnChange // Optional: disable theme change animations
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
