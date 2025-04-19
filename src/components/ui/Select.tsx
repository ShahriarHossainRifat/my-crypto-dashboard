// src/components/ui/Select.tsx (Fixed Empty Interface)
// --- Start of File ---
import * as React from "react";
import { FaChevronDown } from "react-icons/fa6";

// Extend React's select attributes directly
export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}
// Provides className, value, onChange, disabled, children, etc.

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          // Use theme variables via Tailwind config
          className={`
            flex h-10 w-full items-center justify-between rounded-md border border-input
            bg-background px-3 py-2 text-sm text-foreground
            ring-offset-background placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            disabled:cursor-not-allowed disabled:opacity-50
            appearance-none // Remove default system appearance
            pr-8 // Add padding for the custom arrow icon
            ${className}
          `}
          ref={ref}
          {...props} // Spread remaining valid select attributes
        >
          {children}
        </select>
        {/* Custom dropdown indicator */}
        <FaChevronDown
          className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" // Use theme color
          aria-hidden="true"
        />
      </div>
    );
  }
);
Select.displayName = "Select";

export default Select;
// --- End of File ---
