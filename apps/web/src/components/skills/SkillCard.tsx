'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Check, Star, Shield, ShieldCheck, AlertTriangle, ArrowUpRight, FileCode } from 'lucide-react';
import { Skill } from '@domoskills/validators';
import { useCartStore } from '@/store/useCartStore';

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  const { hasSkill, toggleSkill } = useCartStore();
  const isSelected = hasSkill(skill.slug);

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSkill({
      id: skill.id,
      slug: skill.slug,
      name: skill.name,
      category: skill.category,
      license: skill.license,
      trustLevel: skill.trustLevel,
    });
  };

  const getTrustBadge = () => {
    switch (skill.trustLevel) {
      case 'Official':
        return (
          <span className="inline-flex items-center gap-1 rounded border border-white/30 bg-white text-black px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase">
            <ShieldCheck className="h-3 w-3" />
            Official
          </span>
        );
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 rounded border border-border bg-surface-raised text-white px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase">
            <Shield className="h-3 w-3" />
            Verified
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded border border-border bg-surface text-text-muted px-1.5 py-0.5 text-[10px] font-mono uppercase">
            Community
          </span>
        );
    }
  };

  return (
    <div className="group card-polkadot-hover relative flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:border-white hover:bg-surface-raised hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.8),0_0_24px_rgba(255,255,255,0.06)]">
      
      {/* Top Meta Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-text-muted group-hover:text-white transition">
              {skill.category}
            </span>
            {skill.security.containsScripts && (
              <span
                title="Contains script files"
                className="inline-flex items-center gap-0.5 text-[10px] font-mono text-yellow-400 bg-yellow-950/40 border border-yellow-800/60 px-1.5 py-0.5 rounded"
              >
                <AlertTriangle className="h-2.5 w-2.5" />
                Scripts
              </span>
            )}
          </div>
          <div>{getTrustBadge()}</div>
        </div>

        {/* Skill Title */}
        <Link href={`/skills/${skill.slug}`} className="block focus:outline-none">
          <h3 className="font-sans text-lg font-bold text-white tracking-tight group-hover:text-white flex items-center justify-between gap-2">
            <span>{skill.name}</span>
            <ArrowUpRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100 text-text-secondary" />
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 font-sans text-xs text-text-secondary line-clamp-2 leading-relaxed">
          {skill.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded border border-border-subtle bg-surface-subtle px-2 py-0.5 font-mono text-[10px] text-text-muted group-hover:border-border group-hover:text-text-secondary transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Bar */}
      <div className="mt-6 flex items-center justify-between border-t border-border pt-3.5">
        <div className="flex items-center gap-3 font-mono text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 text-text-secondary" />
            {(skill.installs / 1000).toFixed(1)}k
          </span>
          <span className="rounded border border-border px-1 py-0.2 text-[10px]">
            {skill.license}
          </span>
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={handleAddClick}
          className={`flex items-center gap-1.5 rounded border px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition ${
            isSelected
              ? 'border-white bg-white text-black hover:bg-muted-white shadow-sm'
              : 'border-border bg-surface-raised text-white hover:border-white hover:bg-white hover:text-black'
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
