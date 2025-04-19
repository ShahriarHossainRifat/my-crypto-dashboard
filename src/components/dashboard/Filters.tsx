// src/components/dashboard/Filters.tsx
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
  // Handler for the search input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  // Handler for the sort select change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Ensure the callback passed from the parent is called with the new value
    onSortChange(event.target.value);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
      {/* Search Input */}
      <div className="flex-grow w-full sm:w-auto">
        <Input
          type="text"
          placeholder="Search coins..."
          value={searchTerm}
          onChange={handleInputChange} // Uses the input handler
          aria-label="Search coins"
        />
      </div>

      {/* Sort Select */}
      <div className="w-full sm:w-auto">
        <Select
          value={sortOption} // Controlled component: value comes from parent state
          onChange={handleSortChange} // Uses the select handler
          aria-label="Sort by"
        >
          {/* Ensure values match expected API parameters */}
          <option value="market_cap_desc">Market Cap Desc</option>
          <option value="market_cap_asc">Market Cap Asc</option>
          <option value="volume_desc">Volume Desc</option>
          <option value="volume_asc">Volume Asc</option>
          {/* Note: CoinGecko /markets 'order' param might not support sorting directly by % change */}
          {/* Sorting by change might require client-side logic after fetching */}
          {/* <option value="price_change_percentage_24h_desc">24h Change Desc</option> */}
          {/* <option value="price_change_percentage_24h_asc">24h Change Asc</option> */}
          <option value="id_asc">Name Asc (A-Z)</option>
          <option value="id_desc">Name Desc (Z-A)</option>
        </Select>
      </div>
    </div>
  );
};

export default Filters;
// --- End of File ---
