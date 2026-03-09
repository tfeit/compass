import type { Organisation } from '../types/organisation';
import type { OrganisationTerms } from '../types/organisation';
import type { UserProfile, ScoredOrganisation } from '../types/matching';
import { TERM_DIMENSIONS, type TermDimension } from '../data/questions';

function getOrgTermValues(terms: OrganisationTerms | undefined, dim: TermDimension): string[] {
  if (!terms) return [];
  const arr = terms[dim];
  return Array.isArray(arr) ? arr : [];
}

function scoreDimension(userValues: string[] | undefined, orgValues: string[]): number {
  if (!userValues?.length || !orgValues.length) return 0;
  const overlap = userValues.filter((v) => orgValues.includes(v)).length;
  return overlap / userValues.length;
}

export function matchOrganisations(
  userProfile: UserProfile,
  organisations: Organisation[]
): ScoredOrganisation[] {
  const dimensionsWithSelection = TERM_DIMENSIONS.filter(
    (dim) => (userProfile[dim]?.length ?? 0) > 0
  );
  const weightPerDim = dimensionsWithSelection.length > 0 ? 1 / dimensionsWithSelection.length : 0;

  return organisations
    .map((org): ScoredOrganisation => {
      let totalScore = 0;
      for (const dim of dimensionsWithSelection) {
        const userValues = userProfile[dim];
        const orgValues = getOrgTermValues(org.terms, dim);
        totalScore += scoreDimension(userValues, orgValues) * weightPerDim;
      }
      return { ...org, matchingScore: totalScore };
    })
    .sort((a, b) => b.matchingScore - a.matchingScore);
}
