'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { getFieldIcon } from '@/lib/icons';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceNotePlayerProps {
  prof: any;
}

const WAVE_HEIGHTS = [10, 22, 36, 18, 42, 28, 38, 16, 44, 24, 34, 14, 40, 26, 32, 20, 38, 12];

export function VoiceNotePlayer({ prof }: VoiceNotePlayerProps) {
  const [playerState, setPlayerState] = useState<'stopped' | 'playing' | 'paused'>('stopped');
  const [showTranscript, setShowTranscript] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  
  const script = prof.voiceScript || "";
  const estimatedDurationSeconds = prof.estimatedDuration || Math.round(script.length / 13.5) || 10;
  
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedOffsetRef = useRef<number>(0);

  const isRoberto = prof.id === 'vp_dr_sabatini';

  const handleTimeUpdate = () => {
    if (audioRef.current && playerState === 'playing') {
      setElapsed(audioRef.current.currentTime);
    }
  };

  const handleAudioEnded = () => {
    setPlayerState('stopped');
    if (audioRef.current) {
      setElapsed(audioRef.current.duration || estimatedDurationSeconds);
    }
  };

  useEffect(() => {
    // Inject the CSS animation once
    if (typeof document !== 'undefined' && !document.getElementById('vault-wave-anim')) {
      const style = document.createElement('style');
      style.id = 'vault-wave-anim';
      style.textContent = `
        @keyframes waveAnim {
          0% { transform: scaleY(0.25); }
          100% { transform: scaleY(1.0); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    const handleGlobalStop = (e: any) => {
      if (e.detail?.id !== prof.id && playerState !== 'stopped') {
        setPlayerState('stopped');
        setElapsed(0);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (isRoberto && audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }
    };
    
    // Also listen to general stop commands (like filter changes)
    const handleAllStop = () => {
      setPlayerState('stopped');
      setElapsed(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (isRoberto && audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    window.addEventListener('vault-audio-play', handleGlobalStop);
    window.addEventListener('vault-audio-stop-all', handleAllStop);
    
    return () => {
      window.removeEventListener('vault-audio-play', handleGlobalStop);
      window.removeEventListener('vault-audio-stop-all', handleAllStop);
    };
  }, [playerState, prof.id, isRoberto]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerState === 'playing') {
        if (isRoberto && audioRef.current) {
          audioRef.current.pause();
        } else if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      }
    };
  }, [playerState, isRoberto]);

  const toggleVoice = () => {
    if (isRoberto) {
      if (!audioRef.current) return;
      if (playerState === 'playing') {
        audioRef.current.pause();
        setPlayerState('paused');
        return;
      }
      if (playerState === 'paused') {
        audioRef.current.play();
        setPlayerState('playing');
        window.dispatchEvent(new CustomEvent('vault-audio-play', { detail: { id: prof.id } }));
        return;
      }

      // Starting from 'stopped'
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setPlayerState('playing');
      window.dispatchEvent(new CustomEvent('vault-audio-play', { detail: { id: prof.id } }));
      return;
    }

    if (!('speechSynthesis' in window)) return;

    if (playerState === 'playing') {
      window.speechSynthesis.pause();
      setPlayerState('paused');
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Save exact elapsed time offset
      elapsedOffsetRef.current = elapsed;
      return;
    }

    if (playerState === 'paused') {
      window.speechSynthesis.resume();
      setPlayerState('playing');
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const currentElapsed = elapsedOffsetRef.current + (Date.now() - startTimeRef.current) / 1000;
        if (currentElapsed >= estimatedDurationSeconds) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setElapsed(estimatedDurationSeconds);
          setPlayerState('stopped');
        } else {
          setElapsed(currentElapsed);
        }
      }, 500);
      window.dispatchEvent(new CustomEvent('vault-audio-play', { detail: { id: prof.id } }));
      return;
    }

    // Starting from 'stopped'
    window.speechSynthesis.cancel();
    window.dispatchEvent(new CustomEvent('vault-audio-play', { detail: { id: prof.id } }));
    
    setElapsed(0);
    elapsedOffsetRef.current = 0;
    
    const newUtterance = new SpeechSynthesisUtterance(script);
    const voices = window.speechSynthesis.getVoices();
    let bestVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en'));
    if (!bestVoice) bestVoice = voices.find(v => v.lang.startsWith('en'));
    if (!bestVoice && voices.length > 0) bestVoice = voices[0];
    
    if (bestVoice) newUtterance.voice = bestVoice;
    
    newUtterance.rate = 0.92;
    newUtterance.pitch = 1.0;
    
    newUtterance.onstart = () => {
      setPlayerState('playing');
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const currentElapsed = (Date.now() - startTimeRef.current) / 1000;
        if (currentElapsed >= estimatedDurationSeconds) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setElapsed(estimatedDurationSeconds);
          setPlayerState('stopped');
        } else {
          setElapsed(currentElapsed);
        }
      }, 500);
    };
    
    newUtterance.onend = () => {
      setPlayerState('stopped');
      setElapsed(estimatedDurationSeconds);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    
    newUtterance.onerror = (e) => {
      if (e.error !== 'canceled') {
        setPlayerState('stopped');
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
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
    <div className="bg-bg3 border border-border rounded-2xl p-6 flex flex-col hover:border-teal/50 transition-all h-full shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      {isRoberto && (
        <audio 
          ref={audioRef} 
          src="/roberto.mp4" 
          onTimeUpdate={handleTimeUpdate} 
          onEnded={handleAudioEnded}
          preload="metadata"
        />
      )}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-bg flex items-center justify-center font-display font-black text-white border border-border flex-shrink-0 shadow-inner">
            {prof.initials}
          </div>
          <div>
            <div className="font-display font-bold text-lg text-white">{prof.name}</div>
            <div className="font-body text-xs text-muted font-medium flex items-center gap-1.5 mt-0.5">
              <span className="text-teal/70">{getFieldIcon(prof.field, "w-3.5 h-3.5")}</span>
              {prof.role} • {prof.yearsExp || prof.exp} Years
            </div>
          </div>
        </div>
        <button 
          onClick={toggleVoice}
          className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center transition-all focus:outline-none 
            ${playerState !== 'stopped' ? 'bg-teal shadow-[0_0_20px_rgba(0,212,168,0.5)]' : 'bg-bg border border-teal/50 hover:bg-teal'}`}
        >
          {playerState === 'playing' ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="3" height="10" fill="var(--bg)" />
              <rect x="9" y="2" width="3" height="10" fill="var(--bg)" />
            </svg>
          ) : (
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={playerState === 'stopped' ? 'text-teal hover:text-bg' : 'text-bg'}>
              <path d="M12.9139 7.15934C13.5857 7.54013 13.5857 8.45987 12.9139 8.84066L2.94632 14.4891C2.28292 14.865 1.46094 14.3857 1.46094 13.6484L1.46094 2.35158C1.46094 1.6143 2.28292 1.135 2.94632 1.51093L12.9139 7.15934Z" fill="currentColor"/>
            </svg>
          )}
        </button>
      </div>

      <p className="font-display font-medium text-white/90 text-[17px] leading-snug mb-8">
        "{prof.questionAsked || prof.question}"
      </p>

      {/* Progress & Waveform Area */}
      <div className="mt-auto relative">
        <div className="flex justify-between text-[11px] font-bold tracking-widest text-muted mb-3 font-display uppercase">
          <span>{formatTime(elapsed)}</span>
          <span className="text-teal/70">{prof.field}</span>
          <span>{formatTime(estimatedDurationSeconds)}</span>
        </div>
        
        {/* Progress scrub line */}
        <div className="h-[3px] bg-bg2 rounded-full w-full mb-6 overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 bottom-0 bg-teal" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Waveform Box - Collapses nicely when not actively playing/paused */}
        <AnimatePresence>
          {(playerState !== 'stopped') && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 60, opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              className="bg-bg border border-border/50 rounded-xl flex items-center justify-center overflow-hidden mb-6"
            >
              <div className={`flex items-end justify-center w-full h-[40px] gap-1 px-4 ${playerState === 'playing' ? 'is-playing' : ''}`}>
                {WAVE_HEIGHTS.map((height, i) => (
                  <svg key={i} width="4" height="40" className="flex-1 max-w-[4px]">
                    <rect 
                      x="0" 
                      y={40 - height} 
                      width="4" 
                      height={height} 
                      rx="2" 
                      fill="#00D4A8" 
                      style={{
                        transformOrigin: '50% 100%',
                        animationName: playerState === 'playing' ? 'waveAnim' : 'none',
                        animationDuration: `${0.5 + (i * 0.05)}s`,
                        animationDelay: `${(i % 5) * 0.1}s`,
                        animationIterationCount: 'infinite',
                        animationDirection: 'alternate',
                        animationTimingFunction: 'ease-in-out',
                        transform: playerState === 'paused' ? 'scaleY(1)' : 'scaleY(0.5)'
                      }}
                    />
                  </svg>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Transcript Toggle */}
      <div className={`border-border/50 pt-2 transition-all ${playerState === 'stopped' ? 'border-t mt-4' : 'mt-2'}`}>
        <button 
          onClick={() => setShowTranscript(!showTranscript)}
          className="flex items-center gap-2 text-[11px] font-bold text-muted hover:text-white uppercase tracking-widest transition-colors w-full"
        >
          {showTranscript ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showTranscript ? 'Hide Transmission' : 'Read Transmission'}
        </button>
        <AnimatePresence>
          {showTranscript && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-5 pb-1">
                <p className="font-body text-[14px] text-white/70 leading-relaxed bg-bg p-5 rounded-xl border border-border/50 max-h-[250px] overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-bg">
                  {script}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
