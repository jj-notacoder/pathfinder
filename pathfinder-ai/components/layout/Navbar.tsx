'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';
import { Button, cn } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';
import { useCareerContext } from '@/context/CareerContext';

export function Navbar() {
  const [scrollY, setScrollY] = React.useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const { hasCompletedMatrix, setHasCompletedMatrix } = useCareerContext();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollY > 80;

  const handleMatrixNav = (href: string) => {
    if (href === '/discover' || href === '/') {
      setHasCompletedMatrix(false);
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
              return (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => link.href === '/discover' && setHasCompletedMatrix(false)}
                  className={cn(
                    "flex items-center gap-1.5 relative font-body font-medium text-sm transition-colors duration-300",
                    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[1px] after:bg-white after:origin-left after:scale-x-0",
                    "hover:after:scale-x-100 after:transition-transform after:duration-300",
                    isActive ? "text-white after:scale-x-100" : "text-muted hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button href="/discover" variant="amber" size="md" className="ml-4" onClick={() => setHasCompletedMatrix(false)}>
              {hasCompletedMatrix ? "Retake Matrix" : "Begin Discovery"}
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
