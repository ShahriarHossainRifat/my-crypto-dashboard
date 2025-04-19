// src/components/dashboard/CryptoTable.tsx

"use client"; // This component is a client component

import React from "react";
import type { CryptoMarketData } from "@/types/crypto";
import CryptoTableRow from "./CryptoTableRow";
import SkeletonLoader from "@/components/ui/SkeletonLoader"; // For loading state

interface CryptoTableProps {
  data: CryptoMarketData[] | undefined; // Array of coin data
  isLoading?: boolean;
  itemsPerPage?: number; // Used for skeleton loading rows
}

const CryptoTable: React.FC<CryptoTableProps> = ({
  data,
  isLoading = false,
  itemsPerPage = 10, // Default skeleton rows if data is undefined
}) => {
  const skeletonRowCount = itemsPerPage;

  // Define headers - adjust based on columns in CryptoTableRow
  const headers = [
    { key: "rank", label: "#", className: "p-3 text-center w-12" },
    { key: "name", label: "Name", className: "p-3 text-left" },
    { key: "price", label: "Price", className: "p-3 text-right" },
    {
      key: "1h",
      label: "1h %",
      className: "p-3 text-right hidden lg:table-cell",
    }, // Optional column
    { key: "24h", label: "24h %", className: "p-3 text-right" },
    {
      key: "7d",
      label: "7d %",
      className: "p-3 text-right hidden lg:table-cell",
    }, // Optional column
    {
      key: "market_cap",
      label: "Market Cap",
      className: "p-3 text-right hidden md:table-cell",
    },
    {
      key: "volume_24h",
      label: "Volume (24h)",
      className: "p-3 text-right hidden md:table-cell",
    },
    // { key: 'sparkline', label: 'Last 7 Days', className: 'p-3 text-right hidden xl:table-cell' }, // Optional
  ];

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[var(--border)]">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800/50">
          <tr>
            {headers.map((header) => (
              <th
                key={header.key}
                scope="col"
                className={`font-medium text-gray-500 dark:text-gray-400 ${header.className}`}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading &&
            // Render Skeleton Rows during loading
            Array.from({ length: skeletonRowCount }).map((_, index) => (
              <tr
                key={`skeleton-${index}`}
                className="border-b border-[var(--border)]"
              >
                {/* Match skeleton cells to header columns */}
                <td className="p-3 text-center">
                  <SkeletonLoader className="h-4 w-6 mx-auto" />
                </td>
                <td className="p-3">
                  <SkeletonLoader className="h-4 w-3/4" />
                </td>
                <td className="p-3">
                  <SkeletonLoader className="h-4 w-full ml-auto" />
                </td>
                <td className="p-3 hidden lg:table-cell">
                  <SkeletonLoader className="h-4 w-full ml-auto" />
                </td>
                <td className="p-3">
                  <SkeletonLoader className="h-4 w-full ml-auto" />
                </td>
                <td className="p-3 hidden lg:table-cell">
                  <SkeletonLoader className="h-4 w-full ml-auto" />
                </td>
                <td className="p-3 hidden md:table-cell">
                  <SkeletonLoader className="h-4 w-full ml-auto" />
                </td>
                <td className="p-3 hidden md:table-cell">
                  <SkeletonLoader className="h-4 w-full ml-auto" />
                </td>
                {/* Optional: Skeleton for sparkline */}
                {/* <td className="p-3 hidden xl:table-cell"><SkeletonLoader className="h-10 w-full" /></td> */}
              </tr>
            ))}

          {!isLoading &&
            data &&
            data.length > 0 &&
            data.map((coin, index) => (
              // Use coin.id for a stable key
              <CryptoTableRow key={coin.id} coin={coin} index={index} />
            ))}

          {!isLoading && (!data || data.length === 0) && (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center p-6 text-gray-500 dark:text-gray-400"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
