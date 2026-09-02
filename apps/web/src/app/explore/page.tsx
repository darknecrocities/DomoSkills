'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  Layers,
  Shield,
  Star,
  Check,
  Plus,
  RefreshCw,
  X,
  Filter,
  Eye,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { registry } from '@domoskills/registry';
import { AGENT_TARGET_LIST, getAdapter } from '@domoskills/adapters';
import { CategorySlug, AgentTarget, TrustLevel, License } from '@domoskills/validators';
import { SkillCard } from '@/components/skills/SkillCard';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';
import { fireCartFlyAnimation } from '@/components/cart/CartFlyAnimation';

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = (searchParams.get('category') as CategorySlug) || 'all';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | 'all'>(initialCategory);
  const [selectedAgent, setSelectedAgent] = useState<AgentTarget | 'all'>('all');
  const [selectedTrust, setSelectedTrust] = useState<TrustLevel | 'all'>('all');
  const [selectedLicense, setSelectedLicense] = useState<License | 'all'>('all');
  const [hasScriptsOnly, setHasScriptsOnly] = useState<boolean | undefined>(undefined);
  const [visualPreviewOnly, setVisualPreviewOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'trending' | 'installs' | 'favorites' | 'updated' | 'alphabetical'>('trending');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { addSkill } = useCartStore();
  const { user, openAuthModal } = useAuth();

  const categories = registry.getCategories();

  // Query registry
  const searchResults = useMemo(() => {
    return registry.getSkills({
      query,
      category: visualPreviewOnly ? 'all' : selectedCategory,
      agent: selectedAgent,
      trustLevel: selectedTrust,
      license: selectedLicense,
      hasScripts: hasScriptsOnly,
      hasVisualPreview: visualPreviewOnly,
      sortBy,
      limit: 500,
    });
  }, [query, selectedCategory, selectedAgent, selectedTrust, selectedLicense, hasScriptsOnly, sortBy, visualPreviewOnly]);

  const isLocked = !user && searchResults.skills.length > 10;
  const visibleSkills = isLocked ? searchResults.skills.slice(0, 10) : searchResults.skills;
  const lockedCount = Math.max(0, searchResults.skills.length - 10);
  const teaserSkills = isLocked ? searchResults.skills.slice(10, 12) : [];

  const handleAddAllFiltered = (e?: React.MouseEvent) => {
    if (e) {
      fireCartFlyAnimation(e.clientX, e.clientY, `${visibleSkills.length} Skills`);
    }
    for (const skill of visibleSkills) {
      addSkill({
        id: skill.id,
        slug: skill.slug,
        name: skill.name,
        category: skill.category,
        license: skill.license,
        trustLevel: skill.trustLevel,
      });
    }
  };

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedAgent('all');
    setSelectedTrust('all');
    setSelectedLicense('all');
    setHasScriptsOnly(undefined);
    setVisualPreviewOnly(false);
    setSortBy('trending');
  };

  const hasActiveFilters =
    query !== '' ||
    selectedCategory !== 'all' ||
    selectedAgent !== 'all' ||
    selectedTrust !== 'all' ||
    selectedLicense !== 'all' ||
    hasScriptsOnly !== undefined ||
    visualPreviewOnly;

  return (
    <div className="min-h-screen bg-transparent py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title & Search Header */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                Registry Index
              </div>
              <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white mt-1">
                Explore Agent Skills
              </h1>
            </div>

            {/* Add All Button */}
            {searchResults.skills.length > 0 && (
              <button
                type="button"
                onClick={handleAddAllFiltered}
                className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-4 py-2 font-mono text-xs font-semibold text-text-secondary hover:border-white hover:text-white transition"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add All to Stack ({visibleSkills.length})</span>
              </button>
            )}
          </div>

          {/* Search Input Bar */}
          <div className="relative flex items-center rounded-lg border border-border bg-surface p-1.5 focus-within:border-white transition">
            <Search className="ml-3 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name, description, tags, or source repo..."
              className="w-full bg-transparent px-3 py-2 font-mono text-xs sm:text-sm text-white placeholder:text-text-muted focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1.5 text-text-muted hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setVisualPreviewOnly(false);
            }}
            className={`px-3 py-1.5 rounded border whitespace-nowrap transition ${
              selectedCategory === 'all' && !visualPreviewOnly
                ? 'border-white bg-white text-black font-bold'
                : 'border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
            }`}
          >
            All Domains ({registry.getAllSkills().length})
          </button>
          <button
            type="button"
            onClick={() => {
              const next = !visualPreviewOnly;
              setVisualPreviewOnly(next);
              if (next) {
                setSelectedCategory('all');
              }
            }}
            className={`px-3 py-1.5 rounded border whitespace-nowrap transition flex items-center gap-1.5 ${
              visualPreviewOnly
                ? 'border-emerald-400 bg-emerald-950/60 text-emerald-300 font-bold'
                : 'border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
            }`}
          >
            <Eye className="h-3.5 w-3.5 text-emerald-400" />
            <span>UI Design Previews ({registry.getAllSkills().filter((s) => Boolean(s.previewImage)).length})</span>
          </button>
          {categories.map((cat) => {
            const count = registry.getAllSkills().filter((s) => s.category === cat.slug).length;
            const isSelected = selectedCategory === cat.slug && !visualPreviewOnly;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setVisualPreviewOnly(false);
                }}
                className={`px-3 py-1.5 rounded border whitespace-nowrap transition ${
                  isSelected
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Main Grid & Filter Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6 rounded-lg border border-border bg-surface p-5 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-white">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>Filters</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-text-muted hover:text-white flex items-center gap-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Sort Option */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase text-text-muted">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full rounded border border-border bg-surface-raised px-3 py-2 text-white focus:border-white focus:outline-none"
              >
                <option value="trending">Trending (Installs + Favs)</option>
                <option value="installs">Most Installed</option>
                <option value="updated">Recently Updated</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
              </select>
            </div>

            {/* Agent Compatibility */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase text-text-muted">
                Agent Target
              </label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value as any)}
                className="w-full rounded border border-border bg-surface-raised px-3 py-2 text-white focus:border-white focus:outline-none"
              >
                <option value="all">All Agents</option>
                {AGENT_TARGET_LIST.map((target) => (
                  <option key={target} value={target}>
                    {getAdapter(target).name}
                  </option>
                ))}
              </select>
            </div>

            {/* Trust Level */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase text-text-muted">
                Trust & Verification Level
              </label>
              <select
                value={selectedTrust}
                onChange={(e) => setSelectedTrust(e.target.value as any)}
                className="w-full rounded border border-border bg-surface-raised px-3 py-2 text-white focus:border-white focus:outline-none"
              >
                <option value="all">All Trust Levels</option>
                <option value="Official">Official DomoSkills</option>
                <option value="Verified">Verified Open Source</option>
                <option value="Community">Community Submissions</option>
              </select>
            </div>

            {/* License Filter */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase text-text-muted">
                License
              </label>
              <select
                value={selectedLicense}
                onChange={(e) => setSelectedLicense(e.target.value as any)}
                className="w-full rounded border border-border bg-surface-raised px-3 py-2 text-white focus:border-white focus:outline-none"
              >
                <option value="all">All Open Licenses</option>
                <option value="MIT">MIT License</option>
                <option value="Apache-2.0">Apache 2.0</option>
              </select>
            </div>

            {/* Scripts Toggle */}
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <label className="text-[11px] text-text-secondary cursor-pointer" htmlFor="scriptsToggle">
                Scripts Only
              </label>
              <input
                id="scriptsToggle"
                type="checkbox"
                checked={hasScriptsOnly === true}
                onChange={(e) => setHasScriptsOnly(e.target.checked ? true : undefined)}
                className="rounded border-border bg-surface-raised accent-white"
              />
            </div>
          </div>

          {/* Right Skills Grid */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Results count banner */}
            <div className="flex items-center justify-between font-mono text-xs text-text-muted">
              <div>
                {isLocked ? (
                  <span>
                    Showing <span className="text-white font-bold">{visibleSkills.length}</span> of{' '}
                    <span className="text-white font-bold">{searchResults.skills.length}</span> skills{' '}
                    <span className="text-amber-400 font-semibold">• Preview Mode (First 10 Skills)</span>
                  </span>
                ) : (
                  <span>
                    Showing <span className="text-white font-bold">{searchResults.skills.length}</span> skill{searchResults.skills.length === 1 ? '' : 's'}
                    {user && <span className="text-emerald-400 font-semibold ml-2">• ✓ Free Account Active (Full Catalog Unlocked)</span>}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="flex lg:hidden items-center gap-1 text-white border border-border bg-surface px-2.5 py-1 rounded"
              >
                <Filter className="h-3.5 w-3.5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Cards Grid */}
            {searchResults.skills.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border p-12 text-center font-mono text-xs text-text-muted">
                <Layers className="mx-auto h-10 w-10 text-text-faint mb-3" />
                <p className="text-sm font-semibold text-white mb-1">No matching skills found</p>
                <p className="text-text-muted mb-4">Try relaxing your search terms or filter constraints.</p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="rounded border border-border bg-surface px-4 py-2 text-white hover:border-white transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleSkills.map((skill) => (
                  <SkillCard key={skill.slug} skill={skill} />
                ))}

                {/* Locked Barrier Gate */}
                {isLocked && (
                  <>
                    {/* Blurred teaser preview of subsequent capabilities */}
                    {teaserSkills.map((skill) => (
                      <div
                        key={`teaser-${skill.slug}`}
                        className="opacity-25 blur-[1.5px] pointer-events-none select-none relative overflow-hidden"
                      >
                        <SkillCard skill={skill} />
                      </div>
                    ))}

                    {/* Master Unlock Barrier Card */}
                    <div className="md:col-span-2 rounded-2xl border border-border bg-surface p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden card-polkadot-hover">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black shadow-xl">
                        <Lock className="h-8 w-8 stroke-[2.5]" />
                      </div>

                      <div className="space-y-2 max-w-xl mx-auto">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                          <span>Developer Catalog Locked</span>
                        </div>

                        <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
                          Unlock the Full Agent Skills Catalog ({lockedCount}+ Capabilities)
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                          You are currently previewing the first 10 skills. Sign in or create a free account to unlock all {searchResults.skills.length} verified open-source capabilities, build custom agent stacks, and install via terminal CLI.
                        </p>
                      </div>

                      {/* CTAs */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                        <button
                          type="button"
                          onClick={() => openAuthModal('signup')}
                          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl border border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-lg cursor-pointer"
                        >
                          <Sparkles className="h-4 w-4" />
                          <span>Create Free Account</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => openAuthModal('signin')}
                          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-raised px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white hover:border-white hover:bg-surface transition cursor-pointer"
                        >
                          <span>Sign In</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="border-t border-border/60 pt-4 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-text-muted">
                        <span>✓ 100% Free Forever</span>
                        <span>•</span>
                        <span>✓ Zero Credit Card Required</span>
                        <span>•</span>
                        <span>✓ Instant CLI Terminal Access</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="p-12 text-center font-mono text-xs text-text-muted">Loading registry index...</div>}>
      <ExploreContent />
    </Suspense>
  );
}
