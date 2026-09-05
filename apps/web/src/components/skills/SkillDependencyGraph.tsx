'use client';

import React from 'react';
import Link from 'next/link';
import { GitFork, Layers, Plus, Check, ArrowRight, Shield, Cpu, Terminal } from 'lucide-react';
import { Skill } from '@domoskills/validators';
import { registry } from '@domoskills/registry';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';
import { fireCartFlyAnimation } from '@/components/cart/CartFlyAnimation';

interface SkillDependencyGraphProps {
  skill: Skill;
}

export function SkillDependencyGraph({ skill }: SkillDependencyGraphProps) {
  const { addSkill, hasSkill } = useCartStore();
  const { user, openAuthModal } = useAuth();

  // Find 2-3 complementary skills in adjacent domains
  const complementarySkills = React.useMemo(() => {
    const all = registry.getAllSkills();
    return all
      .filter((s) => s.slug !== skill.slug && (s.category === skill.category || s.category === 'ai-ml' || s.category === 'devops'))
      .slice(0, 3);
  }, [skill]);

  const handleAdd = (targetSkill: Skill, e: React.MouseEvent) => {
    if (!user) {
      openAuthModal('signup');
      return;
    }
    fireCartFlyAnimation(e.clientX, e.clientY, targetSkill.name);
    addSkill({
      id: targetSkill.id,
      slug: targetSkill.slug,
      name: targetSkill.name,
      category: targetSkill.category,
      license: targetSkill.license,
      trustLevel: targetSkill.trustLevel,
    });
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 font-mono text-xs space-y-6">
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <GitFork className="h-4 w-4 text-emerald-400" />
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">
            Ecosystem Radar & Recommended Companions
          </h3>
        </div>
        <span className="text-[10px] text-text-muted">Dynamic Capability Matrix</span>
      </div>

      {/* Visual Connection Diagram */}
      <div className="relative rounded-xl border border-border/70 bg-black/60 p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        {/* Left: Target Standards */}
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[10px] uppercase text-text-muted font-bold">Standard Connectors</span>
          <div className="flex md:flex-col gap-2 justify-center">
            <span className="rounded bg-surface-raised border border-border px-2.5 py-1 text-white font-bold text-[10px]">
              Antigravity (.agent)
            </span>
            <span className="rounded bg-surface-raised border border-border px-2.5 py-1 text-white font-bold text-[10px]">
              Claude Code (.claude)
            </span>
            <span className="rounded bg-surface-raised border border-border px-2.5 py-1 text-white font-bold text-[10px]">
              Cursor (.cursor)
            </span>
          </div>
        </div>

        {/* Center: Main Skill Node */}
        <div className="relative flex flex-col items-center justify-center p-4 rounded-xl border-2 border-emerald-400/80 bg-emerald-950/30 text-center shadow-[0_0_25px_rgba(16,185,129,0.15)] min-w-[200px]">
          <Cpu className="h-6 w-6 text-emerald-400 mb-1" />
          <span className="font-bold text-white text-xs truncate max-w-[180px]">{skill.name}</span>
          <span className="text-[10px] text-emerald-400 mt-0.5 uppercase tracking-wider font-bold">
            Active Capability
          </span>
        </div>

        {/* Right: Complementary Companions */}
        <div className="space-y-2 w-full md:w-auto">
          <span className="text-[10px] uppercase text-text-muted font-bold">Frequently Stacked With</span>
          <div className="space-y-2">
            {complementarySkills.map((comp) => {
              const isStacked = hasSkill(comp.slug);
              return (
                <div
                  key={comp.slug}
                  className="flex items-center justify-between gap-3 p-2 rounded-lg border border-border bg-surface-raised"
                >
                  <Link href={`/skills/${comp.slug}`} className="truncate max-w-[160px] text-white hover:text-emerald-400 transition font-bold text-[11px]">
                    {comp.name}
                  </Link>

                  <button
                    type="button"
                    onClick={(e) => handleAdd(comp, e)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition cursor-pointer shrink-0 ${
                      isStacked
                        ? 'text-emerald-400 border border-border bg-surface'
                        : 'bg-white text-black hover:bg-muted-white'
                    }`}
                  >
                    {isStacked ? (
                      <span className="inline-flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        <span>Stacked</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <Plus className="h-3 w-3" />
                        <span>Add</span>
                      </span>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
