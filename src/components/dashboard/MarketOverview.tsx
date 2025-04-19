// src/components/dashboard/MarketOverview.tsx (Updated Styling)
// --- Start of File ---
import React from "react";
import StatCard from "./StatCard";
import type { GlobalMarketData } from "@/types/global"; // Use the specific type
import { DEFAULT_VS_CURRENCY } from "@/lib/constants"; // Use for accessing nested data
// Optional icons for cards
import {
  FaEarthAmericas,
  FaDollarSign,
  FaChartPie,
  FaPercent,
} from "react-icons/fa6";

interface MarketOverviewProps {
  globalData: GlobalMarketData | null | undefined; // Accept undefined from SWR
  isLoading?: boolean;
}

const MarketOverview: React.FC<MarketOverviewProps> = ({
  globalData,
  isLoading = false,
}) => {
  const currencyKey = DEFAULT_VS_CURRENCY.toLowerCase();

  // Safely access nested data
  const marketCap = globalData?.total_market_cap?.[currencyKey];
  const volume24h = globalData?.total_volume?.[currencyKey];
  const marketCapChange24h = globalData?.market_cap_change_percentage_24h_usd;
  const btcDominance = globalData?.market_cap_percentage?.["btc"];
  const activeCoins = globalData?.active_cryptocurrencies;

  return (
    // Add consistent bottom margin
    <div className="mb-8">
      {/* Slightly larger, bolder title */}
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        Market Overview
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Market Cap"
          value={marketCap}
          changePercentage={marketCapChange24h}
          formatType="compact"
          currency={currencyKey}
          isLoading={isLoading}
          icon={<FaDollarSign />} // Example icon
          tooltip="Total market capitalization of all cryptocurrencies."
        />
        <StatCard
          title="24h Volume"
          value={volume24h}
          formatType="compact"
          currency={currencyKey}
          isLoading={isLoading}
          icon={<FaEarthAmericas />} // Example icon
          tooltip="Total crypto trading volume in the last 24 hours."
        />
        <StatCard
          title="BTC Dominance"
          value={btcDominance}
          formatType="number" // Let StatCard handle adding '%'
          isLoading={isLoading}
          icon={<FaChartPie />} // Example icon
          tooltip="Bitcoin's market cap share compared to the total crypto market cap."
        />
        <StatCard
          title="Active Coins"
          value={activeCoins} // Pass the number directly
          formatType="number" // Format as a plain number
          isLoading={isLoading}
          icon={<FaPercent />} // Example icon - choose appropriate ones
          tooltip="Number of active cryptocurrencies listed."
        />
        {/* Add more StatCards if desired */}
      </div>
    </div>
  );
};

export default MarketOverview;
// --- End of File ---
