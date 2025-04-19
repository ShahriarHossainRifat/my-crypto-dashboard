// src/app/loading.tsx
import SkeletonLoader from "@/components/ui/SkeletonLoader"; // Optional: Use skeletons

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // Or just simple text: return <div>Loading page data...</div>;

  // Example using skeletons to mimic the dashboard layout
  const skeletonRowCount = 10; // Number of skeleton rows for the table area

  return (
    <div className="container mx-auto px-4 w-full animate-pulse">
      {" "}
      {/* Apply pulse to container */}
      <h1 className="text-3xl font-bold my-6 text-center text-transparent bg-gray-300 dark:bg-gray-700 rounded-md w-1/2 mx-auto h-9">
        {/* Skeleton for Title */}
      </h1>
      {/* Skeleton for Market Overview */}
      <div className="mb-6">
        <SkeletonLoader className="h-6 w-48 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonLoader className="h-24" />
          <SkeletonLoader className="h-24" />
          <SkeletonLoader className="h-24" />
          <SkeletonLoader className="h-24" />
        </div>
      </div>
      {/* Skeleton for Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <SkeletonLoader className="h-10 flex-grow w-full sm:w-auto" />
        <SkeletonLoader className="h-10 w-full sm:w-48" />
      </div>
      {/* Skeleton for Table */}
      <div className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-1">
        {/* Table Header Skeleton */}
        <SkeletonLoader className="h-10 w-full mb-1" />
        {/* Table Body Skeleton Rows */}
        <div className="space-y-1">
          {Array.from({ length: skeletonRowCount }).map((_, index) => (
            <SkeletonLoader key={index} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
