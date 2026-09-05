'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CYCLING_WORDS = [
  'Frontend & React',
  'OWASP Security',
  'AI & RAG Agents',
  'Cloud & Edge',
  'DevOps & K8s',
  'Clean Architecture',
];

interface AnimatedHeroHeadlineProps {
  className?: string;
}

export function AnimatedHeroHeadline({ className = '' }: AnimatedHeroHeadlineProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`space-y-3 ${className}`}>
      <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
        Open skills. <br />
        Smarter agents. <br />
        <span className="text-text-muted">Supercharge </span>
        <span className="inline-block relative overflow-hidden align-top min-w-[280px] sm:min-w-[360px] h-[1.18em]">
          <AnimatePresence mode="wait">
            <motion.span
              key={CYCLING_WORDS[index]}
              initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -22, filter: 'blur(4px)' }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block text-shimmer font-black tracking-tight"
            >
              {CYCLING_WORDS[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>
    </div>
  );
}

interface AnimatedPillProps {
  phrases?: string[];
  className?: string;
}

const DEFAULT_PHRASES = [
  '100% Free & Open Source',
  'Universal Agent Capabilities',
  'Zero Paywalls • Zero Credits',
  'Verified Safe • SHA256 Checked',
];

export function AnimatedPillBadge({ phrases = DEFAULT_PHRASES, className = '' }: AnimatedPillProps) {
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIdx((prev) => (prev + 1) % phrases.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className={`inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-text-secondary shadow-sm ${className}`}>
      <img
        src="/assets/domodomo/domodomo-app-icon.png"
        alt="Domo Mascot"
        className="h-4 w-4 rounded-full object-cover shrink-0"
      />
      <div className="relative h-4 overflow-hidden min-w-[210px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={phrases[phraseIdx]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-emerald-400 font-bold tracking-wide absolute whitespace-nowrap"
          >
            {phrases[phraseIdx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
