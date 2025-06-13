import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to CryptoGotcha</h1>
      <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
        Your virtual pets on Base L2 blockchain.
      </p>
      <Link
        href="/token"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors hover:bg-blue-700"
      >
        View Token Info
      </Link>
    </div>
  );
}
