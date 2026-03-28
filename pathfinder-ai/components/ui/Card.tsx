'use client';

import * as React from 'react';
import { cn } from './Button';
import { useTilt } from '@/hooks/useTilt';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tilt?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, tilt = true, children, ...props }, forwardedRef) => {
    const { ref, style, shineStyle, handleMouseMove, handleMouseLeave } = useTilt(!tilt);
    
    return (
      <div 
        ref={(node) => {
          // Handle both forwarded ref and internal tilt ref
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
          // @ts-ignore
          ref.current = node;
        }}
        className={cn(
          "relative bg-card border border-border rounded-[16px] overflow-hidden",
          className
        )}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div 
          className="card-shine absolute inset-0 pointer-events-none z-0" 
          style={shineStyle}
        />
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';
