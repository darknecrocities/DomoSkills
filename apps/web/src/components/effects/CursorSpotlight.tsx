'use client';

import React, { useEffect, useRef, useState } from 'react';

interface PhysicsDot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetScale: number;
  currentScale: number;
}

export function CursorSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 260,
      isActive: false,
    };

    let dots: PhysicsDot[] = [];
    const spacing = 26;

    const initDots = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      dots = [];

      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;
          dots.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            radius: 1.15,
            alpha: 0.05,
            targetScale: 1,
            currentScale: 1,
          });
        }
      }
    };

    initDots();

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;

      // Update CSS variables for other potential light effects
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      initDots();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('resize', handleResize);

    // Physics Animation Loop
    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;

      ctx.clearRect(0, 0, width, height);

      // Render ambient spotlight glow
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.035)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.012)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Physics update & draw for each dot
      const len = dots.length;
      for (let i = 0; i < len; i++) {
        const dot = dots[i];

        const dx = dot.x - mouse.x;
        const dy = dot.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Proximity calculation
        if (mouse.isActive && dist < mouse.radius && dist > 0) {
          const normDist = dist / mouse.radius;
          const power = 1 - normDist;

          // Pinch-out magnification (scale zoom under spotlight)
          dot.targetScale = 1 + power * 2.6;
          dot.alpha = 0.06 + power * 0.65;

          // Physics magnetic repulsion force
          const force = power * 7;
          const angle = Math.atan2(dy, dx);
          dot.vx += Math.cos(angle) * force * 0.35;
          dot.vy += Math.sin(angle) * force * 0.35;
        } else {
          dot.targetScale = 1;
          dot.alpha = 0.04;
        }

        // Spring physics back to base position
        const springForceX = (dot.baseX - dot.x) * 0.075;
        const springForceY = (dot.baseY - dot.y) * 0.075;

        dot.vx = (dot.vx + springForceX) * 0.84; // friction
        dot.vy = (dot.vy + springForceY) * 0.84;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Smooth scale transition
        dot.currentScale += (dot.targetScale - dot.currentScale) * 0.15;

        // Draw dot
        const currentRadius = dot.radius * dot.currentScale;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);

        if (dot.alpha > 0.18) {
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha.toFixed(3)})`;
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return null;

  return <canvas ref={canvasRef} className="physics-dots-canvas" aria-hidden="true" />;
}
