'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Trash2, Copy, Check, Terminal, Download, ArrowRight, Layers, FileCode, CheckCircle2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { AGENT_TARGET_LIST, getAdapter, generateInstallCommand } from '@domoskills/adapters';
import { AgentTarget } from '@domoskills/validators';
import { recordDownload } from '@/lib/firestoreMetrics';

export function SkillCartDrawer() {
  const {
    skills,
    targetAgent,
    isDrawerOpen,
    setDrawerOpen,
    removeSkill,
    clearCart,
    setTargetAgent,
    setInstallModalOpen,
  } = useCartStore();

  const [copied, setCopied] = useState(false);
  const [showFileTree, setShowFileTree] = useState(true);

  if (!isDrawerOpen) return null;

  const adapter = getAdapter(targetAgent);
  const skillSlugs = skills.map((s) => s.slug);
  const installCmd = generateInstallCommand(skillSlugs, targetAgent);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    recordDownload(undefined, Math.max(1, skills.length));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadConfig = () => {
    recordDownload(undefined, Math.max(1, skills.length));
    const configPayload = {
      version: 1,
      agent: targetAgent,
      skills: skills.map((s) => ({
        name: s.slug,
        category: s.category,
        version: '1.0.0',
      })),
      generatedBy: 'DomoSkills Registry',
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(configPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'domoskills.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-border bg-surface-raised shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="border-b border-border bg-surface px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-white text-black font-mono text-xs font-bold">
                  {skills.length}
                </div>
                <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Your Skill Stack
                </h2>
              </div>

              <div className="flex items-center gap-2">
                {skills.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="rounded p-1 text-text-muted hover:text-red-400 transition"
                    title="Clear stack"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded border border-border p-1 text-text-secondary hover:border-white hover:text-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-1 text-xs text-text-muted font-sans">
              {skills.length === 0
                ? 'Your capability stack is empty. Add skills to generate an install bundle.'
                : `${skills.length} skill${skills.length === 1 ? '' : 's'} staged for installation.`}
            </p>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            
            {/* Target Agent Selector */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
                Target AI Agent Standard
              </label>
              <select
                value={targetAgent}
                onChange={(e) => setTargetAgent(e.target.value as AgentTarget)}
                className="w-full rounded border border-border bg-surface px-3 py-2 font-mono text-xs text-white focus:border-white focus:outline-none"
              >
                {AGENT_TARGET_LIST.map((agentId) => {
                  const a = getAdapter(agentId);
                  return (
                    <option key={agentId} value={agentId} className="bg-surface text-white">
                      {a.name} ({a.defaultPath})
                    </option>
                  );
                })}
              </select>
              <div className="mt-1 font-mono text-[10px] text-text-muted">
                Installs to: <code className="text-white">{adapter.defaultPath}</code>
              </div>
            </div>

            {/* Staged Skills List */}
            <div>
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
                <span>Staged Capabilities ({skills.length})</span>
              </div>

              {skills.length === 0 ? (
                <div className="card-polkadot-hover rounded-xl border border-dashed border-border p-6 text-center font-mono text-xs text-text-muted space-y-3">
                  <div className="mx-auto flex justify-center">
                    <img
                      src="/assets/domodomo/domolaptop.gif"
                      alt="Domo Mascot Laptop"
                      className="h-28 w-28 object-contain"
                    />
                  </div>
                  <div className="font-sans text-xs text-white font-bold">
                    Your skill stack is empty!
                  </div>
                  <p className="text-text-muted text-[11px]">
                    Browse the registry and add capabilities to build your agent bundle.
                  </p>
                  <Link
                    href="/explore"
                    onClick={() => setDrawerOpen(false)}
                    className="inline-flex items-center gap-1.5 rounded border border-white/20 bg-surface-raised px-3 py-1.5 text-white hover:border-white transition"
                  >
                    <span>Browse Skills Catalog</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {skills.map((s) => (
                    <div
                      key={s.slug}
                      className="flex items-center justify-between rounded border border-border bg-surface p-3 transition hover:border-border-bright"
                    >
                      <div>
                        <div className="font-sans text-xs font-bold text-white">
                          {s.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1 font-mono text-[10px] text-text-muted">
                          <span>{s.category}</span>
                          <span>•</span>
                          <span>{s.license}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeSkill(s.slug)}
                        className="rounded p-1 text-text-muted hover:text-red-400 transition"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Generated CLI Command */}
            {skills.length > 0 && (
              <div>
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
                  <span>Generated Install Command</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] text-white hover:underline"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="rounded border border-border bg-surface p-3 font-mono text-xs text-text-secondary overflow-x-auto">
                  <div className="text-emerald-400 font-bold mb-1">$</div>
                  <pre className="text-white whitespace-pre-wrap break-all">{installCmd}</pre>
                </div>
              </div>
            )}

            {/* File Tree Preview */}
            {skills.length > 0 && (
              <div>
                <button
                  type="button"
                  onClick={() => setShowFileTree(!showFileTree)}
                  className="flex items-center justify-between w-full font-mono text-xs uppercase tracking-wider text-text-muted mb-2 hover:text-white"
                >
                  <span>Project File Tree Structure</span>
                  <span className="text-[10px]">{showFileTree ? '▲ Hide' : '▼ Show'}</span>
                </button>

                {showFileTree && (
                  <div className="rounded border border-border bg-surface p-3 font-mono text-[11px] text-text-muted overflow-x-auto">
                    <div className="text-white font-bold">{adapter.defaultPath}/</div>
                    {skills.map((s, idx) => (
                      <div key={s.slug} className="pl-3">
                        <span className="text-text-secondary">
                          {idx === skills.length - 1 ? '└──' : '├──'} {s.slug}/
                        </span>
                        <div className="pl-6 text-text-muted">
                          └── SKILL.md
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Drawer Footer Actions */}
          {skills.length > 0 && (
            <div className="border-t border-border bg-surface p-6 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  setInstallModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded border border-white bg-white py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <span>Install Stack ({skills.length})</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleDownloadConfig}
                className="w-full flex items-center justify-center gap-1.5 rounded border border-border bg-surface-raised py-2 font-mono text-xs font-semibold text-text-secondary hover:border-white hover:text-white transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export domoskills.json</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
