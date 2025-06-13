export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 rounded ${className} animate-pulse`}
    />
  );
}