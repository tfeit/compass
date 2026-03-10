import { useState } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { Section } from '../components/layout/Section';
import { ResultCard } from '../components/results/ResultCard';
import { ResultList } from '../components/results/ResultList';
import { OrganisationDetailModal } from '../components/results/OrganisationDetailModal';
import { Button } from '../components/ui/Button';
import { useQuizContext } from '../context/QuizContext';
import { useMatching } from '../hooks/useMatching';
import { useOrganisations } from '../hooks/useOrganisations';
import { Spinner } from '../components/ui/Spinner';
import type { ScoredOrganisation } from '../types/matching';

export function ResultsPage() {
  const { answers, setPhase } = useQuizContext();
  const { organisations, loading, error } = useOrganisations();
  const scored = useMatching(organisations, answers);
  const filtered = scored.filter((org) => org.matchingScore >= 0.5);
  const [selectedOrg, setSelectedOrg] = useState<ScoredOrganisation | null>(null);

  return (
    <PageShell>
      <Section>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Dein Ergebnis
        </h1>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm" role="alert">
            Daten konnten nicht geladen werden. Es werden Beispieldaten angezeigt.
          </div>
        )}
        {loading && (
          <div className="flex items-center justify-center py-12" aria-live="polite">
            <Spinner className="mr-2" />
            <span className="text-secondary-muted">Organisationen werden geladen…</span>
          </div>
        )}
        {!loading && (
          <ResultList isEmpty={filtered.length === 0}>
            {filtered.map((org) => (
              <ResultCard
                key={org.id}
                name={org.name}
                score={org.matchingScore}
                imageUrl={org.logo ?? org.cover}
                url={org.website}
                description={org.summary ?? (org.description ? String(org.description).replace(/<[^>]+>/g, '').slice(0, 200) : undefined)}
                location={org.address?.city ? org.address.city : undefined}
                onClick={() => setSelectedOrg(org)}
              />
            ))}
          </ResultList>
        )}
        <OrganisationDetailModal
          organisation={selectedOrg}
          onClose={() => setSelectedOrg(null)}
        />
        <div className="mt-8">
          <Button variant="outline" onClick={() => setPhase('landing')}>
            Quiz neu starten
          </Button>
        </div>
      </Section>
    </PageShell>
  );
}
