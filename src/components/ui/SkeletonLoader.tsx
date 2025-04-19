// src/components/ui/SkeletonLoader.tsx (Updated Styling)
// --- Start of File ---
import React from "react";

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  // No specific props needed for this basic version,
  // but accepts standard div attributes like className.
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={`
        animate-pulse // Use standard pulse
        rounded-md
        bg-muted // Use the muted background color from theme
        dark:opacity-80 // Slightly less opaque in dark mode if needed
        ${className} // Allow overriding/extending styles
      `}
      {...props}
    />
  );
};

export default SkeletonLoader;
// --- End of File ---
