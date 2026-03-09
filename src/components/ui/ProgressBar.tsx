interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percent = total > 0 ? Math.min(100, (current / total) * 100) : 0;
  return (
    <div className={`w-full bg-secondary rounded-full h-2 overflow-hidden ${className}`} role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label={`Frage ${current} von ${total}`}>
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
