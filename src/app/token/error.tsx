"use client";

import { useEffect } from 'react';

export default function TokenError({
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
    <div className="max-w-md mx-auto text-center py-8">
      <h1 className="text-2xl font-semibold mb-4">Failed to load Token Page</h1>
      <p className="mb-4 text-red-600">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        Try again
      </button>
    </div>
  );
}