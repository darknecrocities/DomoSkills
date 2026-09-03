'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Layers,
  Shield,
  Terminal,
  ArrowRight,
  CornerDownLeft,
  Sparkles,
  Folder,
  LayoutGrid,
  Grid2X2,
  List,
  Scale,
  Download,
} from 'lucide-react';
import { registry } from '@domoskills/registry';
import { useCartStore } from '@/store/useCartStore';
import { useViewModeStore } from '@/store/useViewModeStore';
import { useComparatorStore } from '@/store/useComparatorStore';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { setDrawerOpen } = useCartStore();
  const { setViewMode } = useViewModeStore();
  const { setOpen: setCompareOpen, compareSlugs } = useComparatorStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = registry.getCategories();
  const allSkills = registry.getAllSkills();

  // Filter skills based on query
  const filteredSkills = query.trim()
    ? registry.getSkills({ query: query.trim(), limit: 8 }).skills
    : allSkills.slice(0, 6);

  const filteredCategories = query.trim()
    ? categories
        .filter(
          (c) =>
            c.name.toLowerCase().includes(query.toLowerCase()) ||
            c.slug.includes(query.toLowerCase())
        )
        .slice(0, 3)
    : categories.slice(0, 3);

  // Quick navigation and layout actions
  const quickActions = [
    {
      label: 'Switch to 3x3 Matrix Grid',
      shortcut: '1',
      icon: LayoutGrid,
      action: () => {
        setViewMode('dense');
        onClose();
        router.push('/explore');
      },
    },
    {
      label: 'Switch to Standard 2x2 Grid',
      shortcut: '2',
      icon: Grid2X2,
      action: () => {
        setViewMode('standard');
        onClose();
        router.push('/explore');
      },
    },
    {
      label: 'Switch to Compact List View',
      shortcut: '3',
      icon: List,
      action: () => {
        setViewMode('list');
        onClose();
        router.push('/explore');
      },
    },
    {
      label: `Open Skill Comparator (${compareSlugs.length}/3)`,
      shortcut: 'C',
      icon: Scale,
      action: () => {
        onClose();
        setCompareOpen(true);
      },
    },
    {
      label: 'View Developer Stack Manifest',
      shortcut: 'S',
      icon: Folder,
      action: () => {
        onClose();
        setDrawerOpen(true);
      },
    },
    {
      label: 'Agent Doctor Diagnostics',
      shortcut: 'D',
      icon: Terminal,
      action: () => {
        onClose();
        router.push('/doctor');
      },
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Global keyboard shortcut CMD+K / CTRL+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectSkill = (slug: string) => {
    onClose();
    router.push(`/skills/${slug}`);
  };

  const handleSelectCategory = (slug: string) => {
    onClose();
    router.push(`/explore?category=${slug}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmd-search-input"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md pt-[10vh] px-4 animate-fade-in"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-[#0d0d12] shadow-2xl overflow-hidden font-mono text-xs">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3.5">
          <Search className="h-4 w-4 text-text-secondary" />
          <input
            id="cmd-search-input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 1,000+ skills, categories, or layout actions..."
            className="w-full bg-transparent font-mono text-sm text-white focus:outline-none placeholder:text-text-muted"
          />
          <kbd className="rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-text-muted">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[65vh] overflow-y-auto p-3 sm:p-4 space-y-4">
          {/* Quick Actions / Layout Shortcuts */}
          <div>
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Quick Actions & Layout Controls
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-1">
              {quickActions.map((qa) => {
                const Icon = qa.icon;
                return (
                  <button
                    key={qa.label}
                    type="button"
                    onClick={qa.action}
                    className="flex items-center justify-between p-2 rounded-xl border border-border/70 bg-surface hover:border-white hover:bg-surface-raised transition text-left text-text-secondary hover:text-white cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-text-muted group-hover:text-emerald-400 transition" />
                      <span className="text-[11px] font-bold text-white">{qa.label}</span>
                    </div>
                    <kbd className="rounded border border-border bg-surface-raised px-1.5 py-0.5 text-[9px] text-text-muted">
                      {qa.shortcut}
                    </kbd>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Skills ({filteredSkills.length})
            </div>
            <div className="space-y-1 mt-1">
              {filteredSkills.map((skill) => (
                <button
                  key={skill.slug}
                  type="button"
                  onClick={() => handleSelectSkill(skill.slug)}
                  className="w-full flex items-center justify-between rounded-xl p-2.5 text-left text-text-secondary hover:bg-surface hover:text-white transition group border border-transparent hover:border-border cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-white font-bold group-hover:text-emerald-400 transition truncate">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-text-muted rounded border border-border bg-surface-raised px-1.5 py-0.2 shrink-0">
                      {skill.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-muted group-hover:text-white shrink-0 ml-2">
                    <span>★ {skill.sourceRepository?.stars.toLocaleString() || '0'}</span>
                    <CornerDownLeft className="h-3 w-3 opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Categories Section */}
          {filteredCategories.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                Browse Domains
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="flex items-center justify-between p-2 rounded-xl border border-border bg-surface hover:border-white transition text-left text-white cursor-pointer"
                  >
                    <span className="truncate text-[11px] font-bold">{cat.name}</span>
                    <ArrowRight className="h-3 w-3 text-text-muted" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
