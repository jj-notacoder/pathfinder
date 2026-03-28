'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { ArrowRight, Bot, Target, Zap, Shield, ChevronRight, Compass, Mic, Users, PlayCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ConstellationCanvas } from '@/components/ui/ConstellationCanvas';
import { VAULT_PROFESSIONALS } from '@/lib/mockData';
import { VoiceNotePlayer } from '@/components/ui/VoiceNotePlayer';
import Link from 'next/link';
import { useRef } from 'react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 150]);

  return (
    <div className="min-h-screen bg-bg text-white overflow-hidden selection:bg-teal/30">
      <Navbar />

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal via-amber to-teal origin-left z-[100]" style={{ scaleX }} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
        <ConstellationCanvas dotCount={150} speed={0.9} interactive={true} />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_0%,_rgba(0,212,168,0.15)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-bg/80 to-bg"></div>

        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="max-w-7xl mx-auto px-6 w-full relative z-10 text-center flex flex-col items-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display font-black text-6xl md:text-8xl leading-[1.05] mb-8 tracking-tight"
          >
            Skip the <span className="text-amber drop-shadow-[0_0_20px_rgba(240,165,0,0.3)]">marketing.</span><br/>
            Hear the <span className="text-teal drop-shadow-[0_0_20px_rgba(0,212,168,0.3)]">reality.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-xl md:text-2xl text-muted leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            Stop guessing your future based on college brochures. Take the AI psychometric matrix and instantly unlock raw, unscripted audio from professionals actually doing the job.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Button href="/discover" variant="teal" size="lg" className="group text-lg px-10 py-5">
              Initialize Matrix <Sparkles size={18} className="ml-2 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button href="/how-it-works" variant="outline" size="lg" className="text-lg px-10 py-5 backdrop-blur-md bg-white/5 border-white/20 hover:bg-white/10">
              Read the Protocol
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. THE BIG TEXT STATEMENT (User Feedback Request) */}
      <section className="py-32 relative z-10 bg-bg border-y border-border/50 relative overflow-hidden">
        {/* Ambient 3D Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-amber/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl leading-tight text-white/90"
          >
            You are about to make a four-year, <span className="text-amber border-b-4 border-amber pb-2"> $100,000 decision</span> based on a web search.<br/><br/><span className="text-teal">Let&apos;s fix that asymmetry.</span>
          </motion.h2>
        </div>
      </section>

      {/* 3. cinematic HOW IT WORKS (User Feedback Request) */}
      <section className="py-32 relative z-10 bg-bg2 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-teal/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 md:text-center text-left">
            <span className="text-teal text-sm font-bold tracking-widest uppercase mb-4 block">The Protocol</span>
            <h2 className="font-display font-black text-5xl md:text-6xl mb-6">How it actually works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="group relative bg-bg3 border border-border rounded-3xl p-10 overflow-hidden hover:border-amber/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber/10 rounded-full blur-3xl group-hover:bg-amber/20 transition-colors"></div>
              <div className="font-display font-black text-8xl text-white/5 absolute -top-4 -right-4 pointer-events-none transition-transform group-hover:scale-110">01</div>
              
              <div className="w-16 h-16 rounded-2xl bg-bg border border-border flex items-center justify-center text-amber mb-8 shadow-[0_0_15px_rgba(240,165,0,0.2)]">
                <Compass size={32} />
              </div>
              <h3 className="font-display font-bold text-3xl text-white mb-4">Psychometric Matrix</h3>
              <p className="font-body text-muted leading-relaxed text-lg">
                5 specific, scenario-based constraints that test your ambiguity tolerance, friction response, and logic framing to isolate exactly where your personality thrives.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="group relative bg-bg3 border border-border rounded-3xl p-10 overflow-hidden hover:border-teal/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal/10 rounded-full blur-3xl group-hover:bg-teal/20 transition-colors"></div>
              <div className="font-display font-black text-8xl text-white/5 absolute -top-4 -right-4 pointer-events-none transition-transform group-hover:scale-110">02</div>
              
              <div className="w-16 h-16 rounded-2xl bg-bg border border-border flex items-center justify-center text-teal mb-8 shadow-[0_0_15px_rgba(0,212,168,0.2)]">
                <Mic size={32} />
              </div>
              <h3 className="font-display font-bold text-3xl text-white mb-4">Unlock The Vault</h3>
              <p className="font-body text-muted leading-relaxed text-lg">
                Receive your top 3 specific career matches and instantaneously unlock completely unfiltered Voice Notes from professionals telling the unscripted truth.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="group relative bg-bg3 border border-border rounded-3xl p-10 overflow-hidden hover:border-white/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
              <div className="font-display font-black text-8xl text-white/5 absolute -top-4 -right-4 pointer-events-none transition-transform group-hover:scale-110">03</div>
              
              <div className="w-16 h-16 rounded-2xl bg-bg border border-border flex items-center justify-center text-white mb-8 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <Users size={32} />
              </div>
              <h3 className="font-display font-bold text-3xl text-white mb-4">Direct Verification</h3>
              <p className="font-body text-muted leading-relaxed text-lg">
                Still have questions? Book a 15-minute 1:1 reality check with either a Near-Peer (University Student) or a seasoned Industry Expert in that exact field.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. VAULT TEASER (Restyled for Cinematic feel) */}
      <section className="py-32 relative z-10 bg-bg border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-amber text-sm font-bold tracking-widest uppercase mb-4 block">Sneak Peek</span>
              <h2 className="font-display font-black text-5xl md:text-6xl mb-4">Inside the Vault</h2>
              <p className="font-body text-muted text-xl">The unscripted audio waiting behind the matrix firewall.</p>
            </div>
            {/* The Vault is protected until Matrix completion, so this is just a teaser */}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            {VAULT_PROFESSIONALS.slice(0, 4).map((prof, i) => (
              <motion.div
                key={prof.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <VoiceNotePlayer prof={prof} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECT ACCESS SECTION REMOVED PER USER REQUEST */}

      {/* 5. CLOSING CTA - Full screen immersive */}
      <section className="h-screen relative overflow-hidden bg-bg flex items-center justify-center">
        <ConstellationCanvas dotCount={100} speed={0.4} interactive={true} />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,_rgba(240,165,0,0.1)_0%,_bg_70%)]"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto px-6 relative z-10 text-center"
        >
          <div className="w-24 h-24 bg-bg2 rounded-full flex items-center justify-center mx-auto mb-10 border border-border shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <Bot size={40} className="text-white" />
          </div>
          <h2 className="font-display font-black text-6xl md:text-8xl mb-8 leading-tight tracking-tight">
            Stop guessing.<br/>Start <span className="text-teal border-b-8 border-teal pb-2">listening.</span>
          </h2>
          <Button href="/discover" variant="teal" size="lg" className="px-14 py-6 text-xl hover:bg-white shadow-[0_0_30px_rgba(0,212,168,0.4)] transition-all hover:scale-105 mt-8">
            Begin the Discovery Protocol
          </Button>
        </motion.div>
      </section>
      
    </div>
  );
}
