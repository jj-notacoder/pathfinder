import * as React from 'react';
import { cn } from './Button'; // Reusing cn utility if I were exporting it, but I'll define it here if needed

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'amber' | 'teal' | 'white' | 'muted';
}

export function Badge({ className, variant = 'teal', children, ...props }: BadgeProps) {
  const variants = {
    amber: "border-amber/40 text-amber",
    teal: "border-teal/40 text-teal",
    white: "border-white/30 text-white",
    muted: "border-border text-muted"
  };

  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-body text-[11px] uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
