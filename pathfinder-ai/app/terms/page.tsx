'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/Navbar';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg pt-[60px] md:pt-[72px] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-20 pb-40 text-left">
        <h1 className="font-display font-black text-4xl md:text-5xl text-white mb-6">Terms of Service</h1>
        <p className="font-body text-muted mb-12">Last updated: Oct 2024</p>
        
        <div className="space-y-8 font-body text-white/80 leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing Pathfinder AI, you agree to these terms. The Reality Matrix provides directional psychometric data, not licensed career or psychological counseling.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">2. Mentor Sessions</h2>
            <p>
              1:1 verification sessions are strictly informational. Mentors are sharing their personal experiences and are not acting as official representatives of their respective Universities or Corporate Employers. Any opinions expressed are entirely their own.
            </p>
            <p className="mt-4">
              Recording of these sessions is strictly prohibited to ensure the unscripted reality protocol can continue safely.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-2xl text-white mb-4">3. Refunds for Paid Sessions</h2>
            <p>
              If an Industry Expert fails to attend a booked $15 session, you will be refunded 100% of the cost automatically within 48 hours. If you fail to attend the session without 24 hours prior written notice, the fee is non-refundable.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
