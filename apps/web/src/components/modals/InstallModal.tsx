'use client';

import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Download, Terminal, FolderTree, ArrowRight, ExternalLink } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { AGENT_TARGET_LIST, getAdapter, generateInstallCommand, generateMultiLineInstallCommand } from '@domoskills/adapters';
import { AgentTarget } from '@domoskills/validators';
import { recordDownload } from '@/lib/firestoreMetrics';

export function InstallModal() {
  const {
    skills,
    targetAgent,
    isInstallModalOpen,
    setInstallModalOpen,
    setTargetAgent,
  } = useCartStore();

  const [activeTab, setActiveTab] = useState<'cli' | 'config' | 'manual'>('cli');
  const [copied, setCopied] = useState(false);

  if (!isInstallModalOpen) return null;

  const adapter = getAdapter(targetAgent);
  const skillSlugs = skills.map((s) => s.slug);
  const singleLineCommand = generateInstallCommand(skillSlugs, targetAgent);
  const multiLineCommand = generateMultiLineInstallCommand(skillSlugs, targetAgent);

  const configJsonString = JSON.stringify(
    {
      version: 1,
      agent: targetAgent,
      skills: skills.map((s) => ({
        name: s.slug,
        category: s.category,
        version: '1.0.0',
      })),
      lastUpdated: new Date().toISOString(),
    },
    null,
    2
  );
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    recordDownload(undefined, Math.max(1, skills.length));
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    recordDownload(undefined, Math.max(1, skills.length));
    const blob = new Blob([configJsonString], { type: 'application/json' });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-lg border border-border bg-surface-raised shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-white text-black font-mono text-xs font-bold">
              &gt;_
            </div>
            <div>
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                Ready to Install Capability Stack
              </h2>
              <p className="font-sans text-xs text-text-muted">
                {skills.length} skill{skills.length === 1 ? '' : 's'} configured for installation.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setInstallModalOpen(false)}
            className="rounded border border-border p-1.5 text-text-secondary hover:border-white hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Agent Target Picker */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-text-muted mb-2">
              Select AI Agent Target Ecosystem
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {AGENT_TARGET_LIST.map((target) => {
                const a = getAdapter(target);
                const isSelected = targetAgent === target;
                return (
                  <button
                    key={target}
                    type="button"
                    onClick={() => setTargetAgent(target)}
                    className={`rounded border p-2.5 text-left font-mono text-xs transition ${
                      isSelected
                        ? 'border-white bg-white text-black font-bold shadow-sm'
                        : 'border-border bg-surface text-text-secondary hover:border-border-bright hover:text-white'
                    }`}
                  >
                    <div className="truncate">{a.shortName}</div>
                    <div className={`text-[10px] truncate ${isSelected ? 'text-black/70' : 'text-text-muted'}`}>
                      {a.defaultPath}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Installation Method Tabs */}
          <div>
            <div className="flex border-b border-border mb-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('cli')}
                className={`px-4 py-2 border-b-2 font-medium transition ${
                  activeTab === 'cli'
                    ? 'border-white text-white font-bold'
                    : 'border-transparent text-text-muted hover:text-white'
                }`}
              >
                1. CLI Installer (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('config')}
                className={`px-4 py-2 border-b-2 font-medium transition ${
                  activeTab === 'config'
                    ? 'border-white text-white font-bold'
                    : 'border-transparent text-text-muted hover:text-white'
                }`}
              >
                2. domoskills.json Manifest
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('manual')}
                className={`px-4 py-2 border-b-2 font-medium transition ${
                  activeTab === 'manual'
                    ? 'border-white text-white font-bold'
                    : 'border-transparent text-text-muted hover:text-white'
                }`}
              >
                3. Direct Directory Tree
              </button>
            </div>

            {/* TAB 1: CLI */}
            {activeTab === 'cli' && (
              <div className="space-y-4">
                <div className="relative rounded border border-border bg-black p-4 font-mono text-xs text-text-secondary">
                  <div className="flex items-center justify-between text-text-muted text-[11px] mb-2">
                    <span>Terminal Command</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(singleLineCommand)}
                      className="flex items-center gap-1 text-white hover:underline"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied to clipboard' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-white font-semibold whitespace-pre-wrap break-all leading-relaxed">
                    {singleLineCommand}
                  </pre>
                </div>

                <div className="rounded border border-border bg-surface p-4 text-xs font-sans text-text-secondary space-y-2">
                  <div className="font-mono text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Security & Sandboxing Guarantee
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-text-muted text-[11px]">
                    <li>Safe download of approved Markdown and reference assets only.</li>
                    <li>Guaranteed zero automatic execution of arbitrary shell scripts.</li>
                    <li>Files are isolated strictly within <code className="text-white">{adapter.defaultPath}/</code> without path traversal.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: domoskills.json */}
            {activeTab === 'config' && (
              <div className="space-y-3">
                <div className="relative rounded border border-border bg-black p-4 font-mono text-xs text-text-secondary">
                  <div className="flex items-center justify-between text-text-muted text-[11px] mb-2">
                    <span>domoskills.json</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(configJsonString)}
                      className="flex items-center gap-1 text-white hover:underline"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-white max-h-48 overflow-y-auto leading-relaxed text-[11px]">
                    {configJsonString}
                  </pre>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadJson}
                  className="flex items-center gap-2 rounded border border-border bg-surface px-4 py-2 font-mono text-xs font-bold text-white hover:border-white transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download domoskills.json</span>
                </button>
              </div>
            )}

            {/* TAB 3: Direct Tree */}
            {activeTab === 'manual' && (
              <div className="rounded border border-border bg-black p-4 font-mono text-xs text-text-muted space-y-2">
                <div className="text-white font-bold">{adapter.defaultPath}/</div>
                {skills.map((s, idx) => (
                  <div key={s.slug} className="pl-4">
                    <span className="text-text-secondary">
                      {idx === skills.length - 1 ? '└──' : '├──'} {s.slug}/
                    </span>
                    <div className="pl-6 text-text-muted">
                      ├── SKILL.md
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Steps Guide */}
          <div className="rounded border border-border bg-surface p-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-3">
              How Your Agent Uses These Skills
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-sans text-xs text-text-secondary">
              <div className="border border-border-subtle bg-surface-raised p-3 rounded">
                <div className="font-mono text-[11px] font-bold text-white mb-1">01. Install</div>
                <p className="text-text-muted text-[11px]">Run the generated CLI command in your project root.</p>
              </div>
              <div className="border border-border-subtle bg-surface-raised p-3 rounded">
                <div className="font-mono text-[11px] font-bold text-white mb-1">02. Auto-Discovery</div>
                <p className="text-text-muted text-[11px]">Your AI coding agent automatically indexes <code className="text-white">SKILL.md</code> files.</p>
              </div>
              <div className="border border-border-subtle bg-surface-raised p-3 rounded">
                <div className="font-mono text-[11px] font-bold text-white mb-1">03. Execute</div>
                <p className="text-text-muted text-[11px]">Prompt your agent: &quot;Refactor this component following the installed guidelines.&quot;</p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-border bg-surface px-6 py-4 font-mono text-xs">
          <button
            type="button"
            onClick={() => setInstallModalOpen(false)}
            className="text-text-secondary hover:text-white transition"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => handleCopy(singleLineCommand)}
            className="flex items-center gap-2 rounded border border-white bg-white px-4 py-2 font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-sm"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Command Copied!' : 'Copy Install Command'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
