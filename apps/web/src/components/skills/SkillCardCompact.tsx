'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Check, X, Star, ShieldCheck, Shield, ArrowUpRight, Scale, Terminal } from 'lucide-react';
import { Skill } from '@domoskills/validators';
import { useCartStore } from '@/store/useCartStore';
import { useComparatorStore } from '@/store/useComparatorStore';
import { useSkillStars } from '@/lib/useSkillStars';
import { useAuth } from '@/context/AuthContext';
import { fireCartFlyAnimation } from '@/components/cart/CartFlyAnimation';

interface SkillCardCompactProps {
  skill: Skill;
  onOpenCommandBuilder?: (skill: Skill) => void;
  onOpenScorecard?: (skill: Skill) => void;
}

export function SkillCardCompact({
  skill,
  onOpenCommandBuilder,
  onOpenScorecard,
}: SkillCardCompactProps) {
  const [mounted, setMounted] = useState(false);
  const { hasSkill, toggleSkill } = useCartStore();
  const { compareSlugs, toggleCompare, hasSkill: hasCompare } = useComparatorStore();
  const { user, openAuthModal } = useAuth();
  const baselineStars = skill.sourceRepository?.stars || 0;
  const { isStarred, formattedStars, toggleStar } = useSkillStars(skill.slug, baselineStars);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSelected = mounted ? hasSkill(skill.slug) : false;
  const isCompared = mounted ? hasCompare(skill.slug) : false;

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      openAuthModal('signup');
      return;
    }

    if (!isSelected) {
      fireCartFlyAnimation(e.clientX, e.clientY, skill.name);
    }

    toggleSkill({
      id: skill.id,
      slug: skill.slug,
      name: skill.name,
      category: skill.category,
      license: skill.license,
      trustLevel: skill.trustLevel,
    });
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(skill.slug);
  };

  return (
    <div className="group card-polkadot-hover relative flex flex-col justify-between rounded-xl border border-border bg-surface p-3 sm:p-4 transition-all duration-200 hover:border-white hover:bg-surface-raised hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.7),0_0_20px_rgba(255,255,255,0.05)]">
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-1.5 mb-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted truncate max-w-[120px]">
            {skill.category}
          </span>

          <div className="flex items-center gap-1 shrink-0">
            {/* Compare Toggle */}
            <button
              type="button"
              onClick={handleCompareClick}
              title={isCompared ? 'Remove from Compare' : 'Compare Skill'}
              className={`p-1 rounded text-[10px] font-mono transition cursor-pointer ${
                isCompared
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                  : 'text-text-muted hover:text-white hover:bg-surface-raised'
              }`}
            >
              <Scale className="h-3 w-3" />
            </button>

            {/* Trust badge */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenScorecard?.(skill);
              }}
              title="Inspect Security Scorecard"
              className="cursor-pointer"
            >
              {skill.trustLevel === 'Official' ? (
                <span className="inline-flex items-center gap-0.5 rounded border border-white/30 bg-white text-black px-1 py-0.2 text-[9px] font-mono font-bold uppercase">
                  <ShieldCheck className="h-2.5 w-2.5" />
                  Official
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 rounded border border-border bg-surface-raised text-text-secondary px-1 py-0.2 text-[9px] font-mono font-semibold uppercase">
                  <Shield className="h-2.5 w-2.5" />
                  Verified
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Title */}
        <Link href={`/skills/${skill.slug}`} className="block group/link">
          <h3 className="font-sans text-xs sm:text-sm font-bold text-white leading-snug group-hover/link:text-emerald-400 transition line-clamp-2">
            {skill.name}
          </h3>
        </Link>

        {/* Short description */}
        <p className="mt-1.5 font-sans text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
          {skill.description}
        </p>
      </div>

      {/* Bottom Actions Bar */}
      <div className="mt-3 pt-2.5 border-t border-border/70 flex items-center justify-between gap-2 font-mono text-[10px]">
        <div className="flex items-center gap-2 text-text-muted">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleStar();
            }}
            className="flex items-center gap-1 hover:text-amber-400 transition cursor-pointer"
          >
            <Star className={`h-3 w-3 ${isStarred ? 'fill-amber-400 text-amber-400' : 'text-text-muted'}`} />
            <span>{formattedStars}</span>
          </button>
          <span>•</span>
          <span className="truncate">{skill.license}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {onOpenCommandBuilder && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenCommandBuilder(skill);
              }}
              title="CLI Command Builder"
              className="p-1 rounded text-text-muted hover:text-white hover:bg-surface transition cursor-pointer"
            >
              <Terminal className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Add / Stack Button */}
          <button
            type="button"
            onClick={handleAddClick}
            className={`flex items-center gap-1 px-2.5 py-1 rounded border font-mono text-[10px] font-bold uppercase tracking-wider transition cursor-pointer ${
              isSelected
                ? 'border-border bg-surface-raised text-emerald-400 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400'
                : 'border-border bg-surface-raised text-white hover:border-white hover:bg-white hover:text-black'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="h-3 w-3" />
                <span>Stacked</span>
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
