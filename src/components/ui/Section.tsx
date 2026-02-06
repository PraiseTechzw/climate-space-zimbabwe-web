import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'white' | 'gray' | 'dark' | 'green' | 'pattern';
  spacing?: 'sm' | 'md' | 'lg' | 'none';
}

export function Section({ 
  className, 
  variant = 'white', 
  spacing = 'lg',
  children, 
  ...props 
}: SectionProps) {
  const variants = {
    white: "bg-brand-surface text-brand-dark",
    gray: "bg-brand-light text-brand-dark",
    dark: "bg-brand-dark text-brand-surface",
    green: "bg-brand-green text-brand-surface",
    pattern: "bg-brand-dark text-brand-surface relative overflow-hidden", // Placeholder for pattern logic
  };

  const spacings = {
    none: "py-0",
    sm: "py-12 sm:py-16",
    md: "py-16 sm:py-24",
    lg: "py-24 sm:py-32",
  };

  return (
    <section className={cn(variants[variant], spacings[spacing], className)} {...props}>
      {children}
      </section>
  );
}
