import { type ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <a
        href="#main-content"
        className="skip-link"
      >
        Zum Inhalt springen
      </a>
      {/* <header className="border-b border-gray-200 bg-white px-4 py-3">
        <h1 className="text-lg font-semibold text-gray-900">Bildungscompass</h1>
      </header> */}
      <main id="main-content" className="flex-1 flex flex-col container mx-auto px-4 py-6 max-w-3xl w-full sm:px-6 min-h-0">
        {children}
      </main>
      {/* <footer className="border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
        Impressum · Datenschutz
      </footer> */}
    </div>
  );
}
