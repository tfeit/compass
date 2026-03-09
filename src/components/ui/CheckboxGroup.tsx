import { type ReactNode } from 'react';

interface Option {
  id: string;
  value: string;
  label: ReactNode;
}

interface CheckboxGroupProps {
  name: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  legend?: string;
}

function sortOptionsByLabel<T extends { label: ReactNode }>(opts: T[]): T[] {
  return [...opts].sort((a, b) =>
    String(a.label).localeCompare(String(b.label), 'de')
  );
}

export function CheckboxGroup({ name, options, value, onChange, legend }: CheckboxGroupProps) {
  const sortedOptions = sortOptionsByLabel(options);
  const toggle = (v: string) => {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v));
    } else {
      onChange([...value, v]);
    }
  };
  return (
    <fieldset>
      {legend && (
        <legend className="block text-sm font-medium text-secondary-muted mb-2">{legend}</legend>
      )}
      <div className="space-y-2">
        {sortedOptions.map((opt) => (
          <label key={opt.id} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name={name}
              value={opt.value}
              checked={value.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              className="w-4 h-4 rounded text-primary focus:ring-primary-focus"
            />
            <span className="text-secondary-foreground">{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
