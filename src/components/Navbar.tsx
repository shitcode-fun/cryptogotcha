"use client";

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-10 bg-background border-b border-black/10 dark:border-white/10 px-4 sm:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          CryptoGotcha
        </Link>
        <Link href="/" className="text-sm font-medium hover:underline">
          Home
        </Link>
        <Link href="/token" className="text-sm font-medium hover:underline">
          Token
        </Link>
      </div>
      <ConnectButton />
    </nav>
  );
}