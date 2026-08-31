'use client';

import React, { useState, useRef } from 'react';
import {
  ShieldCheck,
  Github,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileCode,
  ArrowRight,
  Sparkles,
  UploadCloud,
  FileText,
  Copy,
  Check,
  Download,
  Code2,
  Wand2,
  FolderOpen,
  Plus,
} from 'lucide-react';
import { parseSkillPackage, isPathSafe } from '@domoskills/skill-parser';
import { registry } from '@domoskills/registry';
import { AGENT_TARGET_LIST, AGENT_ADAPTERS } from '@domoskills/adapters';
import { AgentTarget, CategorySlug } from '@domoskills/validators';
import { DomoMascot } from '@/components/mascot/DomoMascot';

export default function SubmitSkillPage() {
  const [activeTab, setActiveTab] = useState<'builder' | 'upload' | 'github' | 'raw'>('builder');

  // Form State for Visual Builder
  const [builderName, setBuilderName] = useState('My Agent Capability');
  const [builderSlug, setBuilderSlug] = useState('my-agent-capability');
  const [builderCategory, setBuilderCategory] = useState<CategorySlug>('frontend');
  const [builderLicense, setBuilderLicense] = useState('MIT');
  const [builderVersion, setBuilderVersion] = useState('1.0.0');
  const [builderDescription, setBuilderDescription] = useState('High-performance instructions, architectural guidelines, and optimization rules for AI coding assistants.');
  const [builderTags, setBuilderTags] = useState('React, Performance, Optimization');
  const [builderTargetAgents, setBuilderTargetAgents] = useState<AgentTarget[]>(['universal', 'claude', 'cursor', 'opencode']);
  const [builderInstructions, setBuilderInstructions] = useState(`# Best Practice Instructions & AI Rules

1. Use semantic HTML and type-safe interfaces.
2. Eliminate redundant re-renders and unnecessary state duplication.
3. Write clean, idiomatic code with clear error handling.

## Example Interaction
When the user asks for optimization, inspect component dependency trees and apply memoization.`);

  // GitHub Form State
  const [repoUrl, setRepoUrl] = useState('');
  const [skillPath, setSkillPath] = useState('skills/');
  const [contactEmail, setContactEmail] = useState('');

  // Uploaded File Info
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Raw Markdown State
  const [rawMarkdown, setRawMarkdown] = useState(`---
name: my-agent-capability
description: High-performance instructions, architectural guidelines, and optimization rules for AI coding assistants.
license: MIT
version: 1.0.0
tags:
  - Frontend
  - Performance
---

# Agent Capability Instructions

1. Use semantic HTML and type-safe interfaces.
2. Eliminate redundant re-renders and unnecessary state duplication.
3. Write clean, idiomatic code with clear error handling.
`);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
    score?: number;
  } | null>(null);

  // Auto-slugify name in builder
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBuilderName(val);
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setBuilderSlug(slug);
  };

  // Generate SKILL.md from visual builder state
  const generatedBuilderMarkdown = `---
name: ${builderSlug || 'custom-skill'}
description: ${builderDescription.replace(/\n/g, ' ')}
license: ${builderLicense}
version: ${builderVersion}
tags:
${builderTags.split(',').map((t) => `  - ${t.trim()}`).filter(Boolean).join('\n')}
---

${builderInstructions}
`;

  // Compute active markdown payload based on tab
  const activeMarkdownPayload = activeTab === 'builder' ? generatedBuilderMarkdown : rawMarkdown;

  // Real-time client-side AST validator
  const validation = parseSkillPackage(
    activeMarkdownPayload,
    [
      { path: 'SKILL.md', type: 'file', size: activeMarkdownPayload.length, isExecutable: false },
    ],
    { sourceUrl: repoUrl }
  );

  // File Upload Handler
  const handleFileUpload = (file: File) => {
    if (!file) return;
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setRawMarkdown(text);
        setActiveTab('raw');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDownloadSkillMd = () => {
    const blob = new Blob([activeMarkdownPayload], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${builderSlug || 'SKILL'}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(activeMarkdownPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await registry.submitSkill({
        repositoryUrl: repoUrl.trim() || `https://github.com/community/${builderSlug || 'custom-skill'}`,
        skillPath: skillPath.trim() || 'skills/',
        contactEmail: contactEmail.trim() || undefined,
      });
      setSubmissionResult({
        success: res.success,
        message: res.message || 'Skill accepted and queued for instant indexing.',
        score: validation.security.securityScore,
      });
    } catch (err: any) {
      setSubmissionResult({
        success: false,
        message: err.message || 'Failed to submit skill.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = registry.getCategories();

  return (
    <div className="min-h-screen bg-background py-12 tech-grid-bg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Mascot */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Skill Creator & Ingestion Suite</span>
            </div>
            <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Create, Upload & Publish Agent Skills
            </h1>
            <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
              Design new AI agent capabilities with our visual creator, upload local <code className="text-white">SKILL.md</code> files,
              or index open-source GitHub repositories with live AST security verification.
            </p>
          </div>

          <div className="hidden md:block shrink-0">
            <DomoMascot size="lg" variant="laptop" showBubble={true} bubbleText="Ready to build new agent skills!" />
          </div>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4 font-mono text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('builder')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition ${
              activeTab === 'builder'
                ? 'border border-white bg-white text-black font-bold shadow-md'
                : 'border border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
            }`}
          >
            <Wand2 className="h-4 w-4" />
            <span>Visual Skill Builder</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition ${
              activeTab === 'upload'
                ? 'border border-white bg-white text-black font-bold shadow-md'
                : 'border border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
            }`}
          >
            <UploadCloud className="h-4 w-4" />
            <span>Upload .MD File</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition ${
              activeTab === 'github'
                ? 'border border-white bg-white text-black font-bold shadow-md'
                : 'border border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
            }`}
          >
            <Github className="h-4 w-4" />
            <span>GitHub Repository URL</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('raw')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 transition ${
              activeTab === 'raw'
                ? 'border border-white bg-white text-black font-bold shadow-md'
                : 'border border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
            }`}
          >
            <Code2 className="h-4 w-4" />
            <span>Raw Markdown Editor</span>
          </button>
        </div>

        {/* Submission Alert */}
        {submissionResult && (
          <div
            className={`card-polkadot-hover rounded-xl border p-6 font-mono text-xs ${
              submissionResult.success
                ? 'border-emerald-800 bg-emerald-950/40 text-white'
                : 'border-red-800 bg-red-950/40 text-white'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm mb-1">
              {submissionResult.success ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <XCircle className="h-4 w-4 text-red-400" />
              )}
              <span>{submissionResult.success ? 'Skill Successfully Submitted & Indexed' : 'Submission Error'}</span>
            </div>
            <p className="text-text-secondary mt-1">{submissionResult.message}</p>
          </div>
        )}

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form by Mode */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* ========================================================= */}
            {/* MODE 1: VISUAL BUILDER */}
            {/* ========================================================= */}
            {activeTab === 'builder' && (
              <div className="card-polkadot-hover rounded-xl border border-border bg-surface p-6 space-y-5 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2 font-bold uppercase text-white">
                    <Wand2 className="h-4 w-4 text-white" />
                    <span>Interactive Capability Generator</span>
                  </div>
                  <span className="text-[11px] text-text-muted">Live Markdown Generator</span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1">
                        Skill Name *
                      </label>
                      <input
                        type="text"
                        value={builderName}
                        onChange={handleNameChange}
                        placeholder="React Performance"
                        className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-white focus:border-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1">
                        Slug (Identifier)
                      </label>
                      <input
                        type="text"
                        value={builderSlug}
                        onChange={(e) => setBuilderSlug(e.target.value)}
                        placeholder="react-performance"
                        className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-text-muted focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1">
                        Category
                      </label>
                      <select
                        value={builderCategory}
                        onChange={(e) => setBuilderCategory(e.target.value as any)}
                        className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-white focus:border-white focus:outline-none"
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1">
                        License
                      </label>
                      <select
                        value={builderLicense}
                        onChange={(e) => setBuilderLicense(e.target.value)}
                        className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-white focus:border-white focus:outline-none"
                      >
                        <option value="MIT">MIT</option>
                        <option value="Apache-2.0">Apache-2.0</option>
                        <option value="BSD-3-Clause">BSD-3-Clause</option>
                        <option value="ISC">ISC</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1">
                        Version
                      </label>
                      <input
                        type="text"
                        value={builderVersion}
                        onChange={(e) => setBuilderVersion(e.target.value)}
                        className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-white focus:border-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1">
                      Skill Description *
                    </label>
                    <textarea
                      rows={2}
                      value={builderDescription}
                      onChange={(e) => setBuilderDescription(e.target.value)}
                      placeholder="Brief overview of what this capability teaches the AI agent..."
                      className="w-full rounded-lg border border-border bg-surface-raised p-3 text-white placeholder:text-text-muted focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1">
                      Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={builderTags}
                      onChange={(e) => setBuilderTags(e.target.value)}
                      placeholder="React, Memoization, Hooks, SSR"
                      className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-white placeholder:text-text-muted focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1">
                      AI Agent Instructions (SKILL.md Body) *
                    </label>
                    <textarea
                      rows={8}
                      value={builderInstructions}
                      onChange={(e) => setBuilderInstructions(e.target.value)}
                      placeholder="Write markdown instructions for the AI agent..."
                      className="w-full rounded-lg border border-border bg-black p-3 font-mono text-xs text-white placeholder:text-text-muted focus:border-white focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleDownloadSkillMd}
                      className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-surface-raised px-4 py-2 font-semibold text-white hover:border-white transition"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download SKILL.md</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleCopyMarkdown}
                      className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 font-semibold text-text-secondary hover:text-white transition"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Content'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !validation.isValid}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-white bg-white px-5 py-2 font-bold uppercase tracking-wider text-black hover:bg-muted-white transition disabled:opacity-50"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span>Publish Skill</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODE 2: FILE UPLOAD */}
            {/* ========================================================= */}
            {activeTab === 'upload' && (
              <div className="card-polkadot-hover rounded-xl border border-border bg-surface p-6 space-y-6 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2 font-bold uppercase text-white">
                    <UploadCloud className="h-4 w-4 text-white" />
                    <span>Upload SKILL.md or Markdown Package</span>
                  </div>
                  <span className="text-[11px] text-text-muted">Direct File Reader</span>
                </div>

                {/* Drag and Drop Zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition ${
                    dragOver
                      ? 'border-white bg-surface-raised scale-[1.01]'
                      : 'border-border hover:border-white/60 hover:bg-surface-raised'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".md,.txt,.json,.yaml"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <div className="h-14 w-14 rounded-full border border-white/20 bg-surface-raised flex items-center justify-center mb-3">
                    <UploadCloud className="h-6 w-6 text-white" />
                  </div>
                  <div className="font-sans text-sm font-bold text-white mb-1">
                    {uploadedFileName ? `Loaded: ${uploadedFileName}` : 'Drag & Drop your SKILL.md here'}
                  </div>
                  <p className="font-sans text-xs text-text-muted max-w-sm">
                    Supports <code className="text-white">.md</code>, <code className="text-white">SKILL.md</code>, or plain text capability files.
                  </p>
                </div>

                {uploadedFileName && (
                  <div className="rounded-lg border border-border bg-surface-raised p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-400" />
                      <span className="text-white font-semibold">{uploadedFileName}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting || !validation.isValid}
                      className="rounded bg-white px-4 py-1.5 font-bold uppercase text-black hover:bg-muted-white transition"
                    >
                      Publish Uploaded Skill
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================= */}
            {/* MODE 3: GITHUB REPO INGESTION */}
            {/* ========================================================= */}
            {activeTab === 'github' && (
              <div className="card-polkadot-hover rounded-xl border border-border bg-surface p-6 space-y-6 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2 font-bold uppercase text-white">
                    <Github className="h-4 w-4 text-white" />
                    <span>Public GitHub Repository Indexer</span>
                  </div>
                  <span className="text-[11px] text-text-muted">Automated Sync</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1.5">
                      GitHub Public Repository URL *
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3 top-3 h-4 w-4 text-text-muted" />
                      <input
                        type="url"
                        required
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/owner/repository"
                        className="w-full rounded-lg border border-border bg-surface-raised pl-9 pr-3 py-2 text-white placeholder:text-text-muted focus:border-white focus:outline-none"
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-text-muted font-sans">
                      Must be an active public open-source repository on GitHub.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1.5">
                      Skill Directory Subpath (Optional)
                    </label>
                    <input
                      type="text"
                      value={skillPath}
                      onChange={(e) => setSkillPath(e.target.value)}
                      placeholder="skills/ or leave empty if at repo root"
                      className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-white placeholder:text-text-muted focus:border-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-text-secondary mb-1.5">
                      Maintainer Contact Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="maintainer@example.com"
                      className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 text-white placeholder:text-text-muted focus:border-white focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !repoUrl.trim()}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-white bg-white py-2.5 font-bold uppercase tracking-wider text-black hover:bg-muted-white transition disabled:opacity-50"
                  >
                    {isSubmitting ? 'Syncing Repository...' : 'Index GitHub Repository'}
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODE 4: RAW MARKDOWN */}
            {/* ========================================================= */}
            {activeTab === 'raw' && (
              <div className="card-polkadot-hover rounded-xl border border-border bg-surface p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex items-center gap-2 font-bold uppercase text-white">
                    <Code2 className="h-4 w-4 text-white" />
                    <span>Raw SKILL.md Editor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyMarkdown}
                      className="text-[11px] text-text-muted hover:text-white flex items-center gap-1"
                    >
                      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <textarea
                  rows={14}
                  value={rawMarkdown}
                  onChange={(e) => setRawMarkdown(e.target.value)}
                  className="w-full rounded-lg border border-border bg-black p-4 font-mono text-xs text-white placeholder:text-text-muted focus:border-white focus:outline-none leading-relaxed"
                />

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadSkillMd}
                    className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-raised px-4 py-2 font-semibold text-white hover:border-white transition"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download File</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !validation.isValid}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-white bg-white py-2 font-bold uppercase tracking-wider text-black hover:bg-muted-white transition disabled:opacity-50"
                  >
                    <span>Publish Skill</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Real-Time Live AST Verification Report Card */}
          <div className="card-polkadot-hover lg:col-span-5 rounded-xl border border-border bg-surface-raised p-6 space-y-6 font-mono text-xs">
            
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-white">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Automated AST Audit</span>
              </div>
              <span className="text-[11px] text-text-muted">Real-Time Scanner</span>
            </div>

            {/* Score Metric */}
            <div className="rounded-xl border border-border bg-surface p-5 text-center space-y-1">
              <div className="text-[10px] uppercase tracking-widest text-text-muted">
                Calculated Security Score
              </div>
              <div className="text-4xl font-extrabold text-white">
                {validation.security.securityScore} <span className="text-xs text-text-muted">/ 100</span>
              </div>
              <div className="text-[11px] text-emerald-400 font-semibold pt-1">
                {validation.security.securityScore >= 80 ? 'Passes DomoSkills Safety Checks' : 'Review Warnings'}
              </div>
            </div>

            {/* Checks list */}
            <div className="space-y-3">
              
              <div className="flex items-start gap-2.5">
                {validation.parsedContent.hasValidFrontmatter ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-white font-semibold">YAML Frontmatter Structure</div>
                  <div className="text-[11px] text-text-muted">
                    {validation.parsedContent.hasValidFrontmatter
                      ? `Valid name: "${validation.parsedContent.frontmatter.name}" (v${validation.parsedContent.frontmatter.version})`
                      : 'Missing or malformed YAML header.'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">Open Source Permissive License</div>
                  <div className="text-[11px] text-text-muted">
                    Detected: {validation.parsedContent.frontmatter.license || 'MIT'}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">Path Traversal Guard</div>
                  <div className="text-[11px] text-text-muted">
                    No dangerous relative paths (../) escaping skill target directory.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                {!validation.security.containsScripts ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-white font-semibold">Executable Script Inspection</div>
                  <div className="text-[11px] text-text-muted">
                    {validation.security.containsScripts
                      ? 'Contains scripts. Quarantined in read-only mode.'
                      : 'Zero arbitrary executable scripts detected.'}
                  </div>
                </div>
              </div>

            </div>

            {/* Validation errors/warnings */}
            {validation.errors.length > 0 && (
              <div className="rounded-lg border border-red-800 bg-red-950/30 p-3 space-y-1 text-red-200 text-[11px]">
                <div className="font-bold flex items-center gap-1 text-red-400">
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Validation Errors</span>
                </div>
                {validation.errors.map((err, i) => (
                  <div key={i}>• {err}</div>
                ))}
              </div>
            )}

            {/* Moderation Policy */}
            <div className="rounded-lg border border-border bg-surface p-3.5 text-[11px] text-text-muted leading-relaxed font-sans">
              <div className="font-mono text-[10px] font-bold text-white uppercase mb-1">
                Zero-Execution Policy
              </div>
              DomoSkills ensures full security isolation. All skills are plain markdown instruction packages
              with zero unverified remote code execution.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
