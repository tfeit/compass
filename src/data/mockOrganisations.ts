import type { Organisation } from '../types/organisation';

export const mockOrganisations: Organisation[] = [
  {
    id: 'org_1',
    slug: 'bildungswerk-beispiel',
    name: 'Bildungswerk Beispiel',
    summary: 'Angebote für berufliche Weiterbildung und MINT.',
    website: 'https://example.org',
    address: { city: 'Köln', state: 'NRW', country: 'DE' },
    target_groups: ['berufstaetige', 'lehrkraefte'],
    topics: ['m_i_n_t', 'digitalisierung'],
  },
  {
    id: 'org_2',
    slug: 'schulprojekt-plus',
    name: 'Schulprojekt Plus',
    summary: 'Workshops für Schülerinnen und Schüler.',
    website: 'https://example.org',
    address: { city: 'Berlin', state: 'Berlin', country: 'DE' },
    target_groups: ['schueler'],
    topics: ['m_i_n_t', 'berufsorientierung'],
  },
];
