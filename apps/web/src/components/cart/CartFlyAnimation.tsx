'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ShoppingBag } from 'lucide-react';

interface Particle {
  id: number;
  startX: number;
  startY: number;
  flyX: number;
  flyY: number;
  label: string;
}

export const CART_FLY_EVENT = 'domoskills-add-to-cart-fly';

/**
 * Fires a flying particle from the click origin toward the cart icon in the navbar.
 * Call this instead of (or alongside) the cart store toggleSkill.
 */
export function fireCartFlyAnimation(
  originX: number,
  originY: number,
  skillName: string
) {
  if (typeof window === 'undefined') return;
  // Fallback to center of viewport if clicked without coordinates (e.g. keyboard)
  const safeX = originX > 0 ? originX : window.innerWidth / 2;
  const safeY = originY > 0 ? originY : window.innerHeight / 2;

  window.dispatchEvent(
    new CustomEvent(CART_FLY_EVENT, {
      detail: { originX: safeX, originY: safeY, skillName },
    })
  );
}

/**
 * Mount this once in AppShell.
 * It listens for CART_FLY_EVENT, creates a flying particle aimed at #navbar-cart-btn,
 * and bounces the cart icon button on landing.
 */
export function CartFlyAnimation() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const counterRef = useRef(0);

  const handleFly = useCallback((e: Event) => {
    const { originX, originY, skillName } = (e as CustomEvent).detail;

    // Find the cart button in navbar by id
    const cartEl = document.getElementById('navbar-cart-btn');
    if (!cartEl) return;

    const cartRect = cartEl.getBoundingClientRect();
    const targetX = cartRect.left + cartRect.width / 2;
    const targetY = cartRect.top + cartRect.height / 2;

    const id = ++counterRef.current;
    const startX = originX - 18; // centre the 36px particle on click
    const startY = originY - 18;

    const flyX = targetX - startX - 18;
    const flyY = targetY - startY - 18;

    setParticles((prev) => [
      ...prev,
      {
        id,
        startX,
        startY,
        flyX,
        flyY,
        label: skillName?.slice(0, 2).toUpperCase() || 'SK',
      },
    ]);

    // Bounce cart icon ~when particle lands (75% through 750ms = ~560ms)
    setTimeout(() => {
      const btn = document.getElementById('navbar-cart-btn');
      if (btn) {
        btn.classList.remove('cart-bounce');
        // Force reflow to restart animation
        void (btn as HTMLElement).offsetWidth;
        btn.classList.add('cart-bounce');
      }
    }, 560);

    // Remove particle after animation finishes
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== id));
    }, 850);
  }, []);

  useEffect(() => {
    window.addEventListener(CART_FLY_EVENT, handleFly);
    return () => window.removeEventListener(CART_FLY_EVENT, handleFly);
  }, [handleFly]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          id={`cart-particle-${p.id}`}
          className="cart-fly-particle"
          style={
            {
              left: `${p.startX}px`,
              top: `${p.startY}px`,
              '--fly-x': `${p.flyX}px`,
              '--fly-y': `${p.flyY}px`,
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          <ShoppingBag style={{ width: 18, height: 18 }} />
        </div>
      ))}
    </div>
  );
}
