'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Layers, Shield, Terminal, ArrowRight, CornerDownLeft, Sparkles, Folder } from 'lucide-react';
import { registry } from '@domoskills/registry';
import { useCartStore } from '@/store/useCartStore';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setDrawerOpen } = useCartStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = registry.getCategories();
  const allSkills = registry.getAllSkills();

  // Filter skills based on query
  const filteredSkills = query.trim()
    ? registry.getSkills({ query: query.trim(), limit: 8 }).skills
    : allSkills.slice(0, 5);

  const filteredCategories = query.trim()
    ? categories.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.slug.includes(query.toLowerCase())).slice(0, 3)
    : categories.slice(0, 3);

  // Quick navigation actions
  const quickActions = [
    { label: 'Browse All Skills', path: '/explore', icon: Layers },
    { label: 'Agent Doctor Diagnostic', path: '/doctor', icon: Terminal },
    { label: 'Submit Skill Repository', path: '/submit', icon: Shield },
    {
      label: 'View Current Stack Cart',
      action: () => {
        onClose();
        setDrawerOpen(true);
      },
      icon: Folder,
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
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
        else onClose(); // parent handles toggling
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
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md pt-[12vh] px-4 animate-fade-in">
      <div className="relative w-full max-w-xl rounded-lg border border-border bg-surface-raised shadow-2xl overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3.5">
          <Search className="h-4 w-4 text-text-secondary" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, categories, or actions..."
            className="w-full bg-transparent font-mono text-sm text-white focus:outline-none placeholder:text-text-muted"
          />
          <kbd className="rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-text-muted">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 font-mono text-xs">
          
          {/* Skills Section */}
          <div>
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Skills ({filteredSkills.length})
            </div>
            <div className="space-y-1 mt-1">
              {filteredSkills.map((skill) => (
                <button
                  key={skill.slug}
                  type="button"
                  onClick={() => handleSelectSkill(skill.slug)}
                  className="w-full flex items-center justify-between rounded p-2.5 text-left text-text-secondary hover:bg-surface hover:text-white transition group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold group-hover:underline">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-text-muted rounded border border-border px-1.5 py-0.2">
                      {skill.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-text-muted group-hover:text-white">
                    <span>★ {skill.installs.toLocaleString()}</span>
                    <CornerDownLeft className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Categories Section */}
          {filteredCategories.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                Explore Categories
              </div>
              <div className="space-y-1 mt-1">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleSelectCategory(cat.slug)}
                    className="w-full flex items-center justify-between rounded p-2 text-left text-text-secondary hover:bg-surface hover:text-white transition group"
                  >
                    <div className="flex items-center gap-2">
                      <Folder className="h-3.5 w-3.5 text-text-muted group-hover:text-white" />
                      <span>{cat.name}</span>
                    </div>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 text-text-muted" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Quick Actions
            </div>
            <div className="space-y-1 mt-1">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => {
                      if (action.action) {
                        action.action();
                      } else if (action.path) {
                        onClose();
                        router.push(action.path);
                      }
                    }}
                    className="w-full flex items-center justify-between rounded p-2 text-left text-text-secondary hover:bg-surface hover:text-white transition group"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-3.5 w-3.5 text-text-muted group-hover:text-white" />
                      <span>{action.label}</span>
                    </div>
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 text-text-muted" />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer info bar */}
        <div className="border-t border-border bg-surface px-4 py-2.5 font-mono text-[10px] text-text-muted flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Type to filter</span>
            <span>•</span>
            <span>↵ to select</span>
          </div>
          <div>DomoSkills Command Palette</div>
        </div>

      </div>
    </div>
  );
}
