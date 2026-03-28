'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg pt-[60px] md:pt-[72px] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-20 pb-40 text-left">
        <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-6">Privacy Policy</h1>
        <p className="font-body text-muted mb-12">Last updated: Oct 2024</p>
        
        <div className="space-y-8 font-body text-white/80 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">1. Data Collection</h2>
            <p>
              Pathfinder AI does not store personally identifiable information (PII) regarding your psychometric intake. The inputs you provide during the 5-scenario matrix are processed entirely on the client-side within your browser using our local algorithms.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">2. Session Booking</h2>
            <p>
              When booking a session with a Near-Peer or Industry Expert, we collect your name and email. This data is transmitted securely to the selected mentor for the sole purpose of scheduling your 15-minute Google Meet link. After 30 days, all scheduling PII is scrubbed from our active databases.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">3. Audio Transmissions</h2>
            <p>
              All Voice Notes hosted in the Vault are the intellectual property of Pathfinder AI. Mentors have explicitly consented to have their voice synthesized and transcribed for educational purposes.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">4. No Tracking</h2>
            <p>
              We do not use tracking pixels, invasive cookies, or third-party analytics algorithms. The only cookies utilized are strictly necessary session tokens to persist your Reality Matrix results as you navigate the platform.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
