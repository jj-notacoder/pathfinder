'use client';

import { useInView } from 'framer-motion';
import { useRef } from 'react';

type AnimationType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn';

export function useScrollAnimation(type: AnimationType = 'fadeUp', once = true) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px 0px" });

  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideLeft: {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
    }
  };

  return {
    ref,
    isInView,
    variants: variants[type],
    initial: variants[type].initial,
    animate: isInView ? variants[type].animate : variants[type].initial,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  };
}
