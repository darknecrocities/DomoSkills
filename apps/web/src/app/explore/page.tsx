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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { registry } from '@domoskills/registry';
import { AGENT_TARGET_LIST, getAdapter } from '@domoskills/adapters';
import { Skill, CategorySlug, AgentTarget, TrustLevel, License } from '@domoskills/validators';
import { SkillCard } from '@/components/skills/SkillCard';
import { SkillCardCompact } from '@/components/skills/SkillCardCompact';
import { SkillCardListRow } from '@/components/skills/SkillCardListRow';
import { GridLayoutSwitch } from '@/components/skills/GridLayoutSwitch';
import { useViewModeStore } from '@/store/useViewModeStore';
import { CommandBuilderModal } from '@/components/terminal/CommandBuilderModal';
import { SkillSecurityScorecardModal } from '@/components/skills/SkillSecurityScorecardModal';
import { AgentPromptGeneratorModal } from '@/components/skills/AgentPromptGeneratorModal';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const PAGE_SIZE = 10;

  const { addSkill } = useCartStore();
  const { user, openAuthModal } = useAuth();
  const { viewMode } = useViewModeStore();

  const [selectedCmdSkill, setSelectedCmdSkill] = useState<Skill | null>(null);
  const [selectedScorecardSkill, setSelectedScorecardSkill] = useState<Skill | null>(null);
  const [selectedPromptSkill, setSelectedPromptSkill] = useState<Skill | null>(null);

  const categories = registry.getCategories();

  // Reset to page 1 whenever any filter or category changes
  const handleCategorySelect = (cat: CategorySlug | 'all') => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  // Query registry with expanded limit for 1,000+ skills
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
      limit: 2500,
    });
  }, [query, selectedCategory, selectedAgent, selectedTrust, selectedLicense, hasScriptsOnly, sortBy, visualPreviewOnly]);

  const isAllCategoriesMode =
    selectedCategory === 'all' &&
    !query.trim() &&
    !visualPreviewOnly &&
    selectedAgent === 'all' &&
    selectedTrust === 'all' &&
    selectedLicense === 'all' &&
    hasScriptsOnly === undefined;

  // Group skills by category for "All Domains" overview
  const skillsByCategory = useMemo(() => {
    const map = new Map<CategorySlug, typeof searchResults.skills>();
    for (const cat of categories) {
      map.set(cat.slug, []);
    }
    for (const skill of searchResults.skills) {
      const list = map.get(skill.category);
      if (list) list.push(skill);
    }
    return map;
  }, [searchResults.skills, categories]);

  const isLocked = !user && searchResults.skills.length > 10;
  const totalPages = Math.max(1, Math.ceil(searchResults.skills.length / PAGE_SIZE));

  const paginatedSkills = useMemo(() => {
    if (isLocked) {
      return searchResults.skills.slice(0, 10);
    }
    const start = (currentPage - 1) * PAGE_SIZE;
    return searchResults.skills.slice(start, start + PAGE_SIZE);
  }, [searchResults.skills, currentPage, isLocked]);

  const visibleSkills = isAllCategoriesMode
    ? searchResults.skills.slice(0, 10)
    : paginatedSkills;

  const lockedCount = Math.max(0, searchResults.skills.length - 10);
  const teaserSkills = isLocked ? searchResults.skills.slice(10, 12) : [];

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const el = document.getElementById('skills-grid-top');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAddAllFiltered = (e?: React.MouseEvent) => {
    if (!user) {
      openAuthModal('signup');
      return;
    }
    if (e) {
      fireCartFlyAnimation(e.clientX, e.clientY, `${searchResults.skills.length} Skills`);
    }
    for (const skill of searchResults.skills) {
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

  const gridClass =
    viewMode === 'dense'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
      : viewMode === 'list'
      ? 'flex flex-col gap-2.5'
      : 'grid grid-cols-1 md:grid-cols-2 gap-6';

  const renderSkillItem = (skill: Skill) => {
    if (viewMode === 'dense') {
      return (
        <SkillCardCompact
          key={skill.slug}
          skill={skill}
          onOpenCommandBuilder={setSelectedCmdSkill}
          onOpenScorecard={setSelectedScorecardSkill}
        />
      );
    }
    if (viewMode === 'list') {
      return (
        <SkillCardListRow
          key={skill.slug}
          skill={skill}
          onOpenCommandBuilder={setSelectedCmdSkill}
          onOpenScorecard={setSelectedScorecardSkill}
        />
      );
    }
    return (
      <SkillCard
        key={skill.slug}
        skill={skill}
        onOpenCommandBuilder={setSelectedCmdSkill}
        onOpenScorecard={setSelectedScorecardSkill}
        onOpenPromptGen={setSelectedPromptSkill}
      />
    );
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
    setCurrentPage(1);
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

            {/* Toolbar: Grid Density Switch & Add All Button */}
            <div className="flex flex-wrap items-center gap-2.5">
              <GridLayoutSwitch />

              {searchResults.skills.length > 0 && (
                <button
                  type="button"
                  onClick={handleAddAllFiltered}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 font-mono text-xs font-semibold text-text-secondary hover:border-white hover:text-white transition cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add All ({visibleSkills.length})</span>
                </button>
              )}
            </div>
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
              handleCategorySelect('all');
              setVisualPreviewOnly(false);
            }}
            className={`px-3 py-1.5 rounded border whitespace-nowrap transition cursor-pointer ${
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
                handleCategorySelect('all');
              }
            }}
            className={`px-3 py-1.5 rounded border whitespace-nowrap transition flex items-center gap-1.5 cursor-pointer ${
              visualPreviewOnly
                ? 'border-white bg-white text-black font-bold'
                : 'border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
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
                  handleCategorySelect(cat.slug);
                  setVisualPreviewOnly(false);
                }}
                className={`px-3 py-1.5 rounded border whitespace-nowrap transition cursor-pointer ${
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

          {/* Right Skills Grid Container */}
          <div id="skills-grid-top" className="lg:col-span-3 space-y-8">
            
            {/* Results count banner */}
            <div className="flex items-center justify-between font-mono text-xs text-text-muted">
              <div>
                {isAllCategoriesMode ? (
                  <span>
                    Catalog Overview: <span className="text-white font-bold">{categories.length}</span> Domains •{' '}
                    <span className="text-white font-bold">{searchResults.skills.length}</span> Total Skills
                    {user && (
                      <span className="text-emerald-400 font-semibold ml-2 inline-flex items-center gap-1">
                        <span>•</span>
                        <Check className="h-3 w-3" />
                        <span>Full Access Unlocked</span>
                      </span>
                    )}
                  </span>
                ) : isLocked ? (
                  <span>
                    Showing <span className="text-white font-bold">{paginatedSkills.length}</span> of{' '}
                    <span className="text-white font-bold">{searchResults.skills.length}</span> skills{' '}
                    <span className="text-amber-400 font-semibold">• Preview Mode (First 10 Skills)</span>
                  </span>
                ) : (
                  <span>
                    Showing{' '}
                    <span className="text-white font-bold">
                      {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, searchResults.skills.length)}
                    </span>{' '}
                    of <span className="text-white font-bold">{searchResults.skills.length}</span> skills{' '}
                    <span className="text-text-faint">• Page {currentPage} of {totalPages}</span>
                    {user && (
                      <span className="text-emerald-400 font-semibold ml-2 inline-flex items-center gap-1">
                        <span>•</span>
                        <Check className="h-3 w-3" />
                        <span>Full Access Unlocked</span>
                      </span>
                    )}
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

            {/* 1. All Categories Overview Mode: 10 skills per category with Expand More */}
            {isAllCategoriesMode ? (
              <div className="space-y-12">
                {categories.map((cat, catIdx) => {
                  const catSkills = skillsByCategory.get(cat.slug) || [];
                  if (catSkills.length === 0) return null;
                  const previewSkills = catSkills.slice(0, 10);
                  const isCatLocked = isLocked && catIdx > 0;

                  return (
                    <div key={cat.slug} className="space-y-4 pt-4 first:pt-0">
                      {/* Category Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold uppercase tracking-wider text-text-muted">
                              Domain {catIdx + 1}/{categories.length}
                            </span>
                            <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-white">
                              {catSkills.length} Capabilities
                            </span>
                          </div>
                          <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                            {cat.name}
                          </h2>
                          <p className="font-sans text-xs text-text-secondary mt-0.5 max-w-2xl">
                            {cat.description}
                          </p>
                        </div>

                        {/* Expand Category Button */}
                        {!isCatLocked && (
                          <button
                            type="button"
                            onClick={() => handleCategorySelect(cat.slug)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 font-mono text-xs text-white hover:border-white hover:bg-white hover:text-black transition self-start sm:self-auto cursor-pointer shrink-0"
                          >
                            <span>Explore All {catSkills.length}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>

                      {/* 10 Skills Grid */}
                      {isCatLocked ? (
                        <div className={`opacity-20 blur-[2px] pointer-events-none select-none ${gridClass}`}>
                          {previewSkills.slice(0, 2).map((skill) => renderSkillItem(skill))}
                        </div>
                      ) : (
                        <>
                          <div className={gridClass}>
                            {previewSkills.map((skill) => renderSkillItem(skill))}
                          </div>

                          {/* Category Expand Footer Bar */}
                          {catSkills.length > 10 && (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl border border-border/70 bg-surface/50 font-mono text-xs">
                              <span className="text-text-muted">
                                Displaying top 10 of <span className="text-white font-bold">{catSkills.length}</span> verified capabilities in {cat.name}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCategorySelect(cat.slug)}
                                className="inline-flex items-center gap-2 rounded-lg border border-white bg-white px-4 py-2 text-black font-bold uppercase tracking-wider hover:bg-muted-white transition shadow-sm cursor-pointer"
                              >
                                <span>Expand More ({catSkills.length - 10}+ More)</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                        </>
                      )}

                      {/* Master Unlock Barrier Card if guest on category 1 */}
                      {isLocked && catIdx === 0 && (
                        <div className="rounded-2xl border border-border bg-surface p-8 text-center space-y-5 shadow-2xl relative overflow-hidden mt-6">
                          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-xl">
                            <Lock className="h-7 w-7 stroke-[2.5]" />
                          </div>
                          <div className="space-y-2 max-w-xl mx-auto">
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-0.5 font-mono text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                              <span>Developer Catalog Locked</span>
                            </div>
                            <h3 className="font-sans text-2xl font-extrabold tracking-tight text-white">
                              Unlock All 1,000+ Skills Across All 12 Domains
                            </h3>
                            <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                              Sign in or create a free account to unlock all 12 domains, browse paginated catalogs, and install directly to your local AI agent.
                            </p>
                          </div>
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
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* 2. Paginated Grid Mode: 10 skills per page */
              searchResults.skills.length === 0 ? (
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
                <div className="space-y-8">
                  <div className={gridClass}>
                    {paginatedSkills.map((skill) => renderSkillItem(skill))}
                  </div>

                  {/* Pagination Controls Bar */}
                  {!isLocked && totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border font-mono text-xs">
                      <div className="text-text-muted">
                        Showing{' '}
                        <span className="text-white font-bold">
                          {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, searchResults.skills.length)}
                        </span>{' '}
                        of <span className="text-white font-bold">{searchResults.skills.length}</span> skills
                        <span className="text-text-faint ml-2">• Page {currentPage} of {totalPages}</span>
                      </div>

                      <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 sm:pb-0">
                        <button
                          type="button"
                          disabled={currentPage === 1}
                          onClick={() => handlePageChange(currentPage - 1)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded border border-border bg-surface text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-white transition cursor-pointer"
                          aria-label="Previous Page"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                          <span>Prev</span>
                        </button>

                        {/* Numeric page pills */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter((p) => {
                            if (totalPages <= 7) return true;
                            if (p === 1 || p === totalPages) return true;
                            return Math.abs(p - currentPage) <= 1;
                          })
                          .reduce<(number | string)[]>((acc, p, idx, arr) => {
                            if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) {
                              acc.push(`dots-${p}`);
                            }
                            acc.push(p);
                            return acc;
                          }, [])
                          .map((item) => {
                            if (typeof item === 'string') {
                              return (
                                <span key={item} className="px-1 text-text-muted">
                                  …
                                </span>
                              );
                            }
                            const isCurrent = item === currentPage;
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => handlePageChange(item)}
                                className={`min-w-[32px] h-8 px-2.5 rounded border font-mono text-xs font-bold transition cursor-pointer ${
                                  isCurrent
                                    ? 'border-white bg-white text-black shadow-sm'
                                    : 'border-border bg-surface text-text-secondary hover:text-white hover:border-white'
                                }`}
                              >
                                {item}
                              </button>
                            );
                          })}

                        <button
                          type="button"
                          disabled={currentPage === totalPages}
                          onClick={() => handlePageChange(currentPage + 1)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded border border-border bg-surface text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-white transition cursor-pointer"
                          aria-label="Next Page"
                        >
                          <span>Next</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Locked Barrier for non-logged-in users in paginated mode */}
                  {isLocked && (
                    <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10 text-center space-y-6 shadow-2xl relative overflow-hidden card-polkadot-hover">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black shadow-xl">
                        <Lock className="h-8 w-8 stroke-[2.5]" />
                      </div>
                      <div className="space-y-2 max-w-xl mx-auto">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                          <span>Developer Catalog Locked</span>
                        </div>
                        <h3 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
                          Unlock All {searchResults.skills.length} Skills in this Domain
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                          You are previewing the first 10 skills. Sign in or create a free account to unlock multi-page browsing, custom agent stack exports, and direct CLI downloads.
                        </p>
                      </div>
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
                    </div>
                  )}
                </div>
              )
            )}

          </div>

        </div>

      </div>

      {/* Dynamic Capability Modals */}
      <CommandBuilderModal
        skill={selectedCmdSkill}
        onClose={() => setSelectedCmdSkill(null)}
      />

      <SkillSecurityScorecardModal
        skill={selectedScorecardSkill}
        onClose={() => setSelectedScorecardSkill(null)}
      />

      <AgentPromptGeneratorModal
        skill={selectedPromptSkill}
        onClose={() => setSelectedPromptSkill(null)}
      />
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
