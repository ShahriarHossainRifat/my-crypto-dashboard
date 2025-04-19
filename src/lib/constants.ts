// src/lib/constants.ts

// Base URL for the CoinGecko API (V3)
export const COINGECKO_API_BASE_URL = "https://api.coingecko.com/api/v3";

// Example endpoint for fetching market data
// We can construct the full URL using this base and specific paths/parameters
export const COINGECKO_MARKETS_ENDPOINT = "/coins/markets";

// Default currency for fetching prices
export const DEFAULT_VS_CURRENCY = "usd";

// Default number of coins per page for API requests
export const DEFAULT_PER_PAGE = 50;

// Add other constants as needed, e.g.:
// export const WEBSITE_NAME = 'Crypto Dashboard';
// export const REFRESH_INTERVAL_MS = 60000; // 60 seconds for SWR revalidation
