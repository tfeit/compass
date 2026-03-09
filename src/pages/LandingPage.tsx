import { PageShell } from '../components/layout/PageShell';
import { Button } from '../components/ui/Button';
import { useQuizContext } from '../context/QuizContext';

export function LandingPage() {
  const { resetQuiz } = useQuizContext();

  return (
    <PageShell>
      <div className="flex flex-1 flex-col items-center justify-center w-full min-h-0">
          <Button onClick={resetQuiz}>Suche starten</Button>
      </div>
    </PageShell>
  );
}
