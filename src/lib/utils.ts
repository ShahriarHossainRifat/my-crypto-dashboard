// src/lib/utils.ts
// --- Start of File ---

/**
 * Formats a number as a currency string (e.g., USD).
 * Handles large and small numbers appropriately.
 * @param value - The number to format.
 * @param currency - The currency code (default: 'usd').
 * @param maximumFractionDigits - Adjust precision based on value.
 * @returns Formatted currency string.
 */
export function formatCurrency(
  value: number | undefined | null,
  currency: string = "usd",
  maximumFractionDigits?: number
): string {
  if (value === null || typeof value === "undefined") {
    return "N/A";
  }

  let resolvedMaxDigits = maximumFractionDigits;
  if (typeof resolvedMaxDigits === "undefined") {
    if (Math.abs(value) >= 1) {
      resolvedMaxDigits = 2;
    } else if (Math.abs(value) >= 0.001) {
      resolvedMaxDigits = 4;
    } else {
      resolvedMaxDigits = 8;
    }
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: resolvedMaxDigits,
  });

  return formatter.format(value);
}

/**
 * Formats a number as a percentage string.
 * @param value - The number to format (e.g., 5.2 for 5.2%).
 * @param minimumFractionDigits - Minimum decimal places.
 * @param maximumFractionDigits - Maximum decimal places.
 * @returns Formatted percentage string with a '+' sign for positive values.
 */
export function formatPercentage(
  value: number | undefined | null,
  minimumFractionDigits: number = 1,
  maximumFractionDigits: number = 2
): string {
  if (value === null || typeof value === "undefined") {
    return "N/A";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: minimumFractionDigits,
    maximumFractionDigits: maximumFractionDigits,
  });

  const formattedValue = formatter.format(value);
  const sign = value > 0 ? "+" : ""; // Ensure sign is determined correctly

  // Return the evaluated template literal string
  return `${sign}${formattedValue}%`;
}

/**
 * Formats a large number into a compact representation (e.g., $1.2T, $500.5B, $25.1M).
 * @param value - The number to format.
 * @param currency - The currency code (default: 'usd').
 * @returns Compactly formatted currency string.
 */
export function formatCompactCurrency(
  value: number | undefined | null,
  currency: string = "usd"
): string {
  if (value === null || typeof value === "undefined") {
    return "N/A";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    notation: "compact",
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  if (value === 0) {
    return formatter.format(0).replace("0", "0.0");
  }

  return formatter.format(value);
}

// --- End of File ---
