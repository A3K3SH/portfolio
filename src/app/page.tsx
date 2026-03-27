'use client';

import { SectionProvider } from '@/components/section-provider';
import Section from '@/components/section';
import Frame from '@/components/frame';
import Cursor from '@/components/ui/cursor';
import { EnhancedOverlay } from '@/components/EnhancedOverlay';
import ErrorBoundary from '@/components/error-boundary';
import EnhancedNavigation from '@/components/enhanced-navigation';
import WelcomeOverlay from '@/components/welcome-overlay';
import { useEffect, useState } from 'react';

export default function Page() {
 const [isMobile, setIsMobile] = useState(false);

 // Detect mobile devices and handle viewport properly
 useEffect(() => {
  const checkMobile = () => {
   const mobile =
    window.innerWidth < 768 ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;
   setIsMobile(mobile);

   // Set viewport height fix for iOS
   const vh = window.innerHeight * 0.01;
   document.documentElement.style.setProperty('--vh', `${vh}px`);

   // Fix mobile scrollbar issues
   if (mobile) {
    document.documentElement.classList.add('hide-scrollbar');
    document.body.classList.add('hide-scrollbar');
   } else {
    document.documentElement.classList.remove('hide-scrollbar');
    document.body.classList.remove('hide-scrollbar');
   }
  };

  checkMobile();
  window.addEventListener('resize', checkMobile);
  window.addEventListener('orientationchange', checkMobile);

  return () => {
   window.removeEventListener('resize', checkMobile);
   window.removeEventListener('orientationchange', checkMobile);

   // Clean up classes
   document.documentElement.classList.remove('hide-scrollbar');
   document.body.classList.remove('hide-scrollbar');
  };
 }, []);

 return (
  <main
   id="main-content"
   className="h-full touch-none w-full relative overflow-hidden overscroll-none hide-scrollbar"
   style={{
    WebkitOverflowScrolling: 'auto',
    height: 'calc(var(--vh, 1vh) * 100)',
   }}
   aria-label="Aakash Swain's Portfolio"
  >
   <ErrorBoundary>
   <SectionProvider>
    <WelcomeOverlay />
     <Frame />
     <Section />
     <EnhancedOverlay />
     {!isMobile && <Cursor />}
     <EnhancedNavigation />
    </SectionProvider>
   </ErrorBoundary>
  </main>
 );
}
