'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const ANIMATION_DURATION = {
 FAST: 0.2,
 MEDIUM: 0.4,
 SLOW: 0.6,
};

interface SetupItem {
 id: string;
 name: string;
 description: string;
 link: string;
}

const setupItems: SetupItem[] = [
 {
  id: 'monitor',
  name: 'Gaming Monitor',
  description: 'High refresh rate gaming monitor',
  link: 'https://amzn.to/44o99tx',
 },
 {
  id: 'ssd',
  name: 'SSD Storage',
  description: 'High-speed solid state drive',
  link: 'https://amzn.to/3HRrnuJ',
 },
 {
  id: 'headphones',
  name: 'Gaming Headphones',
  description: 'Professional gaming headphones with mic',
  link: 'https://amzn.to/3T1s1IC',
 },
 {
  id: 'mic',
  name: 'Microphone',
  description: 'Professional quality microphone for streaming and recording',
  link: 'https://amzn.to/45x91ZQ',
 },
 {
  id: 'stand',
  name: 'Laptop Stand',
  description: 'Great quality metal laptop stand',
  link: 'https://amzn.to/3T1rOoO',
 },
 {
  id: 'lamp',
  name: 'Desk Lamp',
  description: 'LED desk lamp with adjustable brightness',
  link: 'https://amzn.to/4lhNCsk',
 },
 {
  id: 'underwater-lamp',
  name: 'Underwater Lamp',
  description: 'Unique underwater effect lamp for ambiance',
  link: 'https://amzn.to/4jWxpHG',
 },
 {
  id: 'sunset-lamp',
  name: 'Sunset Lamp',
  description: 'Beautiful sunset projection lamp',
  link: 'https://amzn.to/3ZEcfXO',
 },
 {
  id: 'mousepad',
  name: 'Gaming Mousepad',
  description: 'Large RGB gaming mousepad',
  link: 'https://amzn.to/3SVL1rX',
 },
 {
  id: 'gundam',
  name: 'Gundam Model',
  description: 'Collectible Gundam model kit',
  link: 'https://amzn.to/4kPiXmp',
 },
 {
  id: 'earbuds',
  name: 'Wireless Earbuds',
  description: 'High-quality wireless earbuds',
  link: 'https://amzn.to/3HRrnuJ',
 },
 {
  id: 'usb-hub',
  name: 'USB Hub',
  description: 'Multi-port USB hub for connectivity',
  link: 'https://amzn.to/4kLyseT',
 },
 {
  id: 'controller',
  name: 'Gaming Controller',
  description: 'Wireless gaming controller',
  link: 'https://amzn.to/3ZzYSYI',
 },
];

const cardVariants: Variants = {
 hidden: { opacity: 0, y: 20 },
 visible: (i: number) => ({
  opacity: 1,
  y: 0,
  transition: {
   delay: i * 0.1,
   duration: ANIMATION_DURATION.MEDIUM,
   ease: 'easeOut',
  },
 }),
};

export default function Setup() {
 return (
  <div className="relative flex items-center justify-center w-full min-h-screen bg-[#121212]">
   <div className="w-full max-w-7xl mx-auto px-4 h-full flex flex-col">
    {/* Header - Fixed at top */}
    <motion.div
     initial={{ opacity: 0, y: -20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: ANIMATION_DURATION.MEDIUM }}
     className="text-center py-6 flex-shrink-0"
    >
     <Link
      href="/"
      className="inline-flex items-center gap-2 text-white hover:text-white transition-colors mb-4"
     >
      <ArrowLeft className="w-4 h-4" />
      Back to Home
     </Link>
     <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
      My Setup
     </h1>
     <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
      Here&apos;s my current setup with all the gear I use for work, gaming, and
      content creation. These are affiliate links that help support my work.
     </p>
    </motion.div>

    {/* Scrollable Content Area */}
    <div
     className="flex-grow overflow-y-auto custom-scrollbar relative"
     style={{
      height: 'calc(100vh - 280px)',
      maskImage:
       'linear-gradient(to bottom, transparent, black 10px, black 90%, transparent)',
      WebkitMaskImage:
       'linear-gradient(to bottom, transparent, black 10px, black 90%, transparent)',
     }}
    >
     {/* Setup Grid */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 py-4">
      {setupItems.map((item, index) => (
       <motion.div
        key={item.id}
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.02 }}
        className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden"
       >
        <Link
         href={item.link}
         target="_blank"
         rel="noopener noreferrer"
         className="block h-full"
        >
         <div className="p-6 h-full hover:bg-[#252525] transition-colors duration-300">
          <div className="flex items-center justify-between mb-3">
           <h3 className="text-xl font-semibold text-white line-clamp-1">
            {item.name}
           </h3>
           <ExternalLink className="w-4 h-4 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
          </div>
          <p className="text-base text-white/60 line-clamp-2">
           {item.description}
          </p>
         </div>
        </Link>
       </motion.div>
      ))}
     </div>
    </div>

    {/* Footer */}
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay: 0.5, duration: ANIMATION_DURATION.MEDIUM }}
     className="py-4 text-center flex-shrink-0 border-t border-white/10"
    >
     <p className="text-white/60 text-sm max-w-2xl mx-auto">
      As an Amazon Associate, I earn from qualifying purchases. These links help
      support my work at no extra cost to you.
     </p>
    </motion.div>
   </div>
  </div>
 );
}
