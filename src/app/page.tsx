'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to CryptoGotcha</h1>
      <p className="mb-6">Your virtual pets on Base L2 blockchain.</p>
      <Link
        href="/token"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Token Info
      </Link>
    </div>
  );
}
