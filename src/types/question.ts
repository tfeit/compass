export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  /** Icon-Pfad (z. B. für SDG-Icons); wird in TagChoice angezeigt */
  icon?: string;
  /** Optionaler Sortierkey (z. B. für SDG-Nummern-Reihenfolge) */
  sortKey?: string;
  /** Nur für gewichtetes Matching (z. B. target_groups/topics); bei terms nicht genutzt */
  weights?: Record<string, Record<string, number>>;
}

export interface Question {
  id: string;
  title: string;
  type: 'single_choice' | 'multi_choice';
  required: boolean;
  dimension: string;
  options: QuestionOption[];
}

export type AnswerValue = string | string[];

export interface QuizAnswers {
  [questionId: string]: AnswerValue;
}
