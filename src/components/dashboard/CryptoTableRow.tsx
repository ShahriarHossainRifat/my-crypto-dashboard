// src/components/dashboard/CryptoTableRow.tsx (Sparkline Removed)
// --- Start of File ---
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import type { CryptoMarketData } from "@/types/crypto"; // Still use this type
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
// Removed PriceChart import as it's no longer used here

interface CryptoTableRowProps {
  coin: CryptoMarketData;
  index: number;
}

// Animation variants remain the same
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
  const priceChange24h = coin.price_change_percentage_24h ?? null;
  const priceChange1h = coin.price_change_percentage_1h_in_currency ?? null;
  const priceChange7d = coin.price_change_percentage_7d_in_currency ?? null;

  const getChangeColor = (value: number | null | undefined): string => {
    if (value === null || typeof value === "undefined" || value === 0)
      return "text-muted-foreground";
    return value > 0 ? "text-positive" : "text-negative";
  };

  const changeColor1h = getChangeColor(priceChange1h);
  const changeColor24h = getChangeColor(priceChange24h);
  const changeColor7d = getChangeColor(priceChange7d);

  const isValidImageUrl =
    typeof coin.image === "string" && coin.image.startsWith("http");

  // No longer need is7dPositive for sparkline

  return (
    <motion.tr
      className="border-b border-border hover:bg-accent/50 transition-colors duration-150"
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      layout
    >
      {/* Rank */}
      <td className="px-2 py-3 text-center text-xs tabular-nums text-muted-foreground">
        {coin.market_cap_rank ?? "-"}
      </td>

      {/* Name & Symbol */}
      <td className="px-3 py-3">
        <div className="flex items-center space-x-2.5">
          {/* Image/Placeholder */}
          <div className="flex-shrink-0 h-6 w-6">
            {isValidImageUrl ? (
              <Image
                src={coin.image}
                alt={`${coin.name} logo`}
                width={24}
                height={24}
                className="rounded-full"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  console.warn(`Failed to load image: ${coin.image}`);
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                <FaCircleQuestion className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
          {/* Text */}
          <div className="flex flex-col items-start">
            <span className="font-medium text-sm text-foreground whitespace-nowrap">
              {coin.name}
            </span>
            <span className="text-xs text-muted-foreground uppercase">
              {coin.symbol}
            </span>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-3 py-3 text-right font-medium text-sm tabular-nums">
        {formatCurrency(coin.current_price)}
      </td>

      {/* 1h % Change */}
      <td
        className={`px-3 py-3 text-right text-sm font-medium hidden lg:table-cell tabular-nums ${changeColor1h}`}
      >
        {formatPercentage(priceChange1h)}
      </td>

      {/* 24h % Change */}
      <td
        className={`px-3 py-3 text-right text-sm font-medium tabular-nums ${changeColor24h}`}
      >
        {formatPercentage(priceChange24h)}
      </td>

      {/* 7d % Change */}
      <td
        className={`px-3 py-3 text-right text-sm font-medium hidden lg:table-cell tabular-nums ${changeColor7d}`}
      >
        {formatPercentage(priceChange7d)}
      </td>

      {/* Market Cap */}
      <td className="px-3 py-3 text-right text-sm text-muted-foreground tabular-nums hidden md:table-cell">
        {formatCompactCurrency(coin.market_cap)}
      </td>

      {/* 24h Volume */}
      <td className="px-3 py-3 text-right text-sm text-muted-foreground tabular-nums hidden md:table-cell">
        {formatCompactCurrency(coin.total_volume)}
      </td>

      {/* --- SPARKLINE CELL REMOVED --- */}
    </motion.tr>
  );
};

export default CryptoTableRow;
// --- End of File ---
