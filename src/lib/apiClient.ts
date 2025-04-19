// src/lib/apiClient.ts (Set sparkline back to false)
// --- Start of File ---
import {
  COINGECKO_API_BASE_URL,
  COINGECKO_MARKETS_ENDPOINT,
  DEFAULT_VS_CURRENCY,
  DEFAULT_PER_PAGE,
} from "./constants";
// Import types - CryptoMarketData type will be updated in the next step
import type { CryptoMarketData } from "@/types/crypto";
import type { GlobalMarketData } from "@/types/global";

// --- fetchMarketData function (Updated params) ---
export async function fetchMarketData(
  vs_currency: string = DEFAULT_VS_CURRENCY,
  page: number = 1,
  per_page: number = DEFAULT_PER_PAGE,
  order: string = "market_cap_desc"
): Promise<CryptoMarketData[]> {
  const params = new URLSearchParams({
    vs_currency: vs_currency,
    order: order,
    per_page: per_page.toString(),
    page: page.toString(),
    // --- Set sparkline back to false ---
    sparkline: "false", // Do not request sparkline data
    // --- End change ---
    price_change_percentage: "1h,24h,7d", // Still request these percentages
    locale: "en",
  });
  const paramsStr = params.toString();

  // Use string concatenation (as fixed before)
  const url =
    COINGECKO_API_BASE_URL + COINGECKO_MARKETS_ENDPOINT + "?" + paramsStr;
  // console.log(">>> SERVER LOG: Attempting URL:", url);

  const headers = {};
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
      // cache: 'force-cache', // Or other cache options
    });

    if (!response.ok) {
      let errorDetails = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorDetails += `, message: ${
          errorData?.error || JSON.stringify(errorData)
        }`;
      } catch (e) {
        /* Ignore */
      }
      throw new Error(`Failed to fetch market data: ${errorDetails}`);
    }
    const data: CryptoMarketData[] = await response.json();
    return data;
  } catch (error) {
    console.error("API Client Error - fetchMarketData:", error);
    throw error;
  }
}
// --- End of fetchMarketData function ---

// --- fetchGlobalData function (remains the same) ---
export async function fetchGlobalData(): Promise<GlobalMarketData> {
  const url = `${COINGECKO_API_BASE_URL}/global`;
  const headers = {};
  try {
    const response = await fetch(url, { method: "GET", headers: headers });
    if (!response.ok) {
      let errorDetails = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorDetails += `, message: ${
          errorData?.status?.error_message || JSON.stringify(errorData)
        }`;
      } catch (e) {
        /* Ignore */
      }
      throw new Error(`Failed to fetch global market data: ${errorDetails}`);
    }
    const result = await response.json();
    if (!result || !result.data) {
      throw new Error("Invalid global data format received from API");
    }
    return result.data as GlobalMarketData;
  } catch (error) {
    console.error("API Client Error - fetchGlobalData:", error);
    throw error;
  }
}
// --- End of fetchGlobalData function ---

// --- End of File ---
