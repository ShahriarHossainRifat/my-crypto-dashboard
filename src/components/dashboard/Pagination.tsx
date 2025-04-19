// src/components/dashboard/Pagination.tsx
"use client"; // Needs to handle clicks, so it's a client component

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number; // Calculate this based on total items and items per page
  onPageChange: (page: number) => void;
  // Optional: Add siblingCount or other props for more advanced pagination display
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Basic pagination - just Prev/Next. Could be expanded to show page numbers.
  if (totalPages <= 1) {
    return null; // Don't render pagination if only one page
  }

  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[var(--background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[var(--input)] hover:bg-gray-100 dark:hover:bg-gray-800 h-9 w-9 p-0 disabled:text-gray-400 dark:disabled:text-gray-600"
      >
        <FaChevronLeft className="h-4 w-4" />
      </button>

      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[var(--background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[var(--input)] hover:bg-gray-100 dark:hover:bg-gray-800 h-9 w-9 p-0 disabled:text-gray-400 dark:disabled:text-gray-600"
      >
        <FaChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
