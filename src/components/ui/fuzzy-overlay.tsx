'use client';

import { motion } from 'framer-motion';

export const FuzzyOverlay = () => {
  return (
    <>
      <motion.div
        animate={{
          opacity: [0.02, 0.04, 0.02],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: 'linear',
        }}
        style={{
          backgroundImage: 'url("/noise.webp")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          willChange: 'opacity',
        }}
        className="pointer-events-none fixed inset-0 z-50 mix-blend-soft-light"
      />
      <div
        className="pointer-events-none fixed inset-0 z-30 bg-gradient-to-br from-transparent via-transparent to-black/10"
      />
    </>
  );
};

