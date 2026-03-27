'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const ScrollDownIndicator = () => {
 const [isVisible, setIsVisible] = useState(true);

 useEffect(() => {
   const timer = setTimeout(() => {
     setIsVisible(false);
   }, 7000);

   return () => clearTimeout(timer);
 }, []);

 const handleClick = () => {
   window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
   setIsVisible(false);
 };

 return (
   <AnimatePresence>
     {isVisible && (
       <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: 20 }}
         transition={{ duration: 0.5 }}
         className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
       >
         <motion.div
           animate={{ y: [0, 10, 0] }}
           transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
           className="flex flex-col items-center cursor-pointer"
           onClick={handleClick}
         >
           <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full px-4 py-2 mb-2">
             <span className="text-white text-sm font-medium font-sans tracking-wide">
               Scroll to get started
             </span>
           </div>
           <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2">
             <ChevronDown className="text-white w-6 h-6" />
           </div>
         </motion.div>
       </motion.div>
     )}
   </AnimatePresence>
 );
};

