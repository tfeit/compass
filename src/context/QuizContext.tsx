import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { QuizAnswers } from '../types/question';
import { questions } from '../data/questions';

type AppPhase = 'landing' | 'quiz' | 'results';

interface QuizContextValue {
  phase: AppPhase;
  setPhase: (phase: AppPhase) => void;
  answers: QuizAnswers;
  setAnswer: (questionId: string, value: string | string[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  questionsCount: number;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>('landing');
  const [answers, setAnswersState] = useState<QuizAnswers>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const setAnswer = useCallback((questionId: string, value: string | string[]) => {
    setAnswersState((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const resetQuiz = useCallback(() => {
    setAnswersState({});
    setCurrentQuestionIndex(0);
    setPhase('quiz');
  }, []);

  const value = useMemo<QuizContextValue>(
    () => ({
      phase,
      setPhase,
      answers,
      setAnswer,
      currentQuestionIndex,
      setCurrentQuestionIndex,
      questionsCount: questions.length,
      resetQuiz,
    }),
    [phase, answers, setAnswer, currentQuestionIndex, resetQuiz]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuizContext() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuizContext must be used within QuizProvider');
  return ctx;
}
