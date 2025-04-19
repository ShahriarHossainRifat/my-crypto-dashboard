// src/components/layout/Footer.tsx (Updated Styling)
// --- Start of File ---
import React from "react";
import Link from "next/link"; // Import Link if adding internal links later

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Use theme colors for border and text
    <footer className="w-full border-t border-border mt-auto text-sm text-muted-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row md:px-6 lg:px-8">
        {/* Copyright */}
        <p className="text-center sm:text-left">
          &copy; {currentYear} MyCryptoDashboard. All rights reserved.
        </p>

        {/* Links/Attribution */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:justify-end">
          {/* Optional Links */}
          {/* <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
           <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link> */}

          {/* Attribution */}
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
