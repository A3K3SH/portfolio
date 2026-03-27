'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '@/lib/hooks';
import { ANIMATION_DURATION, SECTIONS } from '@/lib/constants';
import { Direction } from '@/lib/types';
import { useEffect } from 'react';

export default function Section() {
 const { sectionIndex, navigationDirection } = useSection();
 const variants = {
  enter: (direction: Direction) => ({
   opacity: 0,
   y: direction === 'down' ? 30 : -30, // Smaller shift on mobile
  }),
  center: { opacity: 1, y: 0 },
  exit: (direction: 'up' | 'down') => ({
   opacity: 0,
   y: direction === 'down' ? -30 : 30, // Smaller shift on mobile
  }),
 };

 useEffect(() => {
  // Reset scroll position when section changes
  window.scrollTo(0, 0);

  // Store section's scroll position for potential restoration
  const sectionElement = document.querySelector('.section-content');
  if (sectionElement) {
   sectionElement.scrollTop = 0;
  }
 }, [sectionIndex]);

 return (
    <div className="h-full flex items-center justify-center bg-theme-background">
   <AnimatePresence mode="wait" custom={navigationDirection}>
    <motion.main
     key={sectionIndex}
     variants={variants}
     initial="enter"
     animate="center"
     exit="exit"
     custom={navigationDirection}
     transition={{
      duration: ANIMATION_DURATION.SHORT,
      ease: 'easeOut',
     }}
     className="flex items-center justify-center h-full section-content will-change-transform"
    >
     {SECTIONS[sectionIndex].content}
    </motion.main>
   </AnimatePresence>
  </div>
 );
}