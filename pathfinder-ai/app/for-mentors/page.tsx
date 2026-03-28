'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Mic, Clock } from 'lucide-react';

export default function ForMentorsPage() {
  return (
    <div className="min-h-screen bg-bg pt-[60px] md:pt-[72px] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-20 pb-40">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-8">
            Share the <span className="text-amber">reality</span> <br/>
            of your profession.
          </h1>
          <p className="font-body text-xl text-muted leading-relaxed">
            Pathfinder AI is built entirely on unscripted truth. Join 1,200+ professionals and university students who are helping Gen Z make multi-million dollar decisions with actual data.
          </p>
        </div>

        {/* Why Join */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          <div className="bg-bg2 rounded-3xl p-8 border border-border text-center">
            <div className="w-16 h-16 rounded-full bg-bg3 flex items-center justify-center text-teal mx-auto mb-6">
              <Mic size={24} />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-3">Record Once</h3>
            <p className="font-body text-muted">Leave a 3-minute voice note about your daily reality. It stays in the Vault and scales your impact forever.</p>
          </div>
          <div className="bg-bg2 rounded-3xl p-8 border border-border text-center">
            <div className="w-16 h-16 rounded-full bg-bg3 flex items-center justify-center text-amber mx-auto mb-6">
              <Clock size={24} />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-3">Total Control</h3>
            <p className="font-body text-muted">Toggle your 1:1 availability on or off instantly. You only take 15-minute calls when you have the bandwidth.</p>
          </div>
          <div className="bg-bg2 rounded-3xl p-8 border border-border text-center">
            <div className="w-16 h-16 rounded-full bg-bg3 flex items-center justify-center text-white mx-auto mb-6">
              <Briefcase size={24} />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-3">Corporate Outreach</h3>
            <p className="font-body text-muted">You survived the gauntlet. Now volunteer your time to tell the next generation exactly what you wish someone had told you.</p>
          </div>
        </div>

        {/* Two Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          <div className="border border-amber/30 bg-amber/5 rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <GraduationCap size={40} className="text-amber mb-6" />
            <h2 className="font-display font-black text-3xl text-white mb-4">Near-Peers</h2>
            <p className="font-body text-lg text-muted mb-6 leading-relaxed">
              For current university students and recent alumni. High schoolers desperately need to know what it takes to survive organic chemistry, or how to actually land that freshman internship.
            </p>
            <ul className="space-y-3 font-body text-white/90 mb-8">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber"></span> Unpaid, volunteer basis.</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber"></span> Must possess an active .edu email.</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-amber"></span> High impact, low time commitment.</li>
            </ul>
          </div>

          <div className="border border-teal/30 bg-teal/5 rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <Briefcase size={40} className="text-teal mb-6" />
            <h2 className="font-display font-black text-3xl text-white mb-4">Industry Experts</h2>
            <p className="font-body text-lg text-muted mb-6 leading-relaxed">
              For professionals with 3+ years of experience. Stop doing generalized career day speeches. Talk 1:1 with highly ambitious students who have already been algorithmically matched to your field.
            </p>
            <ul className="space-y-3 font-body text-white/90 mb-8">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-teal"></span> Participate via structured corporate social impact.</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-teal"></span> Completely free volunteer mentorship for students.</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-teal"></span> Manual LinkedIn verification required.</li>
            </ul>
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-bg2 border border-border rounded-3xl p-12 text-center max-w-3xl mx-auto shadow-xl">
          <h2 className="font-display font-black text-3xl text-white mb-4">Apply for the Network</h2>
          <p className="font-body text-muted mb-8">We currently have a 2-week waitlist for verification approvals as we scale our manual review process.</p>
          
          <form className="space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); alert('Application submitted. You will hear from our verification team shortly.') }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required type="text" placeholder="First Name" className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-amber outline-none transition-colors" />
              <input required type="text" placeholder="Last Name" className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-amber outline-none transition-colors" />
            </div>
            <input required type="email" placeholder="Professional or University Email" className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-amber outline-none transition-colors" />
            <input required type="url" placeholder="LinkedIn Profile URL" className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-amber outline-none transition-colors" />
            <select required className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-amber outline-none transition-colors appearance-none">
              <option value="">I am applying as a...</option>
              <option value="nearpeer">Near-Peer (University Student)</option>
              <option value="expert">Industry Expert (Working Professional)</option>
            </select>
            <button type="submit" className="w-full bg-amber text-bg font-bold font-body px-8 py-4 rounded-xl hover:bg-white transition-colors mt-6">
              Submit Application
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}
