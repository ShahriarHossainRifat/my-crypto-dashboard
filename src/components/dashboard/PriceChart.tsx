// src/components/dashboard/PriceChart.tsx
"use client"; // Charting libraries interact with the DOM

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale, // Required for labels/categories on X axis
  LinearScale, // Required for numerical values on Y axis
  PointElement, // Required for points on the line
  LineElement, // Required for the line itself
  Title, // Optional: For chart titles
  Tooltip, // Required for hover tooltips
  Legend, // Optional: For dataset labels
  Filler, // Optional: For filling area under the line
} from "chart.js";
import { useTheme } from "next-themes"; // To adapt options for light/dark mode

import { prepareLineChartData, getLineChartOptions } from "@/lib/chartUtils";
import SkeletonLoader from "@/components/ui/SkeletonLoader"; // For loading state

// Register Chart.js components
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
  chartData: number[] | undefined | null; // Array of price points
  label?: string;
  className?: string;
  isLoading?: boolean;
  positive?: boolean; // Optional: determine line color based on trend
}

const PriceChart: React.FC<PriceChartProps> = ({
  chartData,
  label = "Price Data",
  className = "",
  isLoading = false,
  positive = true, // Default to positive color if not specified
}) => {
  const { resolvedTheme } = useTheme(); // Get the resolved theme (light or dark)
  const isDarkMode = resolvedTheme === "dark";

  // Determine colors based on trend and theme
  const defaultPositiveColor = isDarkMode
    ? "rgb(34, 197, 94)"
    : "rgb(22, 163, 74)"; // Green-500 / Green-600
  const defaultNegativeColor = isDarkMode
    ? "rgb(239, 68, 68)"
    : "rgb(220, 38, 38)"; // Red-500 / Red-600
  const areaPositiveColor = isDarkMode
    ? "rgba(34, 197, 94, 0.1)"
    : "rgba(22, 163, 74, 0.1)";
  const areaNegativeColor = isDarkMode
    ? "rgba(239, 68, 68, 0.1)"
    : "rgba(220, 38, 38, 0.1)";

  const lineColor = positive ? defaultPositiveColor : defaultNegativeColor;
  const areaColor = positive ? areaPositiveColor : areaNegativeColor;

  // Prepare data and options using utility functions
  // Regenerate these only when data or theme changes to avoid unnecessary re-renders
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
    return <SkeletonLoader className={`h-20 w-full ${className}`} />; // Adjust height as needed
  }

  if (!chartData || chartData.length === 0) {
    return (
      <div
        className={`flex items-center justify-center h-20 text-xs text-gray-500 ${className}`}
      >
        No chart data
      </div>
    );
  }

  return (
    <div className={`relative h-20 w-full ${className}`}>
      {" "}
      {/* Ensure container has dimensions */}
      <Line options={options} data={data} />
    </div>
  );
};

export default PriceChart;
