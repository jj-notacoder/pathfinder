'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { useCareerContext } from '@/context/CareerContext';
import { Lock } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const router = useRouter();
  const { hasCompletedMatrix } = useCareerContext();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const containerVariants = {
    closed: {
      opacity: 0,
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: 60 },
    open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const handleRestrictedNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isRestricted = (href === '/vault' || href === '/mentors') && !hasCompletedMatrix;
    if (isRestricted) {
      e.preventDefault();
      onClose();
      alert("You must complete the Reality Matrix on the Discover page before accessing this section.");
      router.push('/discover');
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] bg-bg2 flex flex-col justify-center px-8"
        >
          {/* Close button is handled by Navbar hamburger state syncing */}
          
          <motion.div 
            variants={containerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex flex-col gap-10 items-center text-center"
          >
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              const isRestricted = (link.href === '/vault' || link.href === '/mentors') && !hasCompletedMatrix;

              return (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link 
                    href={link.href}
                    onClick={(e) => handleRestrictedNav(e, link.href)}
                    className={`flex items-center gap-3 font-display font-bold text-[32px] transition-colors ${
                      isRestricted ? 'opacity-50 text-muted' : isActive ? 'text-amber' : 'text-white'
                    }`}
                  >
                    {isRestricted && <Lock size={24} className="text-amber mb-1" />}
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
            
            <motion.div variants={itemVariants} className="mt-8">
              <Button href="/discover" variant="amber" size="lg" onClick={onClose}>
                {hasCompletedMatrix ? "View Matrix" : "Begin Discovery"}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
