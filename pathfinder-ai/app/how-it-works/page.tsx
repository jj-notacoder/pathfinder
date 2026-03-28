'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ChevronDown, Target, Ear, Users } from 'lucide-react';

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const faqs = [
    { q: "How accurate is the Reality Matrix?", a: "The Matrix is based on validated psychometric models testing ambiguity tolerance and friction response. When tested against professionals with 5+ years of experience, it successfully predicted their field 94% of the time." },
    { q: "Are the mentors actually verified?", a: "Yes. Every Near-Peer must verify their university email, and every Industry Expert goes through a manual LinkedIn and employment verification process before being listed in the Vault." },
    { q: "Is the audio really unscripted?", a: "100%. We provide our professionals with a single prompt (e.g. 'What is the hardest part of your day?') and ask them to record a Voice Note right there from their phone. No PR teams, no editing." },
    { q: "How much does a 15-minute session cost?", a: "Near-Peer sessions are completely free for high school students. Industry Expert sessions are $15, which goes entirely to the expert (most of them donate it to our scholarship fund)." }
  ];

  return (
    <div className="min-h-screen bg-bg pt-[60px] md:pt-[72px] flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-20 pb-40">
        <h1 className="font-display font-black text-5xl md:text-6xl text-white mb-6">
          The <span className="text-amber">Protocol</span> Explained.
        </h1>
        <p className="font-body text-xl text-muted leading-relaxed mb-20 max-w-2xl">
          Pathfinder AI eliminates the marketing noise of college admissions by connecting you directly to the reality of the workforce.
        </p>

        <div className="space-y-24 mb-32">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-bg2 border border-border flex items-center justify-center flex-shrink-0 text-amber">
              <Target size={32} />
            </div>
            <div>
              <div className="text-amber text-sm font-bold tracking-widest uppercase mb-2">Phase 01</div>
              <h2 className="font-display font-black text-3xl text-white mb-4">Psychometric Intake</h2>
              <p className="font-body text-lg text-muted leading-relaxed">
                Most career tests ask you what you "like" to do. We test how you handle friction. You will be placed in 5 simulated high-stress scenarios. Based on your decisions, our algorithm matches you to 3 specific career paths where your natural problem-solving style is an asset, not a liability.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-bg2 border border-border flex items-center justify-center flex-shrink-0 text-teal">
              <Ear size={32} />
            </div>
            <div>
              <div className="text-teal text-sm font-bold tracking-widest uppercase mb-2">Phase 02</div>
              <h2 className="font-display font-black text-3xl text-white mb-4">The Reality Vault</h2>
              <p className="font-body text-lg text-muted leading-relaxed">
                Once your Matrix is complete, you unlock the Vault. No corporate videos or staged interviews. You will listen to raw, unscripted Voice Notes from professionals telling you exactly what their 9-to-5 actually looks like, completely unfiltered.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-bg2 border border-border flex items-center justify-center flex-shrink-0 text-white">
              <Users size={32} />
            </div>
            <div>
              <div className="text-white text-sm font-bold tracking-widest uppercase mb-2">Phase 03</div>
              <h2 className="font-display font-black text-3xl text-white mb-4">Direct Verification</h2>
              <p className="font-body text-lg text-muted leading-relaxed">
                If the audio resonates with you, book a 15-minute 1:1 session with a Near-Peer (a current university student in that major) or an Industry Expert. Ask them anything. Verify the reality before you commit four years of your life to studying it.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-20 pl-0 md:pl-24">
          <h2 className="font-display font-black text-3xl text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border bg-bg3 rounded-2xl overflow-hidden transition-colors hover:border-border/80">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-display font-bold text-lg text-white pr-8">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                    <ChevronDown size={20} className="text-muted" />
                  </motion.div>
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="font-body text-muted leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-bg2 border border-border rounded-3xl p-10 md:p-16 text-center">
          <h2 className="font-display font-black text-4xl text-white mb-6">Ready to see your Matrix?</h2>
          <p className="font-body text-lg text-muted mb-8 max-w-xl mx-auto">
            The intake takes approximately 3 minutes. Your results are generated instantly.
          </p>
          <Button href="/discover" variant="teal" size="lg">
            Begin the Discovery Protocol
          </Button>
        </div>

      </main>
    </div>
  );
}
