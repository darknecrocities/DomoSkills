'use client';

import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  X,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Smartphone,
  Monitor,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { useExperimentStore, EXPERIMENT_DEFINITIONS, AssertionCheck } from '@/store/useExperimentStore';
import { useViewModeStore } from '@/store/useViewModeStore';

export function ABTestOverlay() {
  const {
    experiments,
    isOverlayOpen,
    assertions,
    lastAssertionRun,
    setVariant,
    setOverlayOpen,
    toggleOverlay,
    runResponsiveAssertions,
  } = useExperimentStore();

  const { setViewMode } = useViewModeStore();
  const [running, setRunning] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setViewportWidth(window.innerWidth);
      const handleResize = () => setViewportWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleRunAssertions = () => {
    setRunning(true);
    setTimeout(() => {
      runResponsiveAssertions();
      setRunning(false);
    }, 250);
  };

  const handleSelectVariant = (experimentId: string, variantId: string) => {
    setVariant(experimentId, variantId);

    // If changing explore layout experiment, also sync with viewModeStore
    if (experimentId === 'explore_layout_experiment') {
      if (variantId === 'variant-b-dense3x3') {
        setViewMode('dense');
      } else {
        setViewMode('standard');
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Pill (Fixed in Bottom-Left Corner) */}
      <aside aria-label="A/B Testing and QA Hub" className="fixed bottom-4 left-4 z-40">
        <button
          type="button"
          onClick={toggleOverlay}
          className="flex items-center gap-2 rounded-full border border-border bg-[#0e0e12]/90 px-3.5 py-2 font-mono text-[11px] font-bold text-white shadow-2xl backdrop-blur-md hover:border-white transition hover:scale-105 cursor-pointer"
          title="Open A/B Testing & Responsive Diagnostic Engine"
        >
          <FlaskConical className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>A/B QA Engine</span>
          <span className="rounded bg-emerald-950 px-1.5 py-0.5 text-[9px] text-emerald-400 border border-emerald-800/60">
            {viewportWidth}px
          </span>
        </button>
      </aside>

      {/* Floating Modal / Dashboard */}
      {isOverlayOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qa-dialog-title"
          className="fixed bottom-16 left-4 z-50 w-[92vw] max-w-md rounded-2xl border border-border bg-[#0d0d11]/95 p-5 font-mono text-xs shadow-2xl backdrop-blur-xl animate-fade-in space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/70 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <FlaskConical className="h-3.5 w-3.5" />
              </div>
              <div>
                <h3 id="qa-dialog-title" className="font-bold text-white text-xs uppercase tracking-wider">
                  A/B Testing & QA Hub
                </h3>
                <p className="text-[10px] text-text-muted">
                  Live experiment overrides & responsive checks
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOverlayOpen(false)}
              className="rounded p-1 text-text-muted hover:text-white hover:bg-surface-raised transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Active Experiments Switcher */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              Live Experiments (Select Variant)
            </div>

            {EXPERIMENT_DEFINITIONS.map((exp) => {
              const currentVariant = experiments[exp.id] || exp.activeVariant;
              return (
                <div key={exp.id} className="rounded-xl border border-border/80 bg-surface p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-[11px]">{exp.name}</span>
                    <span className="text-[9px] text-emerald-400 font-bold uppercase">
                      {currentVariant.replace('variant-', '')}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {exp.variants.map((v) => {
                      const isSelected = currentVariant === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => handleSelectVariant(exp.id, v.id)}
                          className={`px-2.5 py-1.5 rounded-lg border text-left transition cursor-pointer ${
                            isSelected
                              ? 'border-white bg-white text-black font-bold shadow-sm'
                              : 'border-border bg-surface-raised text-text-secondary hover:text-white hover:border-border-bright'
                          }`}
                        >
                          <div className="text-[10px] truncate">{v.name}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Automated Responsive Assertions */}
          <div className="pt-2 border-t border-border/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                Responsive Assertions
              </span>
              <button
                type="button"
                onClick={handleRunAssertions}
                disabled={running}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-400 hover:bg-emerald-300 text-black font-bold text-[10px] uppercase transition cursor-pointer disabled:opacity-50"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>{running ? 'Testing...' : 'Run Audit'}</span>
              </button>
            </div>

            {assertions.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {assertions.map((a) => (
                  <div
                    key={a.id}
                    className={`rounded-lg border p-2.5 space-y-1 ${
                      a.passed
                        ? 'border-emerald-500/30 bg-emerald-950/20'
                        : 'border-red-500/30 bg-red-950/20'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {a.passed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
                      )}
                      <span className={`font-bold text-[11px] ${a.passed ? 'text-emerald-300' : 'text-red-300'}`}>
                        {a.name}
                      </span>
                    </div>
                    <p className="text-[10px] text-text-secondary leading-relaxed pl-5">
                      {a.detail}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border/80 p-3 text-center text-[11px] text-text-muted">
                Click 'Run Audit' to verify responsive widths, touch targets, and overflow immunity.
              </div>
            )}

            {lastAssertionRun && (
              <div className="text-[9px] text-text-muted text-right">
                Last checked at {lastAssertionRun}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
