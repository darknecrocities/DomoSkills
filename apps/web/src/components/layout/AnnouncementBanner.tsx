'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Wrench } from 'lucide-react';

const STORAGE_KEY = 'domodomo_announcement_dismissed';

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  if (!mounted || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label="Announcement"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="relative z-50 w-full border-b border-border bg-surface text-white overflow-hidden"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-6 lg:px-8">
            <div className="flex flex-1 items-center justify-center gap-2 text-center text-xs font-mono sm:text-xs">
              {/* Monochrome Pill Badge */}
              <span className="hidden sm:inline-flex items-center gap-1 rounded border border-white/20 bg-surface-raised px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                <Wrench className="h-2.5 w-2.5" />
                Ecosystem
              </span>

              {/* Natural, Non-Jargon Copy */}
              <span className="text-text-secondary">
                Looking for web and agent tools?
              </span>

              <a
                href="https://domodomo.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 font-bold text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white hover:text-white"
              >
                <span>Visit domodomo.site for our developer toolbox</span>
                <ExternalLink className="h-3 w-3 text-text-muted transition group-hover:text-white group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss announcement"
              className="ml-2 rounded p-1 text-text-muted transition hover:bg-surface-raised hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
