'use client';
import { motion } from 'framer-motion';
import NeonFigure from './neon-figure';
import EmailForm from './EmailForm';

export default function Contact() {
 return (
  <motion.div
   initial={{ opacity: 0, y: 20 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.6 }}
   className="flex items-start p-8 mt-12 bg-theme-accent relative rounded-2xl mx-5 shadow-lg max-w-3xl"
  >
   <div className="flex flex-col">
    <motion.h2
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.8, delay: 0.3 }}
     className="text-3xl font-bold text-theme-primary mb-4"
    >
     Get in Touch
    </motion.h2>
    <motion.p
     initial={{ opacity: 0, x: -20 }}
     animate={{ opacity: 1, x: 0 }}
     transition={{ duration: 0.8, delay: 0.5 }}
     className="text-lg text-white mb-4"
    >
     {`I'm always open to discussing new projects, creative ideas, or
        opportunities to be part of your vision. Feel free to reach out!`}
    </motion.p>
    <EmailForm />
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 1, delay: 0.8 }}
     className="mt-6"
    >
     <h3 className="text-lg font-semibold text-theme-primary mb-3">Connect with me</h3>
     <div className="flex gap-4 flex-wrap items-center">
      <a
       href="https://github.com/A3K3SH"
       target="_blank"
       rel="noopener noreferrer"
       className="text-white hover:text-theme-primary transition-colors"
      >
       GitHub
      </a>
      <a
       href="https://www.linkedin.com/in/aakashswain18/"
       target="_blank"
       rel="noopener noreferrer"
       className="text-white hover:text-theme-primary transition-colors"
      >
       LinkedIn
      </a>
      <a
       href="/resume"
       className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
       </svg>
       Resume
      </a>
     </div>
    </motion.div>
   </div>
   <div className="relative bottom-20 hidden lg:block">
    <NeonFigure />
   </div>
  </motion.div>
 );
}