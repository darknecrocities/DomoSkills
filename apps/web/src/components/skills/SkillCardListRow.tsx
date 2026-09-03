'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Check, Star, ShieldCheck, Shield, Scale, Terminal, Copy } from 'lucide-react';
import { Skill } from '@domoskills/validators';
import { useCartStore } from '@/store/useCartStore';
import { useComparatorStore } from '@/store/useComparatorStore';
import { useSkillStars } from '@/lib/useSkillStars';
import { useAuth } from '@/context/AuthContext';
import { fireCartFlyAnimation } from '@/components/cart/CartFlyAnimation';

interface SkillCardListRowProps {
  skill: Skill;
  onOpenCommandBuilder?: (skill: Skill) => void;
  onOpenScorecard?: (skill: Skill) => void;
}

export function SkillCardListRow({
  skill,
  onOpenCommandBuilder,
  onOpenScorecard,
}: SkillCardListRowProps) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { hasSkill, toggleSkill } = useCartStore();
  const { toggleCompare, hasSkill: hasCompare } = useComparatorStore();
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

  const handleQuickCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(`npx domoskills add ${skill.slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group rounded-xl border border-border bg-surface hover:border-white hover:bg-surface-raised p-3 sm:p-4 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
      {/* Left: Category & Title */}
      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
        <span className="shrink-0 rounded border border-border/80 bg-surface-raised px-2 py-0.5 text-[10px] font-bold uppercase text-text-muted">
          {skill.category}
        </span>

        <div className="min-w-0 flex-1">
          <Link href={`/skills/${skill.slug}`} className="block">
            <h4 className="font-sans text-sm font-bold text-white group-hover:text-emerald-400 transition truncate">
              {skill.name}
            </h4>
          </Link>
          <p className="font-sans text-[11px] text-text-muted truncate mt-0.5">
            {skill.description}
          </p>
        </div>
      </div>

      {/* Right: Metadata & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/50">
        {/* Stars */}
        <button
          type="button"
          onClick={toggleStar}
          className="flex items-center gap-1 text-[11px] text-text-muted hover:text-amber-400 transition cursor-pointer"
        >
          <Star className={`h-3 w-3 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
          <span>{formattedStars}</span>
        </button>

        {/* License */}
        <span className="text-[10px] text-text-muted hidden md:inline">{skill.license}</span>

        {/* Trust badge */}
        <button
          type="button"
          onClick={() => onOpenScorecard?.(skill)}
          className="cursor-pointer"
          title="Inspect Security Scorecard"
        >
          {skill.trustLevel === 'Official' ? (
            <span className="inline-flex items-center gap-0.5 rounded border border-white/30 bg-white text-black px-1.5 py-0.5 text-[9px] font-bold uppercase">
              <ShieldCheck className="h-2.5 w-2.5" />
              Official
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5 rounded border border-border bg-surface-raised text-text-secondary px-1.5 py-0.5 text-[9px] uppercase">
              <Shield className="h-2.5 w-2.5" />
              Verified
            </span>
          )}
        </button>

        {/* Compare button */}
        <button
          type="button"
          onClick={() => toggleCompare(skill.slug)}
          title={isCompared ? 'Remove from Compare' : 'Compare Skill'}
          className={`p-1.5 rounded transition cursor-pointer ${
            isCompared
              ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
              : 'text-text-muted hover:text-white hover:bg-surface-raised'
          }`}
        >
          <Scale className="h-3.5 w-3.5" />
        </button>

        {/* Quick CLI Copy */}
        <button
          type="button"
          onClick={handleQuickCopy}
          title="Quick Copy CLI Install Command"
          className="p-1.5 rounded border border-border bg-surface text-text-muted hover:text-white hover:border-white transition cursor-pointer"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        </button>

        {/* Add to Stack Button */}
        <button
          type="button"
          onClick={handleAddClick}
          className={`flex items-center gap-1 px-3 py-1.5 rounded border font-mono text-[11px] font-bold uppercase tracking-wider transition cursor-pointer ${
            isSelected
              ? 'border-border bg-surface-raised text-emerald-400 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400'
              : 'border-white bg-white text-black hover:bg-muted-white'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span>Stacked</span>
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
