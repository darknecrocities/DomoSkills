'use client';

import React, { useState } from 'react';
import {
  Terminal,
  X,
  Copy,
  Check,
  FolderTree,
  ShieldCheck,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Skill, AgentTarget } from '@domoskills/validators';
import { AGENT_TARGET_LIST, getAdapter } from '@domoskills/adapters';

interface CommandBuilderModalProps {
  skill: Skill | null;
  onClose: () => void;
}

export function CommandBuilderModal({ skill, onClose }: CommandBuilderModalProps) {
  const [targetAgent, setTargetAgent] = useState<AgentTarget>('universal');
  const [isGlobal, setIsGlobal] = useState(false);
  const [isForce, setIsForce] = useState(false);
  const [isDryRun, setIsDryRun] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!skill) return null;

  const adapter = getAdapter(targetAgent);

  // Build the dynamic terminal command
  const flags: string[] = [];
  if (targetAgent !== 'universal') {
    flags.push(`--agent ${targetAgent}`);
  }
  if (isGlobal) {
    flags.push('--global');
  }
  if (isForce) {
    flags.push('--force');
  }
  if (isDryRun) {
    flags.push('--dry-run');
  }

  const generatedCommand = `npx domoskills add ${skill.slug}${flags.length > 0 ? ' ' + flags.join(' ') : ''}`;

  const destinationPath = isGlobal
    ? `~/${adapter.defaultPath}/${skill.slug}/SKILL.md`
    : `./${adapter.defaultPath}/${skill.slug}/SKILL.md`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="builder-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-fade-in flex items-center justify-center font-mono text-xs"
    >
      <div className="relative w-full max-w-xl rounded-2xl border border-border bg-[#0e0e13] shadow-2xl p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-bold shadow-sm">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <h3 id="builder-title" className="font-bold text-white text-sm">
                CLI Command Builder
              </h3>
              <p className="text-[11px] text-text-muted">
                Configure installation flags for <span className="text-white font-semibold">{skill.slug}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border p-1.5 text-text-secondary hover:border-white hover:text-white transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="space-y-4">
          {/* Target Agent Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase text-text-muted">
              Target AI Agent Standard
            </label>
            <select
              value={targetAgent}
              onChange={(e) => setTargetAgent(e.target.value as AgentTarget)}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-white focus:border-white focus:outline-none transition cursor-pointer"
            >
              {AGENT_TARGET_LIST.map((id) => {
                const a = getAdapter(id);
                return (
                  <option key={id} value={id} className="bg-surface text-white">
                    {a.name} ({a.defaultPath})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Flag Checkbox Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-surface hover:border-border-bright transition cursor-pointer">
              <input
                type="checkbox"
                checked={isGlobal}
                onChange={(e) => setIsGlobal(e.target.checked)}
                className="rounded accent-white"
              />
              <div>
                <div className="font-bold text-white text-[11px]">--global</div>
                <div className="text-[10px] text-text-muted">User home dir</div>
              </div>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-surface hover:border-border-bright transition cursor-pointer">
              <input
                type="checkbox"
                checked={isForce}
                onChange={(e) => setIsForce(e.target.checked)}
                className="rounded accent-white"
              />
              <div>
                <div className="font-bold text-white text-[11px]">--force</div>
                <div className="text-[10px] text-text-muted">Overwrite files</div>
              </div>
            </label>

            <label className="flex items-center gap-2 p-2.5 rounded-lg border border-border bg-surface hover:border-border-bright transition cursor-pointer">
              <input
                type="checkbox"
                checked={isDryRun}
                onChange={(e) => setIsDryRun(e.target.checked)}
                className="rounded accent-white"
              />
              <div>
                <div className="font-bold text-white text-[11px]">--dry-run</div>
                <div className="text-[10px] text-text-muted">Simulate only</div>
              </div>
            </label>
          </div>

          {/* Predicted Destination Path */}
          <div className="rounded-xl border border-border/70 bg-surface-raised p-3 text-[11px] space-y-1">
            <span className="text-text-muted font-bold uppercase text-[10px]">Predicted Installation Path:</span>
            <div className="text-emerald-400 truncate">
              <code>{destinationPath}</code>
            </div>
          </div>

          {/* Live Command Preview Box */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-text-muted">
                Generated Terminal Command
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-emerald-400 hover:underline font-bold cursor-pointer text-[11px]"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy Command</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-xl border border-border bg-black p-3.5 text-white overflow-x-auto">
              <div className="text-emerald-400 font-bold mb-1 select-none">$</div>
              <pre className="whitespace-pre-wrap break-all text-xs leading-relaxed">
                {generatedCommand}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/70">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-border text-text-secondary hover:text-white hover:border-border-bright transition cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black font-bold uppercase tracking-wider hover:bg-muted-white transition shadow-md cursor-pointer"
          >
            <span>{copied ? 'Copied to Clipboard' : 'Copy Command'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
