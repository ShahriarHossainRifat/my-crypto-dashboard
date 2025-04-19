// src/types/global.ts
// --- Start of File ---

// Based on the structure of the 'data' object returned by
// CoinGecko's /global API endpoint
// Ref: https://docs.coingecko.com/reference/global

export interface GlobalMarketData {
  active_cryptocurrencies: number;
  upcoming_icos: number; // Note: Might be 0 or less relevant now
  ongoing_icos: number; // Note: Might be 0 or less relevant now
  ended_icos: number; // Note: Might be 0 or less relevant now
  markets: number; // Number of active markets
  total_market_cap: { [currency: string]: number }; // e.g., { "usd": 1234..., "btc": 567... }
  total_volume: { [currency: string]: number };
  market_cap_percentage: { [symbol: string]: number }; // e.g., { "btc": 45.5, "eth": 18.2 }
  market_cap_change_percentage_24h_usd: number | null; // Overall market change %
  updated_at: number; // Timestamp (Unix epoch seconds)
}

// --- End of File ---
