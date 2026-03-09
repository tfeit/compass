import { useCallback } from 'react';
import { useQuizContext } from '../context/QuizContext';
import { questions } from '../data/questions';
import type { Question } from '../types/question';
import type { AnswerValue } from '../types/question';

export function useQuiz() {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswer,
    questionsCount,
    setPhase,
  } = useQuizContext();

  const currentQuestion: Question | null =
    questions[currentQuestionIndex] ?? null;

  const currentAnswer: AnswerValue | undefined = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  const hasSelection = currentQuestion && (
    currentAnswer !== undefined &&
    currentAnswer !== '' &&
    (Array.isArray(currentAnswer) ? currentAnswer.length > 0 : true)
  );
  const canGoNext = !!currentQuestion;

  const goNext = useCallback(() => {
    if (currentQuestionIndex >= questionsCount - 1) {
      setPhase('results');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [currentQuestionIndex, questionsCount, setPhase, setCurrentQuestionIndex]);

  const goBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  }, [currentQuestionIndex, setCurrentQuestionIndex]);

  return {
    currentQuestion,
    currentQuestionIndex,
    questionsCount,
    currentAnswer,
    setAnswer,
    canGoNext,
    hasSelection,
    goNext,
    goBack,
    answers,
  };
}
