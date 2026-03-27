'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { LinkedinIcon as LinkedIn, Github } from 'lucide-react';
import { ANIMATION_DURATION } from '@/lib/constants';
import { cn } from '@/lib/utils';

export default function Socials({ className }: { className?: string }) {
    const iconVariants: Variants = {
        hidden: { opacity: 0, scale: 0.3 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: i * 0.2,
                duration: ANIMATION_DURATION.MEDIUM,
                ease: 'easeOut',
            },
        }),
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            className={cn('flex items-center gap-5 z-10 justify-center', className)}
        >
            <Link
                href="https://www.linkedin.com/in/aakashswain18/"
                target="_blank"
                aria-label="Aakash Swain's LinkedIn profile (opens in a new tab)"
            >
                <motion.div custom={1} variants={iconVariants}>
                    <LinkedIn
                        className="text-theme-primary hover:scale-125 transition-transform duration-200 delay-0"
                        aria-hidden="true"
                    />
                </motion.div>
            </Link>
            <Link
                href="https://github.com/A3K3SH"
                target="_blank"
                aria-label="Aakash Swain's GitHub profile (opens in a new tab)"
            >
                <motion.div custom={2} variants={iconVariants}>
                    <Github
                        className="text-theme-primary hover:scale-125 transition-transform duration-200 delay-0"
                        aria-hidden="true"
                    />
                </motion.div>
            </Link>
        </motion.div>
    );
}

