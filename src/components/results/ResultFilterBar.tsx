import { type ReactNode } from 'react';

interface ResultFilterBarProps {
  children?: ReactNode;
  className?: string;
}

export function ResultFilterBar({ children, className = '' }: ResultFilterBarProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 sm:gap-3 mb-6 ${className}`}
      role="group"
      aria-label="Filter"
    >
      {children}
    </div>
  );
}

interface FilterChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function FilterChip({ label, selected, onToggle }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-1 ${
        selected
          ? 'bg-primary text-white'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary-hover'
      }`}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
