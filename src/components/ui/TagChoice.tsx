import { type ReactNode } from 'react';

interface Option {
  id: string;
  value: string;
  label: ReactNode;
  icon?: string;
  sortKey?: string;
}

interface TagChoiceProps {
  name: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  legend?: string;
}

function sortOptions<T extends { label: ReactNode; sortKey?: string }>(opts: T[]): T[] {
  return [...opts].sort((a, b) => {
    const keyA = a.sortKey ?? String(a.label);
    const keyB = b.sortKey ?? String(b.label);
    return keyA.localeCompare(keyB, 'de', { numeric: true });
  });
}

export function TagChoice({ name, options, value, onChange, legend }: TagChoiceProps) {
  const sortedOptions = sortOptions(options);
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
      <div className="flex flex-wrap gap-2">
        {sortedOptions.map((opt) => {
          const selected = value.includes(opt.value);
          const labelStr = String(opt.label);
          return (
            <button
              key={opt.id}
              type="button"
              name={name}
              onClick={() => toggle(opt.value)}
              title={labelStr}
              className={`inline-flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary-focus focus:ring-offset-1 cursor-pointer ${
                opt.icon
                  ? 'w-24 h-24 p-0 rounded-none'
                  : 'px-3 py-1.5 text-sm font-medium rounded-full'
              } ${
                selected
                  ? 'bg-tags'
                  : 'bg-tags/20 hover:bg-tags/70'
              } ${opt.icon ? '' : 'text-white'}`}
              aria-pressed={selected}
              aria-label={labelStr}
            >
              {opt.icon ? (
                <img
                  src={opt.icon}
                  alt=""
                  className="w-22 h-22 object-contain pointer-events-none"
                />
              ) : (
                <span className={`${selected ? 'text-black font-medium' : 'text-primary font-medium'}`}>{opt.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
