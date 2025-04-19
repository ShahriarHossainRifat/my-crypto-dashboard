// src/components/dashboard/StatCard.tsx
import React from "react";
import Card from "@/components/ui/Card"; // Use the base Card component
import SkeletonLoader from "@/components/ui/SkeletonLoader"; // For loading state
import {
  formatCompactCurrency,
  formatPercentage,
  formatCurrency,
} from "@/lib/utils"; // Import formatting utils
import { FaArrowTrendUp, FaArrowTrendDown, FaMinus } from "react-icons/fa6"; // Example icons

interface StatCardProps {
  title: string;
  value: number | undefined | null; // The main statistic value
  changePercentage?: number | undefined | null; // Optional % change
  formatType?: "compact" | "currency" | "number"; // How to format the main value
  currency?: string;
  isLoading?: boolean; // Optional loading state
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  changePercentage,
  formatType = "currency", // Default to standard currency
  currency = "usd",
  isLoading = false,
}) => {
  const formatValue = (val: number | undefined | null): string => {
    if (val === null || typeof val === "undefined") return "N/A";
    switch (formatType) {
      case "compact":
        return formatCompactCurrency(val, currency);
      case "currency":
        return formatCurrency(val, currency);
      case "number":
        return val.toLocaleString("en-US"); // Simple number format
      default:
        return formatCurrency(val, currency);
    }
  };

  const formattedValue = formatValue(value);
  const formattedChange = formatPercentage(changePercentage);

  const ChangeIcon =
    changePercentage === null ||
    typeof changePercentage === "undefined" ||
    changePercentage === 0
      ? FaMinus
      : changePercentage > 0
      ? FaArrowTrendUp
      : FaArrowTrendDown;

  const changeColor =
    changePercentage === null ||
    typeof changePercentage === "undefined" ||
    changePercentage === 0
      ? "text-gray-500 dark:text-gray-400"
      : changePercentage > 0
      ? "text-green-600 dark:text-green-500"
      : "text-red-600 dark:text-red-500";

  return (
    <Card className="flex flex-col justify-between">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {title}
      </h3>
      {isLoading ? (
        <>
          <SkeletonLoader className="h-8 w-3/4 mb-2" />
          <SkeletonLoader className="h-4 w-1/2" />
        </>
      ) : (
        <>
          <p className="text-2xl font-semibold tracking-tight">
            {formattedValue}
          </p>
          {typeof changePercentage === "number" && (
            <div className={`flex items-center text-xs mt-1 ${changeColor}`}>
              <ChangeIcon className="mr-1 h-3 w-3" />
              <span>{formattedChange}</span>
              <span className="ml-1 hidden sm:inline">(24h)</span>
            </div>
          )}
          {/* Display N/A or '-' if changePercentage is null/undefined but expected */}
          {(changePercentage === null ||
            typeof changePercentage === "undefined") &&
            typeof changePercentage !== "number" && (
              <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                <span>-</span>
              </div>
            )}
        </>
      )}
    </Card>
  );
};

export default StatCard;
