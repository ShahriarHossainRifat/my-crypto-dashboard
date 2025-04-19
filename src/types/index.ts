// src/types/index.ts

// Example: Basic utility type for component props that include children
export interface ChildrenProps {
  children: React.ReactNode;
}

// Example: Type for generic API error responses (adjust based on actual API)
export interface ApiError {
  error: {
    message: string;
    code?: number | string;
  };
}

// We will add specific types for Crypto data (e.g., CryptoData) later
// when we implement the API fetching logic.

// You can also define types for themes, chart data, etc. here or in separate files within types/
export type Theme = "light" | "dark" | "system";
