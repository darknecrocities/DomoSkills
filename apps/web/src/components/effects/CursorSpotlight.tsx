'use client';

import React, { useEffect, useState } from 'react';

export function CursorSpotlight() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let rafId: number | null = null;
    let latestX = window.innerWidth / 2;
    let latestY = window.innerHeight / 2;

    const handlePointerMove = (e: PointerEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${latestX}px`);
          document.documentElement.style.setProperty('--mouse-y', `${latestY}px`);
          rafId = null;
        });
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  if (!mounted) return null;

  return <div className="cursor-spotlight-layer" aria-hidden="true" />;
}
