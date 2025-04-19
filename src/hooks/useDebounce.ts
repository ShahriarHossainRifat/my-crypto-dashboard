// src/hooks/useDebounce.ts
"use client"; // Custom hooks using React state/effects need to be client-side compatible

import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a value.
 * Useful for delaying updates based on user input (e.g., search filters).
 *
 * @template T The type of the value to debounce.
 * @param {T} value The value to debounce.
 * @param {number} delay The debounce delay in milliseconds.
 * @returns {T} The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Update debounced value after the specified delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cleanup function to clear the timeout if value changes before delay ends,
      // or if the component unmounts.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export default useDebounce;
