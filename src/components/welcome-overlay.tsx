'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSection } from '@/lib/hooks';
import { Sections } from '@/lib/types';

const GREETINGS = [
  { text: 'Hello' },
  { text: 'नमस्ते' },
  { text: 'こんにचは' },
  { text: 'Hola' },
  { text: '你好' },
  { text: 'Bonjour' },
  { text: 'Olá' },
];

export default function WelcomeOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [countdown, setCountdown] = useState(8);
  const { setSectionIndex, setSubsectionIndex } = useSection();

  useEffect(() => {
    const hasVisited = localStorage.getItem('portfolio-visited');
    if (!hasVisited) {
      setIsVisible(true);
      localStorage.setItem('portfolio-visited', 'true');
      // Ensure we're on Home section
      setSectionIndex(Sections.Home);
      setSubsectionIndex(0);
    }
  }, [setSectionIndex, setSubsectionIndex]);

  // Prevent scrolling when overlay is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Lock section to Home
      setSectionIndex(Sections.Home);
      setSubsectionIndex(0);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isVisible, setSectionIndex, setSubsectionIndex]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % GREETINGS.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    // Ensure we're on Home section when closing
    setSectionIndex(Sections.Home);
    setSubsectionIndex(0);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-theme-background flex items-center justify-center overflow-hidden"
          onWheel={(e) => e.preventDefault()}
          onTouchMove={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center justify-center gap-8">
            {/* Main Greeting */}
            <motion.div
              key={currentGreeting}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-theme-primary">
                {GREETINGS[currentGreeting].text}
              </h1>
            </motion.div>

            {/* Language Indicators */}
            <div className="flex gap-2 flex-wrap justify-center">
              {GREETINGS.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: currentGreeting === index ? 1.2 : 0.8,
                    opacity: currentGreeting === index ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                  className="w-3 h-3 rounded-full bg-theme-primary"
                />
              ))}
            </div>

            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              onClick={handleClose}
              className="mt-8 px-8 py-3 bg-theme-primary text-theme-background font-semibold rounded-lg hover:bg-theme-accent transition-colors duration-300"
            >
              Skip & Enter
            </motion.button>

            {/* Auto-close countdown */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="text-theme-secondary text-sm"
            >
              Closing in {countdown} second{countdown !== 1 ? 's' : ''}...
            </motion.p>
          </div>

          {/* Background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2, delay: i * 0.2 }}
                className="absolute w-96 h-96 rounded-full border border-theme-primary"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
