// src/components/dashboard/ClientDashboardWrapper.tsx
// --- Start of File ---
"use client";

import React, { useState, useMemo, useEffect } from "react";
import useSWR from "swr";
import useDebounce from "@/hooks/useDebounce";
import type { CryptoMarketData } from "@/types/crypto";
import {
  COINGECKO_API_BASE_URL,
  COINGECKO_MARKETS_ENDPOINT,
  DEFAULT_VS_CURRENCY,
  DEFAULT_PER_PAGE,
} from "@/lib/constants";
import Filters from "./Filters";
import CryptoTable from "./CryptoTable";
import Pagination from "./Pagination";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("API request failed");
    return res.json();
  });

interface ClientDashboardWrapperProps {
  initialData: CryptoMarketData[];
}

const ClientDashboardWrapper: React.FC<ClientDashboardWrapperProps> = ({
  initialData,
}) => {
  // console.log('[ClientDashboardWrapper] Rendering. Initial Data Length:', initialData?.length);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("market_cap_desc"); // Initial sort state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = DEFAULT_PER_PAGE;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // --- API URL Construction ---
  // This useMemo hook ensures the URL changes whenever dependencies change
  const apiUrl = useMemo(() => {
    const params = new URLSearchParams({
      vs_currency: DEFAULT_VS_CURRENCY,
      order: sortOption, // Use the current sortOption state here
      per_page: itemsPerPage.toString(),
      page: currentPage.toString(),
      sparkline: "false",
      price_change_percentage: "1h,24h,7d",
      locale: "en",
    });
    const url = `${COINGECKO_API_BASE_URL}${COINGECKO_MARKETS_ENDPOINT}?${params.toString()}`;
    // console.log('[ClientDashboardWrapper] API URL for SWR:', url); // DEBUG URL
    return url;
  }, [currentPage, sortOption, itemsPerPage]); // Dependencies: currentPage, sortOption

  // --- SWR Data Fetching ---
  const {
    data: marketData,
    error: marketError,
    isLoading: isLoadingMarketData,
  } = useSWR<CryptoMarketData[]>(
    apiUrl, // The key: SWR re-fetches when this changes
    fetcher,
    {
      refreshInterval: 60000,
      keepPreviousData: true, // Important for smooth transitions
      fallbackData:
        currentPage === 1 &&
        sortOption === "market_cap_desc" &&
        !debouncedSearchTerm
          ? initialData
          : undefined,
    }
  );

  // Log SWR state changes (optional debug)
  // useEffect(() => {
  //      console.log('[ClientDashboardWrapper] SWR State Update:', { isLoadingMarketData, marketDataLength: marketData?.length, marketError });
  // }, [isLoadingMarketData, marketData, marketError]);

  // --- Data Handling & Filtering ---
  const currentData = marketData ?? initialData;
  const filteredData = useMemo(() => {
    const dataToFilter = currentData ?? [];
    if (!debouncedSearchTerm) return dataToFilter;
    return dataToFilter.filter(
      (coin) =>
        coin.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [currentData, debouncedSearchTerm]);

  const displayLoading =
    isLoadingMarketData && !marketData && !initialData?.length;
  const hasMoreData = currentData && currentData.length === itemsPerPage;
  const estimatedTotalPages = hasMoreData ? currentPage + 1 : currentPage;

  // --- Event Handlers ---
  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset page on new search
  };

  const handleSortChange = (option: string) => {
    console.log("[ClientDashboardWrapper] Sort changed to:", option); // DEBUG: Log sort change
    setSortOption(option); // Update the sortOption state
    setCurrentPage(1); // Reset page on new sort
  };

  const handlePageChange = (page: number) => {
    // console.log('[ClientDashboardWrapper] Page changed to:', page); // DEBUG: Log page change
    setCurrentPage(page);
    // Optional scroll to top
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Pass the handlers down to the Filters component */}
      <Filters
        searchTerm={searchTerm}
        sortOption={sortOption}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange} // Pass the correct handler
      />

      {marketError && !initialData?.length && (
        <div className="text-center text-red-500 my-6">
          Failed to load cryptocurrency data. Please try again later.
        </div>
      )}

      <CryptoTable
        data={filteredData}
        isLoading={displayLoading}
        itemsPerPage={itemsPerPage}
      />

      {!displayLoading && estimatedTotalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={estimatedTotalPages}
          onPageChange={handlePageChange}
        />
      )}

      {!displayLoading && debouncedSearchTerm && filteredData?.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 my-6">
          No results found for "{debouncedSearchTerm}".
        </div>
      )}
    </div>
  );
};

export default ClientDashboardWrapper;
// --- End of File ---
