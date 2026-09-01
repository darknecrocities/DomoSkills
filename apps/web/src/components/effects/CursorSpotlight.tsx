'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SpatialDot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  z: number;
  targetZ: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  targetScale: number;
  currentScale: number;
  isResting: boolean;
}

export function CursorSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId: number | null = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2 for performance

    let mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 280,
      isActive: false,
      isMoving: false,
      lastMoveTime: 0,
    };

    let dots: SpatialDot[] = [];
    const spacing = 36; // Optimal density & 60fps performance
    let isRunning = false;

    const initDots = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

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
            alpha: 0.08,
            targetScale: 1,
            currentScale: 1,
            isResting: true,
          });
        }
      }
      startLoop();
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isActive = true;
      mouse.isMoving = true;
      mouse.lastMoveTime = performance.now();

      // Wake up physics engine if sleeping
      startLoop();
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleResize = () => {
      initDots();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      } else {
        startLoop();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    initDots();

    // High-Performance 60+ FPS Physics Loop with Spatial Culling
    const render = () => {
      // Fluid mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.22;
      mouse.y += (mouse.targetY - mouse.y) * 0.22;

      ctx.clearRect(0, 0, width, height);

      // Render subtle spatial spotlight aura
      if (mouse.isActive && mouse.x > 0 && mouse.y > 0) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouse.radius * 1.2);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
        grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.02)');
        grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.005)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      const radiusSq = mouse.radius * mouse.radius;
      let activeDotsCount = 0;
      const len = dots.length;

      for (let i = 0; i < len; i++) {
        const dot = dots[i];

        // Spatial Bounding Box Fast Rejection (avoids sqrt for distant dots)
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const distSq = dx * dx + dy * dy;

        if (mouse.isActive && distSq < radiusSq && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const normDist = dist / mouse.radius;
          const power = (1 - normDist) * (1 - normDist);

          // 3D Spatial Z-elevation & Perspective Bloom
          dot.targetZ = power * 70;
          dot.targetScale = 1 + power * 3.2;
          dot.alpha = 0.08 + power * 0.88;

          // Inward gravitational attraction
          const forceMag = power * 9;
          const angle = Math.atan2(dy, dx);
          dot.vx += Math.cos(angle) * forceMag * 0.32;
          dot.vy += Math.sin(angle) * forceMag * 0.32;
          dot.isResting = false;
          activeDotsCount++;
        } else {
          dot.targetZ = 0;
          dot.targetScale = 1;
          dot.alpha = 0.08;
        }

        // Spring return physics
        if (!dot.isResting) {
          const springForceX = (dot.baseX - dot.x) * 0.09;
          const springForceY = (dot.baseY - dot.y) * 0.09;

          dot.vx = (dot.vx + springForceX) * 0.80;
          dot.vy = (dot.vy + springForceY) * 0.80;

          dot.x += dot.vx;
          dot.y += dot.vy;

          dot.z += (dot.targetZ - dot.z) * 0.20;
          dot.currentScale += (dot.targetScale - dot.currentScale) * 0.20;

          // Check if dot settled back into rest
          if (
            Math.abs(dot.x - dot.baseX) < 0.1 &&
            Math.abs(dot.y - dot.baseY) < 0.1 &&
            Math.abs(dot.vx) < 0.01 &&
            Math.abs(dot.vy) < 0.01 &&
            dot.z < 0.5
          ) {
            dot.x = dot.baseX;
            dot.y = dot.baseY;
            dot.z = 0;
            dot.vx = 0;
            dot.vy = 0;
            dot.currentScale = 1;
            dot.isResting = true;
          } else {
            activeDotsCount++;
          }
        }

        // Render dot with spatial perspective offset
        const renderX = dot.z > 1 ? mouse.x + (dot.x - mouse.x) * (1 / (1 + dot.z * 0.0015)) : dot.x;
        const renderY = dot.z > 1 ? mouse.y + (dot.y - mouse.y) * (1 / (1 + dot.z * 0.0015)) : dot.y;
        const currentRadius = dot.radius * dot.currentScale;

        ctx.beginPath();
        ctx.arc(renderX, renderY, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${dot.alpha.toFixed(3)})`;
        ctx.fill();

        // Spatial halo for elevated dots
        if (dot.z > 16) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, currentRadius * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${(dot.alpha * 0.18).toFixed(3)})`;
          ctx.fill();
        }
      }

      // If mouse is idle and all dots returned to rest, pause render loop to conserve CPU/GPU
      const isIdle = !mouse.isActive && activeDotsCount === 0;
      if (isIdle) {
        isRunning = false;
        animationFrameId = null;
        return;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="physics-dots-canvas"
      aria-hidden="true"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    />
  );
}
