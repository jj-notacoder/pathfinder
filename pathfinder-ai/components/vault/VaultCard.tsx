import * as React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { VaultProfessional } from '@/lib/types';
import { LockIcon, PlayIcon } from 'lucide-react';

interface VaultCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onPlay'> {
  professional: VaultProfessional;
  onPlayClick: (prof: VaultProfessional) => void;
}

export function VaultCard({ professional, onPlayClick, className, ...props }: VaultCardProps) {
  const isLocked = professional.locked;

  return (
    <Card 
      className={`group relative h-full flex flex-col p-6 transition-colors duration-300 ${isLocked ? 'bg-bg2/50 border-border/50' : 'bg-bg2 hover:bg-bg3 border-border hover:border-teal/30 cursor-pointer'} ${className}`}
      tilt={!isLocked}
      onClick={() => !isLocked && onPlayClick(professional)}
      {...props}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center font-display font-bold text-white text-[16px] bg-bg shrink-0">
            {professional.initials}
          </div>
          <div>
            <h4 className={`font-display font-bold text-[18px] transition-colors ${isLocked ? 'text-white/50' : 'text-white group-hover:text-teal'}`}>
              {professional.name}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-body text-muted text-[12px]">{professional.role}</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="font-body text-muted text-[12px]">{professional.exp}</span>
            </div>
          </div>
        </div>
        
        {isLocked ? (
          <div className="w-8 h-8 rounded-full bg-bg flex items-center justify-center border border-border text-muted">
            <LockIcon size={14} />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-teal text-bg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shrink-0 shadow-[0_0_15px_rgba(0,212,168,0.4)]">
            <PlayIcon size={16} className="ml-0.5 fill-current" />
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-border">
        <p className={`font-body text-[14px] italic leading-relaxed ${isLocked ? 'text-muted/50' : 'text-white/90'}`}>
          "{professional.question}"
        </p>
      </div>

      {isLocked && (
        <div className="absolute inset-0 bg-bg/40 backdrop-blur-[2px] flex items-center justify-center z-10">
          <Badge variant="muted" className="bg-bg border-border">
            Complete Matrix to Unlock
          </Badge>
        </div>
      )}
    </Card>
  );
}
