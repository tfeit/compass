import type { Organisation } from './organisation';

/** Ausgewählte Werte pro Term-Dimension (ohne ikom) */
export interface UserProfile {
  zielgruppen?: string[];
  handlungsfelder?: string[];
  bildungsabschnitte?: string[];
  regionen?: string[];
  sdgs?: string[];
  evaluation?: string[];
}

export interface ScoredOrganisation extends Organisation {
  matchingScore: number;
}
