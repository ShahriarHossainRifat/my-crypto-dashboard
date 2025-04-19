// src/lib/apiClient.ts
import {
  COINGECKO_API_BASE_URL,
  COINGECKO_MARKETS_ENDPOINT,
  DEFAULT_VS_CURRENCY,
  DEFAULT_PER_PAGE,
} from "./constants"; // Import constants
import type { CryptoMarketData } from "@/types/crypto"; // Import the data type

/**
 * Fetches market data for cryptocurrencies from CoinGecko API.
 * Can be used server-side (e.g., in Server Components, Route Handlers)
 * or client-side (e.g., with SWR/React Query).
 *
 * @param vs_currency - The target currency (e.g., 'usd', 'eur').
 * @param page - The page number for pagination.
 * @param per_page - The number of results per page.
 * @param order - Sort results by field (e.g., 'market_cap_desc').
 * @returns A promise that resolves to an array of CryptoMarketData or throws an error.
 */
export async function fetchMarketData(
  vs_currency: string = DEFAULT_VS_CURRENCY,
  page: number = 1,
  per_page: number = DEFAULT_PER_PAGE,
  order: string = "market_cap_desc" // e.g., 'market_cap_desc', 'volume_desc'
): Promise<CryptoMarketData[]> {
  // Construct the API URL with parameters
  const params = new URLSearchParams({
    vs_currency: vs_currency,
    order: order,
    per_page: per_page.toString(),
    page: page.toString(),
    sparkline: "false", // Set to true if you need sparkline data
    price_change_percentage: "1h,24h,7d", // Request specific percentage changes
    locale: "en",
  });

  const url = `${COINGECKO_API_BASE_URL}${COINGECKO_MARKETS_ENDPOINT}?${params.toString()}`;
  // Consider adding API key handling here if needed (e.g., from environment variables)
  // const apiKey = process.env.COINGECKO_API_KEY; // Server-side only
  // const headers = apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {};

  // --- Debugging ---
  //   console.log("Attempting to fetch URL:", url); // Add this line temporarily
  // --- End Debugging ---

  const headers = {}; // No API key needed for this public endpoint usually

  try {
    // Use fetch API (extended by Next.js for caching/revalidation on server)
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      // next: { revalidate: 300 } // Example: Revalidate every 5 mins if used server-side
    });

    if (!response.ok) {
      // Attempt to parse error details from API response if available
      let errorDetails = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorDetails += `, message: ${
          errorData?.error || JSON.stringify(errorData)
        }`;
      } catch (e) {
        // Ignore if response body isn't valid JSON
      }
      throw new Error(`Failed to fetch market data: ${errorDetails}`);
    }

    const data: CryptoMarketData[] = await response.json();
    return data;
  } catch (error) {
    console.error("API Client Error - fetchMarketData:", error);
    // Re-throw the error to be handled by the caller (e.g., page component, SWR hook)
    throw error;
  }
}

// Future functions could be added here:
// - fetchCoinDetails(id: string)
// - fetchChartData(id: string, days: number)
// etc.
