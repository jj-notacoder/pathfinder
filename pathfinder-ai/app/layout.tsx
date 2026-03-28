import type { Metadata } from 'next';
import { Syne, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { CareerProvider } from '@/context/CareerContext';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pathfinder AI | Career Discovery Platform',
  description: 'Reality-first career discovery for high school students. Powered by AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body antialiased bg-bg text-white">
        <CareerProvider>
          {/* Navbar will go here */}
          <main>{children}</main>
          {/* Footer will go here */}
        </CareerProvider>
      </body>
    </html>
  );
}
