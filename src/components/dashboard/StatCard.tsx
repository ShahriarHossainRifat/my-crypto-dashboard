// src/components/dashboard/StatCard.tsx (Updated Styling)
// --- Start of File ---
import React from "react";
// Using the base Card and potentially its sub-components for structure
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/Card";
import SkeletonLoader from "@/components/ui/SkeletonLoader";
import {
  formatCompactCurrency,
  formatPercentage,
  formatCurrency,
} from "@/lib/utils";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaMinus,
  FaCircleInfo,
} from "react-icons/fa6"; // Added FaInfoCircle

interface StatCardProps {
  title: string;
  value: number | undefined | null;
  changePercentage?: number | undefined | null;
  formatType?: "compact" | "currency" | "number";
  currency?: string;
  isLoading?: boolean;
  icon?: React.ReactNode; // Optional icon for the stat
  tooltip?: string; // Optional tooltip text
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  changePercentage,
  formatType = "currency",
  currency = "usd",
  isLoading = false,
  icon, // Accept optional icon prop
  tooltip,
}) => {
  const formatValue = (val: number | undefined | null): string => {
    if (val === null || typeof val === "undefined") return "--"; // Use '--' for N/A
    switch (formatType) {
      case "compact":
        return formatCompactCurrency(val, currency);
      case "currency":
        return formatCurrency(val, currency);
      case "number":
        // For non-currency numbers like dominance, format directly
        // May need adjustments based on desired precision
        return (
          val.toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
          }) + (title.toLowerCase().includes("dominance") ? "%" : "")
        ); // Add % specifically for dominance
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

  // Use theme colors directly via Tailwind classes
  const changeColor =
    changePercentage === null ||
    typeof changePercentage === "undefined" ||
    changePercentage === 0
      ? "text-muted-foreground" // Use muted color for no change
      : changePercentage > 0
      ? "text-positive" // Use theme variable for positive
      : "text-negative"; // Use theme variable for negative

  return (
    // Use Card sub-components for better structure and consistent padding
    <Card className="flex flex-col group hover:bg-accent/50 transition-colors duration-150">
      {" "}
      {/* Added hover effect */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {" "}
          {/* Muted title */}
          {title}
        </CardTitle>
        {/* Render optional icon passed via props */}
        {icon && <span className="text-muted-foreground">{icon}</span>}
      </CardHeader>
      <CardContent className="flex-grow">
        {" "}
        {/* Use flex-grow to push footer down if needed */}
        {isLoading ? (
          <>
            <SkeletonLoader className="h-7 w-3/4 mb-2" />
            <SkeletonLoader className="h-4 w-1/2" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold tracking-tight mb-1">
              {formattedValue}
            </div>
            {/* Render percentage change only if defined */}
            {(typeof changePercentage === "number" ||
              changePercentage === null) && (
              <div className={`flex items-center text-xs ${changeColor}`}>
                <ChangeIcon className="mr-1 h-3 w-3 flex-shrink-0" />
                <span className="truncate">
                  {changePercentage !== null ? formattedChange : "--"} vs prev.
                  24h
                </span>
              </div>
            )}
          </>
        )}
      </CardContent>
      {/* Optional Footer for tooltips or extra info */}
      {tooltip && !isLoading && (
        <CardFooter className="pt-2 pb-2">
          <p className="text-xs text-muted-foreground flex items-center">
            <FaCircleInfo className="mr-1.5 h-3 w-3 flex-shrink-0" />
            {tooltip}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatCard;
// --- End of File ---
