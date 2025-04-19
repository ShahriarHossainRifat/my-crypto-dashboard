// src/components/ui/Card.tsx (Updated Styling)
// --- Start of File ---
import React from "react";
import type { ChildrenProps } from "@/types";

// Define specific props for the Card, extending basic children props if needed
interface CardProps extends ChildrenProps {
  className?: string; // Allow passing additional CSS classes
  // Add other potential props like 'onClick', etc.
  onClick?: () => void;
  // Add standard HTML attributes for accessibility or other needs
  // Extend React.HTMLAttributes<HTMLDivElement> if needed
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  // Use HSL variables defined in globals.css via tailwind.config.ts
  // Added subtle transition for hover effects if any are added later
  return (
    <div
      className={`
        rounded-lg border border-border bg-card text-card-foreground shadow-sm
        transition-colors duration-150 ease-in-out
        ${className}
      `}
      {...props} // Spread remaining props like onClick
    >
      {children}
    </div>
  );
};

// --- Optional Card Sub-components (Updated Styling) ---

// Type for sub-components that accept standard HTML attributes
interface CardElementProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends CardElementProps {}
interface CardContentProps extends CardElementProps {}
interface CardFooterProps extends CardElementProps {}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

// Export sub-components if you plan to use them for structure within Cards
export const CardHeader: React.FC<CardHeaderProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div
    className={`flex flex-col space-y-1.5 p-4 md:p-6 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<CardTitleProps> = ({
  className = "",
  children,
  ...props
}) => (
  <h3
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<CardDescriptionProps> = ({
  className = "",
  children,
  ...props
}) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<CardContentProps> = ({
  className = "",
  children,
  ...props
}) => (
  // Adjusted padding to be consistent if header/footer have padding
  <div className={`p-4 pt-0 md:p-6 md:pt-0 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<CardFooterProps> = ({
  className = "",
  children,
  ...props
}) => (
  <div
    className={`flex items-center p-4 pt-0 md:p-6 md:pt-0 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Default export remains the main Card container
export default Card;
// --- End of File ---
