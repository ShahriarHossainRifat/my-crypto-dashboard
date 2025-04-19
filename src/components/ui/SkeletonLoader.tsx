// src/components/ui/SkeletonLoader.tsx (Fixed Empty Interface)
// --- Start of File ---
import React from "react";

// Extend React's HTML attributes for a div element
export interface SkeletonLoaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}
// No specific custom props needed for this basic version,
// but allows standard props like className, style, id etc.

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={`
        animate-pulse
        rounded-md
        bg-muted // Use the muted background color from theme
        dark:opacity-80
        ${className} // Allow overriding/extending styles
      `}
      {...props} // Spread other standard div attributes
    />
  );
};

export default SkeletonLoader;
// --- End of File ---
