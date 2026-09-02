'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ShoppingBag } from 'lucide-react';

interface Particle {
  id: number;
  startX: number;
  startY: number;
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
  window.dispatchEvent(
    new CustomEvent(CART_FLY_EVENT, {
      detail: { originX, originY, skillName },
    })
  );
}

/**
 * Mount this once in AppShell.
 * It listens for CART_FLY_EVENT, creates a flying particle aimed at #cart-icon,
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

    setParticles((prev) => [...prev, { id, startX, startY, label: skillName.slice(0, 2).toUpperCase() }]);

    // Set CSS custom properties on the particle element right after mount
    requestAnimationFrame(() => {
      const el = document.getElementById(`cart-particle-${id}`);
      if (el) {
        el.style.setProperty('--fly-x', `${flyX}px`);
        el.style.setProperty('--fly-y', `${flyY}px`);
      }
    });

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
    }, 820);
  }, []);

  useEffect(() => {
    window.addEventListener(CART_FLY_EVENT, handleFly);
    return () => window.removeEventListener(CART_FLY_EVENT, handleFly);
  }, [handleFly]);

  if (particles.length === 0) return null;

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          id={`cart-particle-${p.id}`}
          className="cart-fly-particle"
          style={{ left: p.startX, top: p.startY }}
          aria-hidden="true"
        >
          <ShoppingBag style={{ width: 16, height: 16 }} />
        </div>
      ))}
    </>
  );
}
