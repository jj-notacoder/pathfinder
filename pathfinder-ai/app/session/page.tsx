'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { GraduationCap, Briefcase } from 'lucide-react';

export default function SessionPage() {
  return (
    <div className="min-h-screen bg-bg pt-[60px] md:pt-[72px] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display font-black text-4xl md:text-6xl text-white mb-6">
            Book a Reality Check
          </h1>
          <p className="font-body text-xl text-muted leading-relaxed">
            Select the tier of mentorship you need. To book a specific mentor, please browse the Mentors directory after completing your Reality Matrix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-bg2 border border-amber/30 rounded-3xl p-10 flex flex-col hover:border-amber/60 transition-colors pointer-cursor">
            <div className="w-16 h-16 rounded-full bg-amber/10 flex items-center justify-center text-amber mb-6">
              <GraduationCap size={32} />
            </div>
            <h2 className="font-display font-black text-3xl text-white mb-2">Near-Peer Session</h2>
            <div className="font-display font-black text-3xl text-amber mb-6">Free</div>
            <p className="font-body text-muted leading-relaxed mb-8 flex-1">
              15-minute 1:1 with a current university student or recent alum. Ask about the realities of specific majors, courses, and internship recruiting.
            </p>
            <Button href="/mentors" variant="outline" className="w-full justify-center">Browse Near-Peers</Button>
          </div>

          <div className="bg-bg2 border border-teal/30 rounded-3xl p-10 flex flex-col hover:border-teal/60 transition-colors pointer-cursor">
            <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center text-teal mb-6">
              <Briefcase size={32} />
            </div>
            <h2 className="font-display font-black text-3xl text-white mb-2">Industry Expert</h2>
            <div className="font-display font-black text-3xl text-teal mb-6">$15 <span className="text-sm font-body text-muted line-through ml-2">$150</span></div>
            <p className="font-body text-muted leading-relaxed mb-8 flex-1">
              15-minute 1:1 with a verified working professional with 3+ years of experience. Ask about daily routines, burnout, compensation, and long-term career growth.
            </p>
            <Button href="/mentors" variant="outline" className="w-full justify-center">Browse Experts</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
