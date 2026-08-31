'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Terminal,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  Cpu,
  Database,
  Code2,
  CheckCircle2,
  Lock,
  ExternalLink,
  ChevronRight,
  Flame,
  Star,
  Zap,
} from 'lucide-react';
import { registry } from '@domoskills/registry';
import { AGENT_ADAPTERS, AGENT_TARGET_LIST } from '@domoskills/adapters';
import { InteractiveTerminal } from '@/components/terminal/InteractiveTerminal';
import { SkillCard } from '@/components/skills/SkillCard';
import { DomoMascot } from '@/components/mascot/DomoMascot';

const CYCLING_WORDS = ['Frontend', 'Security', 'AI Agents', 'Cloud', 'DevOps', 'Architecture'];

export default function HomePage() {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Cycle hero keywords smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const categories = registry.getCategories();
  const trendingSkills = registry.getTrendingSkills(6);
  const stats = registry.getStats();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  return (
    <div className="relative overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative border-b border-border pt-16 pb-20 sm:pt-20 sm:pb-24 tech-grid-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Top Branding Pill with Mascot Avatar */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-text-secondary">
                <img
                  src="/assets/domodomo/domodomo-app-icon.png"
                  alt="Domo Mascot"
                  className="h-4 w-4 rounded-full object-cover"
                />
                <span className="text-white font-bold">DomoSkills Marketplace</span>
                <span className="text-text-muted">/</span>
                <span className="text-emerald-400 font-semibold">100% Free & Open Source</span>
              </div>

              {/* Main Editorial Headline with Large Mascot */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="space-y-3 flex-1">
                  <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                    Open skills. <br />
                    Smarter agents. <br />
                    <span className="text-text-muted">Built for </span>
                    <span className="inline-block border-b-2 border-white pb-0.5 text-white transition-all duration-300">
                      {CYCLING_WORDS[wordIndex]}
                    </span>
                  </h1>
                </div>
                
                {/* Big Domo Mascot Floating in Hero */}
                <div className="hidden sm:block shrink-0 pt-2">
                  <DomoMascot size="lg" variant="laptop" showBubble={true} bubbleText="Domo is compiling agent superpowers!" />
                </div>
              </div>

              <p className="font-sans text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
                Discover, curate, and install verified open-source capabilities for your AI coding agents in a single CLI command.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="max-w-xl">
                <div className="relative flex items-center rounded-lg border border-border bg-surface p-1.5 transition focus-within:border-white focus-within:ring-1 focus-within:ring-white">
                  <Search className="ml-3 h-4 w-4 text-text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 1,000+ skills (e.g., 'react', 'owasp', 'docker', 'rag')..."
                    className="w-full bg-transparent px-3 py-2 font-mono text-xs sm:text-sm text-white placeholder:text-text-muted focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-black transition hover:bg-muted-white shrink-0"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Action Buttons & Fast Stats */}
              <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                <Link
                  href="/explore"
                  className="flex items-center gap-2 rounded border border-white bg-white px-5 py-2.5 font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <span>Browse Catalog</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/doctor"
                  className="flex items-center gap-2 rounded border border-border bg-surface px-5 py-2.5 font-semibold text-text-secondary hover:border-white hover:text-white transition"
                >
                  <Terminal className="h-4 w-4" />
                  <span>Agent Doctor</span>
                </Link>

                <div className="hidden sm:flex items-center gap-4 text-text-muted pl-4 border-l border-border">
                  <div>
                    <span className="text-white font-bold">{stats.totalSkills}+</span> Skills
                  </div>
                  <div>
                    <span className="text-white font-bold">{(stats.totalInstalls / 1000).toFixed(0)}k+</span> Installs
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hero Column: Animated Terminal */}
            <div className="lg:col-span-5">
              <InteractiveTerminal initialCommand="npx domoskills add react-performance owasp-agent-guardian" />
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUSTED OPEN SOURCES */}
      {/* ========================================================================= */}
      <section className="border-b border-border bg-surface py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
                Curated & Indexed Repositories
              </div>
              <div className="font-sans text-sm font-semibold text-text-secondary mt-0.5">
                Every skill preserves full original licensing and author attribution.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-text-muted">
              <span className="rounded border border-border bg-surface-raised px-3 py-1 text-white">
                github.com/domoskills/official-agent-skills
              </span>
              <span className="rounded border border-border bg-surface-raised px-3 py-1 text-white">
                github.com/anthropic-community
              </span>
              <span className="rounded border border-border bg-surface-raised px-3 py-1 text-white">
                github.com/opencode-org
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EXPLORE BY DOMAIN */}
      {/* ========================================================================= */}
      <section className="border-b border-border py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                Ecosystem Categories
              </div>
              <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white mt-1">
                Explore by Domain
              </h2>
            </div>
            <Link
              href="/explore"
              className="font-mono text-xs text-text-secondary hover:text-white flex items-center gap-1 group"
            >
              <span>View all domains</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/explore?category=${cat.slug}`}
                className="group card-polkadot-hover relative rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:border-white hover:bg-surface-raised hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.7)]"
              >
                <div className="flex items-center justify-between font-mono text-xs text-text-muted mb-3">
                  <span className="text-white font-bold">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="rounded border border-border px-1.5 py-0.2 text-[10px] uppercase">
                    {cat.slug}
                  </span>
                </div>

                <h3 className="font-sans text-base font-bold text-white group-hover:text-white transition flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-text-secondary transition" />
                </h3>

                <p className="mt-2 font-sans text-xs text-text-secondary line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TRENDING SKILLS */}
      {/* ========================================================================= */}
      <section className="border-b border-border py-20 bg-surface-raised tech-grid-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
                <Flame className="h-3.5 w-3.5 text-white" />
                <span>Most Installed Capabilities</span>
              </div>
              <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white mt-1">
                Trending Agent Skills
              </h2>
            </div>
            <Link
              href="/explore"
              className="font-mono text-xs text-text-secondary hover:text-white flex items-center gap-1 group"
            >
              <span>Explore full registry</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingSkills.map((skill) => (
              <SkillCard key={skill.slug} skill={skill} />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW IT WORKS (01 FIND -> 02 STACK -> 03 INSTALL -> 04 BUILD) */}
      {/* ========================================================================= */}
      <section className="border-b border-border py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
              Workflow
            </div>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              How DomoSkills Works
            </h2>
            <p className="font-sans text-sm text-text-secondary">
              Zero configuration required. Seamless developer ergonomics from discovery to agent execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="card-polkadot-hover rounded-xl border border-border bg-surface p-6 relative transition hover:border-white">
              <div className="font-mono text-xs font-bold text-text-muted mb-4">01 // DISCOVER</div>
              <h3 className="font-sans text-lg font-bold text-white mb-2">Find Skills</h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Search verified agent capabilities across React, OWASP security, Docker, Supabase, and RAG architectures.
              </p>
            </div>

            <div className="card-polkadot-hover rounded-xl border border-border bg-surface p-6 relative transition hover:border-white">
              <div className="font-mono text-xs font-bold text-text-muted mb-4">02 // CURATE</div>
              <h3 className="font-sans text-lg font-bold text-white mb-2">Stack Capabilities</h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Add multiple skills to your project stack cart. Choose your preferred AI agent ecosystem target.
              </p>
            </div>

            <div className="card-polkadot-hover rounded-xl border border-border bg-surface p-6 relative transition hover:border-white">
              <div className="font-mono text-xs font-bold text-text-muted mb-4">03 // INSTALL</div>
              <h3 className="font-sans text-lg font-bold text-white mb-2">Run One Command</h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Execute the generated <code className="text-white">npx domoskills add</code> command to safely download approved markdown files.
              </p>
            </div>

            <div className="card-polkadot-hover rounded-xl border border-border bg-surface p-6 relative transition hover:border-white">
              <div className="font-mono text-xs font-bold text-text-muted mb-4">04 // SYNTHESIZE</div>
              <h3 className="font-sans text-lg font-bold text-white mb-2">Agent Knows More</h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                Your AI agent automatically ingests <code className="text-white">SKILL.md</code> instructions and delivers higher quality code.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. MULTI-AGENT COMPATIBILITY */}
      {/* ========================================================================= */}
      <section className="border-b border-border py-20 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12 space-y-2">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
              Agent Ecosystem Compatibility
            </div>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-white">
              Works Across Every Modern AI Coding Assistant
            </h2>
            <p className="font-sans text-sm text-text-secondary">
              DomoSkills adapts automatically to your editor and runtime without vendor lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 font-mono text-xs">
            {AGENT_TARGET_LIST.map((target) => {
              const a = AGENT_ADAPTERS[target];
              return (
                <div
                  key={target}
                  className="card-polkadot-hover rounded-xl border border-border bg-surface-raised p-4 flex flex-col justify-between transition hover:border-white"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white">{a.name}</span>
                      <span className="text-[10px] text-emerald-400 border border-emerald-900 bg-emerald-950/40 px-1.5 py-0.2 rounded">
                        Compatible
                      </span>
                    </div>
                    <p className="text-[11px] text-text-muted mb-4 font-sans leading-relaxed">
                      {a.description}
                    </p>
                  </div>
                  <div className="border-t border-border pt-2 text-[10px] text-text-secondary">
                    Target: <code className="text-white">{a.defaultPath}</code>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. OPEN SOURCE MANIFESTO & MASCOT SHOWCASE */}
      {/* ========================================================================= */}
      <section className="py-24 bg-background tech-grid-bg border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          <div className="card-polkadot-hover rounded-2xl border border-border bg-surface p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded border border-border bg-surface-raised px-3 py-1 font-mono text-xs text-text-secondary">
                <Lock className="h-3.5 w-3.5 text-white" />
                <span>Open Source Manifesto</span>
              </div>

              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                No paywalls. No locked skills. <br />
                No artificial credits.
              </h2>

              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                DomoSkills is built entirely for the open-source agent ecosystem. Every skill is freely accessible,
                licensed under permissive open-source licenses, and hosted in public community repositories.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
                <Link
                  href="/explore"
                  className="rounded border border-white bg-white px-5 py-2.5 font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                >
                  Explore Registry
                </Link>
                <Link
                  href="/submit"
                  className="rounded border border-border bg-surface-raised px-5 py-2.5 font-semibold text-white hover:border-white transition"
                >
                  Publish a Skill
                </Link>
              </div>
            </div>

            {/* Mascot Showcase with Reading Domo */}
            <div className="shrink-0 flex flex-col items-center">
              <DomoMascot size="hero" variant="reading" showBubble={true} bubbleText="Domo loves open source skills!" />
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
