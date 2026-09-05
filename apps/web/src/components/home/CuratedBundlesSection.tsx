'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Check, Play, Pause, Layers } from 'lucide-react';
import { BUNDLE_PRESETS, BundlePreset } from '@/data/bundlePresets';
import { registry } from '@domoskills/registry';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';
import { fireCartFlyAnimation } from '@/components/cart/CartFlyAnimation';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

export function CuratedBundlesSection() {
  const { addSkill, hasSkill } = useCartStore();
  const { user, openAuthModal } = useAuth();
  const [isPaused, setIsPaused] = useState(false);

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

  const renderCard = (bundle: BundlePreset, index: number, trackId: string) => {
    const isAllStacked = bundle.skillSlugs.every((slug) => hasSkill(slug));
    const delaySec = (index * -0.72).toFixed(2);

    return (
      <div
        key={`${trackId}-${bundle.id}-${index}`}
        className="animate-wavy-card shrink-0"
        style={{
          animationDelay: `${delaySec}s`,
        }}
      >
        <div className="w-[320px] sm:w-[350px] h-[410px] group card-polkadot-hover rounded-2xl border border-border bg-surface p-5 flex flex-col justify-between space-y-4 hover:border-white transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,0,0,0.85),0_0_20px_rgba(255,255,255,0.08)]">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-text-secondary">
                {bundle.badge}
              </span>
              <div className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
                <span className="rounded border border-border/70 px-1.5 py-0.2 text-[9px] text-emerald-400 bg-emerald-950/30 font-medium">
                  {bundle.recommendedAgent}
                </span>
                <span>{bundle.skillSlugs.length} Skills</span>
              </div>
            </div>

            <div>
              <h3 className="font-sans text-base font-bold text-white group-hover:text-emerald-400 transition line-clamp-1">
                {bundle.name}
              </h3>
              <p className="mt-1 font-sans text-xs text-text-secondary leading-relaxed line-clamp-2 min-h-[34px]">
                {bundle.description}
              </p>
            </div>

            {/* Skill Pills */}
            <div className="space-y-1.5 pt-2 border-t border-border/50">
              <div className="font-mono text-[10px] uppercase text-text-muted flex items-center justify-between">
                <span>Included Capabilities:</span>
                <Layers className="h-3 w-3 text-text-muted" />
              </div>
              <div className="flex flex-wrap gap-1 max-h-[110px] overflow-hidden">
                {bundle.skillSlugs.map((slug) => (
                  <span
                    key={slug}
                    className="rounded bg-surface-raised border border-border/80 px-2 py-0.5 font-mono text-[10px] text-white truncate max-w-[155px]"
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
      </div>
    );
  };

  return (
    <section className="space-y-6">
      <ScrollReveal direction="up" distance={16} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
              Starter Packs
            </span>
          </div>
          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Curated Agent Capability Bundles
          </h2>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Pause / Play button */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface hover:border-white text-text-secondary hover:text-white font-mono text-xs transition cursor-pointer"
            title={isPaused ? 'Resume wavy motion loop' : 'Pause wavy motion loop'}
          >
            {isPaused ? (
              <>
                <Play className="h-3.5 w-3.5 text-emerald-400" />
                <span>Resume Stream</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 text-text-muted" />
                <span>Pause Motion</span>
              </>
            )}
          </button>

          <Link
            href="/explore"
            className="font-mono text-xs text-text-secondary hover:text-white transition flex items-center gap-1"
          >
            <span>Browse all</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </ScrollReveal>

      {/* Infinite Non-Stop Wavy Motion Carousel with seamlessly blended mask edges */}
      <div
        className={`relative w-full overflow-hidden py-8 sm:py-10 [mask-image:linear-gradient(to_right,transparent_0%,black_100px,black_calc(100%-100px),transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_100px,black_calc(100%-100px),transparent_100%)] ${
          isPaused ? 'carousel-paused' : ''
        }`}
      >

        {/* Marquee Track Container with Wavy Motion (~ Symbol Pattern) */}
        <div className="flex w-max select-none">
          {/* Track 1 */}
          <div className={`animate-wavy-marquee flex items-center gap-6 pr-6 shrink-0 ${isPaused ? 'is-paused' : ''}`}>
            {BUNDLE_PRESETS.map((bundle, idx) => renderCard(bundle, idx, 't1'))}
          </div>

          {/* Track 2 (Cloned for mathematically seamless continuous infinite loop) */}
          <div className={`animate-wavy-marquee flex items-center gap-6 pr-6 shrink-0 ${isPaused ? 'is-paused' : ''}`} aria-hidden="true">
            {BUNDLE_PRESETS.map((bundle, idx) => renderCard(bundle, idx, 't2'))}
          </div>
        </div>
      </div>
    </section>
  );
}
