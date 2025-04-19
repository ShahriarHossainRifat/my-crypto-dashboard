// src/components/dashboard/MarketOverview.tsx
import React from "react";
import StatCard from "./StatCard";
// Define a type for the global market data we expect
// This might come from a different API endpoint (e.g., CoinGecko's /global)
export interface GlobalMarketData {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { btc: number; eth: number }; // BTC dominance, ETH dominance
  market_cap_change_percentage_24h_usd: number | null;
  // Add other fields as needed from the API response
}

interface MarketOverviewProps {
  globalData: GlobalMarketData | null; // Data can be null initially or on error
  isLoading?: boolean;
}

// This component likely doesn't need to be a client component
// if it just receives data as props.
const MarketOverview: React.FC<MarketOverviewProps> = ({
  globalData,
  isLoading = false,
}) => {
  // Example data points to display
  const marketCap = globalData?.total_market_cap?.usd;
  const volume24h = globalData?.total_volume?.usd;
  const marketCapChange24h = globalData?.market_cap_change_percentage_24h_usd;
  const btcDominance = globalData?.market_cap_percentage?.btc;
  // const ethDominance = globalData?.market_cap_percentage?.eth; // Example

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Market Cap"
          value={marketCap}
          changePercentage={marketCapChange24h}
          formatType="compact" // Use compact formatting for large numbers
          isLoading={isLoading}
        />
        <StatCard
          title="24h Volume"
          value={volume24h}
          formatType="compact"
          isLoading={isLoading}
          // No change percentage provided in this example data structure for volume
        />
        <StatCard
          title="BTC Dominance"
          value={btcDominance}
          formatType="number" // Format as a simple number
          isLoading={isLoading}
          // Custom formatting might be needed to add '%' sign without multiplication
          // Or adjust formatPercentage util if needed
        />
        {/* Add more StatCards as needed, e.g., for ETH Dominance, Gas fees etc. */}
        <StatCard
          title="Placeholder Stat" // Example placeholder
          value={null}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default MarketOverview;
