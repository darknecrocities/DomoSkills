'use client';

import React, { useState, useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Star,
  Shield,
  ShieldCheck,
  Copy,
  Check,
  Plus,
  ExternalLink,
  Github,
  Terminal,
  FolderTree,
  FileCode,
  Layers,
  ArrowLeft,
  Calendar,
  Code2,
  CheckCircle2,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { registry } from '@domoskills/registry';
import { AGENT_TARGET_LIST, getAdapter, generateInstallCommand } from '@domoskills/adapters';
import { AgentTarget } from '@domoskills/validators';
import { useCartStore } from '@/store/useCartStore';
import { FileTreeViewer } from '@/components/skills/FileTreeViewer';
import { recordDownload } from '@/lib/firestoreMetrics';

export default function SkillDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const skill = registry.getSkillBySlug(slug);
  if (!skill) {
    notFound();
  }

  const [mounted, setMounted] = useState(false);
  const { targetAgent, hasSkill, toggleSkill, setTargetAgent } = useCartStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeAgent = mounted ? targetAgent : 'universal';
  const isSelected = mounted ? hasSkill(skill.slug) : false;
  const [copied, setCopied] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'instructions' | 'files' | 'attribution' | 'compatibility'>(
    skill.previewImage ? 'preview' : 'instructions'
  );
  const adapter = getAdapter(activeAgent);
  const installCmd = generateInstallCommand([skill.slug], activeAgent);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    recordDownload(skill.slug, 1);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(skill.prompt || skill.description);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-transparent py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Skill Registry</span>
          </Link>
        </div>

        {/* Skill Hero Header */}
        <div className="rounded-lg border border-border bg-surface p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="rounded border border-border bg-surface-raised px-2.5 py-1 text-white font-bold uppercase">
                  {skill.category}
                </span>
                <span className="rounded border border-border px-2 py-0.5 text-text-secondary">
                  {skill.license} License
                </span>
                <span className="text-text-muted">v{skill.version}</span>
                {skill.trustLevel === 'Official' ? (
                  <span className="inline-flex items-center gap-1 rounded border border-white/30 bg-white text-black px-2 py-0.5 text-[11px] font-bold">
                    <ShieldCheck className="h-3.5 w-3.5" /> Official
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded border border-border bg-surface-raised text-white px-2 py-0.5 text-[11px]">
                    <Shield className="h-3.5 w-3.5" /> Verified
                  </span>
                )}
              </div>

              <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {skill.name}
              </h1>

              <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
                {skill.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border bg-surface-raised px-2.5 py-0.5 font-mono text-xs text-text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Install Action Box */}
            <div className="w-full lg:w-80 rounded-lg border border-border bg-surface-raised p-5 space-y-4 shrink-0 font-mono text-xs">
              <div>
                <div className="flex items-center justify-between text-text-muted mb-1 text-[11px]">
                  <span>Install for:</span>
                  <select
                    value={activeAgent}
                    onChange={(e) => setTargetAgent(e.target.value as AgentTarget)}
                    className="bg-surface border border-border rounded px-1.5 py-0.5 text-white text-[11px] focus:outline-none"
                    suppressHydrationWarning
                  >
                    {AGENT_TARGET_LIST.map((t) => (
                      <option key={t} value={t}>
                        {getAdapter(t).shortName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded border border-border bg-black p-3 font-mono text-xs text-white break-all flex items-center justify-between gap-2">
                  <span suppressHydrationWarning className="text-[11px]">{installCmd}</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1 rounded text-text-muted hover:text-white transition shrink-0"
                    title="Copy command"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Add to stack button */}
              <button
                type="button"
                onClick={() =>
                  toggleSkill({
                    id: skill.id,
                    slug: skill.slug,
                    name: skill.name,
                    category: skill.category,
                    license: skill.license,
                    trustLevel: skill.trustLevel,
                  })
                }
                className={`w-full flex items-center justify-center gap-2 rounded border py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition ${
                  isSelected
                    ? 'border-white bg-white text-black hover:bg-muted-white shadow-sm'
                    : 'border-white bg-surface-raised text-white hover:bg-white hover:text-black'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>In Your Skill Stack</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Add to Skill Stack</span>
                  </>
                )}
              </button>

              <a
                href={skill.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 rounded border border-border bg-surface py-2 text-text-secondary hover:text-white hover:border-white transition text-[11px]"
              >
                <Github className="h-3.5 w-3.5" />
                <span>View Source on GitHub</span>
                <ExternalLink className="h-3 w-3 ml-0.5 text-text-muted" />
              </a>

              {/* Safety guarantee */}
              <div className="border-t border-border pt-3 text-[10px] text-text-muted space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Security verified • Score: {skill.security.securityScore}/100</span>
                </div>
                <div>Installs into: <code className="text-white">{adapter.defaultPath}/{skill.slug}</code></div>
              </div>
            </div>

          </div>

        </div>

        {/* Tab Navigation */}
        <div>
          <div className="flex border-b border-border font-mono text-xs overflow-x-auto">
            {skill.previewImage && (
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-5 py-3 border-b-2 font-semibold transition flex items-center gap-2 shrink-0 ${
                  activeTab === 'preview'
                    ? 'border-white text-white font-bold'
                    : 'border-transparent text-text-muted hover:text-white'
                }`}
              >
                <Eye className="h-3.5 w-3.5 text-emerald-400" />
                <span>0. Visual Design & Prompt Preview</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setActiveTab('instructions')}
              className={`px-5 py-3 border-b-2 font-semibold transition shrink-0 ${
                activeTab === 'instructions'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-text-muted hover:text-white'
              }`}
            >
              1. Instructions & AI Prompting (SKILL.md)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('files')}
              className={`px-5 py-3 border-b-2 font-semibold transition shrink-0 ${
                activeTab === 'files'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-text-muted hover:text-white'
              }`}
            >
              2. Package Files & Assets ({skill.files.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('attribution')}
              className={`px-5 py-3 border-b-2 font-semibold transition shrink-0 ${
                activeTab === 'attribution'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-text-muted hover:text-white'
              }`}
            >
              3. Source & Attribution
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('compatibility')}
              className={`px-5 py-3 border-b-2 font-semibold transition shrink-0 ${
                activeTab === 'compatibility'
                  ? 'border-white text-white font-bold'
                  : 'border-transparent text-text-muted hover:text-white'
              }`}
            >
              4. Agent Compatibility Matrix
            </button>
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="space-y-6">

          {/* TAB 0: Visual Design & Exact Prompt Preview */}
          {activeTab === 'preview' && skill.previewImage && (
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-emerald-400" />
                    <h2 className="font-sans text-xl font-bold text-white">
                      Authentic Website Design & Matching Agent Prompt
                    </h2>
                  </div>
                  <p className="font-sans text-xs text-text-muted mt-1">
                    Direct open-source screenshot corresponding 1:1 with the recreation prompt and guidelines below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white bg-white px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-black transition hover:bg-muted-white shrink-0 shadow-md"
                >
                  {promptCopied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      <span>Prompt Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy Design Prompt</span>
                    </>
                  )}
                </button>
              </div>

              {/* Split Screen Layout: Website Preview + Matching Prompt */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left: High Resolution Screenshot Frame */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                      Live Design Screenshot
                    </span>
                    <span className="rounded border border-border px-2 py-0.5 text-[11px]">
                      Source: {skill.sourceRepository.owner}/{skill.sourceRepository.repository}
                    </span>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-border bg-black shadow-2xl">
                    <div className="flex items-center gap-1.5 border-b border-border/80 bg-surface-raised px-4 py-2.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                      <div className="ml-2 flex-1 rounded bg-surface px-3 py-1 font-mono text-[11px] text-text-muted truncate">
                        preview://{skill.slug}.design
                      </div>
                    </div>
                    <img
                      src={skill.previewImage}
                      alt={`${skill.name} website design reference preview`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>

                {/* Right: Exact Matching Design Prompt */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                    <span className="font-semibold text-white">Exact Matching Agent Prompt</span>
                    <span className="text-emerald-400 font-bold text-[11px] uppercase tracking-wider">1:1 Target Match</span>
                  </div>

                  <div className="rounded-xl border border-border bg-black p-5 font-mono text-xs text-text-secondary leading-relaxed space-y-3 shadow-inner">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-text-muted">
                      <span>PROMPT.MD RECREATION SPEC</span>
                      <button
                        type="button"
                        onClick={handleCopyPrompt}
                        className="text-white hover:text-emerald-400 transition flex items-center gap-1"
                      >
                        {promptCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        <span>{promptCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap text-white/95 font-mono text-xs leading-relaxed overflow-x-auto">
                      {skill.prompt || skill.description}
                    </pre>
                  </div>

                  <div className="rounded-lg border border-border bg-surface-raised p-4 space-y-2 text-xs text-text-secondary font-mono">
                    <div className="flex items-center gap-1.5 text-white font-bold text-xs">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>How to prompt your agent</span>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed font-sans">
                      Paste this prompt into Claude Code, Cursor, Codex, or your AI coding assistant alongside the installed skill (<code className="text-white">${skill.slug}</code>). The assistant will generate the exact website design architecture, layout, spacing, and styling shown in the screenshot.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}
          
          {/* TAB 1: Instructions Markdown */}
          {activeTab === 'instructions' && (
            <div className="rounded-lg border border-border bg-surface p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6 font-mono text-xs text-text-muted">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-white" />
                  <span className="font-bold text-white">SKILL.md Prompt Instructions</span>
                </div>
                <span>Read by AI agent on demand</span>
              </div>

              <div className="prose prose-invert max-w-none font-mono text-xs sm:text-sm text-text-secondary leading-relaxed space-y-4">
                <pre className="rounded bg-black p-4 border border-border overflow-x-auto text-white leading-relaxed">
                  {skill.instructions}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: File Tree Inspector */}
          {activeTab === 'files' && (
            <div>
              <FileTreeViewer
                files={skill.files}
                skillName={skill.slug}
                defaultInstructions={skill.instructions}
              />
            </div>
          )}

          {/* TAB 3: Source & Attribution */}
          {activeTab === 'attribution' && (
            <div className="rounded-lg border border-border bg-surface p-6 sm:p-8 space-y-6 font-mono text-xs">
              <div className="border-b border-border pb-4">
                <h3 className="font-sans text-xl font-bold text-white mb-1">
                  Open Source Attribution & Provenance
                </h3>
                <p className="font-sans text-xs text-text-muted">
                  DomoSkills indexes open-source skills while strictly maintaining full repository ownership, licensing, and commit integrity.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded border border-border bg-surface-raised p-4 space-y-2">
                  <div className="text-text-muted uppercase text-[10px]">Original Repository</div>
                  <div className="text-white font-bold text-sm">
                    {skill.sourceRepository.owner}/{skill.sourceRepository.repository}
                  </div>
                  <a
                    href={skill.sourceRepository.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cyan-400 hover:underline text-[11px]"
                  >
                    <span>{skill.sourceRepository.sourceUrl}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="rounded border border-border bg-surface-raised p-4 space-y-2">
                  <div className="text-text-muted uppercase text-[10px]">License & Terms</div>
                  <div className="text-white font-bold text-sm">{skill.license} Open Source</div>
                  <p className="text-text-secondary font-sans text-xs">
                    Free to use, inspect, modify, and integrate into personal and commercial AI agent workflows.
                  </p>
                </div>

                <div className="rounded border border-border bg-surface-raised p-4 space-y-2">
                  <div className="text-text-muted uppercase text-[10px]">Pinned Commit SHA</div>
                  <div className="text-white font-bold">{skill.commitSha}</div>
                  <div className="text-text-muted text-[11px]">Source path: {skill.sourcePath}</div>
                </div>

                <div className="rounded border border-border bg-surface-raised p-4 space-y-2">
                  <div className="text-text-muted uppercase text-[10px]">Last Synced Timestamp</div>
                  <div className="text-white font-bold">
                    {new Date(skill.lastIndexedAt).toLocaleDateString()}
                  </div>
                  <div className="text-text-muted text-[11px]">Registry status: Active & Verified</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Agent Compatibility Matrix */}
          {activeTab === 'compatibility' && (
            <div className="rounded-lg border border-border bg-surface p-6 sm:p-8 space-y-6 font-mono text-xs">
              <div className="border-b border-border pb-4">
                <h3 className="font-sans text-xl font-bold text-white mb-1">
                  Supported Agent Adapters
                </h3>
                <p className="font-sans text-xs text-text-muted">
                  How this skill maps across various AI coding agent workspace structures.
                </p>
              </div>

              <div className="space-y-3">
                {AGENT_TARGET_LIST.map((target) => {
                  const a = getAdapter(target);
                  const isSupported = skill.compatibility.includes('universal') || skill.compatibility.includes(target);
                  return (
                    <div
                      key={target}
                      className="flex flex-col sm:flex-row sm:items-center justify-between rounded border border-border bg-surface-raised p-4 gap-3"
                    >
                      <div>
                        <div className="font-bold text-white text-sm">{a.name}</div>
                        <div className="text-text-muted text-[11px]">{a.description}</div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-text-secondary text-[11px]">
                          Target: <code className="text-white">{a.defaultPath}/{skill.slug}</code>
                        </div>
                        <span
                          className={`rounded border px-2 py-0.5 text-[10px] font-bold uppercase ${
                            isSupported
                              ? 'border-emerald-800 bg-emerald-950/50 text-emerald-400'
                              : 'border-border text-text-muted'
                          }`}
                        >
                          {isSupported ? 'Supported' : 'Experimental'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
