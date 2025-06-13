"use client";

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-colors"
        >
          CryptoGotcha
        </Link>
        <Link
          href="/"
          className="text-sm font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          Home
        </Link>
        <Link
          href="/token"
          className="text-sm font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          Token
        </Link>
      </div>
      <ConnectButton />
    </nav>
  );
}