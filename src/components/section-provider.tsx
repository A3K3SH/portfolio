'use client';

import React, { createContext, useState, useCallback, useEffect } from 'react';
import {
  Direction,
  SectionColors,
  SectionContextType,
  Sections,
} from '@/lib/types';
import {
  ANIMATION_DURATION,
  PROJECT_THEME_SEQUENCE,
  SECTION_THEME_MAP,
  SECTIONS,
  PROJECT_SUBSECTIONS,
} from '@/lib/constants';

export const SectionContext = createContext<SectionContextType | undefined>(
  undefined
);

const TRANSITION_DURATION = ANIMATION_DURATION.MEDIUM * 2000;
const SCROLL_TIMEOUT = 600;
const SWIPE_THRESHOLD = 50;
const TOUCH_BOUNCE_THRESHOLD = 0.3;

export const SectionProvider = ({ children }: { children: React.ReactNode }) => {
 const [sectionIndex, setSectionIndex] = useState(Sections.Home);
 const [subsectionIndex, setSubsectionIndex] = useState(0);
 const [canScroll, setCanScroll] = useState(true);
 const [isTransitioning, setIsTransitioning] = useState(false);
 const [navigationDirection, setNavigationDirection] =
  useState<Direction>('down');
 const [touchStartY, setTouchStartY] = useState<number | null>(null);
 const [touchStartX, setTouchStartX] = useState<number | null>(null);
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
  const checkDevice = () => {
   setIsMobile(window.innerWidth < 768);
  };
  checkDevice();
  window.addEventListener('resize', checkDevice);
  return () => window.removeEventListener('resize', checkDevice);
 }, []);

 const safeSetSubsectionIndex = useCallback(
  (newIndex: number) => {
   let maxSubsections = 0;
   if (sectionIndex === Sections.Projects) {
    maxSubsections = PROJECT_SUBSECTIONS;
   }
   const safeIndex = Math.min(Math.max(0, newIndex), maxSubsections - 1);
   setSubsectionIndex(safeIndex);
  },
  [sectionIndex]
 );

 const delayTransition = useCallback(() => {
  return new Promise<void>((resolve) => {
   const duration = isMobile ? TRANSITION_DURATION * 0.7 : TRANSITION_DURATION;
   setTimeout(() => {
    setIsTransitioning(false);
    setCanScroll(true);
    resolve();
   }, duration);
  });
 }, [isMobile]);

 const handleMainSectionChange = useCallback((direction: Direction) => {
  setSectionIndex((prevIndex) => {
   const newIndex =
    direction === 'down'
     ? Math.min(prevIndex + 1, SECTIONS.length - 1)
     : Math.max(prevIndex - 1, 0);
   return newIndex;
  });
 }, []);

 const updateCurrentSection = useCallback(
  async (direction: Direction) => {
   if (isTransitioning) return;

   setIsTransitioning(true);
   setCanScroll(false);

   const handleTransition = () => {
    if (sectionIndex === Sections.Projects) {
     const newSubIndex =
      direction === 'down' ? subsectionIndex + 1 : subsectionIndex - 1;
     if (newSubIndex >= PROJECT_SUBSECTIONS) {
      setSectionIndex(Sections.About);
      setSubsectionIndex(0);
     } else if (newSubIndex < 0) {
      setSectionIndex(Sections.Home);
      setSubsectionIndex(0);
     } else {
      safeSetSubsectionIndex(newSubIndex);
     }
    } else {
     setSubsectionIndex(0);
     handleMainSectionChange(direction);
    }
   };

   handleTransition();
   await delayTransition();
  },
  [
   sectionIndex,
   subsectionIndex,
   isTransitioning,
   safeSetSubsectionIndex,
   handleMainSectionChange,
   delayTransition,
  ]
 );

 let isThrottled = false;
 let lastScrollTime = Date.now();

 const handleScroll = useCallback(
  (event: WheelEvent) => {
   if (isThrottled || !canScroll || isTransitioning) {
    event.preventDefault();
    return;
   }

   const now = Date.now();
   if (now - lastScrollTime < SCROLL_TIMEOUT) {
    event.preventDefault();
    return;
   }

   const direction = event.deltaY > 0 ? 'down' : 'up';
   setNavigationDirection(direction);
   updateCurrentSection(direction);

   isThrottled = true;
   lastScrollTime = now;

   setTimeout(() => {
    isThrottled = false;
   }, SCROLL_TIMEOUT);
  },
  [canScroll, isTransitioning, updateCurrentSection]
 );

 useEffect(() => {
  const handleTouchStart = (e: TouchEvent) => {
   setTouchStartY(e.touches[0].clientY);
   setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
   if (!canScroll || isTransitioning || touchStartY === null) return;

   const touchEndY = e.changedTouches[0].clientY;
   const touchEndX = e.changedTouches[0].clientX;
   const deltaY = touchStartY - touchEndY;
   const deltaX = touchStartX !== null ? touchStartX - touchEndX : 0;

   // Ignore diagonal swipes
   if (Math.abs(deltaY) > Math.abs(deltaX)) {
    if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
     const direction = deltaY > 0 ? 'down' : 'up';
     const velocity = Math.abs(deltaY) / TOUCH_BOUNCE_THRESHOLD;

     if (velocity > 1) {
      setNavigationDirection(direction);
      updateCurrentSection(direction);
     }
    }
   }

   setTouchStartY(null);
   setTouchStartX(null);
  };

  if (isMobile) {
   window.addEventListener('touchstart', handleTouchStart, { passive: true });
   window.addEventListener('touchend', handleTouchEnd, { passive: true });
  } else {
   window.addEventListener('wheel', handleScroll, { passive: false });
  }

  return () => {
   if (isMobile) {
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchend', handleTouchEnd);
   } else {
    window.removeEventListener('wheel', handleScroll);
   }
  };
 }, [
  handleScroll,
  canScroll,
  isTransitioning,
  touchStartY,
  touchStartX,
  updateCurrentSection,
  isMobile,
 ]);

 useEffect(() => {
  if (isTransitioning) {
   document.body.classList.add('prevent-scroll');
  } else {
   document.body.classList.remove('prevent-scroll');
  }
  return () => document.body.classList.remove('prevent-scroll');
 }, [isTransitioning]);

 // Apply theme colors with transition
 useEffect(() => {
  const colorsMap = SECTION_THEME_MAP[sectionIndex];
  let colors: SectionColors;

  if (
   typeof colorsMap === 'object' &&
   sectionIndex === Sections.Projects &&
   subsectionIndex in colorsMap
  ) {
   colors = (colorsMap as { [subKey: number]: SectionColors })[subsectionIndex];
  } else if (
   sectionIndex === Sections.Projects &&
   PROJECT_THEME_SEQUENCE.length > 0
  ) {
   colors =
    PROJECT_THEME_SEQUENCE[subsectionIndex % PROJECT_THEME_SEQUENCE.length];
  } else {
   colors = colorsMap as SectionColors;
  }

  if (colors) {
   requestAnimationFrame(() => {
    document.documentElement.style.setProperty(
     '--theme-background',
     colors.background
    );
    document.documentElement.style.setProperty(
     '--theme-primary',
     colors.primary
    );
    document.documentElement.style.setProperty(
     '--theme-secondary',
     colors.secondary
    );
    document.documentElement.style.setProperty('--theme-accent', colors.accent);
   });
  }
 }, [sectionIndex, subsectionIndex]);

 const handleNavigation = useCallback(
  (newIndex: number) => {
   setNavigationDirection(newIndex > sectionIndex ? 'down' : 'up');
   setSectionIndex(newIndex);
   setSubsectionIndex(0);
  },
  [sectionIndex]
 );

 return (
  <SectionContext.Provider
   value={{
    sectionIndex,
    subsectionIndex,
    setSectionIndex: handleNavigation,
    setSubsectionIndex: safeSetSubsectionIndex,
    navigationDirection,
    isTransitioning,
   }}
  >
   {children}
  </SectionContext.Provider>
 );
};