'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  X,
  Trash2,
  Copy,
  Check,
  Terminal,
  Download,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Receipt,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';
import { AGENT_TARGET_LIST, getAdapter, generateInstallCommand } from '@domoskills/adapters';
import { AgentTarget } from '@domoskills/validators';
import { recordStackReceipt } from '@/lib/firestoreMetrics';

export function SkillCartDrawer() {
  const {
    skills,
    targetAgent,
    isDrawerOpen,
    setDrawerOpen,
    removeSkill,
    clearCart,
    setTargetAgent,
  } = useCartStore();

  const { user } = useAuth();

  const [copied, setCopied] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [manifestId, setManifestId] = useState('');
  const [confirmedTimestamp, setConfirmedTimestamp] = useState('');

  // Reset confirmation state if skills empty
  useEffect(() => {
    if (skills.length === 0) {
      setIsConfirmed(false);
      setManifestId('');
    }
  }, [skills.length]);

  if (!isDrawerOpen) return null;

  const adapter = getAdapter(targetAgent);
  const skillSlugs = skills.map((s) => s.slug);
  const installCmd = generateInstallCommand(skillSlugs, targetAgent);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleConfirmReceipt = async () => {
    if (skills.length === 0) return;

    setIsConfirming(true);
    const newManifestId = `DOMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const timestamp = new Date().toISOString();

    try {
      await recordStackReceipt({
        manifestId: newManifestId,
        userId: user?.uid || null,
        userEmail: user?.email || null,
        targetAgent,
        skills: skills.map((s) => ({
          slug: s.slug,
          name: s.name,
          category: s.category,
          license: s.license,
        })),
        totalSkills: skills.length,
        installCommand: installCmd,
      });

      setManifestId(newManifestId);
      setConfirmedTimestamp(timestamp);
      setIsConfirmed(true);
    } catch (err) {
      console.error('Stack receipt confirmation failed:', err);
      // Still allow UI confirmation with local manifest
      setManifestId(newManifestId);
      setConfirmedTimestamp(timestamp);
      setIsConfirmed(true);
    } finally {
      setIsConfirming(false);
    }
  };

  const handleDownloadConfig = () => {
    const configPayload = {
      version: 1,
      manifestId: manifestId || `DOMO-${Date.now().toString(36).toUpperCase()}`,
      agent: targetAgent,
      skills: skills.map((s) => ({
        name: s.slug,
        category: s.category,
        license: s.license,
        version: '1.0.0',
      })),
      generatedBy: 'DomoSkills Registry',
      confirmedAt: confirmedTimestamp || new Date().toISOString(),
      developer: user?.displayName || user?.email || 'Guest Developer',
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md transition-opacity animate-fade-in">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-xl border-l border-border bg-[#0e0e11] shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Drawer Top Navigation Bar */}
          <div className="border-b border-border bg-surface px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black font-mono text-xs font-bold shadow-sm">
                <Receipt className="h-4 w-4" />
              </div>
              <div>
                <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  Developer Stack Manifest
                </h2>
                <p className="font-mono text-[10px] text-text-muted">
                  {skills.length === 0
                    ? 'Empty capability cart'
                    : `${skills.length} item${skills.length === 1 ? '' : 's'} staged for compilation`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {skills.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded p-1.5 text-text-muted hover:text-red-400 hover:bg-surface-raised transition text-xs font-mono flex items-center gap-1"
                  title="Clear entire cart"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Clear</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg border border-border p-1.5 text-text-secondary hover:border-white hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {skills.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center font-mono text-xs text-text-muted space-y-4 my-8 card-polkadot-hover">
                <div className="mx-auto flex justify-center">
                  <img
                    src="/assets/domodomo/domolaptop.gif"
                    alt="Domo Mascot"
                    className="h-32 w-32 object-contain"
                  />
                </div>
                <div className="font-sans text-sm text-white font-bold">
                  Your skill stack receipt is empty
                </div>
                <p className="text-text-muted text-xs max-w-xs mx-auto leading-relaxed">
                  Browse the open catalog, add skills to your stack, and generate your terminal install receipt.
                </p>
                <Link
                  href="/explore"
                  onClick={() => setDrawerOpen(false)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-md"
                >
                  <span>Explore 200+ Skills</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <>
                {/* Agent Selector Controls */}
                <div className="rounded-xl border border-border bg-surface p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                      Target AI Agent Standard
                    </label>
                    <span className="font-mono text-[10px] text-emerald-400 font-bold">
                      {adapter.name}
                    </span>
                  </div>
                  <select
                    value={targetAgent}
                    onChange={(e) => setTargetAgent(e.target.value as AgentTarget)}
                    className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 font-mono text-xs text-white focus:border-white focus:outline-none transition"
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
                  <div className="font-mono text-[10px] text-text-muted pt-1">
                    Installs destination: <code className="text-white">{adapter.defaultPath}</code>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* THE RECEIPT PAPER COMPONENT */}
                {/* ========================================================================= */}
                <div className="relative rounded-xl border border-border/80 bg-[#121217] p-5 sm:p-7 font-mono text-xs shadow-2xl space-y-5">
                  
                  {/* Receipt Header Bar */}
                  <div className="text-center space-y-1 border-b border-dashed border-border/80 pb-4">
                    <div className="text-xs font-bold tracking-widest text-white uppercase">
                      DOMOSKILLS REGISTRY
                    </div>
                    <div className="text-[10px] text-text-muted uppercase tracking-wider">
                      The Open AI Agent Capability Exchange
                    </div>
                    <div className="text-[10px] text-text-faint">
                      https://domoskills.io • v0.1.0-cli
                    </div>
                  </div>

                  {/* Receipt Metadata Breakdown */}
                  <div className="space-y-1 text-[11px] text-text-secondary border-b border-dashed border-border/80 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">RECEIPT / MANIFEST:</span>
                      <span className="text-white font-bold">{manifestId || '#PENDING-CONFIRMATION'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">DEVELOPER:</span>
                      <span className="text-white truncate max-w-[200px]">
                        {user?.displayName || user?.email || 'Anonymous Builder'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">DATE & TIME:</span>
                      <span className="text-text-muted">
                        {confirmedTimestamp ? new Date(confirmedTimestamp).toUTCString() : 'Staged (Active Session)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">TARGET ECOSYSTEM:</span>
                      <span className="text-cyan-400 font-semibold">{adapter.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">WORKSPACE PATH:</span>
                      <span className="text-white">{adapter.defaultPath}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">STATUS:</span>
                      {isConfirmed ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> CONFIRMED & REGISTERED
                        </span>
                      ) : (
                        <span className="text-amber-400 font-bold">STAGED / UNCONFIRMED</span>
                      )}
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-0 divide-y divide-border/40">
                    {skills.map((s, idx) => (
                      <div key={s.slug} className="py-3 flex items-center justify-between group">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-text-muted font-mono text-[10px] shrink-0">
                            {String(idx + 1).padStart(2, '0')}.
                          </span>
                          <div className="min-w-0">
                            <div className="font-bold text-white text-[11px] truncate">{s.name}</div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="text-[10px] text-text-muted capitalize">{s.category}</span>
                              <span className="text-text-faint text-[10px]">•</span>
                              <span className="text-[10px] text-text-muted">{s.license}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            removeSkill(s.slug);
                            if (isConfirmed) setIsConfirmed(false);
                          }}
                          className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono text-text-muted hover:text-red-400 hover:bg-red-500/10 border border-border/50 hover:border-red-500/40 transition shrink-0 ml-2 cursor-pointer"
                          title={`Remove ${s.name} from stack`}
                          aria-label={`Remove ${s.name}`}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="hidden xs:inline font-semibold">Remove</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Receipt Stamp / Confirmation Status */}
                  {isConfirmed ? (
                    <div className="rounded-xl border-2 border-dashed border-emerald-500/50 bg-emerald-950/20 p-4 text-center space-y-2 animate-scale-up">
                      <div className="inline-flex items-center gap-1.5 text-emerald-400 font-bold text-xs tracking-wider uppercase">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>MANIFEST COMPILED & CONFIRMED</span>
                      </div>
                      <p className="text-[10px] text-text-secondary font-sans leading-relaxed">
                        Linked and synchronized to Registry Cloud. Ready to execute on your local workspace terminal.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={isConfirming}
                      onClick={handleConfirmReceipt}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-white bg-white py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-[0_0_25px_rgba(255,255,255,0.18)] cursor-pointer disabled:opacity-50"
                    >
                      {isConfirming ? (
                        <span>Compiling & Synchronizing Stack...</span>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          <span>Confirm Stack & Compile Receipt</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Generated Terminal Install Box */}
                  {isConfirmed && (
                    <div className="space-y-3 pt-2 animate-fade-in">
                      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-text-muted">
                        <span className="flex items-center gap-1.5 text-white font-bold">
                          <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                          Terminal Install Command
                        </span>
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="flex items-center gap-1 text-[11px] text-emerald-400 hover:underline font-bold"
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

                      <div className="relative rounded-xl border border-border bg-black p-3.5 font-mono text-xs text-text-secondary overflow-x-auto">
                        <div className="text-emerald-400 font-bold mb-1 select-none">$</div>
                        <pre className="text-white whitespace-pre-wrap break-all leading-relaxed">
                          {installCmd}
                        </pre>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleDownloadConfig}
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface-raised py-2.5 text-[11px] font-semibold text-white hover:border-white transition"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Export domoskills.json</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsConfirmed(false)}
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface py-2.5 text-[11px] font-semibold text-text-secondary hover:text-white hover:border-border-bright transition"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Modify Stack</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Stylized Barcode Element */}
                  <div className="pt-4 border-t border-dashed border-border/80 text-center space-y-2">
                    <div className="mx-auto flex justify-center items-center gap-0.5 h-10 opacity-70">
                      {[
                        2, 1, 3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 2, 1, 3, 1, 4, 2, 1, 3, 2, 1, 4, 2,
                        3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 3, 1,
                      ].map((w, idx) => (
                        <div
                          key={idx}
                          className="bg-white h-full"
                          style={{ width: `${w * 1.5}px` }}
                        />
                      ))}
                    </div>
                    <div className="text-[9px] text-text-muted font-mono tracking-widest uppercase">
                      DOMOSKILLS-AUTH-{manifestId || 'UNCONFIRMED'}-VERIFIED
                    </div>
                    <div className="text-[10px] text-text-muted font-sans leading-tight">
                      Thank you for choosing open-source AI agent capabilities!
                    </div>
                  </div>

                </div>
              </>
            )}

          </div>

          {/* Drawer Sticky Footer Actions */}
          {skills.length > 0 && !isConfirmed && (
            <div className="border-t border-border bg-surface p-4 sm:p-5 flex items-center justify-between gap-3">
              <div className="font-mono text-xs text-text-muted">
                <span className="text-white font-bold">{skills.length}</span>{' '}
                skill{skills.length === 1 ? '' : 's'} ready to install
              </div>

              <button
                type="button"
                onClick={handleConfirmReceipt}
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-md cursor-pointer"
              >
                <span>Confirm & Compile</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
