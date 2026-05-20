import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InfyPrep AI - Infosys Placement Preparation Platform',
  description: 'Complete AI-powered preparation platform for Infosys placements, HackWithInfy, InfyTQ, aptitude, reasoning, and coding interviews.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-dark-950 text-dark-900 dark:text-dark-100 min-h-screen`}>
        <Providers>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
