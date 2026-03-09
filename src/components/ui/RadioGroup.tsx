import { type ReactNode } from 'react';

interface Option {
  id: string;
  value: string;
  label: ReactNode;
}

interface RadioGroupProps {
  name: string;
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  legend?: string;
}

function sortOptionsByLabel<T extends { label: ReactNode }>(opts: T[]): T[] {
  return [...opts].sort((a, b) =>
    String(a.label).localeCompare(String(b.label), 'de')
  );
}

export function RadioGroup({ name, options, value, onChange, legend }: RadioGroupProps) {
  const sortedOptions = sortOptionsByLabel(options);
  return (
    <fieldset>
      {legend && (
        <legend className="block text-sm font-medium text-secondary-muted mb-2">{legend}</legend>
      )}
      <div className="space-y-2">
        {sortedOptions.map((opt) => (
          <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="w-4 h-4 text-primary focus:ring-primary-focus"
            />
            <span className="text-secondary-foreground">{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
