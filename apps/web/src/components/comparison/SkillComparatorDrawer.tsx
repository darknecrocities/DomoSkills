'use client';

import React from 'react';
import Link from 'next/link';
import {
  Scale,
  X,
  Check,
  Plus,
  Terminal,
  Copy,
  ShieldCheck,
  Shield,
  Layers,
  ArrowRight,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { registry } from '@domoskills/registry';
import { useComparatorStore } from '@/store/useComparatorStore';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';
import { fireCartFlyAnimation } from '@/components/cart/CartFlyAnimation';
import { AGENT_TARGET_LIST, getAdapter } from '@domoskills/adapters';

export function SkillComparatorDrawer() {
  const { compareSlugs, removeFromCompare, clearCompare, isOpen, setOpen } = useComparatorStore();
  const { addSkill, hasSkill } = useCartStore();
  const { user, openAuthModal } = useAuth();

  const skills = compareSlugs
    .map((slug) => registry.getSkillBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  if (compareSlugs.length === 0) return null;

  const handleAdd = (skill: (typeof skills)[0], e: React.MouseEvent) => {
    if (!user) {
      openAuthModal('signup');
      return;
    }
    fireCartFlyAnimation(e.clientX, e.clientY, skill.name);
    addSkill({
      id: skill.id,
      slug: skill.slug,
      name: skill.name,
      category: skill.category,
      license: skill.license,
      trustLevel: skill.trustLevel,
    });
  };

  return (
    <>
      {/* Bottom Floating Compare Dock */}
      {!isOpen && (
        <aside aria-label="Skill Comparison Dock" className="fixed bottom-4 right-4 z-40 animate-slide-up">
          <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-[#0d0d12]/95 p-3 font-mono text-xs shadow-[0_12px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(255,255,255,0.08)] backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-cyan-400 shrink-0" />
              <span className="font-bold text-white hidden sm:inline">Compare Mode:</span>
              <span className="rounded bg-cyan-950/80 px-1.5 py-0.5 text-[10px] text-cyan-300 font-bold border border-cyan-800/60">
                {skills.length}/3
              </span>
            </div>

            {/* Mini pills of selected skills */}
            <div className="flex items-center gap-1.5 max-w-[200px] sm:max-w-xs overflow-x-auto scrollbar-none">
              {skills.map((s) => (
                <span
                  key={s.slug}
                  className="inline-flex items-center gap-1 rounded bg-surface-raised px-2 py-1 text-[10px] text-white border border-border"
                >
                  <span className="truncate max-w-[80px]">{s.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(s.slug)}
                    className="hover:text-red-400 transition cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-border/80">
              <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={skills.length < 2}
                className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Compare</span>
                <ArrowRight className="h-3 w-3" />
              </button>

              <button
                type="button"
                onClick={clearCompare}
                className="p-1.5 rounded text-text-muted hover:text-white transition cursor-pointer"
                title="Clear comparison list"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Full Comparison Matrix Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="comparison-matrix-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 lg:p-8 animate-fade-in flex items-center justify-center"
        >
          <div className="relative w-full max-w-5xl rounded-2xl border border-border bg-[#0d0d12] shadow-2xl overflow-hidden font-mono text-xs flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Scale className="h-4 w-4" />
                </div>
                <div>
                  <h3 id="comparison-matrix-title" className="font-sans text-base sm:text-lg font-bold text-white">
                    Agent Skill Comparison Matrix
                  </h3>
                  <p className="text-[11px] text-text-muted font-mono">
                    Side-by-side technical evaluation across {skills.length} skills
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={clearCompare}
                  className="text-text-muted hover:text-red-400 text-xs transition cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-border p-1.5 text-text-secondary hover:border-white hover:text-white transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Matrix Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => {
                  const isStacked = hasSkill(skill.slug);
                  return (
                    <div
                      key={skill.slug}
                      className="rounded-xl border border-border bg-surface p-5 space-y-5 flex flex-col justify-between"
                    >
                      {/* Title & Category */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                            {skill.category}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFromCompare(skill.slug)}
                            className="text-text-muted hover:text-red-400 transition cursor-pointer"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <Link href={`/skills/${skill.slug}`} className="block group">
                          <h4 className="font-sans text-base font-bold text-white group-hover:text-emerald-400 transition">
                            {skill.name}
                          </h4>
                        </Link>

                        <p className="font-sans text-xs text-text-secondary leading-relaxed">
                          {skill.description}
                        </p>
                      </div>

                      {/* Attribute Breakdown */}
                      <div className="space-y-3 pt-3 border-t border-border/60 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-text-muted">TRUST LEVEL:</span>
                          {skill.trustLevel === 'Official' ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <ShieldCheck className="h-3 w-3" /> Official
                            </span>
                          ) : (
                            <span className="text-white flex items-center gap-1">
                              <Shield className="h-3 w-3" /> Verified
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-text-muted">LICENSE:</span>
                          <span className="text-white font-bold">{skill.license}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-text-muted">STARS:</span>
                          <span className="text-amber-400 font-bold">★ {skill.sourceRepository?.stars.toLocaleString() || '0'}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-text-muted">SCRIPT SAFETY:</span>
                          <span className={skill.security.containsScripts ? 'text-yellow-400 font-bold' : 'text-emerald-400'}>
                            {skill.security.containsScripts ? 'Scripts Included' : 'Clean Docs Only'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-text-muted">SPEC LENGTH:</span>
                          <span className="text-white">
                            {skill.instructions ? `${skill.instructions.length.toLocaleString()} chars` : 'Full Spec'}
                          </span>
                        </div>
                      </div>

                      {/* Agent Standard Compatibility Matrix */}
                      <div className="space-y-1.5 pt-3 border-t border-border/60">
                        <span className="text-[10px] uppercase text-text-muted font-bold">Compatible Standards:</span>
                        <div className="flex flex-wrap gap-1">
                          {AGENT_TARGET_LIST.slice(0, 4).map((agentId) => (
                            <span
                              key={agentId}
                              className="rounded bg-surface-raised border border-border px-1.5 py-0.5 text-[9px] text-text-secondary"
                            >
                              {getAdapter(agentId).name.split(' ')[0]}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CLI Command Box */}
                      <div className="rounded-lg border border-border/80 bg-black p-2 text-[10px] text-white overflow-x-auto">
                        <code>npx domoskills add {skill.slug}</code>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleAdd(skill, e)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold uppercase tracking-wider text-xs transition cursor-pointer ${
                            isStacked
                              ? 'border border-border bg-surface-raised text-emerald-400'
                              : 'border border-white bg-white text-black hover:bg-muted-white'
                          }`}
                        >
                          {isStacked ? (
                            <>
                              <Check className="h-3.5 w-3.5" />
                              <span>Stacked</span>
                            </>
                          ) : (
                            <>
                              <Plus className="h-3.5 w-3.5" />
                              <span>Add to Stack</span>
                            </>
                          )}
                        </button>

                        <Link
                          href={`/skills/${skill.slug}`}
                          onClick={() => setOpen(false)}
                          className="p-2 rounded-xl border border-border bg-surface-raised text-text-secondary hover:text-white hover:border-white transition"
                          title="View Full Spec & Docs"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
