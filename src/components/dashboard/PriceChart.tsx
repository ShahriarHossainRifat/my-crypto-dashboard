// src/components/dashboard/PriceChart.tsx (Updated)
// --- Start of File ---
"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Ensure Filler is registered for area background
} from "chart.js";
import { useTheme } from "next-themes";

// Import updated utilities
import { prepareLineChartData, getLineChartOptions } from "@/lib/chartUtils";
import SkeletonLoader from "@/components/ui/SkeletonLoader";

// Register Chart.js components (no change needed here)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  chartData: number[] | undefined | null;
  label?: string;
  className?: string;
  isLoading?: boolean;
  positive?: boolean;
  height?: string; // Allow custom height
  width?: string; // Allow custom width
}

const PriceChart: React.FC<PriceChartProps> = ({
  chartData,
  label = "Price Data",
  className = "",
  isLoading = false,
  positive = true,
  height = "h-20", // Default height class
  width = "w-full", // Default width class
}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  // Define colors using CSS Variables (as used in tailwind.config/globals.css)
  // Note: Chart.js might not directly read CSS vars, so we use JS logic.
  // Consider using a library or helper if complex theme syncing is needed.
  const positiveColor = isDarkMode
    ? "hsl(var(--positive))"
    : "hsl(var(--positive))";
  const negativeColor = isDarkMode
    ? "hsl(var(--negative))"
    : "hsl(var(--negative))";
  // Generate RGBA from HSL for area fill (simple approximation)
  const positiveAreaColor = positiveColor
    .replace("hsl", "hsla")
    .replace(")", ", 0.1)");
  const negativeAreaColor = negativeColor
    .replace("hsl", "hsla")
    .replace(")", ", 0.1)");

  const lineColor = positive ? positiveColor : negativeColor;
  const areaColor = positive ? positiveAreaColor : negativeAreaColor;

  // Prepare data and options using utility functions
  const data = React.useMemo(
    () =>
      prepareLineChartData(
        chartData,
        label,
        lineColor,
        areaColor // Pass area color to enable fill
      ),
    [chartData, label, lineColor, areaColor]
  );

  const options = React.useMemo(
    () => getLineChartOptions(isDarkMode),
    [isDarkMode]
  );

  if (isLoading) {
    // Use skeleton loader with specified height/width
    return <SkeletonLoader className={`${height} ${width} ${className}`} />;
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div
        className={`flex items-center justify-center text-xs text-muted-foreground ${height} ${width} ${className}`}
      >
        No chart data
      </div>
    );
  }

  return (
    // Apply height/width classes to the container
    <div className={`relative ${height} ${width} ${className}`}>
      <Line options={options} data={data} />
    </div>
  );
};

export default PriceChart;
// --- End of File ---
