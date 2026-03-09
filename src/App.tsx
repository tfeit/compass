import { QuizProvider, useQuizContext } from './context/QuizContext';
import { LandingPage } from './pages/LandingPage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';

function AppContent() {
  const { phase } = useQuizContext();

  if (phase === 'landing') return <LandingPage />;
  if (phase === 'quiz') return <QuizPage />;
  if (phase === 'results') return <ResultsPage />;

  return <LandingPage />;
}

export default function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}
