'use client';

import { useEffect, useRef } from 'react';

interface CountUpOptions {
  target: number;
  duration?: number;
  suffix?: string;
}

export function useCountUp({ target, duration = 2000, suffix = '' }: CountUpOptions) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let hasAnimated = false;
    let observer: IntersectionObserver;
    
    const animate = () => {
      let startTimestamp: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(ease * target);
        
        element.textContent = `${currentCount}${suffix}`;
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          element.textContent = `${target}${suffix}`;
        }
      };
      
      window.requestAnimationFrame(step);
    };
    
    observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animate();
      }
    }, { threshold: 0.1 });
    
    observer.observe(element);
    
    return () => {
      if (observer) observer.disconnect();
    };
  }, [target, duration, suffix]);
  
  return ref;
}
