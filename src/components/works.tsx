'use client';

import React, { useEffect, useState } from 'react';
import { useSection } from '@/lib/hooks';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ANIMATION_DURATION, WORKS_ITEMS } from '@/lib/constants';

export default function Works() {
 const { subsectionIndex } = useSection();
 const [currentWorkItem, setCurrentWorkItem] = useState(0); // Start at first item

 // Update when subsectionIndex changes with animation delay
 useEffect(() => {
  // This makes sure we respond to subsection changes
  const timeout = setTimeout(() => {
   // Ensure we get a valid index
   const safeIndex = Math.min(
    Math.max(0, subsectionIndex),
    WORKS_ITEMS.length - 1
   );
   setCurrentWorkItem(safeIndex);
  }, ANIMATION_DURATION.MEDIUM * 1000);

  return () => {
   clearTimeout(timeout);
  };
 }, [subsectionIndex]);

 // Safely get current work item
 const { cover, title, subject, description, link, techStack } =
  WORKS_ITEMS[currentWorkItem];

 const overlayVariants = (delay: number) => ({
  initial: { width: '0%', originX: 0 },
  animate: {
   width: ['0%', '100%', '0%'],
   transition: {
    duration: ANIMATION_DURATION.MEDIUM * 2,
    times: [0, 0.5, 1],
    ease: 'easeInOut',
    delay,
   },
  },
 });

 const overlayColors = [
  'bg-theme-primary',
  'bg-theme-background',
  'bg-theme-primary',
 ];

 // Function to directly navigate without using Link component
 const handleVisitClick = () => {
  // Using window.location directly to avoid any event propagation issues
  window.location.href = link;
  return false; // Prevent default behavior
 };

 return (
  <div className="relative flex items-center justify-center mx-auto px-4 sm:px-5 py-4 md:py-0">
   <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
    <div className="relative border-theme-accent border-[6px] sm:border-[8px] md:border-[12px] overflow-hidden rounded-2xl md:rounded-3xl max-w-full">
     <div className="relative w-full">
      <Image
       priority
       loading="eager"
       width={920}
       height={540}
       src={cover}
       alt={`${title} cover`}
       className="w-full min-w-[280px] 2xl:w-[920px] xl:w-[720px] lg:w-[540px] md:max-h-[540px] max-h-[400px] object-cover"
      />
      {overlayColors.map((color, index) => (
       <motion.div
        key={`image-overlay-${currentWorkItem}-${index}`}
        initial="initial"
        animate="animate"
        custom={index * 0.2}
        variants={overlayVariants(index * 0.2)}
        className={`absolute inset-0 h-full ${color}`}
        style={{ originX: 0, zIndex: 20 - index }}
       />
      ))}
      {link && (
       <div className="absolute bottom-0 left-0 w-full flex justify-center pb-4 z-20">
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-theme-background/90 to-transparent pointer-events-none rounded-b-2xl z-10" />
        <button
         onClick={handleVisitClick}
         className="relative z-20 w-11/12 sm:w-3/4 text-theme-background text-lg rounded-2xl bg-white hover:bg-theme-accent font-semibold hover:text-white px-8 py-3 hoverable active:brightness-80 hover:tracking-widest transition-all duration-500 hover:shadow-2xl shadow-white"
        >
         Visit
        </button>
       </div>
      )}
     </div>
    </div>

    <div className="relative flex flex-col w-full md:max-w-lg lg:w-96 pt-4 pb-4 px-4 lg:px-9 lg:pt-10 border-theme-accent border lg:border-2 lg:right-28 rounded-2xl md:rounded-3xl z-10">
     <h4 className="text-sm lg:text-lg text-theme-primary mb-1 lg:mb-3">
      {subject}
     </h4>
     <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{title}</h3>
     <p className="h-auto sm:h-20 text-sm sm:text-base text-white mb-4 sm:mb-8 font-semibold">
      {description}
     </p>
     <div className="flex flex-wrap gap-2 mb-4">
      {techStack.map((tech, index) => (
       <span
        key={index}
        className="bg-theme-background border-theme-primary border rounded-2xl text-theme-primary px-2 py-0.5 text-xs font-semibold"
       >
        {tech}
       </span>
      ))}
     </div>

     <div className="absolute inset-0 h-full rounded-3xl bg-theme-background -z-10 lg:shadow-2xl" />
     <div className="absolute inset-0 h-full rounded-3xl mt-1 lg:mt-0 lg:overflow-hidden z-10">
      {overlayColors.map((color, index) => (
       <motion.div
        key={`info-overlay-${currentWorkItem}-${index}`}
        initial="initial"
        animate="animate"
        custom={index * 0.1}
        variants={overlayVariants(index * 0.1)}
        className={`absolute lg:rounded-3xl inset-0 h-full ${color}`}
        style={{ originX: 0, zIndex: 20 - index }}
       />
      ))}
     </div>

     <div className="absolute w-full h-full rounded-3xl bg-theme-accent hidden lg:block right-5 top-5 -z-20" />
    </div>
   </div>
  </div>
 );
}
