'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export function Waveform({ isPlaying }: { isPlaying: boolean }) {
  const bars = 40;
  
  return (
    <div className="flex items-center justify-center gap-[3px] h-12 w-full my-6">
      {Array.from({ length: bars }).map((_, i) => {
        // Create a gentle bell curve shape for the waveform
        const center = bars / 2;
        const dist = Math.abs(i - center);
        const maxH = 40 - (dist * 1.5);
        const minH = 4;
        const initialH = Math.max(minH, maxH * 0.2);
        
        return (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-teal"
            initial={{ height: initialH }}
            animate={{ 
              height: isPlaying 
                ? [initialH, Math.max(minH, maxH * (0.4 + ((Math.sin(i * 1.1) + 1) / 2) * 0.6)), initialH] 
                : initialH 
            }}
            transition={{
              duration: 0.5 + ((Math.cos(i * 1.5) + 1) / 2) * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ((Math.sin(i * 2.3) + 1) / 2) * 0.2
            }}
          />
        );
      })}
    </div>
  );
}
