import React from 'react';
import Footer from '@/components/common/Footer';
import { Header } from '@/components/common/Header';
import { PageTransition } from '@/components/common/PageTransitions';

interface PricingLayoutProps {
  children: React.ReactNode;
}

export default function PricingLayout({ children }: PricingLayoutProps) {
  return (
    <PageTransition>
    <div className="min-h-screen bg-[var(--principal-main-color)] text-[var(--text)] font-['Baloo_Bhaijaan_2'] flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
    </PageTransition>
  );
}