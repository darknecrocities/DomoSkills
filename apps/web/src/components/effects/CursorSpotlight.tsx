'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SpatialDot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  z: number;           // Z-axis spatial elevation (0 = background, >0 = pulled toward viewer)
  targetZ: number;
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
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    let mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 300,
      isActive: false,
    };

    let dots: SpatialDot[] = [];
    const spacing = 26;

    const initDots = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      dots = [];
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = c * spacing;
          const by = r * spacing;
          dots.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            z: 0,
            targetZ: 0,
            vx: 0,
            vy: 0,
            radius: 1.25,
            alpha: 0.10,
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

      // Update global CSS variables for window-level effects
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);

      // Update card-local coordinates for localized spotlight polka dots
      const target = e.target as HTMLElement | null;
      if (target) {
        const card = target.closest('.card-polkadot-hover') as HTMLElement | null;
        if (card) {
          const rect = card.getBoundingClientRect();
          const cardX = e.clientX - rect.left;
          const cardY = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${cardX}px`);
          card.style.setProperty('--mouse-y', `${cardY}px`);
        }
      }
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

    // 3D Spatial Physics Animation Loop
    const render = () => {
      // Smooth mouse interpolation — fluid tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.18;
      mouse.y += (mouse.targetY - mouse.y) * 0.18;

      ctx.clearRect(0, 0, width, height);

      // Render spatial spotlight ambient glow beam
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 1.3);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.035)');
        grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.012)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Physics update & draw for each dot
      const len = dots.length;
      for (let i = 0; i < len; i++) {
        const dot = dots[i];

        // 2D distance to mouse
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (mouse.isActive && dist < mouse.radius && dist > 1) {
          const normDist = dist / mouse.radius;
          // Smooth cubic falloff curve for rich spatial dome curvature
          const power = Math.pow(1 - normDist, 2.2);

          // Spatial 3D Z-elevation: dots lift towards the user screen
          dot.targetZ = power * 75;

          // Scale & brightness bloom: closer dots grow larger in perspective
          dot.targetScale = 1 + power * 3.6;
          dot.alpha = 0.10 + power * 0.90;

          // Inward gravitational pull + 3D lens curvature
          const forceMag = power * 10.5;
          const angle = Math.atan2(dy, dx);
          dot.vx += Math.cos(angle) * forceMag * 0.35;
          dot.vy += Math.sin(angle) * forceMag * 0.35;
        } else {
          dot.targetZ = 0;
          dot.targetScale = 1;
          dot.alpha = 0.09;
        }

        // Spring physics: elastic snap back to base grid position
        const springK = 0.085;
        const springForceX = (dot.baseX - dot.x) * springK;
        const springForceY = (dot.baseY - dot.y) * springK;

        // Damping friction
        dot.vx = (dot.vx + springForceX) * 0.81;
        dot.vy = (dot.vy + springForceY) * 0.81;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Smooth spatial Z & Scale interpolation
        dot.z += (dot.targetZ - dot.z) * 0.18;
        dot.currentScale += (dot.targetScale - dot.currentScale) * 0.18;

        // 3D Perspective Projection Calculation
        // Apparent position shifted outward slightly as dot rises toward camera (convex dome effect)
        const perspectiveFocal = 600;
        const pScale = (perspectiveFocal + dot.z) / perspectiveFocal;
        const renderX = mouse.x + (dot.x - mouse.x) * (1 / (1 + (dot.z * 0.0012)));
        const renderY = mouse.y + (dot.y - mouse.y) * (1 / (1 + (dot.z * 0.0012)));
        const currentRadius = dot.radius * dot.currentScale * (1 + dot.z * 0.004);

        // Draw primary dot
        ctx.beginPath();
        ctx.arc(renderX, renderY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha.toFixed(3)})`;
        ctx.fill();

        // 3D Spatial Luminous Halo for dots elevated towards the viewer
        if (dot.z > 15) {
          const haloAlpha = (dot.alpha * 0.22).toFixed(3);
          ctx.beginPath();
          ctx.arc(renderX, renderY, currentRadius * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${haloAlpha})`;
          ctx.fill();
        }
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
