// src/components/layout/Footer.tsx (Removed Unused Link Import)
// --- Start of File ---
import React from "react";
// Removed unused Link import
// import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border mt-auto text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row md:px-6 lg:px-8">
        <p className="text-center sm:text-left">
          &copy; {currentYear} CryptoDash. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
          {/* If adding internal Links back, re-import Link */}
          <span>
            Data provided by{" "}
            <a
              href="https://www.coingecko.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
            >
              CoinGecko
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
// --- End of File ---
