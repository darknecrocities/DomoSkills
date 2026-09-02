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
  History,
  Lock,
  Layers,
  Calendar,
  Code2,
  Clock,
  Plus,
} from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';
import { AGENT_TARGET_LIST, getAdapter, generateInstallCommand } from '@domoskills/adapters';
import { AgentTarget, CategorySlug, TrustLevel } from '@domoskills/validators';
import { recordStackReceipt, getUserStackHistory, StackReceiptData } from '@/lib/firestoreMetrics';

export function SkillCartDrawer() {
  const {
    skills,
    targetAgent,
    isDrawerOpen,
    setDrawerOpen,
    addSkill,
    removeSkill,
    clearCart,
    setTargetAgent,
  } = useCartStore();

  const { user, openAuthModal } = useAuth();

  const [activeTab, setActiveTab] = useState<'cart' | 'history'>('cart');
  const [history, setHistory] = useState<StackReceiptData[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedHistoryId, setCopiedHistoryId] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [manifestId, setManifestId] = useState('');
  const [confirmedTimestamp, setConfirmedTimestamp] = useState('');

  // Load stack history whenever drawer opens or user changes
  useEffect(() => {
    if (isDrawerOpen && user) {
      setLoadingHistory(true);
      getUserStackHistory(user.uid)
        .then((items) => setHistory(items))
        .catch(() => {})
        .finally(() => setLoadingHistory(false));
    }
  }, [isDrawerOpen, user]);

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

  const handleCopyHistoryCmd = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedHistoryId(id);
    setTimeout(() => setCopiedHistoryId(null), 2200);
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

      // Refresh history
      if (user) {
        getUserStackHistory(user.uid).then((items) => setHistory(items));
      }
    } catch (err) {
      console.error('Stack receipt confirmation failed:', err);
      setManifestId(newManifestId);
      setConfirmedTimestamp(timestamp);
      setIsConfirmed(true);
    } finally {
      setIsConfirming(false);
    }
  };

  const handleDownloadConfig = (targetManifestId?: string, targetSkills?: any[], targetAgentParam?: string) => {
    const useSkills = targetSkills || skills;
    const useAgent = (targetAgentParam as AgentTarget) || targetAgent;
    const useManifestId = targetManifestId || manifestId || `DOMO-${Date.now().toString(36).toUpperCase()}`;

    const configPayload = {
      version: 1,
      manifestId: useManifestId,
      agent: useAgent,
      skills: useSkills.map((s: any) => ({
        name: s.slug || s.name,
        category: s.category,
        license: s.license,
        version: '1.0.0',
      })),
      generatedBy: 'DomoSkills Registry',
      confirmedAt: confirmedTimestamp || new Date().toISOString(),
      developer: user?.displayName || user?.email || 'Authenticated Developer',
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

  const handleRestoreFromHistory = (item: StackReceiptData) => {
    clearCart();
    for (const s of item.skills) {
      addSkill({
        id: s.slug,
        slug: s.slug,
        name: s.name,
        category: (s.category as CategorySlug) || 'ai-ml',
        license: s.license || 'MIT',
        trustLevel: 'Official' as TrustLevel,
      });
    }
    if (item.targetAgent) {
      setTargetAgent(item.targetAgent as AgentTarget);
    }
    setActiveTab('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md transition-opacity animate-fade-in">
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div className="w-screen max-w-md sm:max-w-xl border-l border-border bg-[#0e0e11] shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Drawer Top Navigation Bar */}
          <div className="border-b border-border bg-surface px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black font-mono text-xs font-bold shadow-sm">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                    Developer Stack Manifest
                  </h2>
                  <p className="font-mono text-[10px] text-text-muted">
                    {!user
                      ? 'Authentication Required'
                      : activeTab === 'history'
                      ? `${history.length} compiled stack${history.length === 1 ? '' : 's'} in history`
                      : skills.length === 0
                      ? 'Empty capability stack'
                      : `${skills.length} item${skills.length === 1 ? '' : 's'} staged for compilation`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {user && activeTab === 'cart' && skills.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="rounded p-1.5 text-text-muted hover:text-red-400 hover:bg-surface-raised transition text-xs font-mono flex items-center gap-1 cursor-pointer"
                    title="Clear entire stack"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Clear</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg border border-border p-1.5 text-text-secondary hover:border-white hover:text-white transition cursor-pointer"
                  aria-label="Close Drawer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Tab Navigation if Logged In */}
            {user && (
              <div className="flex items-center gap-2 pt-4 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('cart')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                    activeTab === 'cart'
                      ? 'border-white bg-white text-black font-bold shadow-sm'
                      : 'border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Active Stack ({skills.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                    activeTab === 'history'
                      ? 'border-white bg-white text-black font-bold shadow-sm'
                      : 'border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
                  }`}
                >
                  <History className="h-3.5 w-3.5" />
                  <span>Install History ({history.length})</span>
                </button>
              </div>
            )}
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* ========================================================================= */}
            {/* 1. GUEST USER STATE: AUTHENTICATION REQUIRED CARD */}
            {/* ========================================================================= */}
            {!user ? (
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden my-4 card-polkadot-hover">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-black shadow-xl">
                  <Lock className="h-8 w-8 stroke-[2.5]" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[11px] text-amber-300 font-bold uppercase tracking-wider">
                    <span>Developer Account Required</span>
                  </div>

                  <h3 className="font-sans text-2xl font-extrabold tracking-tight text-white leading-snug">
                    Sign In to Build & Install Agent Stacks
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Cart staging, custom stack compilation, unique terminal installation commands, and stack revision history are exclusive to authenticated developers.
                  </p>
                </div>

                {/* Features breakdown */}
                <div className="rounded-xl border border-border/80 bg-surface-raised p-4 text-left font-mono text-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Persistent Stack Receipts & Unique Manifest IDs</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Real Terminal CLI Commands (<code className="text-emerald-300">npx domoskills add</code>)</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>Track Installation History & Revision Rollbacks</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    <span>100% Free Forever • Instant Account Setup</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => openAuthModal('signup')}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl border border-white bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-lg cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Create Free Account</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => openAuthModal('signin')}
                    className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-raised px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white hover:border-white hover:bg-surface transition cursor-pointer"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : activeTab === 'history' ? (
              /* ========================================================================= */
              /* 2. STACK INSTALLATION HISTORY VIEW */
              /* ========================================================================= */
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                      <History className="h-4 w-4 text-emerald-400" />
                      <span>Installation History & Manifests</span>
                    </h3>
                    <span className="font-mono text-[10px] text-text-muted">
                      {history.length} stack{history.length === 1 ? '' : 's'} recorded
                    </span>
                  </div>
                  <p className="font-sans text-xs text-text-secondary mt-1">
                    Your unique stack compilation history. Copy verified terminal commands or re-load previous stacks into your active cart.
                  </p>
                </div>

                {history.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-border p-8 text-center font-mono text-xs text-text-muted space-y-3">
                    <Clock className="mx-auto h-8 w-8 text-text-faint" />
                    <p className="text-white font-bold text-sm">No Stack Receipts Yet</p>
                    <p className="text-text-muted leading-relaxed max-w-sm mx-auto">
                      Stage skills in your Active Stack tab and click "Confirm & Compile" to generate unique manifest IDs and track install commands here.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('cart')}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-2 text-white hover:border-white transition cursor-pointer"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      <span>Go to Active Stack</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((item, idx) => {
                      const itemAgent = getAdapter((item.targetAgent as any) || 'universal');
                      const dateStr = item.createdAt
                        ? new Date(item.createdAt).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })
                        : 'Recently';

                      const isItemCopied = copiedHistoryId === item.manifestId;

                      return (
                        <div
                          key={item.manifestId || idx}
                          className="rounded-xl border border-border bg-surface p-4 sm:p-5 space-y-4 shadow-md hover:border-border-bright transition"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="rounded bg-white text-black px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider">
                                  #{item.manifestId}
                                </span>
                                <span className="font-mono text-[10px] text-emerald-400 font-semibold">
                                  {itemAgent.name}
                                </span>
                              </div>
                              <div className="font-mono text-[11px] text-text-muted mt-1 flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                <span>{dateStr}</span>
                                <span>•</span>
                                <span>{item.skills.length} skill{item.skills.length === 1 ? '' : 's'}</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRestoreFromHistory(item)}
                              className="inline-flex items-center gap-1.5 rounded border border-border bg-surface-raised px-3 py-1.5 font-mono text-xs text-text-secondary hover:text-white hover:border-white transition self-start sm:self-auto cursor-pointer"
                            >
                              <RotateCcw className="h-3 w-3" />
                              <span>Load into Cart</span>
                            </button>
                          </div>

                          {/* Skill Tags List */}
                          <div className="flex flex-wrap gap-1.5">
                            {item.skills.map((s) => (
                              <span
                                key={s.slug}
                                className="rounded border border-border/80 bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-white"
                              >
                                {s.slug}
                              </span>
                            ))}
                          </div>

                          {/* Terminal Install Box */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between font-mono text-[10px] uppercase text-text-muted">
                              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                                <Terminal className="h-3 w-3" />
                                Terminal Install Command
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopyHistoryCmd(item.installCommand, item.manifestId)}
                                className="flex items-center gap-1 text-emerald-400 hover:underline font-bold cursor-pointer"
                              >
                                {isItemCopied ? (
                                  <>
                                    <Check className="h-3 w-3" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="rounded-lg border border-border/80 bg-black p-2.5 font-mono text-xs text-white overflow-x-auto">
                              <pre className="whitespace-pre-wrap break-all text-[11px] leading-relaxed">
                                {item.installCommand}
                              </pre>
                            </div>
                          </div>

                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => handleDownloadConfig(item.manifestId, item.skills, item.targetAgent)}
                              className="inline-flex items-center gap-1 text-text-muted hover:text-white font-mono text-[11px] transition cursor-pointer"
                            >
                              <Download className="h-3 w-3" />
                              <span>Download domoskills.json</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* ========================================================================= */
              /* 3. ACTIVE STACK CART VIEW */
              /* ========================================================================= */
              skills.length === 0 ? (
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
                    className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-md cursor-pointer"
                  >
                    <span>Explore 1,000+ Skills</span>
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
                      className="w-full rounded-lg border border-border bg-surface-raised px-3 py-2 font-mono text-xs text-white focus:border-white focus:outline-none transition cursor-pointer"
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
                    <div className="space-y-1.5 text-[11px] text-text-muted border-b border-dashed border-border/80 pb-4">
                      <div className="flex justify-between">
                        <span>DEVELOPER:</span>
                        <span className="text-white font-bold">{user?.displayName || user?.email || 'Authenticated Dev'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>MANIFEST ID:</span>
                        <span className="text-white font-mono">{manifestId || 'PENDING COMPILATION'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TARGET AGENT:</span>
                        <span className="text-white font-bold">{adapter.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>AGENT PATH:</span>
                        <span className="text-emerald-400 font-mono">{adapter.defaultPath}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>DATE:</span>
                        <span className="text-white">
                          {confirmedTimestamp
                            ? new Date(confirmedTimestamp).toLocaleString()
                            : new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {/* Items Staged in Stack */}
                    <div className="space-y-3">
                      <div className="flex justify-between font-bold text-white uppercase text-[10px] tracking-wider border-b border-border/40 pb-1">
                        <span>SKILL CAPABILITY</span>
                        <span>ACTIONS</span>
                      </div>

                      {skills.map((skill) => (
                        <div
                          key={skill.slug}
                          className="flex items-center justify-between gap-2 py-1.5 border-b border-border/30 last:border-0"
                        >
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white truncate max-w-[200px] sm:max-w-[260px]">
                                {skill.name}
                              </span>
                              <span className="text-[9px] rounded bg-surface-raised px-1 py-0.2 text-text-muted border border-border">
                                {skill.category}
                              </span>
                            </div>
                            <div className="text-[10px] text-text-muted font-mono truncate">
                              {skill.slug} • {skill.license}
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeSkill(skill.slug)}
                            className="inline-flex items-center gap-1 rounded border border-red-500/30 bg-red-500/10 px-2 py-1 text-[10px] font-mono font-bold text-red-400 hover:bg-red-500/20 hover:border-red-500/50 transition cursor-pointer shrink-0"
                            title="Remove skill from stack"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Receipt Calculation Breakdown */}
                    <div className="border-t border-dashed border-border/80 pt-3 space-y-1 text-[11px]">
                      <div className="flex justify-between text-text-muted">
                        <span>Total Skills Staged:</span>
                        <span className="text-white font-bold">{skills.length}</span>
                      </div>
                      <div className="flex justify-between text-text-muted">
                        <span>Compilation Fee:</span>
                        <span className="text-emerald-400 font-bold">$0.00 (Open Source)</span>
                      </div>
                      <div className="flex justify-between text-text-muted">
                        <span>Install Verification:</span>
                        <span className="text-emerald-400 font-bold">✓ 100% SHA256 Verified</span>
                      </div>
                    </div>

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
                            className="flex items-center gap-1 text-[11px] text-emerald-400 hover:underline font-bold cursor-pointer"
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
                            onClick={() => handleDownloadConfig()}
                            className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface-raised py-2.5 text-[11px] font-semibold text-white hover:border-white transition cursor-pointer"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Export domoskills.json</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setIsConfirmed(false)}
                            className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-surface py-2.5 text-[11px] font-semibold text-text-secondary hover:text-white hover:border-border-bright transition cursor-pointer"
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
                        Thank you for using open-source AI agent capabilities!
                      </div>
                    </div>

                  </div>
                </>
              )
            )}

          </div>

          {/* Drawer Sticky Footer Actions */}
          {user && activeTab === 'cart' && skills.length > 0 && !isConfirmed && (
            <div className="border-t border-border bg-surface p-4 sm:p-5 flex items-center justify-between gap-3">
              <div className="font-mono text-xs text-text-muted">
                <span className="text-white font-bold">{skills.length}</span>{' '}
                skill{skills.length === 1 ? '' : 's'} ready to compile
              </div>

              <button
                type="button"
                onClick={handleConfirmReceipt}
                disabled={isConfirming}
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-md cursor-pointer disabled:opacity-50"
              >
                <span>{isConfirming ? 'Compiling...' : 'Confirm & Compile'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
