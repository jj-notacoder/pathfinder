'use client';

import { useRef, useState, useEffect, MouseEvent } from 'react';

export function useTilt(disabled = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const [shineStyle, setShineStyle] = useState({});

  useEffect(() => {
    if (disabled || !ref.current) return;
    
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;
  }, [disabled]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const card = ref.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
      transition: 'none'
    });

    setShineStyle({
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.06) 0%, transparent 80%)`
    });
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
      transition: 'transform 0.5s ease'
    });
    setShineStyle({
      background: 'transparent'
    });
  };

  return { ref, style, shineStyle, handleMouseMove, handleMouseLeave };
}
