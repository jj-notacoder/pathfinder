'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS, CAREERS, MENTORS, VAULT_PROFESSIONALS, VAULT_FIELDS, matchCareers } from '@/lib/mockData';
import { CornerDownLeft, Sparkles, Printer, Share2, ArrowRight, Mic, Users } from 'lucide-react';
import { useCareerContext } from '@/context/CareerContext';
import { VoiceNotePlayer } from '@/components/ui/VoiceNotePlayer';
import { MentorCard } from '@/components/ui/MentorCard';
import { getFieldIcon } from '@/lib/icons';
import Link from 'next/link';

type Message = { role: 'ai' | 'user'; text: string; };

export default function DiscoverPage() {
  const { hasCompletedMatrix, topCareers: contextCareers, setHasCompletedMatrix, setTopCareers } = useCareerContext();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [traits, setTraits] = useState<string[]>([]);
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [expandText, setExpandText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Result state
  const [result, setResult] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // FIX: Restore results instantly if matrix was already completed (handles "Back" nav)
  useEffect(() => {
    if (hasCompletedMatrix && contextCareers && contextCareers.length > 0 && !result) {
      setStarted(true);
      setResult({ matchedCareers: contextCareers });
    }
  }, [hasCompletedMatrix, contextCareers, result]);

  // FIX: Hard reset local state if user clicks "Retake Matrix" (context becomes false)
  useEffect(() => {
    if (!hasCompletedMatrix && result) {
      setStarted(false);
      setCurrentQ(0);
      setTraits([]);
      setMessages([]);
      setResult(null);
      setExpandText("");
    }
  }, [hasCompletedMatrix, result]);

  // FIX: Scroll to top when results are set
  useEffect(() => {
    if (result) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [result]);

  const handleStart = () => {
    setStarted(true);
    setIsTyping(true);
    setTimeout(() => {
      setMessages([{ role: 'ai', text: `Welcome to the Discovery Protocol. I'll be analyzing your problem-solving friction patterns.\n\nScenario 01:\n${QUESTIONS[0].text}` }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSelectOption = (optIndex: number) => {
    const selectedOpt = QUESTIONS[currentQ].options[optIndex];
    let newTraits = [...traits, ...selectedOpt.traits];

    if (QUESTIONS[currentQ].id === "q_environment" && expandText.trim()) {
      newTraits.push("Analytical", "Detail-Oriented", "Systems-Thinking", "Strategic");
    }

    setTraits(newTraits);
    
    const userText = expandText.trim() ? `${selectedOpt.label}\n\n*Expansion: ${expandText}*` : selectedOpt.label;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setExpandText("");
    setIsTyping(true);
    
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        const nextQ = currentQ + 1;
        setCurrentQ(nextQ);
        setMessages(prev => [...prev, { role: 'ai', text: `Scenario 0${nextQ + 1}:\n${QUESTIONS[nextQ].text}` }]);
        setIsTyping(false);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: `Synthesizing your Reality Matrix based on your friction vectors...` }]);
        setTimeout(() => {
          const matchData = matchCareers(newTraits);
          setResult(matchData);
          setHasCompletedMatrix(true);
          setTopCareers(matchData.matchedCareers);
          setIsTyping(false);
        }, 2500);
      }
    }, 1200);
  };

  const handleFreeTextSubmitOnly = () => {
    if (!expandText.trim()) return;
    let newTraits = [...traits];
    if (QUESTIONS[currentQ].id === "q_environment") {
      newTraits.push("Analytical", "Detail-Oriented", "Systems-Thinking", "Strategic");
    }
    setTraits(newTraits);
    
    setMessages(prev => [...prev, { role: 'user', text: expandText.trim() }]);
    setExpandText("");
    setIsTyping(true);
    
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        const nextQ = currentQ + 1;
        setCurrentQ(nextQ);
        setMessages(prev => [...prev, { role: 'ai', text: `Scenario 0${nextQ + 1}:\n${QUESTIONS[nextQ].text}` }]);
        setIsTyping(false);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: `Synthesizing your Reality Matrix based on your friction vectors...` }]);
        setTimeout(() => {
          const matchData = matchCareers(newTraits);
          setResult(matchData);
          setHasCompletedMatrix(true);
          setTopCareers(matchData.matchedCareers);
          setIsTyping(false);
        }, 2500);
      }
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const topCareers = result?.matchedCareers || [];
    const shareText = `My Pathfinder AI Career Matrix:\n\n1. ${topCareers[0]?.title}\n2. ${topCareers[1]?.title}\n3. ${topCareers[2]?.title}\n\nGenerated by Pathfinder AI.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Career Matrix',
          text: shareText,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Results copied to clipboard!");
    }
  };

  // --- Result Layout Variables ---
  const topCareers = result?.matchedCareers || [];
  
  // Mentors for matched fields
  const matchedFields = Array.from(new Set(topCareers.map((c: any) => c.field)));
  const recommendedNearPeers = MENTORS.nearPeers.filter(m => matchedFields.includes(m.field));
  const recommendedPros = MENTORS.professionals.filter(m => matchedFields.includes(m.field));

  return (
    <div className="min-h-screen bg-bg flex flex-col pt-[60px] md:pt-[72px] overflow-hidden relative">
      <Navbar />

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          .print-section, .print-section * { visibility: visible; }
          .print-section { position: absolute; left: 0; top: 0; width: 100%; padding: 40px; }
          .no-print { display: none !important; }
          .print-only-footer { display: block !important; margin-top: 40px; font-size: 12px; color: #666; text-align: center; }
        }
      `}} />

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,212,168,0.1)_0%,_transparent_60%)]"></div>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 relative z-10 flex flex-col h-[calc(100vh-80px)]">
        
        <AnimatePresence mode="wait">
          
          {/* STATE 1: START SCREEN */}
          {!started && !result && (
            <motion.div 
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="m-auto text-center max-w-2xl"
            >
              <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                <div className="absolute inset-0 border border-teal/30 rounded-full animate-[ping_3s_infinite]"></div>
                <Sparkles size={32} className="text-teal" />
              </div>
              <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight">
                Initialize <span className="text-teal">Matrix</span>
              </h1>
              <p className="font-body text-muted text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                You are about to enter an interactive interview. I will give you 5 scenarios. Answer honestly.
              </p>
              <button 
                onClick={handleStart}
                className="w-full md:w-auto px-12 py-5 bg-teal text-bg font-bold font-body rounded-full text-lg hover:bg-white transition-colors shadow-[0_0_30px_rgba(0,212,168,0.3)]"
              >
                Start Protocol
              </button>
            </motion.div>
          )}

          {/* STATE 2: CHAT INTERFACE */}
          {started && !result && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col w-full max-w-4xl mx-auto bg-card border border-border rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <div className="h-16 border-b border-border bg-bg3/50 backdrop-blur-md flex items-center px-6 sticky top-0 z-20">
                <span className="w-2 h-2 rounded-full bg-teal shadow-[0_0_8px_rgba(0,212,168,0.8)] mr-3"></span>
                <span className="font-display font-bold text-sm tracking-widest uppercase text-white">Pathfinder AI Protocol</span>
                <span className="ml-auto font-body text-xs text-muted">Scenario 0{currentQ + 1} / 05</span>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 space-y-8 scrollbar-none">
                {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] md:max-w-[75%] p-5 rounded-2xl font-body text-[15px] leading-relaxed whitespace-pre-wrap shadow-lg ${
                      msg.role === 'user' 
                      ? 'bg-amber/10 border border-amber/30 text-white rounded-br-sm' 
                      : 'bg-bg2 border border-border text-white/90 rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-bg2 border border-border p-4 rounded-2xl rounded-bl-sm flex gap-2">
                       <motion.div animate={{ y: [0,-5,0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 bg-muted rounded-full"/>
                       <motion.div animate={{ y: [0,-5,0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-muted rounded-full"/>
                       <motion.div animate={{ y: [0,-5,0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-muted rounded-full"/>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Inputs Area */}
              {!isTyping && currentQ < QUESTIONS.length && (
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-bg3 border-t border-border p-4 md:p-6"
                >
                  <p className="font-display font-bold text-sm text-white mb-4 tracking-widest uppercase">Select your primary reaction:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {QUESTIONS[currentQ].options.map((opt, i) => (
                      <button 
                        key={i}
                        onClick={() => handleSelectOption(i)}
                        className="text-left font-body text-sm text-white/90 bg-bg2 border border-border hover:border-teal/50 hover:bg-teal/5 p-4 rounded-xl transition-all h-full"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <input 
                      type="text" 
                      value={expandText}
                      onChange={(e) => setExpandText(e.target.value)}
                      placeholder={QUESTIONS[currentQ].id === "q_environment" ? "Or type your own reality here..." : "Optional: Expand on your reasoning..."}
                      className="w-full bg-bg border border-border rounded-xl pl-4 pr-12 py-3 text-white font-body text-sm focus:outline-none focus:border-amber transition-colors"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && expandText.trim()) {
                          if (QUESTIONS[currentQ].id === "q_environment") {
                            handleFreeTextSubmitOnly();
                          } else {
                            handleSelectOption(0);
                          }
                        }
                      }}
                    />
                    <div className="absolute right-3 top-2.5 text-muted pointer-events-none">
                      <CornerDownLeft size={18} />
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* STATE 3: FINAL RESULTS DASHBOARD */}
          {result && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full overflow-y-auto custom-scrollbar pr-2 pb-20"
            >
              
              {/* --- STEP 1: CAREER REALITY MATRIX --- */}
              <div className="print-section mb-10 mt-6">
                <div className="mb-12 text-center">
                  <span className="no-print inline-flex items-center gap-2 text-xs font-bold text-teal tracking-widest uppercase mb-4 bg-teal/10 px-4 py-1.5 rounded-full border border-teal/20 shadow-[0_0_15px_rgba(0,212,168,0.2)]">
                    <Sparkles size={14} /> Matrix Complete
                  </span>
                  <div className="hidden print:block font-display font-black text-2xl text-black mb-6">Pathfinder AI</div>
                  <h1 className="font-display font-black text-4xl md:text-5xl text-white print:text-black mb-4">
                    Your Career Reality Matrix
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topCareers.map((c: any, index: number) => (
                    <div key={c.id} className="bg-card print:bg-transparent print:border-black border border-amber/30 rounded-3xl p-8 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 bg-amber print:bg-black text-bg print:text-white font-display font-black text-2xl px-4 py-2 rounded-bl-2xl">
                        #{index + 1}
                      </div>
                      <div className="font-display font-bold text-2xl text-white print:text-black mb-2 mt-4 flex items-center gap-2">
                        {getFieldIcon(c.field, "w-6 h-6 text-teal")}
                        {c.title}
                      </div>
                      <div className="font-body text-sm font-bold text-amber print:text-black tracking-widest uppercase mb-6 flex items-center gap-1.5">
                        {getFieldIcon(c.field, "w-4 h-4")}
                        {c.field}
                      </div>
                      
                      <div className="space-y-6 pt-4 border-t border-border/50 print:border-black/20">
                        <div>
                          {/* FIX: Added General Description Block */}
                          <div className="text-[10px] uppercase tracking-widest font-bold text-muted print:text-black mb-2">The Reality</div>
                          <p className="font-body text-[14px] text-white/80 print:text-black mb-4">
                            {c.generalDescription}
                          </p>

                          <div className="text-[10px] uppercase tracking-widest font-bold text-muted print:text-black mb-2">Why You Fit</div>
                          <p className="font-body text-[15px] text-white/90 print:text-black leading-relaxed">
                            {c.whyFitTemplate}
                          </p>
                        </div>
                        
                        <div className="bg-bg2 print:bg-transparent print:border print:border-black p-4 rounded-xl border border-border mt-4">
                          <div className="text-[10px] uppercase tracking-widest font-bold text-amber print:text-black mb-2">Reality Check</div>
                          <p className="font-body text-[14px] text-white/70 print:text-black italic leading-relaxed">
                            "{c.realityCheck}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="hidden print-only-footer">
                  Generated by Pathfinder AI &mdash; pathfinderai.com
                </div>
              </div>

              {/* --- STEP 2: PRINT AND SHARE BAR --- */}
              <div className="no-print flex items-center justify-center gap-4 mb-20 bg-bg3 border border-border py-4 px-6 rounded-full max-w-fit mx-auto">
                <button onClick={handlePrint} className="flex items-center gap-2 font-body text-sm font-bold text-white hover:text-teal transition-colors">
                  <Printer size={16} /> Print Results
                </button>
                <div className="w-[1px] h-4 bg-border"></div>
                <button onClick={handleShare} className="flex items-center gap-2 font-body text-sm font-bold text-white hover:text-teal transition-colors">
                  <Share2 size={16} /> Share Matrix
                </button>
              </div>

              {/* --- STEP 3: VAULT AUDIO RECOMMENDATIONS --- */}
              <div className="no-print mb-24">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display font-black text-3xl text-white">Hear from people doing this work</h2>
                  <div className="h-[1px] flex-1 bg-border/50"></div>
                </div>
                
                {/* FIX: Vault audits grouped by career ranking */}
                <div className="space-y-12">
                  {topCareers.map((c: any, index: number) => {
                    let clips = VAULT_PROFESSIONALS.filter(v => v.fieldSlug === c.fieldSlug || (v as any).secondaryField?.toLowerCase() === c.fieldSlug);
                    clips.sort((a,b) => {
                      const order = ['vp_dr_sabatini', 'vp_dr_amelia', 'vp_marcus', 'vp14'];
                      const indexA = order.indexOf(a.id);
                      const indexB = order.indexOf(b.id);
                      
                      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                      if (indexA !== -1) return -1;
                      if (indexB !== -1) return 1;
                      return 0;
                    });
                    if (c.fieldSlug === 'aerospace') clips = clips.slice(0, 4);
                    if (clips.length === 0) return null;
                    return (
                      <div key={'vault-' + c.id}>
                        <h3 className="font-display font-bold text-xl text-white mb-6 border-b border-border pb-2 flex items-center gap-3">
                          <span className="text-amber">#{index+1}</span> {c.title}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {clips.map(prof => <VoiceNotePlayer key={prof.id} prof={prof} />)}
                        </div>
                      </div>
                    )
                  })}

                  {topCareers.length === 0 && (
                    <div className="text-center py-10 bg-bg3 border border-border rounded-xl text-sm text-muted">
                      No matching audio clips found for these exact careers.
                    </div>
                  )}
                </div>
              </div>

              {/* --- STEP 4: RECOMMENDED MENTORS --- */}
              <div className="no-print mb-32">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="font-display font-black text-3xl text-white">Recommended Mentors for Your Matches</h2>
                  <div className="h-[1px] flex-1 bg-border/50"></div>
                </div>

                {/* Near-Peers Section */}
                <h3 className="font-display font-bold text-xl text-white mb-6">Near-Peers (Students & Alumni)</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
                  {recommendedNearPeers.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} type="nearP" />
                  ))}
                  {recommendedNearPeers.length === 0 && <p className="text-muted text-sm italic">No near-peers found for your exact fields.</p>}
                </div>

                {/* Industry Experts Section */}
                <h3 className="font-display font-bold text-xl text-white mb-6">Industry Experts</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {recommendedPros.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} type="pro" />
                  ))}
                  {recommendedPros.length === 0 && <p className="text-muted text-sm italic">No industry pros found for your exact fields.</p>}
                </div>
              </div>

              {/* --- STEP 5: NONE OF THESE EXCITE YOU? --- */}
              <div className="no-print relative pt-20 border-t border-border/50">
                <div className="max-w-2xl text-center mx-auto mb-12">
                  <h2 className="font-display font-black text-3xl md:text-4xl text-white mb-4">Not feeling these? That is completely fine.</h2>
                  <p className="font-body text-xl text-muted leading-relaxed">
                    Your matrix is a starting point, not a verdict.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {/* Explore Vault Card */}
                  <Link href="/vault" className="bg-card border border-border rounded-3xl p-10 hover:border-amber/50 hover:bg-bg3 transition-all group flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] min-h-[300px]">
                    <div>
                      <h3 className="font-display font-black text-2xl text-white mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber/20 text-amber flex items-center justify-center">
                          <Mic size={20} />
                        </div>
                        Explore the Full Vault
                      </h3>
                      <p className="font-body text-white/80 leading-relaxed mb-8">
                        Browse all professionals across every field. Hear from people whose path you have not considered yet.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <div className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-amber text-bg font-display font-bold text-sm tracking-widest uppercase transition-transform group-hover:scale-105 shadow-[0_0_20px_rgba(240,165,0,0.3)] gap-2">
                        Go to the Vault <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>

                  {/* Browse Mentors Card */}
                  <Link href="/mentors" className="bg-card border border-border rounded-3xl p-10 hover:border-teal/50 hover:bg-bg3 transition-all group flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.3)] min-h-[300px]">
                    <div>
                      <h3 className="font-display font-black text-2xl text-white mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal/20 text-teal flex items-center justify-center">
                          <Users size={20} />
                        </div>
                        Browse All Mentors
                      </h3>
                      <p className="font-body text-white/80 leading-relaxed mb-8">
                        See every near-peer and industry expert on the platform. Filter by field. Find someone whose story surprises you.
                      </p>
                    </div>
                    <div className="mt-auto">
                      <div className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-teal text-bg font-display font-bold text-sm tracking-widest uppercase transition-transform group-hover:scale-105 shadow-[0_0_20px_rgba(0,212,168,0.3)] gap-2">
                        Meet the Mentors <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
