'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { Button, cn } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { useCareerContext } from '@/context/CareerContext';
import { Lock } from 'lucide-react';

export function Navbar() {
  const [scrollY, setScrollY] = React.useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const { hasCompletedMatrix } = useCareerContext();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollY > 80;

  const handleRestrictedNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isRestricted = href === '/vault' || href === '/mentors';
    if (isRestricted && !hasCompletedMatrix) {
      e.preventDefault();
      alert("You must complete the Reality Matrix on the Discover page before accessing this section.");
      router.push('/discover');
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 h-[60px] md:h-[72px] transition-all duration-300",
          isScrolled ? "backdrop-blur-xl bg-bg/85 border-b border-border" : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 h-full flex items-center justify-between">
          <Link href="/" className="relative flex items-center z-50">
            <span className="font-display font-black text-white text-[20px] md:text-[24px]">PATHFINDER</span>
            <span className="text-amber text-[11px] font-bold tracking-widest absolute -top-1 -right-4">AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => {
              const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');
              const isRestricted = (link.href === '/vault' || link.href === '/mentors') && !hasCompletedMatrix;

              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={(e) => handleRestrictedNav(e, link.href)}
                  className={cn(
                    "flex items-center gap-1.5 relative font-body font-medium text-sm transition-colors duration-300",
                    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[1px] after:bg-white after:origin-left after:scale-x-0",
                    !isRestricted && "hover:after:scale-x-100 after:transition-transform after:duration-300",
                    isActive ? "text-white after:scale-x-100" : "text-muted hover:text-white",
                    isRestricted ? "opacity-60 cursor-not-allowed hover:text-amber" : ""
                  )}
                >
                  {isRestricted && <Lock size={12} className="text-amber mb-0.5" />}
                  {link.label}
                </Link>
              );
            })}
            <Button href="/discover" variant="amber" size="md" className="ml-4">
              {hasCompletedMatrix ? "View Matrix" : "Begin Discovery"}
            </Button>
          </div>

          <button 
            className="md:hidden z-50 p-2 -mr-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={cn("w-full h-[2px] bg-current transition-all duration-300", mobileMenuOpen ? "rotate-45 translate-y-[9px]" : "")} />
              <span className={cn("w-full h-[2px] bg-current transition-all duration-300", mobileMenuOpen ? "opacity-0" : "")} />
              <span className={cn("w-full h-[2px] bg-current transition-all duration-300", mobileMenuOpen ? "-rotate-45 -translate-y-[9px]" : "")} />
            </div>
          </button>
        </div>
      </nav>
      
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        pathname={pathname}
      />
    </>
  );
}
