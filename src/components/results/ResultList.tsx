import { type ReactNode } from 'react';

interface ResultListProps {
  children: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export function ResultList({
  children,
  emptyMessage = 'Keine passenden Organisationen gefunden.',
  isEmpty = false,
}: ResultListProps) {
  if (isEmpty) {
    return (
      <div className="text-center py-12 text-secondary-muted">
        <p>{emptyMessage}</p>
      </div>
    );
  }
  return <div className="space-y-4">{children}</div>;
}
