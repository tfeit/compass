/** Adresse (API: address) */
export interface OrganisationAddress {
  street?: string;
  zip?: string;
  city?: string;
  state?: string;
  country?: string;
  geo_lat?: string;
  geo_lng?: string;
}

/** Soziale Links (API: social) */
export interface OrganisationSocial {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string | null;
  x?: string;
  youtube?: string;
}

/** Taxonomie (API: terms) */
export interface OrganisationTerms {
  handlungsfelder?: string[];
  bildungsabschnitte?: string[];
  regionen?: string[];
  sdgs?: string[];
  tags?: string[];
  zielgruppen?: string[];
  ikom?: string[];
  evaluation?: string[];
}

/**
 * Organisation – entspricht der API-Response von POST /api/listing
 * (slug/id werden beim Abruf ergänzt; logo/cover nach Build ggf. lokale Pfade)
 */
export interface Organisation {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  summary?: string;
  logo?: string;
  cover?: string;
  video?: string;
  website?: string;
  email?: string;
  phone?: string;
  actions_radius?: string;
  legal_form?: string;
  address?: OrganisationAddress;
  social?: OrganisationSocial;
  terms?: OrganisationTerms;
  /** Für Matching: aus terms.zielgruppen abgeleitet (normalisierte Werte) */
  target_groups?: string[];
  /** Für Matching: aus terms.tags / handlungsfelder abgeleitet */
  topics?: string[];
}
