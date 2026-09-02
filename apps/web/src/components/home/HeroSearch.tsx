'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Tag, ArrowRight, X, Sparkles, Layers, ChevronRight } from 'lucide-react';
import { registry } from '@domoskills/registry';

interface KeywordItem {
  keyword: string;
  count: number;
}

const POPULAR_KEYWORDS = [
  'React',
  'OWASP',
  'Next.js',
  'Docker',
  'Security',
  'RAG',
  'DevOps',
  'TypeScript',
  'FastAPI',
  'PostgreSQL',
  'Design Systems',
  'Testing',
];

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract all unique keywords and their frequency from registry
  const { allKeywords, allSkills } = useMemo(() => {
    const skills = registry.getAllSkills();
    const map = new Map<string, number>();

    for (const skill of skills) {
      if (skill.tags) {
        for (const tag of skill.tags) {
          const trimmed = tag.trim();
          if (trimmed) {
            map.set(trimmed, (map.get(trimmed) || 0) + 1);
          }
        }
      }
      // Also index categories
      const cat = skill.category;
      if (cat) {
        const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
        map.set(catName, (map.get(catName) || 0) + 1);
      }
    }

    const keywordsList: KeywordItem[] = Array.from(map.entries()).map(([keyword, count]) => ({
      keyword,
      count,
    }));

    keywordsList.sort((a, b) => b.count - a.count);

    return { allKeywords: keywordsList, allSkills: skills };
  }, []);

  // Filter keywords and direct skills based on user input
  const { matchedKeywords, matchedSkills } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Return top popular keywords when empty
      const popular = POPULAR_KEYWORDS.map((k) => {
        const found = allKeywords.find((item) => item.keyword.toLowerCase() === k.toLowerCase());
        return found || { keyword: k, count: 3 };
      });
      return { matchedKeywords: popular, matchedSkills: [] };
    }

    // Match keywords
    const filteredKeywords = allKeywords
      .filter((item) => item.keyword.toLowerCase().includes(q))
      .slice(0, 10);

    // Match skills directly
    const directSkills = allSkills
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.slug.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      )
      .slice(0, 4);

    return { matchedKeywords: filteredKeywords, matchedSkills: directSkills };
  }, [query, allKeywords, allSkills]);

  const totalSuggestions = matchedKeywords.length + matchedSkills.length;

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectKeyword = (keyword: string) => {
    setQuery(keyword);
    setIsOpen(false);
    router.push(`/explore?q=${encodeURIComponent(keyword)}`);
  };

  const handleSelectSkill = (slug: string) => {
    setIsOpen(false);
    router.push(`/skills/${slug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (selectedIndex >= 0 && selectedIndex < matchedKeywords.length) {
      handleSelectKeyword(matchedKeywords[selectedIndex].keyword);
      return;
    }
    if (selectedIndex >= matchedKeywords.length) {
      const skillIdx = selectedIndex - matchedKeywords.length;
      if (matchedSkills[skillIdx]) {
        handleSelectSkill(matchedSkills[skillIdx].slug);
        return;
      }
    }

    if (query.trim()) {
      router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % totalSuggestions);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? totalSuggestions - 1 : prev - 1));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative max-w-xl w-full">
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center rounded-xl border border-border bg-surface p-1.5 transition focus-within:border-white focus-within:ring-1 focus-within:ring-white shadow-xl">
          <Search className="ml-3 h-4 w-4 text-text-muted shrink-0" />
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search keywords (e.g., 'react', 'owasp', 'docker', 'rag')..."
            className="w-full bg-transparent px-3 py-2 font-mono text-xs sm:text-sm text-white placeholder:text-text-muted focus:outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedIndex(-1);
              }}
              className="p-1.5 text-text-muted hover:text-white transition mr-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}

          <button
            type="submit"
            className="rounded-lg bg-white px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider text-black transition hover:bg-muted-white shrink-0 shadow-md cursor-pointer"
          >
            Search
          </button>
        </div>
      </form>

      {/* Interactive Keyword Suggestion Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-border bg-surface-raised/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden font-mono text-xs animate-fade-in divide-y divide-border/60">
          
          {/* Header */}
          <div className="px-4 py-2.5 bg-surface/80 flex items-center justify-between text-[11px] text-text-muted">
            <div className="flex items-center gap-1.5">
              <Tag className="h-3 w-3 text-emerald-400" />
              <span>{query ? `Keywords matching "${query}"` : 'Popular Skill Keywords'}</span>
            </div>
            <span className="text-[10px] text-text-faint hidden sm:inline">Press ↑↓ to navigate • Enter to select</span>
          </div>

          {/* Keywords List */}
          <div className="p-2 max-h-60 overflow-y-auto space-y-1 scrollbar-thin">
            {matchedKeywords.length === 0 ? (
              <div className="p-4 text-center text-text-muted font-sans text-xs">
                No matching keywords. Press Enter to search catalog.
              </div>
            ) : (
              matchedKeywords.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={item.keyword}
                    type="button"
                    onClick={() => handleSelectKeyword(item.keyword)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition ${
                      isSelected
                        ? 'bg-white text-black font-bold'
                        : 'text-text-secondary hover:bg-surface hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={isSelected ? 'text-black' : 'text-emerald-400 font-bold'}>#</span>
                      <span className="truncate">{item.keyword}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded border ${
                          isSelected
                            ? 'border-black/30 text-black/80 font-normal'
                            : 'border-border bg-surface text-text-muted'
                        }`}
                      >
                        {item.count} skill{item.count === 1 ? '' : 's'}
                      </span>
                      <ChevronRight className={`h-3 w-3 ${isSelected ? 'text-black' : 'text-text-muted'}`} />
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Direct Skill Matches */}
          {matchedSkills.length > 0 && (
            <div className="p-2 bg-surface/50 space-y-1">
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <Layers className="h-3 w-3 text-cyan-400" />
                <span>Matching Capabilities</span>
              </div>
              {matchedSkills.map((s, idx) => {
                const globalIdx = matchedKeywords.length + idx;
                const isSelected = selectedIndex === globalIdx;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => handleSelectSkill(s.slug)}
                    onMouseEnter={() => setSelectedIndex(globalIdx)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition ${
                      isSelected
                        ? 'bg-white text-black font-bold'
                        : 'text-text-secondary hover:bg-surface hover:text-white'
                    }`}
                  >
                    <div>
                      <div className={`font-sans text-xs font-bold ${isSelected ? 'text-black' : 'text-white'}`}>
                        {s.name}
                      </div>
                      <div className="text-[10px] opacity-75">{s.slug}</div>
                    </div>
                    <span className="text-[10px] capitalize opacity-80">{s.category}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Footer View All */}
          <div className="p-2 bg-surface">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.push(query ? `/explore?q=${encodeURIComponent(query)}` : '/explore');
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface-raised py-2 text-[11px] font-semibold text-text-secondary hover:text-white hover:border-white transition"
            >
              <span>Explore all skills matching &quot;{query || 'all'}&quot;</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
