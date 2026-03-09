import { Button } from '../ui/Button';

interface QuizNavigationProps {
  onBack?: () => void;
  onNext: () => void;
  canGoNext: boolean;
  nextLabel?: string;
  showBack?: boolean;
}

export function QuizNavigation({
  onBack,
  onNext,
  canGoNext,
  nextLabel = 'Weiter',
  showBack = true,
}: QuizNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8 gap-4">
      {showBack && onBack ? (
        <Button variant="outline" onClick={onBack}>
          Zurück
        </Button>
      ) : (
        <span />
      )}
      <Button variant={nextLabel === 'Weiter' ? 'primary' : 'outline'} onClick={onNext} disabled={!canGoNext}>
        {nextLabel}
      </Button>
    </div>
  );
}
