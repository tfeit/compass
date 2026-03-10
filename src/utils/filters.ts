import type { ScoredOrganisation } from '../types/matching';
import { TERM_DIMENSIONS, type TermDimension } from '../data/questions';

export interface ResultFilters {
  zielgruppen?: string[];
  handlungsfelder?: string[];
  bildungsabschnitte?: string[];
  regionen?: string[];
  sdgs?: string[];
  evaluation?: string[];
}

function orgHasTermValue(org: ScoredOrganisation, dim: TermDimension, values: string[]): boolean {
  const arr = org.terms?.[dim];
  if (!Array.isArray(arr)) return false;
  return values.some((v) => arr!.includes(v));
}

export function filterOrganisations(
  organisations: ScoredOrganisation[],
  filters: ResultFilters
): ScoredOrganisation[] {
  return organisations.filter((org) => {
    for (const dim of TERM_DIMENSIONS) {
      const selected = filters[dim];
      if (selected?.length && !orgHasTermValue(org, dim, selected)) return false;
    }
    return true;
  });
}

export function filterByKeyword(
  organisations: ScoredOrganisation[],
  keywordInput: string
): ScoredOrganisation[] {
  const words = keywordInput
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return organisations;

  const searchable = (org: ScoredOrganisation): string => {
    const parts = [
      org.name ?? '',
      org.tagline ?? '',
      org.summary ?? '',
      typeof org.description === 'string' ? org.description.replace(/<[^>]+>/g, ' ') : '',
    ];
    if (org.terms) {
      const t = org.terms;
      parts.push(
        ...[
          t.handlungsfelder,
          t.bildungsabschnitte,
          t.regionen,
          t.sdgs,
          t.zielgruppen,
          t.evaluation,
          t.tags,
        ]
          .filter(Boolean)
          .flat()
          .join(' ')
      );
    }
    return parts.join(' ').toLowerCase();
  };

  return organisations.filter((org) => {
    const text = searchable(org);
    return words.every((w) => text.includes(w));
  });
}
