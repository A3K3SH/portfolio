'use client';

import { useSection } from '@/lib/hooks';
import { useState, useEffect, useCallback } from 'react';
import {
 SECTIONS,
 PROJECT_SUBSECTIONS,
} from '@/lib/constants';
import { generateUniqueTitleSections } from '@/lib/utils';
import { Sections } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sectionNavigationOptions = generateUniqueTitleSections(SECTIONS);

export default function EnhancedNavigation() {
 const { sectionIndex, subsectionIndex, setSectionIndex, setSubsectionIndex } =
  useSection();
 const [isMobile, setIsMobile] = useState(false);
 const [touchStartY, setTouchStartY] = useState<number | null>(null);
 const [touchStartX, setTouchStartX] = useState<number | null>(null);

 // Check if current section needs interactive elements
 const needsInteraction =
  sectionIndex === Sections.Home || sectionIndex === Sections.Contact;

 // Check if device is mobile
 useEffect(() => {
  const checkDevice = () => {
   const mobile = window.innerWidth < 768;
   setIsMobile(mobile);
  };

  checkDevice();
  window.addEventListener('resize', checkDevice);
  return () => window.removeEventListener('resize', checkDevice);
 }, []);

 const handleSectionChange = useCallback(
  (newIndex: number) => {
   // Always reset subsection index when changing sections
   setSubsectionIndex(0);
   setSectionIndex(newIndex);
  },
  [setSectionIndex, setSubsectionIndex]
 );

 // Handle touch events for swipe navigation
 const handleTouchStart = useCallback(
  (e: React.TouchEvent) => {
   // Skip touch handling if we need interaction
   if (needsInteraction) return;

   setTouchStartY(e.touches[0].clientY);
   setTouchStartX(e.touches[0].clientX);
  },
  [needsInteraction]
 );

 const handleTouchEnd = useCallback(
  (e: React.TouchEvent) => {
   // Skip touch handling if we need interaction
   if (needsInteraction) return;
   if (!touchStartY || !touchStartX) return;

   const touchEndY = e.changedTouches[0].clientY;
   const touchEndX = e.changedTouches[0].clientX;

   const diffY = touchStartY - touchEndY;
   const diffX = touchStartX - touchEndX;

   // Handle significant horizontal swipes
   if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
     // Swipe left - next subsection
     handleNextSubsection();
    } else {
     // Swipe right - previous subsection
     handlePrevSubsection();
    }
   }
   // Handle significant vertical swipes
   else if (Math.abs(diffY) > 50 && Math.abs(diffY) > Math.abs(diffX)) {
    if (diffY > 0) {
     // Swipe up - go to next section
     if (sectionIndex < SECTIONS.length - 1) {
      handleSectionChange(sectionIndex + 1);
     }
    } else {
     // Swipe down - go to previous section
     if (sectionIndex > 0) {
      handleSectionChange(sectionIndex - 1);
     }
    }
   }

   setTouchStartY(null);
   setTouchStartX(null);
  },
  [
   touchStartY,
   touchStartX,
   sectionIndex,
   handleSectionChange,
   needsInteraction,
  ]
 );

 // Get the maximum number of subsections for the current section
 const getMaxSubsectionsForCurrentSection = useCallback(() => {
  if (sectionIndex === Sections.Projects) {
   return PROJECT_SUBSECTIONS;
  }
  return 0;
 }, [sectionIndex]);

 // Handle next subsection button click
 const handleNextSubsection = useCallback(() => {
  const maxSubsections = getMaxSubsectionsForCurrentSection();

  if (subsectionIndex < maxSubsections - 1) {
   setSubsectionIndex(subsectionIndex + 1);
  }
 }, [
  sectionIndex,
  subsectionIndex,
  setSubsectionIndex,
  getMaxSubsectionsForCurrentSection,
 ]);

 // Handle previous subsection button click
 const handlePrevSubsection = useCallback(() => {
  if (subsectionIndex > 0) {
   setSubsectionIndex(subsectionIndex - 1);
  }
 }, [subsectionIndex, setSubsectionIndex]);

 // Section indicators (dots/lines)
 const renderSectionIndicators = () => (
  <div className="fixed top-1/2 transform -translate-y-1/2 right-4 flex flex-col gap-3 z-50 hidden md:flex">
   {sectionNavigationOptions.map((section) => (
    <button
     key={section.title}
     onClick={() => handleSectionChange(section.index)}
     className="group relative flex items-center"
     aria-label={`Navigate to ${section.title} section`}
    >
     <span className="mr-2 opacity-0 text-theme-primary text-sm font-medium group-hover:opacity-100 transition-opacity whitespace-nowrap">
      {section.title}
     </span>
    </button>
   ))}
  </div>
 );

 // Only render subsection navigation in Projects section
 const renderSubsectionNav = () => {
  const isProjects = sectionIndex === Sections.Projects;

  if (!isProjects) return null;

  const maxSubsections = getMaxSubsectionsForCurrentSection();

  if (maxSubsections <= 1) return null;

  return (
   <div className="fixed bottom-16 md:bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 pointer-events-auto">
    {/* Previous Button */}
    <button
     onClick={handlePrevSubsection}
     disabled={subsectionIndex === 0}
     className={`rounded-full bg-theme-accent p-3 shadow-md transition-all ${
      subsectionIndex === 0
       ? 'opacity-40 cursor-not-allowed'
       : 'hover:bg-theme-primary hover:text-theme-background active:scale-95'
     }`}
     aria-label="Previous item"
    >
     <ChevronLeft className="w-6 h-6 text-theme-primary" />
    </button>

    {/* Subsection dots */}
    <div className="flex gap-3 items-center">
     {Array.from({ length: maxSubsections }).map((_, i) => (
      <button
       key={i}
       onClick={() => {
        setSubsectionIndex(i);
       }}
       className={`rounded-full transition-all ${
        i === subsectionIndex
         ? 'w-8 h-3 bg-theme-primary'
         : 'w-3 h-3 bg-theme-primary opacity-50'
       }`}
       aria-label={`Go to item ${i + 1}`}
      />
     ))}
    </div>

    {/* Next Button */}
    <button
     onClick={handleNextSubsection}
     disabled={subsectionIndex === maxSubsections - 1}
     className={`rounded-full bg-theme-accent p-3 shadow-md transition-all ${
      subsectionIndex === maxSubsections - 1
       ? 'opacity-40 cursor-not-allowed'
       : 'hover:bg-theme-primary hover:text-theme-background active:scale-95'
     }`}
     aria-label="Next item"
    >
     <ChevronRight className="w-6 h-6 text-theme-primary" />
    </button>
   </div>
  );
 };

 return (
  <>
   {/* Mobile swipe handler - only capture events when not in interactive sections */}
   <div
    className={`fixed inset-0 z-10 touch-pan-y md:hidden ${
     needsInteraction ? 'pointer-events-none' : 'pointer-events-auto'
    }`}
    onTouchStart={handleTouchStart}
    onTouchEnd={handleTouchEnd}
    style={{ touchAction: 'pan-y' }}
   />

   {/* Desktop section indicators */}
   {!isMobile && renderSectionIndicators()}

   {/* Subsection navigation - only appears in relevant sections */}
   {renderSubsectionNav()}
  </>
 );
}
