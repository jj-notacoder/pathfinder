import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mentor } from '@/lib/types';
import { StarIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link';

export function MentorCard({ mentor }: { mentor: Mentor }) {
  return (
    <Card className="flex flex-col h-full bg-bg border-border hover:border-amber/30 transition-colors duration-300">
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-border bg-bg2 flex items-center justify-center font-display font-black text-white text-[20px]">
              {mentor.initials}
            </div>
            <div>
              <h4 className="font-display font-bold text-white text-[20px]">
                {mentor.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-1">
                <StarIcon size={14} className="text-amber fill-amber" />
                <span className="font-body font-bold text-white text-[13px]">{mentor.rating}</span>
                <span className="font-body text-muted text-[13px]">({mentor.sessions} sessions)</span>
              </div>
            </div>
          </div>
          <Badge variant={mentor.available ? 'teal' : 'muted'}>
            {mentor.available ? 'Available' : 'Booked'}
          </Badge>
        </div>

        <div className="mb-6 space-y-1">
          <p className="font-body font-bold text-amber text-[14px]">
            {mentor.role}
          </p>
          <p className="font-body text-muted text-[14px]">
            {mentor.company || mentor.university} {mentor.year && `• ${mentor.year}`}
          </p>
        </div>

        <div className="mb-8 flex-1">
          <p className="font-body text-[15px] text-white/90 leading-relaxed">
            "{mentor.bio}"
          </p>
        </div>

        <div className="mt-auto border-t border-border pt-6 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {mentor.specialties ? (
              mentor.specialties.slice(0, 2).map(s => (
                <span key={s} className="font-body text-[11px] text-muted border border-border px-2 py-1 rounded-md">
                  {s}
                </span>
              ))
            ) : (
              <span className="font-body text-[11px] text-muted border border-border px-2 py-1 rounded-md">
                {mentor.major}
              </span>
            )}
          </div>
          
          {mentor.available ? (
            <Link 
              href={`/session?mentor=${mentor.id}`}
              className="inline-flex items-center gap-2 font-body font-semibold text-teal hover:text-white transition-colors text-[14px]"
            >
              <VideoIcon size={16} />
              Book Call
            </Link>
          ) : (
            <span className="font-body font-semibold text-muted text-[14px]">
              Waitlist Only
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
