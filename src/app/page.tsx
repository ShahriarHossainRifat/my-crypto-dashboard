// src/app/page.tsx
import ClientDashboardWrapper from "@/components/dashboard/ClientDashboardWrapper";
import { fetchMarketData } from "@/lib/apiClient";
import { DEFAULT_VS_CURRENCY, DEFAULT_PER_PAGE } from "@/lib/constants";
import type { CryptoMarketData } from "@/types/crypto";
// We will import the client wrapper component here later
// import ClientDashboardWrapper from '@/components/dashboard/ClientDashboardWrapper';

// Configure Next.js to revalidate this page periodically (e.g., every 5 minutes)
// This ensures data is refreshed without needing a full rebuild/redeploy.
// Note: Fetch requests inside Server Components can also have their own revalidation.
export const revalidate = 300; // Revalidate page every 300 seconds (5 minutes)

export default async function HomePage() {
  // Fetch initial data on the server
  // Handle potential errors during the initial fetch
  let initialData: CryptoMarketData[] = []; // Type for initial data
  let fetchError = null;

  try {
    initialData = await fetchMarketData(
      DEFAULT_VS_CURRENCY,
      1, // Fetch page 1 initially
      DEFAULT_PER_PAGE
    );
  } catch (error) {
    console.error("Failed to fetch initial market data:", error);
    // Set error state to inform the client component or display a message
    fetchError =
      error instanceof Error ? error.message : "An unknown error occurred";
    initialData = []; // Ensure data is empty on error
  }

  return (
    <div className="container mx-auto px-4 w-full">
      <h1 className="text-3xl font-bold my-6 text-center">
        Cryptocurrency Dashboard
      </h1>

      {/*
        We will replace this section later with a Client Component
        that handles the display, filtering, charting, and client-side updates (SWR).
        We pass the server-fetched initialData and any error information as props.
      */}
      {fetchError ? (
        <div className="text-center text-red-500">
          <p>Could not load initial data:</p>
          <p>{fetchError}</p>
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <ClientDashboardWrapper initialData={initialData} />
        </div>
      )}
    </div>
  );
}
