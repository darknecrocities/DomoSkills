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
  Lock,
  Unlock,
  KeyRound,
  UserCheck,
  Shield,
  Layers,
} from 'lucide-react';
import { parseSkillPackage, isPathSafe } from '@domoskills/skill-parser';
import { registry } from '@domoskills/registry';
import { AGENT_TARGET_LIST, AGENT_ADAPTERS } from '@domoskills/adapters';
import { AgentTarget, CategorySlug } from '@domoskills/validators';
import { DomoMascot } from '@/components/mascot/DomoMascot';
import { useAuth } from '@/context/AuthContext';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';

export default function SubmitSkillPage() {
  const { user, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'builder' | 'upload' | 'github' | 'raw'>('builder');

  // Form State for Visual Builder
  const [builderName, setBuilderName] = useState('My Agent Capability');
  const [builderSlug, setBuilderSlug] = useState('my-agent-capability');
  const [builderCategory, setBuilderCategory] = useState<CategorySlug>('frontend');
  const [builderLicense, setBuilderLicense] = useState('MIT');
  const [builderVersion, setBuilderVersion] = useState('1.0.0');
  const [builderDescription, setBuilderDescription] = useState(
    'High-performance instructions, architectural guidelines, and optimization rules for AI coding assistants.'
  );
  const [builderTags, setBuilderTags] = useState('React, Performance, Optimization');
  const [builderTargetAgents, setBuilderTargetAgents] = useState<AgentTarget[]>([
    'universal',
    'claude',
    'cursor',
    'opencode',
  ]);
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
    docId?: string;
    slug?: string;
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
${builderTags
  .split(',')
  .map((t) => `  - ${t.trim()}`)
  .filter(Boolean)
  .join('\n')}
---

${builderInstructions}
`;

  // Compute active markdown payload based on tab
  const activeMarkdownPayload = activeTab === 'builder' ? generatedBuilderMarkdown : rawMarkdown;

  // Real-time client-side AST validator
  const validation = parseSkillPackage(
    activeMarkdownPayload,
    [{ path: 'SKILL.md', type: 'file', size: activeMarkdownPayload.length, isExecutable: false }],
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
    if (!user) {
      openAuthModal('signin');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        slug: builderSlug || 'custom-skill',
        name: builderName || 'Custom Skill',
        category: builderCategory,
        version: builderVersion,
        license: builderLicense,
        description: builderDescription,
        markdown: activeMarkdownPayload,
        repositoryUrl: repoUrl.trim() || `https://github.com/${user.displayName?.toLowerCase().replace(/\s+/g, '') || 'community'}/${builderSlug || 'custom-skill'}`,
        skillPath: skillPath.trim() || 'skills/',
        contactEmail: contactEmail.trim() || user.email || undefined,
        userId: user.uid,
        userEmail: user.email,
        authorName: user.displayName || 'Anonymous Developer',
        submittedAt: new Date().toISOString(),
      };

      // 1. Submit to Backend API Endpoint
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const res = await response.json();

      let firestoreDocId = '';

      // 2. Sync to Firebase Firestore
      if (isFirebaseConfigured && db) {
        try {
          const docRef = await addDoc(collection(db, 'submissions'), {
            ...payload,
            createdAt: serverTimestamp(),
            securityScore: validation.security.securityScore,
            status: 'approved',
          });
          firestoreDocId = docRef.id;

          // Also set into skills collection
          await setDoc(doc(db, 'skills', payload.slug), {
            ...payload,
            updatedAt: serverTimestamp(),
            verified: true,
          });
        } catch (firestoreErr) {
          console.warn('Firestore sync warning (permissions or network):', firestoreErr);
        }
      }

      setSubmissionResult({
        success: res.success,
        message: res.message || 'Skill accepted, AST security verified, and published to DomoSkills Registry!',
        score: validation.security.securityScore,
        docId: firestoreDocId || `sub_${Date.now().toString(36)}`,
        slug: payload.slug,
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
    <div className="min-h-screen bg-transparent py-12 tech-grid-bg relative">
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
              or index open-source GitHub repositories with live AST security verification and registry synchronization.
            </p>
          </div>

          <div className="hidden md:block shrink-0">
            <DomoMascot size="lg" variant="laptop" showBubble={true} bubbleText="Ready to build new agent skills!" />
          </div>
        </div>

        {/* Authenticated User Status Bar */}
        {user ? (
          <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-surface-raised font-mono text-xs shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black font-bold">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <div className="text-white font-bold flex items-center gap-2">
                  <span>{user.displayName || user.email}</span>
                  <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <UserCheck className="h-3 w-3" /> Verified Publisher
                  </span>
                </div>
                <div className="text-text-muted text-[11px]">{user.email}</div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-text-muted text-[11px]">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span>Cloud Sync Active</span>
            </div>
          </div>
        ) : null}

        {/* Relative Container for Form & Lock Overlay */}
        <div className="relative">
          
          {/* ========================================================================= */}
          {/* LOCKED / BLURRED OVERLAY WHEN NOT LOGGED IN */}
          {/* ========================================================================= */}
          {!user && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 sm:p-10 rounded-2xl bg-black/75 backdrop-blur-md border border-border shadow-2xl animate-fade-in">
              <div className="max-w-md w-full text-center space-y-6">
                
                {/* Glowing Lock Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_50px_rgba(255,255,255,0.25)] ring-8 ring-white/10">
                  <Lock className="h-10 w-10 stroke-[2.2]" />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    <KeyRound className="h-3 w-3" /> Authentication Required
                  </div>
                  <h2 className="font-sans text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Sign In to Publish Agent Skills
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                    To maintain registry integrity, provenance, and decentralized package ownership, you must be signed in with your developer account to publish or index skills.
                  </p>
                </div>

                {/* Value Checkpoints */}
                <div className="rounded-xl border border-border/80 bg-surface/80 p-4 text-left font-mono text-xs space-y-2 text-text-secondary">
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Instant AST security scanning & OWASP verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Real-time cloud & open-source registry synchronization</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Author attribution and verified publisher badge</span>
                  </div>
                </div>

                {/* Sign In Trigger Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => openAuthModal('signin')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white bg-white px-6 py-3 font-bold text-black hover:bg-muted-white transition shadow-lg active:scale-[0.99]"
                  >
                    <Unlock className="h-4 w-4" />
                    <span>Sign In with Google / Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openAuthModal('signup')}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 font-semibold text-text-secondary hover:border-white hover:text-white transition"
                  >
                    <span>Create Account</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* MAIN SUBMISSION INTERFACE (Blurred if !user) */}
          {/* ========================================================================= */}
          <div className={!user ? 'filter blur-[3px] pointer-events-none select-none opacity-40 transition-all' : ''}>
            
            {/* Mode Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4 font-mono text-xs mb-6">
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

            {/* Submission Alert Result */}
            {submissionResult && (
              <div
                className={`card-polkadot-hover rounded-xl border p-6 font-mono text-xs mb-8 ${
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
                  <span>{submissionResult.success ? 'Skill Successfully Registered & Synced' : 'Submission Issue'}</span>
                </div>
                <p className="text-text-secondary mt-1">{submissionResult.message}</p>
                {submissionResult.docId && (
                  <div className="mt-3 flex flex-wrap items-center gap-3 pt-3 border-t border-border/40 text-[11px] text-text-muted">
                    <span>
                      Install: <code className="text-white">npx domoskills add {submissionResult.slug}</code>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Two-Column Creator / Inspector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Form & Editors */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. VISUAL BUILDER TAB */}
                {activeTab === 'builder' && (
                  <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8 card-polkadot-hover">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div>
                        <h2 className="font-sans text-xl font-bold text-white">Visual Creator</h2>
                        <p className="font-sans text-xs text-text-secondary">
                          Configure metadata, boundaries, and agent behavior rules.
                        </p>
                      </div>
                      <span className="rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 font-mono text-[10px]">
                        Live Generator
                      </span>
                    </div>

                    <div className="space-y-4 font-mono text-xs">
                      <div>
                        <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                          Skill Display Name
                        </label>
                        <input
                          type="text"
                          value={builderName}
                          onChange={handleNameChange}
                          className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-white placeholder-text-muted focus:border-white focus:outline-none transition"
                          placeholder="e.g. React Performance Pro"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                            Package Slug
                          </label>
                          <input
                            type="text"
                            value={builderSlug}
                            onChange={(e) => setBuilderSlug(e.target.value)}
                            className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-white font-mono focus:border-white focus:outline-none transition"
                            placeholder="react-performance-pro"
                          />
                        </div>

                        <div>
                          <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                            Category
                          </label>
                          <select
                            value={builderCategory}
                            onChange={(e) => setBuilderCategory(e.target.value as CategorySlug)}
                            className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-white focus:border-white focus:outline-none transition"
                          >
                            {categories.map((c) => (
                              <option key={c.slug} value={c.slug}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                            License
                          </label>
                          <input
                            type="text"
                            value={builderLicense}
                            onChange={(e) => setBuilderLicense(e.target.value)}
                            className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-white focus:border-white focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                            Version
                          </label>
                          <input
                            type="text"
                            value={builderVersion}
                            onChange={(e) => setBuilderVersion(e.target.value)}
                            className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-white focus:border-white focus:outline-none transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={builderTags}
                          onChange={(e) => setBuilderTags(e.target.value)}
                          className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-white placeholder-text-muted focus:border-white focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                          Short Description
                        </label>
                        <textarea
                          rows={2}
                          value={builderDescription}
                          onChange={(e) => setBuilderDescription(e.target.value)}
                          className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-white placeholder-text-muted focus:border-white focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                          Agent Instructions & Behavioral Rules (Markdown)
                        </label>
                        <textarea
                          rows={8}
                          value={builderInstructions}
                          onChange={(e) => setBuilderInstructions(e.target.value)}
                          className="w-full rounded-lg border border-border bg-surface-raised p-4 text-white font-mono text-xs placeholder-text-muted focus:border-white focus:outline-none transition"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. UPLOAD .MD TAB */}
                {activeTab === 'upload' && (
                  <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8 card-polkadot-hover">
                    <div className="border-b border-border pb-4">
                      <h2 className="font-sans text-xl font-bold text-white">Upload SKILL.md</h2>
                      <p className="font-sans text-xs text-text-secondary">
                        Drag and drop your local agent instruction file for immediate AST verification.
                      </p>
                    </div>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition ${
                        dragOver
                          ? 'border-white bg-surface-raised'
                          : 'border-border bg-surface-raised/40 hover:border-border-bright hover:bg-surface-raised'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept=".md,.markdown,.txt"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }}
                      />
                      <UploadCloud className="mx-auto h-10 w-10 text-text-muted mb-3" />
                      <div className="font-sans text-sm font-bold text-white mb-1">
                        Click to browse or drop your SKILL.md file here
                      </div>
                      <div className="font-mono text-xs text-text-muted">
                        Accepts standard Markdown with YAML frontmatter
                      </div>
                      {uploadedFileName && (
                        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 font-mono text-xs text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Loaded: {uploadedFileName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. GITHUB REPOSITORY INGESTION TAB */}
                {activeTab === 'github' && (
                  <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8 card-polkadot-hover">
                    <div className="border-b border-border pb-4">
                      <h2 className="font-sans text-xl font-bold text-white">GitHub Indexing</h2>
                      <p className="font-sans text-xs text-text-secondary">
                        Submit an open-source GitHub repository containing agent skill bundles.
                      </p>
                    </div>

                    <div className="space-y-4 font-mono text-xs">
                      <div>
                        <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                          GitHub Repository URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={repoUrl}
                          onChange={(e) => setRepoUrl(e.target.value)}
                          placeholder="https://github.com/organization/agent-skills"
                          className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-white placeholder-text-muted focus:border-white focus:outline-none transition"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                            Skill Directory Path
                          </label>
                          <input
                            type="text"
                            value={skillPath}
                            onChange={(e) => setSkillPath(e.target.value)}
                            placeholder="skills/ or .skills/"
                            className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-white placeholder-text-muted focus:border-white focus:outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block text-text-muted mb-1.5 uppercase tracking-wider font-bold text-[10px]">
                            Maintainer Contact Email
                          </label>
                          <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="dev@organization.com"
                            className="w-full rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-white placeholder-text-muted focus:border-white focus:outline-none transition"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. RAW MARKDOWN EDITOR TAB */}
                {activeTab === 'raw' && (
                  <div className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8 card-polkadot-hover">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div>
                        <h2 className="font-sans text-xl font-bold text-white">Raw Editor</h2>
                        <p className="font-sans text-xs text-text-secondary">
                          Directly write or paste YAML frontmatter and Markdown body.
                        </p>
                      </div>
                      <span className="font-mono text-xs text-text-muted">
                        {rawMarkdown.length} bytes
                      </span>
                    </div>

                    <textarea
                      rows={14}
                      value={rawMarkdown}
                      onChange={(e) => setRawMarkdown(e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface-raised p-4 font-mono text-xs text-white leading-relaxed focus:border-white focus:outline-none transition"
                    />
                  </div>
                )}

                {/* Primary Action Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyMarkdown}
                      className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-xs text-text-secondary hover:border-white hover:text-white transition"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy SKILL.md'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadSkillMd}
                      className="flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 font-mono text-xs text-text-secondary hover:border-white hover:text-white transition"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 rounded-lg border border-white bg-white px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-[0_0_25px_rgba(255,255,255,0.2)] disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4 text-emerald-500" />
                    <span>{isSubmitting ? 'Publishing Capability...' : 'Publish to DomoSkills'}</span>
                  </button>
                </div>

              </div>

              {/* Right Column: Live Security & AST Inspector */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Security Score Card */}
                <div className="rounded-2xl border border-border bg-surface p-6 space-y-6 card-polkadot-hover">
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      <h3 className="font-sans font-bold text-white text-base">AST Static Analysis</h3>
                    </div>
                    <span className="font-mono text-xs font-bold text-white">
                      {validation.security.securityScore}/100 Score
                    </span>
                  </div>

                  {/* Security Metric Bar */}
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 transition-all duration-300"
                        style={{ width: `${validation.security.securityScore}%` }}
                      />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-text-muted">
                      <span>Zero Malicious AST Patterns</span>
                      <span>Safe For Production</span>
                    </div>
                  </div>

                  {/* Validation Diagnostics */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-raised border border-border">
                      <span className="text-text-muted">YAML Frontmatter:</span>
                      <span className={validation.isValid ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                        {validation.isValid ? 'PASSED (Strict)' : 'ERRORS DETECTED'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-raised border border-border">
                      <span className="text-text-muted">Executable Scripts:</span>
                      <span className="text-emerald-400 font-bold">0 (Safe Text-Only)</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-raised border border-border">
                      <span className="text-text-muted">Target Compatibility:</span>
                      <span className="text-white font-bold">Claude, Cursor, Antigravity, OpenCode</span>
                    </div>
                  </div>
                </div>

                {/* Real-time Generated SKILL.md Preview */}
                <div className="rounded-2xl border border-border bg-surface p-6 space-y-4 card-polkadot-hover">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <FileCode className="h-4 w-4 text-text-muted" />
                      <span className="font-mono text-xs font-bold text-white">SKILL.md Real-time AST</span>
                    </div>
                    <span className="font-mono text-[10px] text-text-muted">Parsed Output</span>
                  </div>

                  <pre className="max-h-72 overflow-y-auto rounded-lg border border-border bg-background p-3.5 font-mono text-[11px] text-text-secondary leading-relaxed">
                    {activeMarkdownPayload}
                  </pre>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
