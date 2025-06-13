"use client";

export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10 py-4 text-center text-sm">
      &copy; {new Date().getFullYear()} CryptoGotcha. All rights reserved.
    </footer>
  );
}