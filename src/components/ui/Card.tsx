// src/components/ui/Card.tsx
import React from "react";
import type { ChildrenProps } from "@/types"; // Import basic ChildrenProps type

// Define specific props for the Card, extending basic children props if needed
interface CardProps extends ChildrenProps {
  className?: string; // Allow passing additional CSS classes
  // Add other potential props like 'title', 'onClick', etc. if needed later
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-lg border border-[var(--border)] bg-[var(--card)]
        text-[var(--card-foreground)] shadow-sm
        p-4 md:p-6 // Add some padding
        ${className} // Merge additional classes
      `}
    >
      {children}
    </div>
  );
};

export default Card;

// Optional: Define variants if needed (e.g., CardHeader, CardContent, CardFooter)
// Example:
// export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
//   <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
// );
// export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
//    <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>{children}</h3>
// );
// export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className = '', ...props }) => (
//    <p className={`text-sm text-muted-foreground ${className}`} {...props}>{children}</p>
// );
// export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
//   <div className={`p-6 pt-0 ${className}`}>{children}</div>
// );
// export const CardFooter: React.FC<CardProps> = ({ children, className = '' }) => (
//   <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
// );
