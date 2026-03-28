'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { MENTORS, VAULT_FIELDS } from '@/lib/mockData';
import { useCareerContext } from '@/context/CareerContext';
import { useRouter } from 'next/navigation';
import { MentorCard } from '@/components/ui/MentorCard';
import { getFieldIcon } from '@/lib/icons';

export default function MentorsPage() {
  const router = useRouter();
  const { hasCompletedMatrix } = useCareerContext();
  const [activeTab, setActiveTab] = useState<'nearPeers' | 'professionals'>('nearPeers');
  const [activeFilter, setActiveFilter] = useState('All');



  const baseData = MENTORS[activeTab];
  const filteredData = activeFilter === 'All' 
    ? baseData 
    : baseData.filter(m => m.field === activeFilter);

  return (
    <div className="min-h-screen bg-bg pt-[60px] md:pt-[72px] flex flex-col relative overflow-hidden">
      <Navbar />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_80%_20%,_rgba(240,165,0,0.1)_0%,_transparent_60%)]"></div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        
        {/* No hero heading at the top per spec. Goes straight into content/tabs. */}
        <div className="mb-8">
            <h1 className="font-display font-black text-4xl text-white mb-2">Mentor Network</h1>
            <p className="font-body text-muted text-lg">Browse our verified network of students and industry experts.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-border/50 mb-8 relative overflow-x-auto scrollbar-none">
          <button 
            onClick={() => setActiveTab('nearPeers')}
            className={`pb-4 font-display font-bold text-xl transition-colors relative whitespace-nowrap ${activeTab === 'nearPeers' ? 'text-white' : 'text-muted hover:text-white'}`}
          >
            Near-Peers (Students & Alumni)
            {activeTab === 'nearPeers' && (
              <motion.div layoutId="mentorTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber" />
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab('professionals')}
            className={`pb-4 font-display font-bold text-xl transition-colors relative whitespace-nowrap ${activeTab === 'professionals' ? 'text-white' : 'text-muted hover:text-white'}`}
          >
            Industry Professionals
            {activeTab === 'professionals' && (
              <motion.div layoutId="mentorTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal" />
            )}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {VAULT_FIELDS.map((filter: string) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full font-body text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                activeFilter === filter 
                ? (activeTab === 'nearPeers' ? 'bg-amber text-bg shadow-[0_0_15px_rgba(240,165,0,0.3)]' : 'bg-teal text-bg shadow-[0_0_15px_rgba(0,212,168,0.3)]')
                : 'bg-bg3 border border-border text-muted hover:text-white hover:border-white/30'
              }`}
            >
              {filter !== 'All' && getFieldIcon(filter, "w-4 h-4")}
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((mentor: any, idx) => (
              <motion.div
                layout
                key={mentor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                  <MentorCard mentor={mentor} type={activeTab === 'nearPeers' ? 'nearP' : 'pro'} />
              </motion.div>
            ))}
            {filteredData.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted border border-border border-dashed rounded-3xl">
                No mentors found for the selected field in this category.
              </div>
            )}
          </AnimatePresence>
        </motion.div>

      </main>
    </div>
  );
}
