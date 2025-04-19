// src/components/dashboard/Pagination.tsx (Verify)
// --- Start of File ---
"use client";

import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange, // This prop should be called by buttons
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1); // Call prop function
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1); // Call prop function
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <button
        onClick={handlePrevious} // Ensure onClick is set
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 disabled:text-muted-foreground" // Updated styles slightly
      >
        <FaChevronLeft className="h-4 w-4" />
      </button>

      <span className="text-sm font-medium text-foreground">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext} // Ensure onClick is set
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0 disabled:text-muted-foreground" // Updated styles slightly
      >
        <FaChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Pagination;
// --- End of File ---
