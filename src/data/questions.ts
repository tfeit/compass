import type { Question } from '../types/question';

const ALL_TERM_DIMENSIONS = [
  'zielgruppen',
  'handlungsfelder',
  'bildungsabschnitte',
  'regionen',
  'sdgs',
  'evaluation',
] as const;

export type TermDimension = (typeof ALL_TERM_DIMENSIONS)[number];

const ALL_QUESTIONS: Question[] = [
  {
    id: 'zielgruppen',
    title: 'Für wen suchst du ein Angebot?',
    type: 'multi_choice',
    required: true,
    dimension: 'zielgruppen',
    options: [
      { id: 'zg1', label: 'Schüler*innen', value: 'Schüler*innen' },
      { id: 'zg2', label: 'Lehrer*innen', value: 'Lehrer*innen' },
      { id: 'zg3', label: 'Schulen', value: 'Schulen' },
      { id: 'zg4', label: 'Schulleitungen', value: 'Schulleitungen' },
      { id: 'zg5', label: 'Eltern und Erziehungsberechtigte', value: 'Eltern und Erziehungsberechtigte' },
      { id: 'zg6', label: 'Außerschulische Akteure', value: 'Außerschulische Akteure' },
      { id: 'zg7', label: 'Fördervereine', value: 'Fördervereine' },
      { id: 'zg8', label: 'Senior*innen', value: 'Senior*innen' },
    ],
  },
  {
    id: 'handlungsfelder',
    title: 'Welche Handlungsfelder interessieren dich?',
    type: 'multi_choice',
    required: false,
    dimension: 'handlungsfelder',
    options: [
      { id: 'hf1', label: 'MINT-Bildung', value: 'MINT-Bildung' },
      { id: 'hf2', label: 'Kulturelle Bildung', value: 'Kulturelle Bildung' },
      { id: 'hf3', label: 'Politische Bildung', value: 'Politische Bildung' },
      { id: 'hf4', label: 'Gesundheit und Prävention', value: 'Gesundheit und Prävention' },
      { id: 'hf5', label: 'Lehrer*innenbildung', value: 'Lehrer*innenbildung' },
      { id: 'hf6', label: 'Persönlichkeitsentwicklung', value: 'Persönlichkeitsentwicklung' },
      { id: 'hf7', label: 'Bildung für nachhaltige Entwicklung', value: 'Bildung für nachhaltige Entwicklung' },
      { id: 'hf8', label: 'Inklusion', value: 'Inklusion' },
      { id: 'hf9', label: 'Diversität', value: 'Diversität' },
      { id: 'hf10', label: 'Interkulturelle Bildung', value: 'Interkulturelle Bildung' },
      { id: 'hf11', label: 'Integration von Zugewanderten, Flucht und Migration', value: 'Integration von Zugewanderten, Flucht und Migration' },
      { id: 'hf12', label: 'Sprachbildung', value: 'Sprachbildung' },
      { id: 'hf13', label: 'Erzieher*innenbildung', value: 'Erzieher*innenbildung' },
      { id: 'hf14', label: 'Familien- und Elternbildung', value: 'Familien- und Elternbildung' },
      { id: 'hf15', label: 'Bildungsmanagement', value: 'Bildungsmanagement' },
      { id: 'hf16', label: 'Bildungssystem', value: 'Bildungssystem' },
      { id: 'hf17', label: 'Ehrenamt- und Engagementförderung', value: 'Ehrenamt- und Engagementförderung' },
    ],
  },
  {
    id: 'bildungsabschnitte',
    title: 'Welche Bildungsabschnitte sind dir wichtig?',
    type: 'multi_choice',
    required: false,
    dimension: 'bildungsabschnitte',
    options: [
      { id: 'ba1', label: 'Schulische Bildung', value: 'Schulische Bildung' },
      { id: 'ba2', label: 'Frühkindliche Bildung', value: 'Frühkindliche Bildung' },
      { id: 'ba3', label: 'Kita', value: 'Kita' },
      { id: 'ba4', label: 'Übergang Kita – Schule', value: 'Übergang Kita – Schule' },
      { id: 'ba5', label: 'Übergang Schule – Beruf', value: 'Übergang Schule – Beruf' },
      { id: 'ba6', label: 'Berufsbezogene Bildung', value: 'Berufsbezogene Bildung' },
      { id: 'ba7', label: 'Hochschule', value: 'Hochschule' },
      { id: 'ba8', label: 'Nachberufliche Bildung', value: 'Nachberufliche Bildung' },
    ],
  },
  {
    id: 'regionen',
    title: 'Für welche Regionen suchst du?',
    type: 'multi_choice',
    required: false,
    dimension: 'regionen',
    options: [
      { id: 'r1', label: 'Berlin', value: 'Berlin' },
      { id: 'r2', label: 'Bayern', value: 'Bayern' },
      { id: 'r3', label: 'Hamburg', value: 'Hamburg' },
      { id: 'r4', label: 'Nordrhein-Westfalen', value: 'Nordrhein-Westfalen' },
      { id: 'r5', label: 'Baden-Württemberg', value: 'Baden-Württemberg' },
      { id: 'r6', label: 'Hessen', value: 'Hessen' },
      { id: 'r7', label: 'Niedersachsen', value: 'Niedersachsen' },
      { id: 'r8', label: 'Brandenburg', value: 'Brandenburg' },
      { id: 'r9', label: 'Rheinland-Pfalz', value: 'Rheinland-Pfalz' },
      { id: 'r10', label: 'Sachsen', value: 'Sachsen' },
      { id: 'r11', label: 'Schleswig-Holstein', value: 'Schleswig-Holstein' },
      { id: 'r12', label: 'Thüringen', value: 'Thüringen' },
      { id: 'r13', label: 'Sachsen-Anhalt', value: 'Sachsen-Anhalt' },
      { id: 'r14', label: 'Mecklenburg-Vorpommern', value: 'Mecklenburg-Vorpommern' },
      { id: 'r15', label: 'Bremen', value: 'Bremen' },
      { id: 'r16', label: 'Saarland', value: 'Saarland' },
    ],
  },
  {
    id: 'sdgs',
    title: 'Welche Themenfelder sind dir wichtig?',
    type: 'multi_choice',
    required: false,
    dimension: 'sdgs',
    options: [
      { id: 'sdg1', label: 'SDG 1 - Keine Armut', value: 'SDG 1 - Keine Armut', icon: '/icons/sdg-1.svg', sortKey: '01' },
      { id: 'sdg2', label: 'SDG 2 - Kein Hunger', value: 'SDG 2 - Kein Hunger', icon: '/icons/sdg-2.svg', sortKey: '02' },
      { id: 'sdg3', label: 'SDG 3 - Gesundheit und Wohlergehen', value: 'SDG 3 - Gesundheit und Wohlergehen', icon: '/icons/sdg-3.svg', sortKey: '03' },
      { id: 'sdg4', label: 'SDG 4 - Hochwertige Bildung', value: 'SDG 4 - Hochwertige Bildung', icon: '/icons/sdg-4.svg', sortKey: '04' },
      { id: 'sdg5', label: 'SDG 5 - Geschlechter-Gleichheit', value: 'SDG 5 - Geschlechter-Gleichheit', icon: '/icons/sdg-5.svg', sortKey: '05' },
      { id: 'sdg6', label: 'SDG 6 - Sauberes Wasser und Sanitäreinrichtungen', value: 'SDG 6 - Sauberes Wasser und Sanitäreinrichtungen', icon: '/icons/sdg-6.svg', sortKey: '06' },
      { id: 'sdg7', label: 'SDG 7 - Bezahlbare und saubere Energie', value: 'SDG 7 - Bezahlbare und saubere Energie', icon: '/icons/sdg-7.svg', sortKey: '07' },
      { id: 'sdg8', label: 'SDG 8 - Menschenwürdige Arbeit und Wirtschaftswachstum', value: 'SDG 8 - Menschenwürdige Arbeit und Wirtschaftswachstum', icon: '/icons/sdg-8.svg', sortKey: '08' },
      { id: 'sdg9', label: 'SDG 9 - Industrie, Innovation und Infrastruktur', value: 'SDG 9 - Industrie, Innovation und Infrastruktur', icon: '/icons/sdg-9.svg', sortKey: '09' },
      { id: 'sdg10', label: 'SDG 10 - Weniger Ungleichheiten', value: 'SDG 10 - Weniger Ungleichheiten', icon: '/icons/sdg-10.svg', sortKey: '10' },
      { id: 'sdg11', label: 'SDG 11 - Nachhaltige Städte und Siedlungen', value: 'SDG 11 - Nachhaltige Städte und Siedlungen', icon: '/icons/sdg-11.svg', sortKey: '11' },
      { id: 'sdg12', label: 'SDG 12 - Verantwortungsvoller Konsum und Produktion', value: 'SDG 12 - Verantwortungsvoller Konsum und Produktion', icon: '/icons/sdg-12.svg', sortKey: '12' },
      { id: 'sdg13', label: 'SDG 13 - Massnahmen zum Klimaschutz', value: 'SDG 13 - Massnahmen zum Klimaschutz', icon: '/icons/sdg-13.svg', sortKey: '13' },
      { id: 'sdg14', label: 'SDG 14 - Leben unter Wasser', value: 'SDG 14 - Leben unter Wasser', icon: '/icons/sdg-14.svg', sortKey: '14' },
      { id: 'sdg15', label: 'SDG 15 - Leben an Land', value: 'SDG 15 - Leben an Land', icon: '/icons/sdg-15.svg', sortKey: '15' },
      { id: 'sdg16', label: 'SDG 16 - Frieden, Gerechtigkeit und starke Institutionen', value: 'SDG 16 - Frieden, Gerechtigkeit und starke Institutionen', icon: '/icons/sdg-16.svg', sortKey: '16' },
      { id: 'sdg17', label: 'SDG 17 - Partnerschaften zur Erreichung der Ziele', value: 'SDG 17 - Partnerschaften zur Erreichung der Ziele', icon: '/icons/sdg-17.svg', sortKey: '17' },
    ],
  },
  {
    id: 'evaluation',
    title: 'In welcher Form sollte die Organisation oder ihre Angebote evaluiert werden?',
    type: 'multi_choice',
    required: false,
    dimension: 'evaluation',
    options: [
      { id: 'ev1', label: 'Selbstevaluation', value: 'Selbstevaluation' },
      { id: 'ev2', label: 'Externe Evaluation', value: 'Externe Evaluation' },
      { id: 'ev3', label: 'Unabhängige wissenschaftliche Begleitforschung', value: 'Unabhängige wissenschaftliche Begleitforschung' },
      { id: 'ev4', label: 'Zertifizierung', value: 'Zertifizierung' },
    ],
  },
];

const ENABLED_QUESTION_IDS: Record<string, boolean> = {
  sdgs: false,
  evaluation: false,
};

export const questions: Question[] = ALL_QUESTIONS.filter(
  (q) => ENABLED_QUESTION_IDS[q.id] ?? true
);

export const TERM_DIMENSIONS: TermDimension[] = Array.from(
  new Set(
    questions
      .map((q) => q.dimension)
      .filter((d): d is TermDimension =>
        (ALL_TERM_DIMENSIONS as readonly string[]).includes(d)
      )
  )
);
