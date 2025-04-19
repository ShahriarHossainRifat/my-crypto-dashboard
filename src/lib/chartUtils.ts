// src/lib/chartUtils.ts (Updated Options)
// --- Start of File ---
import type { ChartData, ChartOptions, TooltipItem } from "chart.js";
import { formatCurrency } from "./utils"; // Import for tooltip formatting

/**
 * Example function to prepare data for a simple line chart.
 * (Function implementation remains the same as before)
 * @param data - Array of numerical data points (e.g., prices).
 * @param label - Label for the dataset (e.g., 'Price (7d)').
 * @param borderColor - Color for the line.
 * @param backgroundColor - Color for the area fill under the line (optional).
 * @returns ChartData object for Chart.js.
 */
export function prepareLineChartData(
  data: number[] | undefined | null,
  label: string,
  borderColor: string = "rgb(75, 192, 192)",
  backgroundColor?: string
): ChartData<"line"> {
  const validData = data ?? [];
  // Use empty labels as we hide the axis anyway for mini charts
  const labels = validData.map(() => "");

  return {
    labels: labels,
    datasets: [
      {
        label: label,
        data: validData,
        fill: !!backgroundColor,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        tension: 0.2, // Slightly more curve
        borderWidth: 1.5, // Slightly thicker line
        pointRadius: 0,
        pointHoverRadius: 3, // Slightly smaller hover point
      },
    ],
  };
}

/**
 * Example function to define common options for a line chart.
 * (Updated options implementation)
 * @param isDarkMode - Flag to adjust colors for dark mode.
 * @returns ChartOptions object for Chart.js line charts.
 */
export function getLineChartOptions(
  isDarkMode: boolean = false
): ChartOptions<"line"> {
  // Use HSL variables from CSS for consistency if possible,
  // otherwise define reasonable defaults here.
  // Note: Direct access to CSS variables isn't easy here, so we use conditional logic.
  const tooltipBackgroundColor = isDarkMode
    ? "rgba(10, 10, 20, 0.85)"
    : "rgba(255, 255, 255, 0.85)";
  const tooltipTitleColor = isDarkMode ? "#cbd5e1" : "#334155"; // slate-300 / slate-700
  const tooltipBodyColor = isDarkMode ? "#e2e8f0" : "#1e293b"; // slate-200 / slate-800
  // Subtle grid/tick colors if axes were displayed
  // const gridColor = isDarkMode ? 'hsl(var(--border) / 0.1)' : 'hsl(var(--border) / 0.1)';
  // const ticksColor = isDarkMode ? 'hsl(var(--muted-foreground) / 0.8)' : 'hsl(var(--muted-foreground) / 0.8)';

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Keep legend hidden
      },
      tooltip: {
        enabled: true,
        mode: "index", // Show tooltip for the nearest index
        intersect: false, // Don't require direct hover over point
        backgroundColor: tooltipBackgroundColor,
        titleColor: tooltipTitleColor,
        bodyColor: tooltipBodyColor,
        borderColor: isDarkMode ? "hsl(var(--border))" : "hsl(var(--border))", // Use border variable
        borderWidth: 1,
        padding: 8, // Add some padding
        displayColors: false, // Hide the color box in tooltip
        // Custom tooltip content formatter
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            let label = context.dataset.label || "";
            if (label) {
              label = ` ${label}`;
            } // Add space if label exists
            if (context.parsed.y !== null) {
              // Format the value as currency for the tooltip
              label = formatCurrency(context.parsed.y, "usd", 4) + label; // Show more precision in tooltip
            }
            return label;
          },
          title: function () {
            // Hide the default title (which is usually the x-axis label)
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        display: false, // Keep axes hidden for mini-charts
        grid: { display: false },
      },
      y: {
        display: false, // Keep axes hidden for mini-charts
        grid: { display: false },
        grace: "10%", // Add slightly more grace/padding
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    elements: {
      line: {
        // Defined in dataset now (tension, borderWidth)
      },
      point: {
        // Defined in dataset now (pointRadius, pointHoverRadius)
      },
    },
  };
}

// Add more functions for different chart types (Bar, Doughnut) or specific configurations
// export function getBarChartOptions(...) {}
// export function prepareDoughnutChartData(...) {}
// --- End of File ---
