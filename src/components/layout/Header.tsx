// src/components/layout/Header.tsx
"use client"; // Header often contains client-side interactive elements (e.g., theme toggle)

import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-6 lg:px-8">
        {/* Site Title/Logo */}
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {/* You can replace text with an SVG logo component later */}
            {/* <YourLogoSvg className="h-6 w-6" /> */}
            <span className="font-bold sm:inline-block">MyCryptoDashboard</span>
          </Link>
          {/* Optional: Add main navigation links here if needed */}
          {/* <nav className="flex items-center gap-6 text-sm">
              <Link href="/about" className="text-muted-foreground/70 transition-colors hover:text-foreground">About</Link>
          </nav> */}
        </div>

        {/* Right Aligned Items */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          {/* Add other header elements like user profile/login button if needed */}
        </div>
      </div>
    </header>
  );
};

export default Header;
