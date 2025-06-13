"use client";

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html>
      <body className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-6 bg-white dark:bg-gray-800 rounded shadow text-center">
          <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
          <p className="mb-4 text-red-600">{error.message}</p>
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}