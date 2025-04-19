// src/app/error.tsx
"use client"; // Error components must be Client Components

import { useEffect } from "react";
// Optional: Use a Button component if you created one
// import Button from '@/components/ui/Button';

interface ErrorBoundaryProps {
  error: Error & { digest?: string }; // Error object, potentially with digest
  reset: () => void; // Function to attempt recovery
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service (e.g., Sentry, LogRocket)
    // In a real app, you'd send this somewhere more persistent than console.error
    console.error("Unhandled Error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 w-full min-h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-semibold mb-4 text-red-600 dark:text-red-500">
        Something went wrong!
      </h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400">
        An unexpected error occurred. Please try again.
      </p>
      {/* Optional: Display error details during development */}
      {process.env.NODE_ENV === "development" && (
        <pre className="text-xs text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto max-w-full mb-6">
          {error?.message || "No error message available."}
          {error?.stack && `\n\nStack Trace:\n${error.stack}`}
          {error?.digest && `\n\nDigest: ${error.digest}`}
        </pre>
      )}
      <button
        // Example using basic button styling - replace with your Button component if preferred
        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-semibold rounded-md shadow transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--background)] focus:ring-[var(--color-primary-light)]"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
