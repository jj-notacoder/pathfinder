import * as React from 'react';
import { cn } from './Button';

export function SectionLabel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("text-teal text-[13px] font-body uppercase tracking-[0.15em] mb-4 flex items-center gap-2", className)}>
      <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
      {children}
    </div>
  );
}
