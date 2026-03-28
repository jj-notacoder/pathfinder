'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface FormData {
  name: string;
  email: string;
  topic: string;
  date: string;
  time: string;
}

export function BookingForm({ mentorId }: { mentorId: string }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [success, setSuccess] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    // Simulate API booking call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
  };

  if (success) {
    return (
      <Card className="p-8 text-center bg-teal/5 border-teal/20" tilt={false}>
        <div className="w-16 h-16 rounded-full bg-teal text-bg flex items-center justify-center font-display font-bold mx-auto mb-6 shadow-[0_0_30px_rgba(0,212,168,0.4)]">
          ✓
        </div>
        <h3 className="font-display font-bold text-white text-[24px] mb-2">Session Confirmed</h3>
        <p className="font-body text-white/80 text-[15px] max-w-sm mx-auto">
          Your request has been sent to the mentor. You will receive an email shortly with the meeting link.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8" tilt={false}>
      <h3 className="font-display font-bold text-white text-[20px] mb-6 border-b border-border pb-4">
        Request a Session
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="font-body text-[12px] text-muted uppercase tracking-widest font-bold">Your Name</label>
            <input 
              {...register('name', { required: true })}
              className="w-full bg-bg3 border border-border rounded-lg px-4 py-3 font-body text-white focus:border-amber/50 outline-none transition-colors"
              placeholder="Alex Chen"
            />
            {errors.name && <span className="text-[11px] text-red-400">Name is required</span>}
          </div>
          
          <div className="space-y-1.5">
            <label className="font-body text-[12px] text-muted uppercase tracking-widest font-bold">Email</label>
            <input 
              type="email"
              {...register('email', { required: true })}
              className="w-full bg-bg3 border border-border rounded-lg px-4 py-3 font-body text-white focus:border-amber/50 outline-none transition-colors"
              placeholder="alex@example.com"
            />
            {errors.email && <span className="text-[11px] text-red-400">Email is required</span>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-body text-[12px] text-muted uppercase tracking-widest font-bold">What do you want to talk about?</label>
          <textarea 
            {...register('topic', { required: true })}
            className="w-full bg-bg3 border border-border rounded-lg px-4 py-3 font-body text-white focus:border-amber/50 outline-none transition-colors resize-none h-24"
            placeholder="e.g. I want to know if a CS degree is actually worth it for game dev..."
          />
          {errors.topic && <span className="text-[11px] text-red-400">Please provide a topic</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="font-body text-[12px] text-muted uppercase tracking-widest font-bold">Preferred Date</label>
            <input 
              type="date"
              {...register('date', { required: true })}
              className="w-full bg-bg3 border border-border rounded-lg px-4 py-3 font-body text-white focus:border-amber/50 outline-none transition-colors"
            />
            {errors.date && <span className="text-[11px] text-red-400">Date is required</span>}
          </div>
          
          <div className="space-y-1.5">
            <label className="font-body text-[12px] text-muted uppercase tracking-widest font-bold">Preferred Time</label>
            <select 
              {...register('time', { required: true })}
              className="w-full bg-bg3 border border-border rounded-lg px-4 py-3 font-body text-white focus:border-amber/50 outline-none transition-colors"
            >
              <option value="">Select a time</option>
              <option value="morning">Morning (9am - 12pm)</option>
              <option value="afternoon">Afternoon (1pm - 5pm)</option>
              <option value="evening">Evening (6pm - 9pm)</option>
            </select>
            {errors.time && <span className="text-[11px] text-red-400">Time is required</span>}
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" variant="teal" size="lg" className="w-full" loading={isSubmitting}>
            Submit Request
          </Button>
          <p className="text-center font-body text-muted text-[11px] mt-4">
            Mentors usually respond within 48 hours.
          </p>
        </div>
      </form>
    </Card>
  );
}
