'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { VAULT_PROFESSIONALS } from '@/lib/mockData';
import { useCareerContext } from '@/context/CareerContext';
import { useRouter } from 'next/navigation';
import { VoiceNotePlayer } from '@/components/ui/VoiceNotePlayer';

export default function VaultPage() {
  const router = useRouter();
  const { hasCompletedMatrix } = useCareerContext();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Technology', 'Engineering', 'Medicine', 'Law', 'Design', 'Finance'];

  const filteredData = activeFilter === 'All' 
    ? VAULT_PROFESSIONALS 
    : VAULT_PROFESSIONALS.filter(v => v.field === activeFilter);

  return (
    <div className="min-h-screen bg-bg pt-[60px] md:pt-[72px] flex flex-col relative overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_20%_30%,_rgba(0,212,168,0.1)_0%,_transparent_60%)]"></div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 max-w-2xl"
        >
          <span className="text-teal text-xs font-bold tracking-widest uppercase mb-4 block">Unscripted Audio</span>
          <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-6">
            The Reality <span className="text-teal">Vault</span>
          </h1>
          <p className="font-body text-muted text-lg leading-relaxed">
            Listen to unfiltered audio transmissions from professionals telling you what their job actually feels like day-to-day. No marketing. No college brochures. Just the reality.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full font-body text-sm font-bold transition-all duration-300 ${
                activeFilter === filter 
                ? 'bg-teal text-bg shadow-[0_0_15px_rgba(0,212,168,0.3)]' 
                : 'bg-bg3 border border-border text-muted hover:text-white hover:border-white/30'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredData.map((prof, idx) => (
              <motion.div
                layout
                key={prof.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <VoiceNotePlayer prof={prof} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </main>
    </div>
  );
}
