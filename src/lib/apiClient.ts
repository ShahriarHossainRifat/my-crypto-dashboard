// src/lib/apiClient.ts (Removed unused catch variables)
// --- Start of File ---
import {
  COINGECKO_API_BASE_URL,
  COINGECKO_MARKETS_ENDPOINT,
  DEFAULT_VS_CURRENCY,
  DEFAULT_PER_PAGE,
} from "./constants";
import type { CryptoMarketData } from "@/types/crypto";
import type { GlobalMarketData } from "@/types/global";

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
    sparkline: "false",
    price_change_percentage: "1h,24h,7d",
    locale: "en",
  });
  const paramsStr = params.toString();
  const url =
    COINGECKO_API_BASE_URL + COINGECKO_MARKETS_ENDPOINT + "?" + paramsStr;
  const headers = {};

  try {
    const response = await fetch(url, { method: "GET", headers: headers });
    if (!response.ok) {
      let errorDetails = `HTTP error! status: ${response.status}`;
      // Remove variable 'e' if not used
      try {
        const errorData = await response.json();
        errorDetails += `, message: ${
          errorData?.error || JSON.stringify(errorData)
        }`;
      } catch {
        /* Ignore JSON parsing error - no variable needed */
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

export async function fetchGlobalData(): Promise<GlobalMarketData> {
  const url = `${COINGECKO_API_BASE_URL}/global`;
  const headers = {};
  try {
    const response = await fetch(url, { method: "GET", headers: headers });
    if (!response.ok) {
      let errorDetails = `HTTP error! status: ${response.status}`;
      // Remove variable 'e' if not used
      try {
        const errorData = await response.json();
        errorDetails += `, message: ${
          errorData?.status?.error_message || JSON.stringify(errorData)
        }`;
      } catch {
        /* Ignore JSON parsing error - no variable needed */
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
// --- End of File ---
