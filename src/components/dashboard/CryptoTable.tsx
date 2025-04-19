// src/components/dashboard/CryptoTable.tsx (Sparkline Header/Skeleton Removed)
// --- Start of File ---
import React from "react";
import type { CryptoMarketData } from "@/types/crypto";
import CryptoTableRow from "./CryptoTableRow";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import { DEFAULT_PER_PAGE } from "@/lib/constants";

interface CryptoTableProps {
  data: CryptoMarketData[] | undefined;
  isLoading?: boolean;
  itemsPerPage?: number;
}

const CryptoTable: React.FC<CryptoTableProps> = ({
  data,
  isLoading = false,
  itemsPerPage = DEFAULT_PER_PAGE,
}) => {
  const skeletonRowCount = itemsPerPage;

  // Define headers *without* the sparkline column
  const headers = [
    {
      key: "rank",
      label: "#",
      className:
        "px-2 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-12",
    },
    {
      key: "name",
      label: "Name",
      className:
        "px-3 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider",
    },
    {
      key: "price",
      label: "Price",
      className:
        "px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider",
    },
    {
      key: "1h",
      label: "1h %",
      className:
        "px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell",
    },
    {
      key: "24h",
      label: "24h %",
      className:
        "px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider",
    },
    {
      key: "7d",
      label: "7d %",
      className:
        "px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell",
    },
    {
      key: "market_cap",
      label: "Market Cap",
      className:
        "px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell",
    },
    {
      key: "volume_24h",
      label: "Volume (24h)",
      className:
        "px-3 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell",
    },
    // --- SPARKLINE HEADER REMOVED ---
  ];

  // Calculate ColSpan based on the updated number of headers
  const headerColSpan = headers.length;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50 dark:bg-muted/30">
            <tr>
              {headers.map((header) => (
                <th key={header.key} scope="col" className={header.className}>
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {isLoading &&
              Array.from({ length: skeletonRowCount }).map((_, index) => (
                <tr
                  key={`skeleton-${index}`}
                  className="border-b border-border animate-pulse"
                >
                  {/* Skeleton cells matching the remaining headers */}
                  <td className="px-2 py-3 text-center">
                    <SkeletonLoader className="h-4 w-6 mx-auto" />
                  </td>
                  <td className="px-3 py-3">
                    <SkeletonLoader className="h-4 w-3/4" />
                  </td>
                  <td className="px-3 py-3">
                    <SkeletonLoader className="h-4 w-full ml-auto" />
                  </td>
                  <td className="px-3 py-3 hidden lg:table-cell">
                    <SkeletonLoader className="h-4 w-full ml-auto" />
                  </td>
                  <td className="px-3 py-3">
                    <SkeletonLoader className="h-4 w-full ml-auto" />
                  </td>
                  <td className="px-3 py-3 hidden lg:table-cell">
                    <SkeletonLoader className="h-4 w-full ml-auto" />
                  </td>
                  <td className="px-3 py-3 hidden md:table-cell">
                    <SkeletonLoader className="h-4 w-full ml-auto" />
                  </td>
                  <td className="px-3 py-3 hidden md:table-cell">
                    <SkeletonLoader className="h-4 w-full ml-auto" />
                  </td>
                  {/* --- SPARKLINE SKELETON REMOVED --- */}
                </tr>
              ))}

            {!isLoading &&
              data &&
              data.length > 0 &&
              data.map((coin, index) => (
                <CryptoTableRow key={coin.id} coin={coin} index={index} />
              ))}

            {!isLoading && (!data || data.length === 0) && (
              <tr>
                {/* Updated ColSpan */}
                <td
                  colSpan={headerColSpan}
                  className="text-center p-6 text-muted-foreground"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
// --- End of File ---
