'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
 const [isMobile, setIsMobile] = useState(true); // Start as true to prevent SSR rendering
 const [isLoaded, setIsLoaded] = useState(false);
 const [isMounted, setIsMounted] = useState(false);

 const bigBallX = useMotionValue(0);
 const bigBallY = useMotionValue(0);
 const smallBallX = useMotionValue(0);
 const smallBallY = useMotionValue(0);

 const delayedBigBallX = useSpring(bigBallX, { stiffness: 200, damping: 20 });
 const delayedBigBallY = useSpring(bigBallY, { stiffness: 200, damping: 20 });
 const scale = useSpring(1, { stiffness: 200, damping: 10 });
 const [isClicked, setIsClicked] = useState(false);

 // Set mounted state on client
 useEffect(() => {
  setIsMounted(true);
 }, []);

 const handleMouseMove = useCallback(
  (e: MouseEvent) => {
   bigBallX.set(e.clientX - 15);
   bigBallY.set(e.clientY - 15);
   smallBallX.set(e.clientX - 5);
   smallBallY.set(e.clientY - 5);
  },
  [bigBallX, bigBallY, smallBallX, smallBallY]
 );

 const handleMouseDown = useCallback(() => {
  setIsClicked(true);
  setTimeout(() => setIsClicked(false), 500);
 }, []);

 const handleMouseEnter = useCallback(() => scale.set(2), [scale]);
 const handleMouseLeave = useCallback(() => scale.set(1), [scale]);

 useEffect(() => {
  if (!isMounted) return;

  const checkIsMobile = () => {
   const isTouchDevice =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches;

   setIsMobile(isTouchDevice);
   setIsLoaded(true);

   // Hide cursor on mobile devices
   if (isTouchDevice) {
    document.documentElement.classList.add('is-mobile');
   } else {
    document.documentElement.classList.remove('is-mobile');
   }
  };

  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);

  if (!isMobile) {
   const hoverableElements = Array.from(document.querySelectorAll('button, a'));
   hoverableElements.forEach((el) => el.classList.add('hoverable'));

   document.querySelectorAll('.hoverable').forEach((el) => {
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
   });

   document.addEventListener('mousemove', handleMouseMove);
   document.addEventListener('mousedown', handleMouseDown);

   const observer = new MutationObserver(() => {
    document.querySelectorAll('.hoverable').forEach((el) => {
     el.addEventListener('mouseenter', handleMouseEnter);
     el.addEventListener('mouseleave', handleMouseLeave);
    });
   });

   observer.observe(document.body, { childList: true, subtree: true });

   return () => {
    window.removeEventListener('resize', checkIsMobile);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mousedown', handleMouseDown);
    observer.disconnect();
    document.querySelectorAll('.hoverable').forEach((el) => {
     el.removeEventListener('mouseenter', handleMouseEnter);
     el.removeEventListener('mouseleave', handleMouseLeave);
    });
   };
  }
 }, [
  handleMouseEnter,
  handleMouseLeave,
  handleMouseMove,
  handleMouseDown,
  isMobile,
  isMounted,
 ]);

 if (!isMounted || !isLoaded || isMobile) {
  return null;
 }

 return (
  <div className="pointer-events-none fixed inset-0 z-[1000]">
   {/* Big Circle */}
   <motion.div
    className="absolute mix-blend-difference"
    style={{
     x: delayedBigBallX,
     y: delayedBigBallY,
     scale,
     width: '30px',
     height: '30px',
    }}
   >
    <svg height="30" width="30">
     <circle cx="15" cy="15" r="12" fill="#f7f8fa" />
    </svg>
    {isClicked && (
     <motion.div
      className="absolute top-0 left-0"
      initial={{ scale: 1, opacity: 0.5 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
       width: '30px',
       height: '30px',
       borderRadius: '50%',
       backgroundColor: 'var(--theme-primary)',
      }}
     />
    )}
   </motion.div>

   {/* Small Circle */}
   <motion.div
    className="absolute mix-blend-difference"
    style={{
     x: smallBallX,
     y: smallBallY,
     width: '10px',
     height: '10px',
    }}
   >
    <svg height="10" width="10">
     <circle cx="5" cy="5" r="4" fill="#f7f8fa" />
    </svg>
   </motion.div>
  </div>
 );
}

