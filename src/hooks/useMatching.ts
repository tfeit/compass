import { useMemo } from 'react';
import type { UserProfile } from '../types/matching';
import type { QuizAnswers } from '../types/question';
import type { Organisation } from '../types/organisation';
import { questions } from '../data/questions';
import { matchOrganisations } from '../utils/matching';
import type { TermDimension } from '../data/questions';

const TERM_DIMS: TermDimension[] = ['zielgruppen', 'handlungsfelder', 'bildungsabschnitte', 'regionen', 'sdgs', 'evaluation'];

function buildUserProfile(answers: QuizAnswers): UserProfile {
  const profile: UserProfile = {};

  for (const q of questions) {
    const value = answers[q.id];
    if (value == null) continue;
    if (!TERM_DIMS.includes(q.dimension as TermDimension)) continue;

    const selectedValues = typeof value === 'string' ? [value] : value;
    if (selectedValues.length === 0) continue;

    profile[q.dimension as keyof UserProfile] = selectedValues;
  }

  return profile;
}

export function useMatching(organisations: Organisation[], answers: QuizAnswers) {
  return useMemo(() => {
    const profile = buildUserProfile(answers);
    return matchOrganisations(profile, organisations);
  }, [organisations, answers]);
}
