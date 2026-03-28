'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, CheckCircle2 } from 'lucide-react';

interface MentorCardProps {
  mentor: any;
  type: 'nearP' | 'pro';
}

export function MentorCard({ mentor, type }: MentorCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-bg3 border border-border rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start group transition-all hover:border-teal/50 h-full">
        <div className="w-16 h-16 rounded-full bg-card border border-border flex flex-shrink-0 items-center justify-center font-display font-black text-xl text-white">
          {mentor.initials}
        </div>
        <div className="flex-1 text-center sm:text-left flex flex-col h-full">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-display font-bold text-xl text-white">{mentor.name}</h3>
            <div className="flex items-center gap-1 font-body text-xs font-bold text-white bg-bg2 px-2 py-1 rounded-full border border-border">
              <Star size={10} className={type === 'nearP' ? 'text-amber' : 'text-teal'} fill="currentColor" />
              {mentor.rating}
            </div>
          </div>
          <div className="font-display font-black text-sm text-white mb-1 uppercase tracking-widest">
            {type === 'nearP' ? mentor.university : mentor.company}
          </div>
          <p className="font-body text-xs text-muted mb-3">
            {type === 'nearP' ? `${mentor.major} • ${mentor.year}` : `${mentor.title} • ${mentor.exp}`}
          </p>
          <p className="font-body text-sm text-white/90 mb-4 line-clamp-2 italic">"{mentor.bio}"</p>
          <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="font-body text-xs text-muted font-bold tracking-widest uppercase">{mentor.sessions} Sessions</span>
            <button 
              onClick={() => { if(mentor.available) setShowModal(true); else alert('Waitlist joined.') }}
              className={`px-6 py-2 rounded-xl font-body text-xs font-bold uppercase tracking-widest transition-colors ${mentor.available ? 'bg-bg border border-border text-white hover:bg-white hover:text-bg' : 'bg-bg2 border border-border text-muted cursor-not-allowed'}`}
            >
              {mentor.available ? 'Book Session' : 'Waitlist'}
            </button>
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        mentor={mentor}
        type={type}
      />
    </>
  );
}

// Internal Booking Modal
function BookingModal({ isOpen, onClose, mentor, type }: { isOpen: boolean, onClose: () => void, mentor: any, type: string }) {
  const [step, setStep] = useState<1 | 2>(1); // 1 = Form, 2 = Success
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate next 7 days
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // Start tomorrow
    return {
      index: i,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  const timeSlots = ['09:00', '11:30', '14:00', '16:30'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!name || !email || selectedDay === null || !selectedTime) {
      alert("Please fill all required scheduling fields.");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setName('');
    setEmail('');
    setQuestion('');
    setSelectedDay(null);
    setSelectedTime(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-bg/90 backdrop-blur-md overflow-y-auto pt-20 pb-20"
        >
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="bg-card w-full max-w-xl border border-border rounded-3xl p-6 md:p-10 relative shadow-2xl overflow-hidden my-auto"
          >
            <button onClick={handleReset} className="absolute top-6 right-6 text-muted hover:text-white transition-colors z-10">
              <X size={24} />
            </button>

            {step === 1 ? (
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="flex gap-4 items-center mb-8 border-b border-border/50 pb-6">
                  <div className="w-16 h-16 rounded-full bg-bg3 flex items-center justify-center font-display font-black text-2xl text-white border border-border">
                    {mentor.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-2xl text-white mb-1">Book 1:1 Session</h3>
                    <div className="font-body text-sm text-muted">
                      with {mentor.name} • <span className="font-bold text-white">{type === 'nearP' ? mentor.university : mentor.company}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs font-bold tracking-widest uppercase text-muted mb-2">Your Name</label>
                      <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-teal outline-none transition-colors" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className="block font-body text-xs font-bold tracking-widest uppercase text-muted mb-2">Your Email</label>
                      <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-teal outline-none transition-colors" placeholder="jane@example.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-xs font-bold tracking-widest uppercase text-muted mb-2">Select Day</label>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {days.map(d => (
                        <div 
                          key={d.index} 
                          onClick={() => setSelectedDay(d.index)}
                          className={`flex-shrink-0 cursor-pointer border rounded-2xl py-3 px-4 text-center transition-all min-w-[80px] ${selectedDay === d.index ? 'bg-bg text-teal border-teal' : 'bg-bg2 border-border text-muted hover:border-white/30 hover:text-white'}`}
                        >
                          <div className="text-xs uppercase font-bold tracking-wider mb-1">{d.dayName}</div>
                          <div className="text-sm font-medium">{d.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedDay !== null && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                      <label className="block font-body text-xs font-bold tracking-widest uppercase text-muted mb-2">Select Time</label>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map(time => (
                          <div 
                            key={time} 
                            onClick={() => setSelectedTime(time)}
                            className={`cursor-pointer border rounded-xl py-2 text-center text-sm font-medium transition-all ${selectedTime === time ? 'bg-bg text-teal border-teal' : 'bg-bg2 border-border text-muted hover:border-white/30 hover:text-white'}`}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div>
                    <label className="block font-body text-xs font-bold tracking-widest uppercase text-muted mb-2">Main Question (Optional)</label>
                    <textarea value={question} onChange={e => setQuestion(e.target.value)} className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white focus:border-teal outline-none transition-colors min-h-[80px] resize-none" placeholder="What specifically do you want to ask?" />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-teal text-bg font-bold font-body py-4 rounded-xl hover:bg-white transition-colors flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-bg border-t-transparent rounded-full" />
                    ) : 'Confirm 15-Min Session'}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 relative z-10"
              >
                <div className="w-20 h-20 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-teal" />
                </div>
                <h3 className="font-display font-black text-3xl text-white mb-4">Request Sent</h3>
                <p className="font-body text-muted leading-relaxed max-w-sm mx-auto mb-8">
                  Your session request with <strong>{mentor.name}</strong> has been submitted. They will review it and confirm within 24 hours via email.
                </p>
                <button 
                  onClick={handleReset}
                  className="px-8 py-3 bg-bg3 border border-border text-white font-bold font-body rounded-full hover:bg-white hover:text-bg transition-colors"
                >
                  Return to Mentors
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
