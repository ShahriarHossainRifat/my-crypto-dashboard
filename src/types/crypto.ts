// src/types/crypto.ts

// Based on the CoinGecko API '/coins/markets' endpoint response structure
// Ref: https://docs.coingecko.com/reference/coins-markets

export interface CryptoMarketData {
  id: string; // e.g., "bitcoin"
  symbol: string; // e.g., "btc"
  name: string; // e.g., "Bitcoin"
  image: string; // URL to the coin's image
  current_price: number | null; // Current price in vs_currency
  market_cap: number | null; // Market capitalization
  market_cap_rank: number | null; // Market cap rank
  fully_diluted_valuation: number | null; // Fully diluted valuation
  total_volume: number | null; // Total trading volume in the last 24h
  high_24h: number | null; // Highest price in the last 24h
  low_24h: number | null; // Lowest price in the last 24h
  price_change_24h: number | null; // Price change in the last 24h (absolute value)
  price_change_percentage_24h: number | null; // Price change percentage in the last 24h
  market_cap_change_24h: number | null; // Market cap change in the last 24h
  market_cap_change_percentage_24h: number | null; // Market cap change percentage in the last 24h
  circulating_supply: number | null; // Circulating supply
  total_supply: number | null; // Total supply
  max_supply: number | null; // Maximum supply (if available)
  ath: number | null; // All-time high price
  ath_change_percentage: number | null; // Percentage change from ATH
  ath_date: string | null; // Date of ATH (ISO 8601 format)
  atl: number | null; // All-time low price
  atl_change_percentage: number | null; // Percentage change from ATL
  atl_date: string | null; // Date of ATL (ISO 8601 format)
  roi: RoiData | null; // Return on Investment data (if available)
  last_updated: string | null; // Last updated timestamp (ISO 8601 format)

  // Optional: Price change percentage for different timeframes (add if needed)
  price_change_percentage_1h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  // price_change_percentage_14d_in_currency?: number | null;
  // price_change_percentage_30d_in_currency?: number | null;
  // price_change_percentage_200d_in_currency?: number | null;
  // price_change_percentage_1y_in_currency?: number | null;

  // Optional: Sparkline data (add if fetching sparkline=true)
  // sparkline_in_7d?: {
  //   price: number[];
  // };
}

export interface RoiData {
  times: number;
  currency: string; // e.g., "btc", "eth", "usd"
  percentage: number;
}

// Optional: You might want a simplified type for specific components
export interface CryptoBasicInfo {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number | null;
  price_change_percentage_24h: number | null;
}
