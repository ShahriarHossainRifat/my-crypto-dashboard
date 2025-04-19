// src/components/ui/SkeletonLoader.tsx (Fixed Empty Interface)
// --- Start of File ---
import React from "react";

// Extend React's HTML attributes for a div element
export interface SkeletonLoaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}
// Provides className, style, id, etc.

// Use React.FC here is fine, or remove if preferred
const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      // Use theme variable via Tailwind config
      className={`
        animate-pulse
        rounded-md
        bg-muted
        dark:opacity-80
        ${className}
      `}
      {...props} // Spread standard div attributes
    />
  );
};

export default SkeletonLoader;
// --- End of File ---
