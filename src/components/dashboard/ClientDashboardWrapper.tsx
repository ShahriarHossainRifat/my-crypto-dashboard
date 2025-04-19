// src/components/dashboard/ClientDashboardWrapper.tsx (Re-verified with Debugging)
// --- Start of File ---
"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import useSWR from "swr";
import useDebounce from "@/hooks/useDebounce";
// Import types
import type { CryptoMarketData } from "@/types/crypto";
import type { GlobalMarketData } from "@/types/global";
// Import constants
import {
  COINGECKO_API_BASE_URL,
  COINGECKO_MARKETS_ENDPOINT,
  DEFAULT_VS_CURRENCY,
  DEFAULT_PER_PAGE,
} from "@/lib/constants";
// Import API client functions
import { fetchGlobalData } from "@/lib/apiClient"; // Assuming using this approach

// Import Dashboard Components
import Filters from "./Filters";
import CryptoTable from "./CryptoTable";
import Pagination from "./Pagination";
import MarketOverview from "./MarketOverview";

// --- Fetcher Functions ---
// Updated listFetcher with better error logging
const listFetcher = async (url: string): Promise<CryptoMarketData[]> => {
  console.log(`[Fetcher] Attempting fetch: ${url}`);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      // Log status and potentially response text for more details
      const errorText = await res
        .text()
        .catch(() => "Could not read error response body");
      console.error(
        `[Fetcher] API Error: Status ${res.status}, Response: ${errorText}`
      );
      throw new Error(`API request failed: ${res.status} ${res.statusText}`); // Include status in error
    }
    return res.json();
  } catch (error) {
    // Catch network errors or errors thrown above
    console.error("[Fetcher] Fetch execution error:", error);
    throw error; // Re-throw the error for SWR to catch
  }
};
// Use dedicated function which includes its own try/catch
const globalDataFetcher = async (): Promise<GlobalMarketData> =>
  fetchGlobalData();
// --- End Fetcher Functions ---

interface ClientDashboardWrapperProps {
  initialData: CryptoMarketData[];
}

const ClientDashboardWrapper: React.FC<ClientDashboardWrapperProps> = ({
  initialData,
}) => {
  // console.log('[Wrapper] Render. Initial Data Len:', initialData?.length);

  // --- State Definitions ---
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("market_cap_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = DEFAULT_PER_PAGE;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  // console.log(`[Wrapper] State: page=${currentPage}, sort=${sortOption}, search='${searchTerm}' (debounced='${debouncedSearchTerm}')`);
  // --- End State Definitions ---

  // --- API URL Construction (Memoized) ---
  const listApiUrl = useMemo(() => {
    const params = new URLSearchParams({
      vs_currency: DEFAULT_VS_CURRENCY,
      order: sortOption,
      per_page: itemsPerPage.toString(),
      page: currentPage.toString(),
      sparkline: "false", // Keep false until sparklines are added
      price_change_percentage: "1h,24h,7d",
      locale: "en",
    });
    const url = `${COINGECKO_API_BASE_URL}${COINGECKO_MARKETS_ENDPOINT}?${params.toString()}`;
    // console.log('[Wrapper] Calculated listApiUrl:', url);
    return url;
  }, [currentPage, sortOption, itemsPerPage]); // Dependencies checked

  const globalApiUrl = `${COINGECKO_API_BASE_URL}/global`;
  // --- End API URL Construction ---

  // --- SWR Hooks ---
  const swrListKey = listApiUrl; // Use consistent key
  const {
    data: marketData,
    error: marketError,
    isLoading: isLoadingMarketData,
    isValidating: isValidatingMarketData,
  } = useSWR<CryptoMarketData[]>(swrListKey, listFetcher, {
    refreshInterval: 300000, // Increased interval
    // keepPreviousData: false, // Keep disabled for debugging
    fallbackData:
      currentPage === 1 &&
      sortOption === "market_cap_desc" &&
      !debouncedSearchTerm
        ? initialData
        : undefined,
    // shouldRetryOnError: false, // Optional: disable retry for debugging
  });
  // Log SWR list state updates
  useEffect(() => {
    console.log(
      `[Wrapper] SWR List State Update: Key=${swrListKey}, isLoading=${isLoadingMarketData}, isValidating=${isValidatingMarketData}, dataLen=${marketData?.length}, error=${marketError}`
    );
  }, [
    swrListKey,
    isLoadingMarketData,
    isValidatingMarketData,
    marketData,
    marketError,
  ]);

  const {
    data: globalData,
    error: globalError,
    isLoading: isLoadingGlobalData,
  } = useSWR<GlobalMarketData>(
    globalApiUrl,
    globalDataFetcher,
    { refreshInterval: 300000 } // Increased interval
  );
  // --- End SWR Hooks ---

  // --- Data Handling & Filtering (Memoized) ---
  const currentData = marketData ?? initialData ?? []; // Default to empty array
  const filteredData = useMemo((): CryptoMarketData[] => {
    if (!debouncedSearchTerm) {
      return currentData;
    }
    return currentData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [currentData, debouncedSearchTerm]);
  // --- End Data Handling & Filtering ---

  // --- Loading State Calculation ---
  const displayLoadingTable =
    isLoadingMarketData && !marketData && !initialData?.length;
  // console.log(`[Wrapper] displayLoadingTable=${displayLoadingTable}`);
  // --- End Loading State Calculation ---

  // --- Pagination Logic ---
  const hasMoreData = currentData && currentData.length === itemsPerPage;
  const nextPagePossiblyExists = !isLoadingMarketData && hasMoreData;
  const estimatedTotalPages = nextPagePossiblyExists
    ? currentPage + 1
    : currentPage;
  // console.log(`[Wrapper] Pagination: hasMore=${hasMoreData}, estimatedPages=${estimatedTotalPages}`);
  // --- End Pagination Logic ---

  // --- Event Handlers (Using useCallback) ---
  const handleSearchChange = useCallback((term: string) => {
    // console.log('[Wrapper] handleSearchChange:', term);
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((option: string) => {
    console.log("[Wrapper] handleSortChange:", option); // Important log
    setSortOption(option);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    console.log("[Wrapper] handlePageChange:", page); // Important log
    setCurrentPage(page);
  }, []);
  // --- End Event Handlers ---

  // --- Render Logic ---
  return (
    <div className="w-full">
      {/* Market Overview */}
      <MarketOverview
        globalData={globalData}
        isLoading={isLoadingGlobalData && !globalData}
      />

      {/* Filters */}
      <Filters
        searchTerm={searchTerm}
        sortOption={sortOption}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      {/* Error Display Area */}
      {marketError && (
        <div className="text-center text-destructive my-6">
          Failed to load cryptocurrency list data. <br />
          <span className="text-sm">
            ({marketError.message || "Please try again later."})
          </span>
        </div>
      )}
      {!marketError && globalError && !globalData && (
        <div className="text-center text-orange-500 my-2 text-sm">
          Market overview data could not be loaded.
        </div>
      )}

      {/* Crypto Table */}
      <CryptoTable
        data={filteredData}
        isLoading={displayLoadingTable} // Use calculated loading state
        itemsPerPage={itemsPerPage}
      />

      {/* Pagination */}
      {/* Render pagination only if no list error, not loading, and more than one potential page */}
      {!marketError && !displayLoadingTable && estimatedTotalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={estimatedTotalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* No Search Results Message */}
      {!displayLoadingTable &&
        debouncedSearchTerm &&
        filteredData?.length === 0 && (
          <div className="text-center text-muted-foreground my-6">
            No results found for "{debouncedSearchTerm}".
          </div>
        )}
    </div>
  );
  // --- End Render Logic ---
};

export default ClientDashboardWrapper;
// --- End of File ---
