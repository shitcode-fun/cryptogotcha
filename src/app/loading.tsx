export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">
      <div className="h-16 bg-gray-200 dark:bg-gray-700"></div>
      <main className="flex-grow space-y-4 p-4 sm:p-8">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </main>
      <div className="h-12 bg-gray-200 dark:bg-gray-700"></div>
    </div>
  );
}