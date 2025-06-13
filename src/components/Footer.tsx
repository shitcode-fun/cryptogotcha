export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-700 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
      &copy; {new Date().getFullYear()} CryptoGotcha. All rights reserved.
    </footer>
  );
}