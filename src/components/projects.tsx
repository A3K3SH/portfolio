'use client';

import React, { useEffect, useState } from 'react';
import { useSection } from '@/lib/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ANIMATION_DURATION, PROJECTS_ITEMS } from '@/lib/constants';
import { Sections } from '@/lib/types';

const Projects = () => {
 const { sectionIndex, subsectionIndex, setSubsectionIndex } = useSection();
 // Track current project index locally
 const [currentProject, setCurrentProject] = useState(0);

 // Initialize to first project when entering Projects section
 useEffect(() => {
  if (sectionIndex === Sections.Projects) {
   // Always reset to first project when entering Projects section
   setSubsectionIndex(0);
  }
 }, [sectionIndex, setSubsectionIndex]);

 // Update current project when subsectionIndex changes
 useEffect(() => {
  if (sectionIndex === Sections.Projects) {
   // Make sure index is within valid range
   const validIndex = Math.min(
    Math.max(0, subsectionIndex),
    PROJECTS_ITEMS.length - 1
   );
   setCurrentProject(validIndex);
  }
 }, [subsectionIndex, sectionIndex]);

 // Get the current project data safely
 const { cover, title, subject, description, demoLink, techStack } =
  PROJECTS_ITEMS[currentProject];

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

 const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
   opacity: 1,
   y: 0,
   transition: {
    duration: ANIMATION_DURATION.MEDIUM,
    ease: 'easeOut',
   },
  },
  exit: {
   opacity: 0,
   y: -20,
   transition: {
    duration: ANIMATION_DURATION.MEDIUM,
    ease: 'easeIn',
   },
  },
 };

 // Function to directly navigate without using Link component
 const handleVisitClick = () => {
  // Using window.location directly to avoid any event propagation issues
  window.location.href = demoLink;
  return false; // Prevent default behavior
 };

 return (
  <div className="relative flex items-center justify-center mx-auto px-5">
   <AnimatePresence mode="wait">
    <motion.div
     key={`project-${currentProject}`}
     initial="hidden"
     animate="visible"
     exit="exit"
     variants={contentVariants}
     className="relative flex flex-col lg:flex-row items-center justify-center"
    >
     <div className="relative border-theme-accent border-[6px] sm:border-[8px] md:border-[12px] overflow-hidden rounded-2xl md:rounded-3xl">
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
         key={`image-overlay-${currentProject}-${index}`}
         initial="initial"
         animate="animate"
         custom={index * 0.2}
         variants={overlayVariants(index * 0.2)}
         className={`absolute inset-0 h-full ${color}`}
         style={{ originX: 0, zIndex: 20 - index }}
        />
       ))}
       {demoLink && (
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

     <motion.div
      className="relative flex flex-col md:max-w-lg lg:w-96 pt-5 pb-5 pr-4 lg:px-9 lg:pt-10 border-theme-accent lg:border-2 lg:right-28 rounded-3xl z-10"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
       duration: ANIMATION_DURATION.MEDIUM,
       delay: ANIMATION_DURATION.SHORT,
      }}
     >
    <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
    <h4 className="text-sm lg:text-lg text-theme-primary mb-2 lg:mb-3">
     {subject}
    </h4>
      <p className="h-auto text-white mb-8 font-semibold">
       {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4 lg:mb-8">
       {techStack.map((tech, index) => (
        <motion.span
         key={index}
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{
          duration: ANIMATION_DURATION.SHORT,
          delay: ANIMATION_DURATION.SHORT + index * 0.1,
         }}
         className="bg-theme-background border-theme-primary border rounded-2xl text-theme-primary px-3 py-1 text-xs font-semibold"
        >
         {tech}
        </motion.span>
       ))}
      </div>

      <div className="absolute inset-0 h-full rounded-3xl bg-theme-background -z-10 lg:shadow-2xl" />
      <div className="absolute inset-0 h-full rounded-3xl mt-1 lg:mt-0 lg:overflow-hidden z-10">
       {overlayColors.map((color, index) => (
        <motion.div
         key={`info-overlay-${currentProject}-${index}`}
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
     </motion.div>
    </motion.div>
   </AnimatePresence>
  </div>
 );
};

export default React.memo(Projects);
