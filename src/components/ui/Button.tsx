import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  icon?: React.ReactNode;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  href, 
  icon,
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-brand-green text-white hover:bg-brand-green/90 focus:ring-brand-green",
    secondary: "bg-brand-dark text-white hover:bg-brand-dark/90 focus:ring-brand-dark",
    outline: "border-2 border-brand-green text-brand-green hover:bg-brand-green/10 focus:ring-brand-green",
    ghost: "text-brand-dark hover:bg-brand-light focus:ring-brand-light",
    accent: "bg-brand-gold text-brand-dark hover:bg-brand-gold/90 focus:ring-brand-gold",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
}
