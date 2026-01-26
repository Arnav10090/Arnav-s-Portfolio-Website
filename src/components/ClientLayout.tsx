'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useScrollAnimation } from '@/lib/useScrollAnimation';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  // Initialize scroll animations
  useScrollAnimation();

  return (
    <>
      {/* Skip to main content link for keyboard navigation */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Header />
      {children}
      <Footer />
    </>
  );
}
