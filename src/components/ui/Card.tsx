import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`max-h-[calc(100vh-10rem)] overflow-y-auto bg-white rounded-xl border border-secondary shadow-sm p-6 ${className}`}>
      {children}
    </div>
  );
}
