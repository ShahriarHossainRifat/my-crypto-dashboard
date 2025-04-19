// src/components/ui/Select.tsx
import * as React from "react";
import { FaChevronDown } from "react-icons/fa6"; // Icon for dropdown arrow

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={`
            flex h-10 w-full items-center justify-between rounded-md border border-[var(--input)]
            bg-[var(--background)] px-3 py-2 text-sm
            ring-offset-[var(--background)] placeholder:text-gray-500 dark:placeholder:text-gray-400/70
            focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            appearance-none // Remove default system appearance
            pr-8 // Add padding for the custom arrow icon
            ${className}
          `}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {/* Custom dropdown indicator */}
        <FaChevronDown
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    );
  }
);
Select.displayName = "Select";

export default Select;

// Example Usage within another component:
/*
<Select defaultValue="market_cap_desc">
  <option value="market_cap_desc">Market Cap Desc</option>
  <option value="market_cap_asc">Market Cap Asc</option>
  <option value="volume_desc">Volume Desc</option>
  <option value="volume_asc">Volume Asc</option>
  <option value="id_asc">Name Asc</option>
  <option value="id_desc">Name Desc</option>
</Select>
*/
