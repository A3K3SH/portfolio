'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { EDUCATION } from '@/lib/constants';
import React from 'react';

const About = () => {
 const contentRef = useRef<HTMLDivElement>(null);

 return (
  <div className="w-full h-full flex items-center justify-center overflow-hidden">
   <div className="w-full h-full max-w-4xl mx-auto px-4 pt-16 pb-8 flex flex-col">
    {/* About Me Section */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
        className="py-6 flex-shrink-0"
    >
     <h2 className="text-xl md:text-2xl font-bold text-theme-primary mb-3">
      About Me
     </h2>
        <div className="rounded-2xl border border-theme-accent/30 bg-theme-accent/10 backdrop-blur-sm p-4 md:p-5">
         <p className="text-sm md:text-base text-theme-secondary leading-relaxed">
          Frontend-focused developer with strong skills in React, JavaScript, and modern UI development, with working knowledge of backend technologies. Experienced in building Web3 apps, AI/LLM-based tools, and full-stack projects with API integration, authentication, and real-world deployment.
         </p>
        </div>
    </motion.div>

    {/* Education Section */}
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay: 0.2 }}
     className="py-4 flex-shrink-0"
    >
     <h3 className="text-lg md:text-xl font-bold text-theme-primary mb-3">
      Education
     </h3>
     <div className="space-y-3">
      {EDUCATION.map((edu, index) => (
    <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 + index * 0.1 }}
     className="bg-theme-accent/10 px-4 py-3 rounded-xl border border-theme-accent/20"
       >
        <h4 className="text-theme-primary font-semibold text-sm md:text-base">{edu.degree}</h4>
        <p className="text-theme-secondary text-xs md:text-sm mt-1">{edu.institution}</p>
        <p className="text-theme-primary text-xs mt-1">{edu.duration}</p>
       </motion.div>
      ))}
     </div>
    </motion.div>

    {/* Skills Section */}
    <div
     ref={contentRef}
      className="flex-1 overflow-y-auto no-scrollbar overscroll-contain"
     style={{
      touchAction: 'pan-y pinch-zoom',
      WebkitOverflowScrolling: 'touch',
     }}
    >
      <div className="py-4 pb-16 space-y-5">
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-theme-accent/25 bg-theme-accent/10 backdrop-blur-sm p-4 md:p-5"
       >
        <h4 className="text-theme-primary font-bold mb-4 text-sm md:text-base uppercase tracking-[0.14em]">
         Skills
        </h4>
        <div className="block select-none" aria-label="Skills icons">
         {/* External generated image is intentionally rendered as-is. */}
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img
          src="https://skillicons.dev/icons?i=html,css,js,ts,react,nextjs,tailwind,figma,redux,prisma,nodejs,express,mongodb,mysql,postgres,supabase,postman,bun,pnpm,vercel,git,github&perline=8"
          alt="Tech stack skill icons"
          loading="lazy"
          className="w-full max-w-xl"
         />
        </div>
       </motion.div>
      </div>
    </div>
   </div>
  </div>
 );
};

export default React.memo(About);
