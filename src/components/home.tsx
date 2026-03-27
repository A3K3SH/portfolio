'use client';

import { useSection } from '@/lib/hooks';
import { Sections } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BubbleText } from './ui/bubble-text';
import { usePowerGlitch } from '@/lib/hooks/use-power-glitch';

const IntroFigure = '/assets/images/aakash.png';

export default function Home() {
 const { setSectionIndex } = useSection();
 const [, setIsLoaded] = useState(false);
 const [isMobile, setIsMobile] = useState(false);

 useEffect(() => {
  const checkMobile = () => {
   setIsMobile(window.innerWidth < 768);
  };

  checkMobile();
  window.addEventListener('resize', checkMobile);

  setIsLoaded(true);

  return () => {
   window.removeEventListener('resize', checkMobile);
  };
 }, []);

 // Configure glitch effects based on device - optimized for performance
 const coverConfig = {
  timing: {
   duration: isMobile ? 15000 : 8000,
   iterations: Infinity,
  },
  glitchTimeSpan: {
   start: 0.6,
   end: 0.75,
  },
  shake: {
   velocity: isMobile ? 3 : 10,
   amplitudeX: isMobile ? 0.05 : 0.15,
   amplitudeY: isMobile ? 0.05 : 0.15,
  },
  slice: {
   count: isMobile ? 2 : 4,
   velocity: isMobile ? 3 : 10,
   minHeight: 0.02,
   maxHeight: isMobile ? 0.08 : 0.12,
   hueRotate: false,
  },
 };

 const textConfig = {
  ...coverConfig,
  timing: {
   duration: isMobile ? 20000 : 15000,
  },
  shake: {
   velocity: isMobile ? 4 : 8,
   amplitudeX: 0.08,
   amplitudeY: 0.08,
  },
 };

 // Initialize glitch effects
 usePowerGlitch('#cover', coverConfig);
 usePowerGlitch('#text-effect', textConfig);

 return (
  <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden">
   {/* Main content container with proper vertical spacing */}
   <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 sm:px-6 h-full">
    {/* Top section with image and name */}
    <div className="flex flex-col items-center justify-center w-full relative pt-10 pb-6 sm:pt-0 sm:pb-10">
     {/* Image and text container with responsive sizing */}
     <div className="relative flex items-center justify-center mb-6 sm:mb-10 w-full max-w-4xl">
      <div className="absolute inset-0 flex items-center justify-center">
       <Image
        id="cover"
        className="w-48 sm:w-52 md:w-64 lg:w-72 xl:w-80 object-contain will-change-transform"
        src={IntroFigure}
        alt="figure"
        width={320}
        height={320}
        priority
        loading="eager"
       />
      </div>
      <div id="text-effect" className="relative mix-blend-difference z-10 flex items-center justify-center w-full">
       <BubbleText
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-theme-primary text-center leading-tight"
        text="Aakash Swain"
       />
      </div>
     </div>

     {/* Tagline with responsive text size */}
     <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white text-center relative mt-16 sm:mt-20 mb-6 sm:mb-8 px-4 max-w-2xl font-light opacity-90">
        Building clean, responsive web interfaces with frontend, Web3, and AI technologies.
     </p>
    </div>

    {/* Buttons with responsive layout and fixed width */}
    <div
     className={`flex ${
      isMobile ? 'flex-col' : 'flex-row'
     } gap-4 sm:gap-6 mt-2 sm:mt-0`}
    >
     <button
      onClick={() => setSectionIndex(Sections.Contact)}
      className="w-64 sm:w-72 text-theme-background text-lg rounded-2xl bg-white hover:bg-theme-accent font-semibold hover:text-white px-8 py-3 delay-0 hoverable active:brightness-80 hover:tracking-widest transition-all duration-500 hover:shadow-2xl shadow-white relative"
     >
      Contact me
     </button>
     <button
      onClick={() => setSectionIndex(Sections.Projects)}
      className="w-64 sm:w-72 text-theme-background text-lg rounded-2xl bg-white hover:bg-theme-accent font-semibold hover:text-white px-8 py-3 delay-0 hoverable active:brightness-80 hover:tracking-widest transition-all duration-500 hover:shadow-2xl shadow-white relative"
     >
      View Projects
     </button>
    </div>
   </div>
  </div>
 );
}
