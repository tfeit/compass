import { ProgressBar } from '../ui/ProgressBar';

interface QuizProgressProps {
  current: number;
  total: number;
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  return (
    <div className="mb-6">
      <ProgressBar current={current} total={total} />
    </div>
  );
}
