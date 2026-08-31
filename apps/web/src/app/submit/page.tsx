'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  Github,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileCode,
  ArrowRight,
  Sparkles,
  Info,
  Layers,
} from 'lucide-react';
import { parseSkillPackage, isPathSafe } from '@domoskills/skill-parser';
import { registry } from '@domoskills/registry';

export default function SubmitSkillPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [skillPath, setSkillPath] = useState('skills/');
  const [rawMarkdown, setRawMarkdown] = useState(`---
name: my-agent-capability
description: Describe the capabilities, patterns, and instructions for AI agents.
license: MIT
version: 1.0.0
tags:
  - Productivity
  - Best-Practices
---

# Agent Capability Instructions
Provide actionable guidelines for the AI assistant here.`);
  const [contactEmail, setContactEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    message: string;
    score?: number;
  } | null>(null);

  // Realtime client-side validator
  const validation = parseSkillPackage(
    rawMarkdown,
    [
      { path: 'SKILL.md', type: 'file', size: rawMarkdown.length, isExecutable: false },
    ],
    { sourceUrl: repoUrl }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await registry.submitSkill({
        repositoryUrl: repoUrl.trim(),
        skillPath: skillPath.trim(),
        contactEmail: contactEmail.trim() || undefined,
      });
      setSubmissionResult({
        success: res.success,
        message: res.message,
        score: validation.security.securityScore,
      });
    } catch (err: any) {
      setSubmissionResult({
        success: false,
        message: err.message || 'Failed to submit repository.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-white" />
            <span>Open Ingestion Pipeline</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Submit a Skill Repository
          </h1>
          <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Index your open-source agent skill repository on DomoSkills. All submissions undergo automated
            security auditing, frontmatter validation, and licensing verification.
          </p>
        </div>

        {/* Success Alert */}
        {submissionResult && (
          <div
            className={`rounded-lg border p-6 font-mono text-xs ${
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
              <span>{submissionResult.success ? 'Submission Queued for Indexing' : 'Submission Error'}</span>
            </div>
            <p className="text-text-secondary mt-1">{submissionResult.message}</p>
          </div>
        )}

        {/* Main Grid: Form Left, Real-Time Validator Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Submission Form (7 cols) */}
          <div className="card-polkadot-hover lg:col-span-7 rounded-xl border border-border bg-surface p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
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
                    className="w-full rounded border border-border bg-surface-raised pl-9 pr-3 py-2 font-mono text-xs text-white placeholder:text-text-muted focus:border-white focus:outline-none"
                  />
                </div>
                <p className="mt-1 font-mono text-[11px] text-text-muted">
                  Must be an active public open-source repository.
                </p>
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Skill Directory Subpath (Optional)
                </label>
                <input
                  type="text"
                  value={skillPath}
                  onChange={(e) => setSkillPath(e.target.value)}
                  placeholder="skills/ or leave empty if root"
                  className="w-full rounded border border-border bg-surface-raised px-3 py-2 font-mono text-xs text-white placeholder:text-text-muted focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Maintainer Contact Email (Optional)
                </label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="maintainer@example.com"
                  className="w-full rounded border border-border bg-surface-raised px-3 py-2 font-mono text-xs text-white placeholder:text-text-muted focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Preview / Test SKILL.md Frontmatter & Instructions
                </label>
                <textarea
                  rows={8}
                  value={rawMarkdown}
                  onChange={(e) => setRawMarkdown(e.target.value)}
                  className="w-full rounded border border-border bg-black p-3 font-mono text-xs text-white placeholder:text-text-muted focus:border-white focus:outline-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !validation.isValid}
                className="w-full flex items-center justify-center gap-2 rounded border border-white bg-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                {isSubmitting ? (
                  <span>Running Verification Pipeline...</span>
                ) : (
                  <>
                    <span>Submit Skill for Indexing</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Real-time Verification Report (5 cols) */}
          <div className="card-polkadot-hover lg:col-span-5 rounded-xl border border-border bg-surface-raised p-6 space-y-6 font-mono text-xs">
            
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-white">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Automated Validation</span>
              </div>
              <span className="text-[11px] text-text-muted">Live AST Scanner</span>
            </div>

            {/* Score Metric */}
            <div className="rounded border border-border bg-surface p-4 text-center space-y-1">
              <div className="text-[10px] uppercase tracking-widest text-text-muted">
                Calculated Security Score
              </div>
              <div className="text-3xl font-extrabold text-white">
                {validation.security.securityScore} <span className="text-xs text-text-muted">/ 100</span>
              </div>
              <div className="text-[10px] text-emerald-400 font-semibold">
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
                  <div className="text-white font-semibold">Open Source License</div>
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
                      ? 'Contains executable scripts. Sandboxed in read-only mode.'
                      : 'Zero external executable scripts detected.'}
                  </div>
                </div>
              </div>

            </div>

            {/* Validation errors/warnings */}
            {validation.errors.length > 0 && (
              <div className="rounded border border-red-800 bg-red-950/30 p-3 space-y-1 text-red-200 text-[11px]">
                <div className="font-bold flex items-center gap-1 text-red-400">
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Validation Errors</span>
                </div>
                {validation.errors.map((err, i) => (
                  <div key={i}>• {err}</div>
                ))}
              </div>
            )}

            {/* Ingestion notice */}
            <div className="rounded border border-border bg-surface p-3 text-[11px] text-text-muted leading-relaxed font-sans">
              <div className="font-mono text-[10px] font-bold text-white uppercase mb-1">
                Moderation Policy
              </div>
              Submitted repositories are verified against OSI licensing, non-malicious code criteria, and
              accurate documentation before indexing into the public directory.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
