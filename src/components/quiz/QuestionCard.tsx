import { type ReactNode } from 'react';
import { Card } from '../ui/Card';

interface QuestionCardProps {
  title: string;
  children: ReactNode;
}

export function QuestionCard({ title, children }: QuestionCardProps) {
  return (
    <Card>
      <h2 className="text-xl lg:text-lg font-semibold text-foreground mb-4">{title}</h2>
      {children}
    </Card>
  );
}
