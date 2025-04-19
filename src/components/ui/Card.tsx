// src/components/ui/Card.tsx (Fixed Empty Interfaces)
// --- Start of File ---
import React from "react";
// No longer need ChildrenProps from types if we extend HTMLAttributes

// Main Card Props (Accepts standard div attributes)
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add any Card-specific custom props here if needed in the future
  // className is included in HTMLAttributes
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`
        rounded-lg border border-border bg-card text-card-foreground shadow-sm
        transition-colors duration-150 ease-in-out
        ${className}
      `}
      {...props} // Spread remaining props like onClick, style, id etc.
    >
      {children}
    </div>
  );
};

// --- Sub-components with Fixed Interfaces ---

// Extend corresponding HTMLAttributes for type safety & standard props
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

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

export default Card;
// --- End of File ---
