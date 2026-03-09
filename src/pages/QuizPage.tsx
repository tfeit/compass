import { QuestionCard } from '../components/quiz/QuestionCard';
import { QuizNavigation } from '../components/quiz/QuizNavigation';
import { QuizProgress } from '../components/quiz/QuizProgress';
import { PageShell } from '../components/layout/PageShell';
import { RadioGroup } from '../components/ui/RadioGroup';
import { TagChoice } from '../components/ui/TagChoice';
import { useQuiz } from '../hooks/useQuiz';

export function QuizPage() {
  const {
    currentQuestion,
    currentQuestionIndex,
    questionsCount,
    currentAnswer,
    setAnswer,
    canGoNext,
    hasSelection,
    goNext,
    goBack,
  } = useQuiz();

  if (!currentQuestion) {
    return null;
  }

  const isMulti = currentQuestion.type === 'multi_choice';
  const value = currentAnswer;
  const singleValue = typeof value === 'string' ? value : value?.[0] ?? null;
  const multiValue = Array.isArray(value) ? value : [];

  return (
    <PageShell>
        <QuizProgress current={currentQuestionIndex + 1} total={questionsCount} />
      <div id="quiz-progress" className="flex my-auto flex-col justify-between h-full min-h-0">
        <div
          key={currentQuestion.id}
          className="animate-fade-in"
          role="region"
          aria-label={`Frage ${currentQuestionIndex + 1} von ${questionsCount}`}
        >
        <QuestionCard title={currentQuestion.title}>
          {isMulti ? (
            <TagChoice
              name={currentQuestion.id}
              options={currentQuestion.options.map((o) => ({
                id: o.id,
                value: o.value,
                label: o.label,
                icon: o.icon,
                sortKey: o.sortKey,
              }))}
              value={multiValue}
              onChange={(v) => setAnswer(currentQuestion.id, v)}
            />
          ) : (
            <RadioGroup
              name={currentQuestion.id}
              options={currentQuestion.options.map((o) => ({
                id: o.id,
                value: o.value,
                label: o.label,
              }))}
              value={singleValue}
              onChange={(v) => setAnswer(currentQuestion.id, v)}
            />
          )}
        </QuestionCard>
        </div>
      </div>

      <QuizNavigation
        onBack={goBack}
        onNext={goNext}
        canGoNext={canGoNext}
        nextLabel={
          hasSelection
            ? (currentQuestionIndex >= questionsCount - 1 ? 'Ergebnis anzeigen' : 'Weiter')
            : 'Überspringen'
        }
        showBack={currentQuestionIndex > 0}
      />
    </PageShell>
  );
}

