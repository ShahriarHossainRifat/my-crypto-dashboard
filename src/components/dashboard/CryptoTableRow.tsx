// src/components/dashboard/CryptoTableRow.tsx
// --- Start of File ---
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import type { CryptoMarketData } from "@/types/crypto";
import {
  formatCurrency,
  formatPercentage,
  formatCompactCurrency,
} from "@/lib/utils";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaCircleQuestion,
} from "react-icons/fa6";

interface CryptoTableRowProps {
  coin: CryptoMarketData;
  index: number;
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const CryptoTableRow: React.FC<CryptoTableRowProps> = ({ coin, index }) => {
  const priceChange24h = coin.price_change_percentage_24h ?? null; // Keep null if undefined
  const priceChange1h = coin.price_change_percentage_1h_in_currency ?? null;
  const priceChange7d = coin.price_change_percentage_7d_in_currency ?? null;

  // Calculate colors based on nullable values
  const getChangeColor = (value: number | null | undefined): string => {
    if (value === null || typeof value === "undefined" || value === 0)
      return "text-gray-500 dark:text-gray-400";
    return value > 0
      ? "text-green-600 dark:text-green-500"
      : "text-red-600 dark:text-red-500";
  };

  const changeColor1h = getChangeColor(priceChange1h);
  const changeColor24h = getChangeColor(priceChange24h);
  const changeColor7d = getChangeColor(priceChange7d);

  // --- Add validation for the image URL ---
  const isValidImageUrl =
    typeof coin.image === "string" && coin.image.startsWith("http");
  // --- End validation ---

  // Log the problematic values just before render
  // console.log(`Rendering ${coin.symbol} - 1h: ${formatPercentage(priceChange1h)}, 24h: ${formatPercentage(priceChange24h)}, 7d: ${formatPercentage(priceChange7d)}`);

  return (
    <motion.tr
      className="border-b border-[var(--border)] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-150"
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      layout
    >
      {/* Rank */}
      <td className="p-3 text-center text-sm text-gray-500 dark:text-gray-400">
        {coin.market_cap_rank ?? "-"}
      </td>

      {/* Name & Symbol */}
      <td className="p-3">
        <div className="flex items-center space-x-3">
          {/* --- Conditional Image Rendering --- */}
          {isValidImageUrl ? (
            <Image
              // Use a unique key based on src if needed, though usually not required here
              // key={coin.image}
              src={coin.image}
              alt={`${coin.name} logo`}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            // Render a placeholder if the URL is invalid
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <FaCircleQuestion className="h-4 w-4 text-gray-500" />
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="font-semibold text-sm whitespace-nowrap">
              {coin.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
              {coin.symbol}
            </span>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="p-3 text-right font-medium text-sm">
        {formatCurrency(coin.current_price)}
      </td>

      {/* 1h % Change */}
      <td
        className={`p-3 text-right text-sm font-medium hidden lg:table-cell ${changeColor1h}`}
      >
        {formatPercentage(priceChange1h)} {/* Direct call */}
      </td>

      {/* 24h % Change */}
      <td className={`p-3 text-right text-sm font-medium ${changeColor24h}`}>
        {formatPercentage(priceChange24h)} {/* Direct call */}
      </td>

      {/* 7d % Change */}
      <td
        className={`p-3 text-right text-sm font-medium hidden lg:table-cell ${changeColor7d}`}
      >
        {formatPercentage(priceChange7d)} {/* Direct call */}
      </td>

      {/* Market Cap */}
      <td className="p-3 text-right text-sm hidden md:table-cell">
        {formatCompactCurrency(coin.market_cap)}
      </td>

      {/* 24h Volume */}
      <td className="p-3 text-right text-sm hidden md:table-cell">
        {formatCompactCurrency(coin.total_volume)}
      </td>
    </motion.tr>
  );
};

export default CryptoTableRow;
// --- End of File ---
