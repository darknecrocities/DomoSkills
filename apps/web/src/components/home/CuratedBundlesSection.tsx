'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Check, Plus, PackageCheck, Layers, Terminal } from 'lucide-react';
import { BUNDLE_PRESETS, BundlePreset } from '@/data/bundlePresets';
import { registry } from '@domoskills/registry';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';
import { fireCartFlyAnimation } from '@/components/cart/CartFlyAnimation';

export function CuratedBundlesSection() {
  const { addSkill, hasSkill } = useCartStore();
  const { user, openAuthModal } = useAuth();

  const handleInstallBundle = (bundle: BundlePreset, e: React.MouseEvent) => {
    if (!user) {
      openAuthModal('signup');
      return;
    }

    fireCartFlyAnimation(e.clientX, e.clientY, bundle.name);

    for (const slug of bundle.skillSlugs) {
      const skill = registry.getSkillBySlug(slug);
      if (skill) {
        addSkill({
          id: skill.id,
          slug: skill.slug,
          name: skill.name,
          category: skill.category,
          license: skill.license,
          trustLevel: skill.trustLevel,
        });
      }
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
              Starter Packs
            </span>
            <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-[10px] text-text-secondary font-semibold">
              1-Click Stacks
            </span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Curated Agent Capability Bundles
          </h2>
        </div>

        <Link
          href="/explore"
          className="font-mono text-xs text-text-secondary hover:text-white transition flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Browse all 1,000+ skills</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {BUNDLE_PRESETS.map((bundle) => {
          const isAllStacked = bundle.skillSlugs.every((slug) => hasSkill(slug));

          return (
            <div
              key={bundle.id}
              className="group card-polkadot-hover rounded-2xl border border-border bg-surface p-5 flex flex-col justify-between space-y-4 hover:border-white transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-text-muted">
                    {bundle.badge}
                  </span>
                  <span className="font-mono text-[10px] text-text-muted font-medium">
                    {bundle.skillSlugs.length} Skills
                  </span>
                </div>

                <div>
                  <h3 className="font-sans text-base font-bold text-white group-hover:text-emerald-400 transition">
                    {bundle.name}
                  </h3>
                  <p className="mt-1 font-sans text-xs text-text-secondary leading-relaxed">
                    {bundle.description}
                  </p>
                </div>

                {/* Skill Pills */}
                <div className="space-y-1.5 pt-2 border-t border-border/50">
                  <div className="font-mono text-[10px] uppercase text-text-muted">Included Capabilities:</div>
                  <div className="flex flex-wrap gap-1">
                    {bundle.skillSlugs.map((slug) => (
                      <span
                        key={slug}
                        className="rounded bg-surface-raised border border-border/80 px-2 py-0.5 font-mono text-[10px] text-white truncate max-w-[170px]"
                      >
                        {slug}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Install Button */}
              <div className="pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={(e) => handleInstallBundle(bundle, e)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    isAllStacked
                      ? 'border border-border bg-surface-raised text-emerald-400'
                      : 'border border-white bg-white text-black hover:bg-muted-white shadow-sm'
                  }`}
                >
                  {isAllStacked ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Bundle In Stack</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Install Bundle</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
