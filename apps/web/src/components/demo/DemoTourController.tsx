'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Play, Volume2 } from 'lucide-react';
import { fireCartFlyAnimation } from '@/components/cart/CartFlyAnimation';
import { useCartStore } from '@/store/useCartStore';
import { registry } from '@domoskills/registry';

interface SubtitleSegment {
  start: number;
  end: number;
  text: string;
}

const SUBTITLES: SubtitleSegment[] = [
  {
    start: 1,
    end: 8.5,
    text: 'Welcome to DomoSkills — the open-source capability registry and discovery engine for modern AI coding agents.',
  },
  {
    start: 13,
    end: 22,
    text: 'Equip Google Antigravity, Claude Code, Cursor, Windsurf, and OpenCode with verified skills in a single CLI command.',
  },
  {
    start: 25,
    end: 36.5,
    text: 'Explore our new Curated Starter Packs, featuring a continuous wavy stream of production stacks — from Multi-Agent Swarms to Cloud-Native microservices.',
  },
  {
    start: 38,
    end: 47.5,
    text: 'Every capability undergoes integrity scoring. With one click, install bundles directly into your project workspace with instant visual stacking.',
  },
  {
    start: 49,
    end: 59.5,
    text: 'Export seamlessly to native agent manifests, diagnostic configs, or copy the CLI command. Supercharge your AI coding agents today at DomoSkills.',
  },
];

export function DemoTourController() {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 200, y: 150 });
  const [isClicking, setIsClicking] = useState(false);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { addSkill, setDrawerOpen } = useCartStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('demo') === '1') {
        setIsDemoActive(true);
      }
    }
  }, []);

  const startTour = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;

      // Update subtitle
      const currentSub = SUBTITLES.find((s) => elapsed >= s.start && elapsed <= s.end);
      setCurrentSubtitle(currentSub ? currentSub.text : '');

      if (elapsed >= 60) {
        clearInterval(interval);
      }
    }, 100);

    // Sequence of cursor movements & interactions
    // Scene 1: Hero & Headline
    setTimeout(() => {
      setCursorPos({ x: window.innerWidth * 0.35, y: 220 });
    }, 1500);

    setTimeout(() => {
      setCursorPos({ x: window.innerWidth * 0.28, y: 380 });
    }, 4500);

    // Glides to Search Input
    setTimeout(() => {
      const searchEl = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (searchEl) {
        const rect = searchEl.getBoundingClientRect();
        setCursorPos({ x: rect.left + 120, y: rect.top + 24 });
        setIsClicking(true);
        setTimeout(() => setIsClicking(false), 250);
        searchEl.focus();
        searchEl.value = 'owasp';
        searchEl.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, 7000);

    // Scene 2: Interactive Terminal
    setTimeout(() => {
      setCursorPos({ x: window.innerWidth * 0.72, y: 260 });
    }, 13500);

    setTimeout(() => {
      setCursorPos({ x: window.innerWidth * 0.76, y: 340 });
    }, 16500);

    // Hover brand belt
    setTimeout(() => {
      window.scrollTo({ top: 380, behavior: 'smooth' });
      setCursorPos({ x: window.innerWidth * 0.45, y: window.innerHeight * 0.4 });
    }, 20000);

    // Scene 3: Starter Packs Wavy Carousel
    setTimeout(() => {
      window.scrollTo({ top: 920, behavior: 'smooth' });
    }, 24500);

    // Move cursor into wavy carousel cards
    setTimeout(() => {
      setCursorPos({ x: window.innerWidth * 0.52, y: window.innerHeight * 0.45 });
    }, 28000);

    setTimeout(() => {
      setCursorPos({ x: window.innerWidth * 0.42, y: window.innerHeight * 0.52 });
    }, 32000);

    // Scene 4: Install Bundle Action
    setTimeout(() => {
      const buttons = document.querySelectorAll('button');
      let installBtn: HTMLButtonElement | null = null;
      for (const b of Array.from(buttons)) {
        if (b.textContent?.includes('Install Bundle')) {
          installBtn = b;
          break;
        }
      }

      if (installBtn) {
        const rect = installBtn.getBoundingClientRect();
        setCursorPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }
    }, 37500);

    setTimeout(() => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 300);

      const skill = registry.getSkillBySlug('owasp-agent-guardian');
      if (skill) {
        addSkill({
          id: skill.id,
          slug: skill.slug,
          name: skill.name,
          category: skill.category,
          license: skill.license,
          trustLevel: skill.trustLevel,
        });
      }
      fireCartFlyAnimation(cursorPos.x, cursorPos.y, 'Autonomous Swarms');
    }, 40000);

    // Scene 5: Cart Drawer & Export
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 45000);

    setTimeout(() => {
      setCursorPos({ x: window.innerWidth - 180, y: 32 });
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 250);
      setDrawerOpen(true);
    }, 49000);

    setTimeout(() => {
      setCursorPos({ x: window.innerWidth - 240, y: 280 });
    }, 53000);

    setTimeout(() => {
      setCursorPos({ x: window.innerWidth - 200, y: 450 });
    }, 56500);
  };

  // Auto-start if demo=1
  useEffect(() => {
    if (isDemoActive && !hasStarted) {
      const timer = setTimeout(() => {
        startTour();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isDemoActive, hasStarted]);

  if (!isDemoActive) return null;

  return (
    <>
      <audio ref={audioRef} src="/audio/demo-voiceover.m4a" preload="auto" />

      {/* Floating Animated Cursor Tracker */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[999999] transition-all duration-500 ease-out"
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
        }}
      >
        {/* Sleek Pointer Arrow with drop shadow */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          className="drop-shadow-[0_4px_14px_rgba(0,0,0,0.9)] -translate-x-1 -translate-y-1"
        >
          <path
            d="M5 3L14 26L18.5 16.5L28 12L5 3Z"
            fill="#ffffff"
            stroke="#050505"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>

        {/* Pulsing Beacon Target Reticle */}
        <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full border-2 border-emerald-400 bg-emerald-400/25 animate-ping opacity-75" />
        <div className="absolute top-0 left-0 w-4 h-4 rounded-full border border-emerald-300 bg-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

        {/* Dynamic Click Ripple */}
        {isClicking && (
          <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full border-2 border-cyan-300 bg-cyan-400/40 animate-ping duration-200" />
        )}
      </div>

      {/* Cinematic Live Subtitles Capsule Banner */}
      {currentSubtitle && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[999998] max-w-3xl w-[92%] sm:w-auto px-6 py-3.5 rounded-2xl border border-white/25 bg-black/90 backdrop-blur-2xl shadow-[0_16px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(255,255,255,0.08)] text-center animate-fade-in pointer-events-none">
          <div className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>DomoSkills Walkthrough • UK Daniel Voiceover</span>
          </div>
          <p className="font-sans text-sm sm:text-base font-bold text-white tracking-tight leading-relaxed">
            {currentSubtitle}
          </p>
        </div>
      )}
    </>
  );
}
