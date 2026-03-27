"use client";
import { FuzzyOverlay } from './ui/fuzzy-overlay';
import { ScrollDownIndicator } from './ui/ScrollDownIndicator';
import { useEffect, useState } from 'react';

export const EnhancedOverlay = () => {
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
  const checkIsMobile = () => {
   const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;

   setIsMobile(isTouchDevice);
  };

  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);

  return () => {
   window.removeEventListener('resize', checkIsMobile);
  };
 }, []);

 return (
  <>
   <FuzzyOverlay />
   {!isMobile && <ScrollDownIndicator />}
  </>
 );
};