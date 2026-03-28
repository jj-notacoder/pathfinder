'use client';

import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronDown, ChevronUp } from 'lucide-react';
import { CAREERS } from '@/lib/mockData';

interface VoiceNotePlayerProps {
  prof: any;
}

export function VoiceNotePlayer({ prof }: VoiceNotePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  
  const career = CAREERS.find(c => c.id === prof.careerId);
  const script = prof.voiceScript || career?.voiceScript || "";
  
  // Estimate duration (approx 150 words per minute -> 2.5 words per second)
  const wordCount = script.split(' ').length;
  const estimatedDurationSeconds = Math.max(10, Math.round(wordCount / 2.5));
  
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (isPlaying && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying]);

  const toggleVoice = () => {
    if (!('speechSynthesis' in window)) return;
    
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setElapsed(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    window.speechSynthesis.cancel();
    setElapsed(0);
    
    const newUtterance = new SpeechSynthesisUtterance(script);
    const voices = window.speechSynthesis.getVoices();
    const enVoices = voices.filter(v => v.lang.startsWith('en'));
    if(enVoices.length > 0) {
      // Pick a semi-consistent numeric index
      const idCode = prof.id.charCodeAt(prof.id.length - 1) || 0;
      newUtterance.voice = enVoices[idCode % enVoices.length] || enVoices[0];
    }
    
    newUtterance.rate = 0.95;
    
    newUtterance.onstart = () => {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setElapsed(prev => {
          if (prev >= estimatedDurationSeconds) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return estimatedDurationSeconds;
          }
          return prev + 1;
        });
      }, 1000);
    };
    
    newUtterance.onend = () => {
      setIsPlaying(false);
      setElapsed(estimatedDurationSeconds);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    
    newUtterance.onerror = () => {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    
    synthRef.current = newUtterance;
    window.speechSynthesis.speak(newUtterance);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = Math.min(100, (elapsed / estimatedDurationSeconds) * 100);

  return (
    <div className="bg-bg3 border border-border rounded-2xl p-6 flex flex-col hover:border-teal/50 transition-all h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-bg flex items-center justify-center font-display font-black text-white border border-border flex-shrink-0">
            {prof.initials}
          </div>
          <div>
            <div className="font-display font-bold text-lg text-white">{prof.name}</div>
            <div className="font-body text-xs text-muted">{prof.role} • {prof.exp}</div>
          </div>
        </div>
        <button 
          onClick={toggleVoice}
          className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center transition-all focus:outline-none ${isPlaying ? 'bg-teal text-bg shadow-[0_0_15px_rgba(0,212,168,0.4)]' : 'bg-teal/10 border border-teal/30 text-teal hover:bg-teal hover:text-bg'}`}
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
      </div>

      <p className="font-display font-medium text-white text-lg leading-snug mb-6">
        "{prof.question}"
      </p>

      {/* Progress Bar & Waveform Area */}
      <div className="mt-auto pt-4 relative">
        <div className="flex justify-between text-[10px] font-bold tracking-widest text-muted mb-2 font-body">
          <span>{formatTime(elapsed)}</span>
          <span>{formatTime(estimatedDurationSeconds)}</span>
        </div>
        
        {/* Progress scrub line */}
        <div className="h-1 bg-border rounded-full w-full mb-4 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-teal" 
            animate={{ width: `${progressPercent}%` }}
            transition={{ ease: "linear", duration: 0.5 }}
          />
        </div>

        {/* Waveform Animation */}
        <div className="flex items-center gap-[2px] h-6 w-full opacity-70">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div 
              key={i}
              animate={isPlaying ? { height: [`20%`, `${40 + Math.random() * 60}%`, `20%`] } : { height: '10%' }}
              transition={isPlaying ? { repeat: Infinity, duration: 0.3 + Math.random() * 0.4 } : { duration: 0.3 }}
              className={`flex-1 w-full rounded-full ${isPlaying ? 'bg-teal' : 'bg-border'}`}
            />
          ))}
        </div>
      </div>

      {/* Transcript Toggle */}
      <div className="mt-6 border-t border-border/50 pt-4">
        <button 
          onClick={() => setShowTranscript(!showTranscript)}
          className="flex items-center gap-2 text-xs font-bold text-muted hover:text-white uppercase tracking-widest transition-colors w-full"
        >
          {showTranscript ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showTranscript ? 'Hide Transcript' : 'Read Transcript'}
        </button>
        <AnimatePresence>
          {showTranscript && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 pb-2">
                <p className="font-body text-sm text-white/80 leading-relaxed italic bg-bg2 p-4 rounded-xl border border-border">
                  "{script}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
