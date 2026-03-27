'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSection } from '@/lib/hooks';

/**
 * DeviceDetector - Detects device type and capabilities
 * Returns various properties to optimize UI for different devices
 */
export function useDeviceDetector() {
 const [device, setDevice] = useState({
  isMobile: false,
  isTouch: false,
  isReducedMotion: false,
  isSafari: false,
  isLandscape: false,
  viewportHeight: 0,
  safeAreaTop: 0,
  safeAreaBottom: 0,
 });

 useEffect(() => {
  // Function to detect device capabilities
  const detectDevice = () => {
   const mobile = window.innerWidth < 768;
   const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
   const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
   ).matches;
   const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
   const landscape = window.innerWidth > window.innerHeight;
   const viewportHeight = window.innerHeight;

   // Get safe area insets for notched devices
   const safeAreaTop = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
     '--safe-area-inset-top'
    ) || '0'
   );
   const safeAreaBottom = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue(
     '--safe-area-inset-bottom'
    ) || '0'
   );

   setDevice({
    isMobile: mobile,
    isTouch: touch,
    isReducedMotion: reducedMotion,
    isSafari: safari,
    isLandscape: landscape,
    viewportHeight,
    safeAreaTop,
    safeAreaBottom,
   });

   // Add CSS classes to html for styling hooks
   document.documentElement.classList.toggle('is-mobile', mobile);
   document.documentElement.classList.toggle('is-touch', touch);
   document.documentElement.classList.toggle('is-landscape', landscape);
   document.documentElement.classList.toggle('is-safari', safari);
   document.documentElement.classList.toggle('reduced-motion', reducedMotion);

   // Set CSS variables for viewport height (fixing iOS 100vh issue)
   document.documentElement.style.setProperty(
    '--vh',
    `${window.innerHeight * 0.01}px`
   );

   // Set CSS variables for safe area insets
   if ('CSS' in window && CSS.supports('top: env(safe-area-inset-top)')) {
    document.documentElement.style.setProperty(
     '--safe-area-inset-top',
     'env(safe-area-inset-top)'
    );
    document.documentElement.style.setProperty(
     '--safe-area-inset-bottom',
     'env(safe-area-inset-bottom)'
    );
    document.documentElement.style.setProperty(
     '--safe-area-inset-left',
     'env(safe-area-inset-left)'
    );
    document.documentElement.style.setProperty(
     '--safe-area-inset-right',
     'env(safe-area-inset-right)'
    );
   }
  };

  // Initial detection
  detectDevice();

  // Update on resize and orientation change
  window.addEventListener('resize', detectDevice);
  window.addEventListener('orientationchange', detectDevice);

  return () => {
   window.removeEventListener('resize', detectDevice);
   window.removeEventListener('orientationchange', detectDevice);
  };
 }, []);

 return device;
}

/**
 * LazyAnimation - Only runs animations when element is in viewport
 * Improves performance by not animating off-screen elements
 */
export function useLazyAnimation() {
 const ref = useRef<HTMLDivElement>(null);
 const [isVisible, setIsVisible] = useState(false);
 const { isMobile, isReducedMotion } = useDeviceDetector();

 useEffect(() => {
  const observer = new IntersectionObserver(
   ([entry]) => {
    // Only set once to true when it enters viewport
    if (entry.isIntersecting && !isVisible) {
     setIsVisible(true);

     // If we're not concerned about performance, we can unobserve
     if (!isMobile && !isReducedMotion) {
      observer.unobserve(entry.target);
     }
    }
   },
   {
    rootMargin: '50px',
    threshold: 0.1,
   }
  );

  if (ref.current) {
   observer.observe(ref.current);
  }

  return () => {
   if (ref.current) {
    observer.unobserve(ref.current);
   }
  };
 }, [isVisible, isMobile, isReducedMotion]);

 return { ref, isVisible };
}

/**
 * OptimizedImageLoader - Better image loading strategy
 * Uses priority loading for visible sections, lazy loading for others
 */
export function useOptimizedImageLoader() {
 const { sectionIndex } = useSection();
 const [loadedSections, setLoadedSections] = useState<number[]>([0]); // Start with first section loaded

 useEffect(() => {
  // Add current section to loaded sections
  if (!loadedSections.includes(sectionIndex)) {
   setLoadedSections([...loadedSections, sectionIndex]);
  }

  // Preload adjacent sections (next and previous)
  const sectionsToPreload = [
   Math.max(0, sectionIndex - 1),
   Math.min(5, sectionIndex + 1), // 5 is the max section index
  ].filter((idx) => idx !== sectionIndex && !loadedSections.includes(idx));

  if (sectionsToPreload.length > 0) {
   setLoadedSections([...loadedSections, ...sectionsToPreload]);
  }
 }, [sectionIndex, loadedSections]);

 const shouldPrioritizeSection = useCallback(
  (index: number) => loadedSections.includes(index) || index === sectionIndex,
  [loadedSections, sectionIndex]
 );

 return { shouldPrioritizeSection, loadedSections };
}

/**
 * ScrollOptimizer - Optimizes scroll-based navigation
 * Adds touch support and prevents common scroll issues
 */
export function useScrollOptimizer() {
 const [isScrolling, setIsScrolling] = useState(false);
 const scrollTimer = useRef<NodeJS.Timeout | null>(null);
 const device = useDeviceDetector();

 // Throttle scroll events
 const throttleScroll = useCallback(() => {
  if (!isScrolling) {
   setIsScrolling(true);
  }

  // Clear previous timer
  if (scrollTimer.current) {
   clearTimeout(scrollTimer.current);
  }

  // Set new timer to reset scroll state
  scrollTimer.current = setTimeout(() => {
   setIsScrolling(false);
  }, 100);
 }, [isScrolling]);

 useEffect(() => {
  if (device.isMobile) {
   // Prevent pull-to-refresh on mobile
   document.body.style.overscrollBehavior = 'none';

   // Proper height setting for iOS
   document.documentElement.style.height = `${window.innerHeight}px`;
  }

  window.addEventListener('scroll', throttleScroll, { passive: true });

  return () => {
   window.removeEventListener('scroll', throttleScroll);
   if (scrollTimer.current) {
    clearTimeout(scrollTimer.current);
   }
   document.body.style.overscrollBehavior = '';
  };
 }, [device.isMobile, throttleScroll]);

 return { isScrolling };
}

/**
 * Component for Dynamic Fade-In effects based on scroll
 */
export function DynamicFadeIn({
 children,
 className = '',
 delay = 0,
 direction = 'up',
 duration = 0.6,
}: {
 children: React.ReactNode;
 className?: string;
 delay?: number;
 direction?: 'up' | 'down' | 'left' | 'right';
 duration?: number;
}) {
 const { ref, isVisible } = useLazyAnimation();
 const { isMobile, isReducedMotion } = useDeviceDetector();

 // Direction-based initial transform
 const getInitialTransform = () => {
  if (isReducedMotion) return { y: 0, x: 0 };

  const distance = isMobile ? 10 : 20;

  switch (direction) {
   case 'up':
    return { y: distance, x: 0 };
   case 'down':
    return { y: -distance, x: 0 };
   case 'left':
    return { y: 0, x: distance };
   case 'right':
    return { y: 0, x: -distance };
   default:
    return { y: distance, x: 0 };
  }
 };

 const initialTransform = getInitialTransform();

 return (
  <div ref={ref} className={className}>
   <div
    style={{
     opacity: isVisible ? 1 : 0,
     transform: isVisible
      ? 'translate(0, 0)'
      : `translate(${initialTransform.x}px, ${initialTransform.y}px)`,
     transition: isReducedMotion
      ? 'opacity 0.3s ease'
      : `opacity ${duration}s ease, transform ${duration}s ease`,
     transitionDelay: `${delay}s`,
    }}
   >
    {children}
   </div>
  </div>
 );
}

/**
 * Main Performance Optimizer component that applies optimizations
 */
export default function PerformanceOptimizer({
 children,
}: {
 children: React.ReactNode;
}) {
 const device = useDeviceDetector();

 useEffect(() => {
  // Disable animations for reduced motion preference
  if (device.isReducedMotion) {
   document.documentElement.classList.add('reduce-animations');
  }

  // Fix iOS viewport issues
  if (device.isSafari) {
   const fixViewport = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
   };

   fixViewport();
   window.addEventListener('resize', fixViewport);
   return () => window.removeEventListener('resize', fixViewport);
  }
 }, [device]);

 return (
  <>
   {children}
   {device.isMobile && (
    <style jsx global>{`
     /* Critical mobile optimizations */
     * {
      -webkit-tap-highlight-color: transparent;
     }

     body {
      height: ${device.viewportHeight}px;
      overflow: hidden;
      touch-action: manipulation;
     }

     /* Hide custom cursor on mobile */
     #portfolio * {
      cursor: auto !important;
     }

     /* Optimize animations on mobile */
     .animate-delayed {
      animation-delay: 0s !important;
     }

     /* Fix for iOS scrolling */
     .scroll-container {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
     }
    `}</style>
   )}
  </>
 );
}
