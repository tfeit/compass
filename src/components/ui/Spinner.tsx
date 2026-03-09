export function Spinner({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-block w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin ${className}`}
      aria-label="Lädt"
    />
  );
}
