// src/lib/chartUtils.ts
import type { ChartData, ChartOptions } from "chart.js"; // Import types from chart.js

/**
 * Example function to prepare data for a simple line chart.
 * Adapts a simple array of numbers into the structure Chart.js expects.
 *
 * @param data - Array of numerical data points (e.g., prices).
 * @param label - Label for the dataset (e.g., 'Price (7d)').
 * @param borderColor - Color for the line.
 * @param backgroundColor - Color for the area fill under the line (optional).
 * @returns ChartData object for Chart.js.
 */
export function prepareLineChartData(
  data: number[] | undefined | null,
  label: string,
  borderColor: string = "rgb(75, 192, 192)", // Default Teal
  backgroundColor?: string // Optional fill color
): ChartData<"line"> {
  const validData = data ?? [];
  const labels = validData.map((_, index) => index + 1); // Simple numerical labels

  return {
    labels: labels,
    datasets: [
      {
        label: label,
        data: validData,
        fill: !!backgroundColor, // Fill only if backgroundColor is provided
        borderColor: borderColor,
        backgroundColor: backgroundColor,
        tension: 0.1, // Slight curve to the line
        pointRadius: 0, // Hide points on the line for overview charts
        pointHoverRadius: 4, // Show point on hover
      },
    ],
  };
}

/**
 * Example function to define common options for a line chart.
 * Configures scales, tooltips, legends, etc.
 *
 * @param isDarkMode - Optional flag to adjust colors for dark mode.
 * @returns ChartOptions object for Chart.js line charts.
 */
export function getLineChartOptions(
  isDarkMode: boolean = false
): ChartOptions<"line"> {
  const gridColor = isDarkMode
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";
  const ticksColor = isDarkMode
    ? "rgba(255, 255, 255, 0.7)"
    : "rgba(0, 0, 0, 0.7)";

  return {
    responsive: true, // Make chart responsive
    maintainAspectRatio: false, // Allow chart aspect ratio to change
    plugins: {
      legend: {
        display: false, // Hide legend for simple overview charts
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
        mode: "index",
        intersect: false,
        // Optional: Customize tooltip appearance
        // callbacks: {
        //   label: function(context) {
        //      let label = context.dataset.label || '';
        //      if (label) { label += ': '; }
        //      if (context.parsed.y !== null) {
        //          // Use formatCurrency or other utils here if needed
        //         label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
        //      }
        //      return label;
        //   }
        // }
      },
    },
    scales: {
      x: {
        display: false, // Hide X-axis labels/grid
        grid: {
          display: false,
        },
      },
      y: {
        display: false, // Hide Y-axis labels/grid
        grid: {
          display: false,
        },
        grace: "5%", // Add some padding above/below max/min values
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    // Performance optimizations
    // animation: false, // Disable animations if performance is critical
    // parsing: false, // Disable data parsing if data is already in correct format
  };
}

// Add more functions for different chart types (Bar, Doughnut) or specific configurations
// export function getBarChartOptions(...) {}
// export function prepareDoughnutChartData(...) {}
