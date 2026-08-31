'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Terminal, Sparkles, Code2, Zap } from 'lucide-react';

interface DomoMascotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'massive';
  variant?: 'laptop' | 'reading' | 'cube' | 'action' | 'wink';
  showBubble?: boolean;
  bubbleText?: string;
  className?: string;
}

export function DomoMascot({
  size = 'md',
  variant = 'laptop',
  showBubble = false,
  bubbleText = 'Domo is ready to empower your AI agents!',
  className = '',
}: DomoMascotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [clickMood, setClickMood] = useState(0);

  const moodQuotes = [
    bubbleText,
    'Stacking capabilities in progress...',
    'Zero arbitrary script execution!',
    'Universal standard: .agent/skills/',
    'Compatible with Claude, Cursor, OpenCode & more!',
    'Domo is compiling your agent superpowers!',
  ];

  const handleMascotClick = () => {
    setClickMood((prev) => (prev + 1) % moodQuotes.length);
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-24 h-24',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56',
    hero: 'w-64 h-64 sm:w-72 sm:h-72',
    massive: 'w-80 h-80 sm:w-96 sm:h-96',
  };

  const imageSrcMap = {
    laptop: '/assets/domodomo/domolaptop.gif',
    reading: '/assets/domodomo/domoreading.gif',
    action: '/assets/domodomo/domotest.gif',
    wink: '/assets/domodomo/domodomo_wink.png',
    cube: '/assets/domoskills-mascot.gif',
  };

  const currentSrc = imageSrcMap[variant] || '/assets/domodomo/domolaptop.gif';

  return (
    <div
      className={`relative inline-flex flex-col items-center group cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMascotClick}
    >
      {/* Speech Bubble */}
      {(showBubble || isHovered) && (
        <div className="absolute -top-14 z-20 whitespace-nowrap rounded-lg border border-white/20 bg-surface-raised px-3.5 py-2 font-mono text-xs font-semibold text-white shadow-2xl animate-fade-in backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{moodQuotes[clickMood]}</span>
          </div>
          {/* Bubble tail */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-surface-raised"></div>
        </div>
      )}

      {/* Mascot Animated Visual with Floating Parallax */}
      <div className={`relative ${sizeClasses[size]} transition-all duration-300 group-hover:scale-105 group-active:scale-95`}>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-3xl bg-white/10 filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Mascot Image */}
        <img
          src={currentSrc}
          alt="Domo Mascot"
          className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] filter transition duration-300 group-hover:brightness-110"
        />
      </div>
    </div>
  );
}
