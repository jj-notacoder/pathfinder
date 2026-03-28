'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Users, GraduationCap, Map, BarChart4 } from 'lucide-react';

export default function ForSchoolsPage() {
  return (
    <div className="min-h-screen bg-bg pt-[60px] md:pt-[72px] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 text-teal text-xs font-bold tracking-widest uppercase mb-8">
            Enterprise & Education
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-8">
            Scale real-world <br/>
            <span className="text-teal">career discovery.</span>
          </h1>
          <p className="font-body text-xl text-muted leading-relaxed">
            Equip your career counselors with an AI-driven protocol that connects your entire student body to unscripted reality. 
          </p>
        </div>

        {/* Problem Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 border-y border-border py-12">
          <div className="text-center">
            <div className="font-display font-black text-5xl text-white mb-2">78%</div>
            <div className="font-body text-sm text-muted font-bold tracking-widest uppercase">Of Gen Z Feel Unprepared</div>
          </div>
          <div className="text-center border-y md:border-y-0 md:border-x border-border/50 py-8 md:py-0">
            <div className="font-display font-black text-5xl text-amber mb-2">1:400</div>
            <div className="font-body text-sm text-muted font-bold tracking-widest uppercase">Counselor to Student Ratio</div>
          </div>
          <div className="text-center">
            <div className="font-display font-black text-5xl text-white mb-2">61%</div>
            <div className="font-body text-sm text-muted font-bold tracking-widest uppercase">Change Majors 3+ Times</div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-32">
          <div className="bg-bg2 border border-border rounded-3xl p-10 hover:border-teal/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-bg3 text-teal flex items-center justify-center mb-6">
              <BarChart4 size={24} />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-4">Counselor Dashboard</h3>
            <p className="font-body text-muted leading-relaxed">
              Track student engagement across the entire district. See aggregate data on which career fields are trending, and identify students who have not completed their psychometric intake.
            </p>
          </div>
          <div className="bg-bg2 border border-border rounded-3xl p-10 hover:border-amber/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-bg3 text-amber flex items-center justify-center mb-6">
              <Map size={24} />
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-4">Curriculum Integration</h3>
            <p className="font-body text-muted leading-relaxed">
              Seamlessly assign the 5-scenario Matrix as homework. Teachers can review individual career reports and use them to guide college application strategy sessions.
            </p>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="bg-card border border-amber/30 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-[0_0_50px_rgba(240,165,0,0.05)]">
          <h2 className="font-display font-black text-4xl text-white mb-6">Partner with Pathfinder</h2>
          <p className="font-body text-lg text-muted mb-10 max-w-xl mx-auto">
            We offer tiered licensing for high schools, districts, and university admissions departments looking to fix the funnel.
          </p>
          
          <form className="max-w-md mx-auto space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Demo request submitted. Our team will contact you within 24 hours.') }}>
            <input required type="text" placeholder="School or District Name" className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-amber outline-none transition-colors" />
            <input required type="email" placeholder="Work Email" className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-amber outline-none transition-colors" />
            <select required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-amber outline-none transition-colors appearance-none">
              <option value="">Select Student Body Size</option>
              <option value="1">100 - 500 Students</option>
              <option value="2">501 - 2,000 Students</option>
              <option value="3">2,000+ Students</option>
            </select>
            <button type="submit" className="w-full bg-amber text-bg font-bold font-body px-8 py-4 rounded-xl hover:bg-white transition-colors mt-4">
              Request Demo
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}
