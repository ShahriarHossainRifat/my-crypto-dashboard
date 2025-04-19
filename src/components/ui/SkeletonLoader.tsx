// src/components/ui/SkeletonLoader.tsx
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
        animate-pulse // Use Tailwind's pulse animation
        rounded-md
        bg-gray-300 dark:bg-gray-700 // Placeholder background color
        ${className} // Allow overriding/extending styles
      `}
      {...props}
    />
  );
};

export default SkeletonLoader;
