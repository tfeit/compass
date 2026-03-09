import { type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Section({ children, title, className = '' }: SectionProps) {
  return (
    <section className={`mb-8 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold text-foreground mb-4">{title}</h2>
      )}
      {children}
    </section>
  );
}
