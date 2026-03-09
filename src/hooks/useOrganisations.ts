import { useEffect, useState } from 'react';
import type { Organisation } from '../types/organisation';
import { mockOrganisations } from '../data/mockOrganisations';

export function useOrganisations() {
  const [organisations, setOrganisations] = useState<Organisation[]>(mockOrganisations);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch('/data/organisations.json')
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: Organisation[]) => {
        if (!cancelled && Array.isArray(data)) {
          setOrganisations(data);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message);
          setOrganisations(mockOrganisations);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { organisations, loading, error };
}
