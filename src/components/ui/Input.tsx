// src/components/ui/Input.tsx (Re-verified Fix)
// --- Start of File ---
import * as React from "react";

// Ensure InputProps extends React's input attributes directly
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}
// This provides className, value, onChange, type, placeholder, etc.
// and satisfies the 'no-empty-object-type' rule.

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        // Using theme variables via Tailwind config for consistency
        className={`
          flex h-10 w-full rounded-md border border-input
          bg-background px-3 py-2 text-sm text-foreground
          ring-offset-background
          file:border-0 file:bg-transparent file:text-sm file:font-medium
          placeholder:text-muted-foreground
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
        ref={ref}
        {...props} // Spread remaining valid input attributes
      />
    );
  }
);
Input.displayName = "Input"; // For better debugging names

export default Input;
// --- End of File ---
