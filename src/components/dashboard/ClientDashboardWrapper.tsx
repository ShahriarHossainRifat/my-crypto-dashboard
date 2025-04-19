// src/components/dashboard/ClientDashboardWrapper.tsx (Cleaned up Comment)
// --- Start of File ---
"use client";

import React, { useState, useMemo, useCallback } from "react";
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
// Fetcher for the main coin list endpoint
const listFetcher = async (url: string): Promise<CryptoMarketData[]> => {
  // console.log(`[Fetcher] Attempting fetch: ${url}`);
  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorText = await res
        .text()
        .catch(() => "Could not read error response body");
      console.error(
        `[Fetcher] API Error: Status ${res.status}, Response: ${errorText}`
      );
      throw new Error(`API request failed: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error("[Fetcher] Fetch execution error:", error);
    throw error;
  }
};
// Fetcher specifically for global data (using the dedicated function)
const globalDataFetcher = async (): Promise<GlobalMarketData> =>
  fetchGlobalData();
// --- End Fetcher Functions ---

interface ClientDashboardWrapperProps {
  initialData: CryptoMarketData[];
}

const ClientDashboardWrapper: React.FC<ClientDashboardWrapperProps> = ({
  initialData,
}) => {
  // --- State Definitions ---
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("market_cap_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = DEFAULT_PER_PAGE;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // --- API URL Construction (Memoized) ---
  const listApiUrl = useMemo(() => {
    const params = new URLSearchParams({
      vs_currency: DEFAULT_VS_CURRENCY,
      order: sortOption,
      per_page: itemsPerPage.toString(),
      page: currentPage.toString(),
      sparkline: "false", // Ensure sparkline is false
      price_change_percentage: "1h,24h,7d",
      locale: "en",
    });
    // Use string concatenation as fixed before
    return (
      COINGECKO_API_BASE_URL +
      COINGECKO_MARKETS_ENDPOINT +
      "?" +
      params.toString()
    );
  }, [currentPage, sortOption, itemsPerPage]);

  const globalApiUrl = `${COINGECKO_API_BASE_URL}/global`;

  // --- SWR Hooks ---
  const swrListKey = listApiUrl;
  // Removed unused 'isValidatingMarketData'
  const {
    data: marketData,
    error: marketError,
    isLoading: isLoadingMarketData,
  } = useSWR<CryptoMarketData[]>(swrListKey, listFetcher, {
    refreshInterval: 300000, // Keep interval high to avoid rate limits
    fallbackData:
      currentPage === 1 &&
      sortOption === "market_cap_desc" &&
      !debouncedSearchTerm
        ? initialData
        : undefined,
  });

  const {
    data: globalData,
    error: globalError,
    isLoading: isLoadingGlobalData,
  } = useSWR<GlobalMarketData>(
    globalApiUrl,
    globalDataFetcher,
    { refreshInterval: 300000 } // Keep interval high
  );
  // --- End SWR Hooks ---

  // --- Data Handling & Filtering ---
  // Memoize currentData calculation
  const currentData = useMemo(
    () => marketData ?? initialData ?? [],
    [marketData, initialData]
  );

  // Memoized calculation for filteredData
  const filteredData = useMemo((): CryptoMarketData[] => {
    if (!debouncedSearchTerm) return currentData;
    return currentData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    // Ensure no stray comment is here
  }, [currentData, debouncedSearchTerm]); // Dependencies are correct
  // --- End Data Handling & Filtering ---

  // --- Loading State & Pagination Logic ---
  const displayLoadingTable =
    isLoadingMarketData && !marketData && !initialData?.length;
  const hasMoreData = currentData && currentData.length === itemsPerPage;
  const estimatedTotalPages = hasMoreData ? currentPage + 1 : currentPage;

  // --- Event Handlers (Using useCallback) ---
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);
  const handleSortChange = useCallback((option: string) => {
    setSortOption(option);
    setCurrentPage(1);
  }, []);
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // --- Render Logic ---
  return (
    <div className="w-full">
      <MarketOverview
        globalData={globalData}
        isLoading={isLoadingGlobalData && !globalData}
      />
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
        isLoading={displayLoadingTable}
        itemsPerPage={itemsPerPage}
      />

      {/* Pagination */}
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
            No results found for &quot;{debouncedSearchTerm}&quot;.
          </div>
        )}
    </div>
  );
  // --- End Render Logic ---
};

export default ClientDashboardWrapper;
// --- End of File ---
