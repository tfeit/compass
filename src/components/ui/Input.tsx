import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-secondary-muted mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border border-secondary px-3 py-2 focus:ring-2 focus:ring-primary-focus focus:border-primary-focus ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
