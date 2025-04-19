// src/components/layout/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--border)] mt-auto">
      {" "}
      {/* Use mt-auto to push footer down */}
      <div className="container mx-auto flex h-14 max-w-screen-2xl flex-col items-center justify-center gap-2 px-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:h-12 sm:flex-row sm:justify-between md:px-6 lg:px-8">
        <p>&copy; {currentYear} CryptoDash. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {/* Optional: Add footer links */}
          {/* <a href="/privacy" className="hover:underline">Privacy Policy</a>
           <a href="/terms" className="hover:underline">Terms of Service</a> */}
          <span>
            Powered by{" "}
            <a
              href="https://www.coingecko.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[var(--foreground)]"
            >
              CoinGecko API
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
