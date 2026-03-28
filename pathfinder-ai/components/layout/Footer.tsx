import Link from 'next/link';
import { Globe, Mail, MessageCircle } from 'lucide-react';
import { FOOTER_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border pt-16 md:pt-24 pb-8">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <div>
              <Link href="/" className="relative inline-flex items-center mb-2">
                <span className="font-display font-black text-white text-[24px]">PATHFINDER</span>
                <span className="text-amber text-[11px] font-bold tracking-widest absolute -top-1 -right-4">AI</span>
              </Link>
              <p className="font-body text-sm text-muted max-w-[200px]">Reality-first career discovery for the next generation.</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-colors">
                <Globe size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-colors">
                <MessageCircle size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted hover:text-white hover:border-white/30 transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body font-semibold text-white text-[15px] mb-2">Product</h4>
            {FOOTER_LINKS.product.map(link => (
              <Link key={link.href} href={link.href} className="font-body text-sm text-muted hover:text-white transition-colors w-fit">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3: Platform */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body font-semibold text-white text-[15px] mb-2">Platform</h4>
            {FOOTER_LINKS.platform.map(link => (
              <Link key={link.href} href={link.href} className="font-body text-sm text-muted hover:text-white transition-colors w-fit">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 4: Legal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-body font-semibold text-white text-[15px] mb-2">Legal</h4>
            {FOOTER_LINKS.legal.map(link => (
              <Link key={link.href} href={link.href} className="font-body text-sm text-muted hover:text-white transition-colors w-fit">
                {link.label}
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted">© {new Date().getFullYear()} Pathfinder AI. Built to tell the truth.</p>
          <p className="font-body text-xs text-muted">Made with purpose.</p>
        </div>
      </div>
    </footer>
  );
}
