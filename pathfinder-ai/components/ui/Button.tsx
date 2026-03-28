import * as React from 'react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'amber' | 'teal' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'amber', size = 'md', href, loading, children, ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-full font-body transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      amber: "bg-amber text-bg font-semibold hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(240,165,0,0.4)]",
      teal: "bg-teal text-bg font-semibold hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(0,212,168,0.4)]",
      outline: "border border-white/30 text-white hover:border-white/60 hover:bg-white/5",
      ghost: "text-muted hover:text-white"
    };
    
    const sizes = {
      sm: "text-[10px] px-[20px] py-[6px]",
      md: "text-[14px] px-[28px] h-12",
      lg: "text-[16px] px-[36px] h-14"
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    const content = loading ? (
      <span className="flex items-center gap-2">
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        Loading...
      </span>
    ) : children;

    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={loading || props.disabled} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
