'use client';

import React, { useEffect } from 'react';
import { LayoutGrid, Grid2X2, List, Sparkles } from 'lucide-react';
import { useViewModeStore, ViewMode } from '@/store/useViewModeStore';

interface GridLayoutSwitchProps {
  className?: string;
}

export function GridLayoutSwitch({ className = '' }: GridLayoutSwitchProps) {
  const { viewMode, setViewMode } = useViewModeStore();

  // Keyboard shortcuts 1, 2, 3 when not typing inside form inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if (e.key === '1') {
        setViewMode('dense');
      } else if (e.key === '2') {
        setViewMode('standard');
      } else if (e.key === '3') {
        setViewMode('list');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setViewMode]);

  const options: { mode: ViewMode; label: string; icon: React.ReactNode; shortcut: string }[] = [
    {
      mode: 'dense',
      label: '3x3 Matrix',
      icon: <LayoutGrid className="h-3.5 w-3.5" />,
      shortcut: '1',
    },
    {
      mode: 'standard',
      label: 'Standard',
      icon: <Grid2X2 className="h-3.5 w-3.5" />,
      shortcut: '2',
    },
    {
      mode: 'list',
      label: 'List',
      icon: <List className="h-3.5 w-3.5" />,
      shortcut: '3',
    },
  ];

  return (
    <div className={`inline-flex items-center rounded-lg border border-border bg-surface p-0.5 font-mono text-xs ${className}`}>
      {options.map((opt) => {
        const isActive = viewMode === opt.mode;
        return (
          <button
            key={opt.mode}
            type="button"
            onClick={() => setViewMode(opt.mode)}
            title={`${opt.label} View (Press '${opt.shortcut}')`}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition cursor-pointer select-none ${
              isActive
                ? 'bg-white text-black font-bold shadow-sm'
                : 'text-text-muted hover:text-white hover:bg-surface-raised'
            }`}
          >
            {opt.icon}
            <span className="hidden sm:inline text-[11px]">{opt.label}</span>
            <span className={`hidden md:inline text-[9px] opacity-60 ${isActive ? 'text-black/70' : 'text-text-muted'}`}>
              ({opt.shortcut})
            </span>
          </button>
        );
      })}
    </div>
  );
}
