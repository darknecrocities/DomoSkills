'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export function VideoDemoSection() {
  return (
    <section className="border-b border-border py-12 sm:py-16 bg-transparent">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="w-full rounded-2xl border border-border bg-surface-raised shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(255,255,255,0.04)] overflow-hidden"
        >
          {/* macOS Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface select-none font-mono">
            <div className="flex items-center gap-3">
              {/* macOS Traffic Lights */}
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 inline-block shadow-sm"
                  aria-hidden="true"
                />
                <span
                  className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 inline-block shadow-sm"
                  aria-hidden="true"
                />
                <span
                  className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 inline-block shadow-sm"
                  aria-hidden="true"
                />
              </div>

              {/* Terminal Label */}
              <div className="flex items-center gap-2 text-text-muted text-[11px]">
                <Terminal className="h-3.5 w-3.5 text-white" />
                <span className="font-semibold text-text-secondary">domoskills-demo</span>
                <span className="hidden sm:inline text-text-faint">— mp4 1080p</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[10px] text-text-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE DEMO</span>
            </div>
          </div>

          {/* Video Player Display */}
          <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
            <video
              src="/domoskills_demo.mp4"
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover block"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
