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
import { Skill } from '@domoskills/validators';
import { InteractiveTerminal } from '@/components/terminal/InteractiveTerminal';
import { SkillCard } from '@/components/skills/SkillCard';
import { SkillCardCompact } from '@/components/skills/SkillCardCompact';
import { SkillCardListRow } from '@/components/skills/SkillCardListRow';
import { GridLayoutSwitch } from '@/components/skills/GridLayoutSwitch';
import { useViewModeStore } from '@/store/useViewModeStore';
import { CuratedBundlesSection } from '@/components/home/CuratedBundlesSection';
import { CommandBuilderModal } from '@/components/terminal/CommandBuilderModal';
import { SkillSecurityScorecardModal } from '@/components/skills/SkillSecurityScorecardModal';
import { AgentPromptGeneratorModal } from '@/components/skills/AgentPromptGeneratorModal';
import { DomoMascot } from '@/components/mascot/DomoMascot';
import { AgentBeltCarousel } from '@/components/brands/AgentBeltCarousel';
import { HeroSearch } from '@/components/home/HeroSearch';
import { useLiveTelemetry } from '@/lib/firestoreMetrics';
import { useGitHubStars } from '@/lib/useGitHubStars';

const CYCLING_WORDS = ['Frontend & React', 'OWASP Security', 'AI & RAG Agents', 'Cloud & Edge', 'DevOps & K8s', 'Clean Architecture'];
const TYPEWRITER_PHRASES = [
  '100% Free and Opensource',
  'Universal Agent Capabilities',
  '100% Free and Opensource',
  'Zero Paywalls • Zero Credits',
];

export default function HomePage() {
  const router = useRouter();
  const [wordIndex, setWordIndex] = useState(0);
  const { formattedVisits, formattedUsers, formattedInstalls } = useLiveTelemetry();
  const { formattedStars } = useGitHubStars();

  // Typewriter loop state (~5s cycle)
  const [typewriterText, setTypewriterText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const { viewMode } = useViewModeStore();
  const [selectedCmdSkill, setSelectedCmdSkill] = useState<Skill | null>(null);
  const [selectedScorecardSkill, setSelectedScorecardSkill] = useState<Skill | null>(null);
  const [selectedPromptSkill, setSelectedPromptSkill] = useState<Skill | null>(null);

  const gridClass =
    viewMode === 'dense'
      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
      : viewMode === 'list'
      ? 'flex flex-col gap-2.5'
      : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

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

  // Cycle hero keywords smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // 5-second Typewriter Loop
  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting && typewriterText === currentPhrase) {
      timer = setTimeout(() => setIsDeleting(true), 3200); // Hold full text
    } else if (isDeleting && typewriterText === '') {
      setIsDeleting(false);
      setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
    } else {
      const speed = isDeleting ? 30 : 55;
      timer = setTimeout(() => {
        setTypewriterText((prev) =>
          isDeleting
            ? currentPhrase.substring(0, prev.length - 1)
            : currentPhrase.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, phraseIdx]);

  const categories = registry.getCategories();
  const trendingSkills = registry.getTrendingSkills(6);
  const stats = registry.getStats();

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
              
              {/* Top Branding Pill with Animated 5s Typewriter Loop */}
              <div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-text-secondary shadow-sm">
                <img
                  src="/assets/domodomo/domodomo-app-icon.png"
                  alt="Domo Mascot"
                  className="h-4 w-4 rounded-full object-cover"
                />
                <span className="text-emerald-400 font-bold tracking-wide flex items-center min-w-[210px]">
                  <span>{typewriterText}</span>
                  <span className="inline-block w-1.5 h-3 bg-emerald-400 animate-pulse ml-1" />
                </span>
              </div>

              {/* Main Editorial Headline with Shimmer Animation */}
              <div className="space-y-3">
                <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                  Open skills. <br />
                  Smarter agents. <br />
                  <span className="text-text-muted">Supercharge </span>
                  <span className="inline-block text-shimmer transition-all duration-300 font-black">
                    {CYCLING_WORDS[wordIndex]}
                  </span>
                </h1>
              </div>

              <p className="font-sans text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
                Discover, curate, and install verified open-source capabilities for your AI coding agents in a single CLI command.
              </p>

              {/* Hero Search with Live Keyword Autocomplete */}
              <HeroSearch />

              {/* Action Buttons & Fast Stats */}
              <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                <Link
                  href="/explore"
                  className="flex items-center gap-2 rounded-lg border border-white bg-white px-5 py-2.5 font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <span>Browse Catalog</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/submit"
                  className="flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 font-semibold text-text-secondary hover:border-white hover:text-white transition"
                >
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                  <span>Create / Submit Skill</span>
                </Link>

                <div className="hidden sm:flex flex-wrap items-center gap-4 text-text-muted pl-4 border-l border-border font-mono text-xs">
                  <div title="Total indexed capabilities in registry">
                    <span className="text-white font-bold">{stats.totalSkills}</span> Skills
                  </div>
                  <div title="Total verified skill installations & CLI downloads">
                    <span suppressHydrationWarning className="text-white font-bold">{formattedInstalls}</span> Downloads
                  </div>
                  <div title="Total registered developers in community">
                    <span suppressHydrationWarning className="text-white font-bold">{formattedUsers}</span> Registered
                  </div>
                  <div title="Total site visits counter">
                    <span suppressHydrationWarning className="text-white font-bold">{formattedVisits}</span> Visits
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hero Column: Animated Terminal with Integrated Domo Mascot */}
            <div className="lg:col-span-5">
              <InteractiveTerminal initialCommand="npx domoskills add react-performance owasp-agent-guardian" />
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BRANDS CONVEYOR BELT MARQUEE (Antigravity, Claude Code, Cursor, OpenAI) */}
      {/* ========================================================================= */}
      <AgentBeltCarousel />

      {/* ========================================================================= */}
      {/* 3. EXPLORE BY DOMAIN */}
      {/* ========================================================================= */}
      <section className="border-b border-border py-20 bg-transparent">
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
      {/* 3.5 CURATED BUNDLES (STARTER PACKS) */}
      {/* ========================================================================= */}
      <section className="border-b border-border py-16 bg-transparent">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CuratedBundlesSection />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TRENDING SKILLS */}
      {/* ========================================================================= */}
      <section className="border-b border-border py-20 bg-transparent tech-grid-bg">
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
            <div className="flex items-center gap-3">
              <GridLayoutSwitch />
              <Link
                href="/explore"
                className="font-mono text-xs text-text-secondary hover:text-white flex items-center gap-1 group"
              >
                <span>Explore full registry</span>
                <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition" />
              </Link>
            </div>
          </div>

          <div className={gridClass}>
            {trendingSkills.map((skill) => renderSkillItem(skill))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. HOW IT WORKS (01 FIND -> 02 STACK -> 03 INSTALL -> 04 BUILD) */}
      {/* ========================================================================= */}
      <section className="border-b border-border py-20 bg-transparent">
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
      <section className="border-b border-border py-20 bg-transparent">
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
      <section className="py-24 bg-transparent tech-grid-bg border-t border-border">
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
                <a
                  href="https://github.com/darknecrocities/DomoSkills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded border border-border bg-surface-raised px-3.5 py-2.5 font-mono text-xs text-text-secondary hover:text-white hover:border-white transition"
                >
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>★ {formattedStars} Stars on GitHub</span>
                </a>
              </div>

              {/* Live Registry Sync Footnote */}
              <div className="pt-3 border-t border-border/60 flex flex-wrap items-center gap-4 text-[11px] font-mono text-text-muted">
                <div className="flex items-center gap-1.5 text-text-secondary">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  <span className="font-bold">Registry Engine v1.0</span>
                </div>
                <div>• {formattedUsers} Developers</div>
                <div>• {formattedInstalls} Installs</div>
                <div>• {formattedVisits} Visits</div>
              </div>
            </div>

            {/* Mascot Showcase with Reading Domo */}
            <div className="shrink-0 flex flex-col items-center">
              <DomoMascot size="hero" variant="reading" showBubble={true} bubbleText="Domo loves open source skills!" />
            </div>

          </div>

        </div>
      </section>

      {/* Dynamic Modals */}
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
