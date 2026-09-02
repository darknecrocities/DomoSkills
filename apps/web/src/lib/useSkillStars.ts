'use client';

import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';

const STARRED_STORAGE_KEY = 'domoskills_user_starred_skills';
const STAR_DELTAS_KEY = 'domoskills_star_counts_cache';

// Helper to get array of starred slugs from localStorage
function getLocalStarredList(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STARRED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Helper to get star delta cache
function getStarDeltas(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STAR_DELTAS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function useSkillStars(skillSlug: string, initialBaselineStars: number = 0) {
  const [isStarred, setIsStarred] = useState(false);
  const [starsCount, setStarsCount] = useState(initialBaselineStars);
  const [mounted, setMounted] = useState(false);

  // Sync state on mount and custom events
  const syncState = useCallback(() => {
    if (typeof window === 'undefined') return;

    const starredList = getLocalStarredList();
    const hasStarred = starredList.includes(skillSlug);
    setIsStarred(hasStarred);

    const deltas = getStarDeltas();
    const delta = deltas[skillSlug] || 0;
    setStarsCount(Math.max(0, initialBaselineStars + delta));
  }, [skillSlug, initialBaselineStars]);

  useEffect(() => {
    setMounted(true);
    syncState();

    const handleCustomEvent = (e: CustomEvent) => {
      if (e.detail?.slug === skillSlug) {
        syncState();
      }
    };

    window.addEventListener('domoskills-star-changed' as any, handleCustomEvent as any);
    return () => {
      window.removeEventListener('domoskills-star-changed' as any, handleCustomEvent as any);
    };
  }, [syncState, skillSlug]);

  const toggleStar = useCallback(
    async (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (typeof window === 'undefined') return;

      const starredList = getLocalStarredList();
      const currentlyStarred = starredList.includes(skillSlug);
      const nextStarred = !currentlyStarred;

      // Update starred list in localStorage
      let updatedStarredList: string[];
      if (nextStarred) {
        updatedStarredList = Array.from(new Set([...starredList, skillSlug]));
      } else {
        updatedStarredList = starredList.filter((s) => s !== skillSlug);
      }
      localStorage.setItem(STARRED_STORAGE_KEY, JSON.stringify(updatedStarredList));
      setIsStarred(nextStarred);

      // Update star count delta
      const deltas = getStarDeltas();
      const currentDelta = deltas[skillSlug] || 0;
      const nextDelta = nextStarred ? currentDelta + 1 : Math.max(0, currentDelta - 1);
      deltas[skillSlug] = nextDelta;
      localStorage.setItem(STAR_DELTAS_KEY, JSON.stringify(deltas));

      const newTotal = Math.max(0, initialBaselineStars + nextDelta);
      setStarsCount(newTotal);

      // Notify other instances of this skill
      window.dispatchEvent(
        new CustomEvent('domoskills-star-changed', {
          detail: { slug: skillSlug, isStarred: nextStarred, newTotal },
        })
      );

      // Persist to Firestore if configured
      if (isFirebaseConfigured) {
        try {
          const skillDocRef = doc(db, 'skill_stats', skillSlug);
          await setDoc(
            skillDocRef,
            {
              slug: skillSlug,
              starCount: increment(nextStarred ? 1 : -1),
              lastStarredAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch {
          // Local fallback handled
        }
      }
    },
    [skillSlug, initialBaselineStars]
  );

  const formattedStars =
    starsCount >= 1000 ? `${(starsCount / 1000).toFixed(1)}k` : starsCount.toString();

  return {
    isStarred: mounted ? isStarred : false,
    starsCount: mounted ? starsCount : initialBaselineStars,
    formattedStars: mounted
      ? formattedStars
      : initialBaselineStars >= 1000
      ? `${(initialBaselineStars / 1000).toFixed(1)}k`
      : initialBaselineStars.toString(),
    toggleStar,
  };
}
