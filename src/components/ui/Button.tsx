import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'px-4 py-2 cursor-pointer rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-2';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary-focus border-primary',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover focus:ring-secondary-muted border-secondary',
    outline: 'border-secondary text-secondary-foreground hover:bg-secondary hover:border-secondary-hover focus:ring-secondary-muted',
  };
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
