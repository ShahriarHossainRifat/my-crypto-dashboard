// src/components/dashboard/Filters.tsx (Verify)
// --- Start of File ---
"use client";

import React from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface FiltersProps {
  searchTerm: string;
  sortOption: string;
  onSearchChange: (term: string) => void;
  onSortChange: (option: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  searchTerm,
  sortOption,
  onSearchChange,
  onSortChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  // Ensure this handler calls the prop function correctly
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value); // Pass the selected value to the parent handler
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:w-auto sm:max-w-xs lg:max-w-sm">
        <Input
          type="text"
          placeholder="Search coins (e.g., Bitcoin, BTC)..."
          value={searchTerm}
          onChange={handleInputChange}
          aria-label="Search coins"
          className="h-9"
        />
      </div>
      <div className="w-full sm:w-auto sm:min-w-[180px]">
        <Select
          value={sortOption} // Controlled by parent state
          onChange={handleSortChange} // Trigger parent handler on change
          aria-label="Sort by"
          className="h-9"
        >
          <option value="market_cap_desc">Sort by Market Cap (High-Low)</option>
          <option value="market_cap_asc">Sort by Market Cap (Low-High)</option>
          <option value="volume_desc">Sort by Volume (High-Low)</option>
          <option value="volume_asc">Sort by Volume (Low-High)</option>
          <option value="id_asc">Sort by Name (A-Z)</option>
          <option value="id_desc">Sort by Name (Z-A)</option>
        </Select>
      </div>
    </div>
  );
};
export default Filters;
// --- End of File ---
