import { useMemo } from 'react';
import type { UserProfile } from '../types/matching';
import type { QuizAnswers } from '../types/question';
import type { Organisation } from '../types/organisation';
import { questions, TERM_DIMENSIONS, type TermDimension } from '../data/questions';
import { matchOrganisations } from '../utils/matching';

function buildUserProfile(answers: QuizAnswers): UserProfile {
  const profile: UserProfile = {};
  const activeDims = new Set<TermDimension>(TERM_DIMENSIONS);

  for (const q of questions) {
    const value = answers[q.id];
    if (value == null) continue;
    if (!activeDims.has(q.dimension as TermDimension)) continue;

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
