'use client';

import { useEffect, useState } from 'react';
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  increment,
  serverTimestamp,
  collection,
  getCountFromServer,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { registry } from '@domoskills/registry';

export interface TelemetryStats {
  totalVisits: number;
  registeredUsers: number;
  totalInstalls: number;
  updatedAt?: any;
}

// True real starting baseline (0 artificial metrics)
const REAL_BASELINE_STATS: TelemetryStats = {
  totalVisits: 1,
  registeredUsers: 0,
  totalInstalls: 0,
};

const STATS_DOC_REF = 'stats';
const STATS_COLLECTION = 'telemetry';

/**
 * Record a page visit in Firestore with session deduplication
 */
export async function recordVisit(): Promise<void> {
  if (typeof window === 'undefined') return;

  const sessionKey = 'domoskills_visited_session';
  const hasVisitedThisSession = sessionStorage.getItem(sessionKey);

  // Update local counter
  const localVisits = parseInt(localStorage.getItem('domoskills_real_visits') || '0', 10) + (hasVisitedThisSession ? 0 : 1);
  localStorage.setItem('domoskills_real_visits', localVisits.toString());

  if (hasVisitedThisSession) {
    return;
  }

  sessionStorage.setItem(sessionKey, '1');

  if (!isFirebaseConfigured) {
    return;
  }

  try {
    const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_REF);
    await setDoc(
      statsRef,
      {
        totalVisits: increment(1),
        lastVisitedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    // offline/demo fallback
  }
}

/**
 * Record a registered or signed-in user in Firestore
 */
export async function recordUserRegistration(user: {
  uid: string;
  email: string | null;
  displayName: string | null;
  provider: string;
}): Promise<void> {
  if (!user || !user.uid) return;

  // Track locally
  const localRegCount = parseInt(localStorage.getItem('domoskills_real_registered') || '0', 10) + 1;
  localStorage.setItem('domoskills_real_registered', localRegCount.toString());

  if (!isFirebaseConfigured) return;

  try {
    const userDocRef = doc(db, 'users', user.uid);
    const existing = await getDoc(userDocRef);
    const isNew = !existing.exists();

    await setDoc(
      userDocRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        provider: user.provider,
        lastLoginAt: serverTimestamp(),
        ...(isNew ? { registeredAt: serverTimestamp() } : {}),
      },
      { merge: true }
    );

    if (isNew) {
      const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_REF);
      await setDoc(
        statsRef,
        {
          registeredUsers: increment(1),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  } catch (error) {
    // ignore
  }
}

/**
 * Record skill download or CLI install event in Firestore
 */
export async function recordDownload(skillSlug?: string, count: number = 1): Promise<void> {
  // Track real installs locally
  const localInstalls = parseInt(localStorage.getItem('domoskills_real_installs') || '0', 10) + count;
  localStorage.setItem('domoskills_real_installs', localInstalls.toString());

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('domoskills-install-recorded', { detail: { skillSlug, count } }));
  }

  if (!isFirebaseConfigured) return;

  try {
    const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_REF);
    await setDoc(
      statsRef,
      {
        totalInstalls: increment(count),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    if (skillSlug) {
      const skillRef = doc(db, 'skills', skillSlug);
      await setDoc(
        skillRef,
        {
          slug: skillSlug,
          installs: increment(count),
          lastInstalledAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  } catch (error) {
    // ignore
  }
}

/**
 * Format real number with compact notation only if > 1000
 */
function formatMetric(num: number): string {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 10_000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toLocaleString();
}

/**
 * React Hook: Realtime Firestore Telemetry & Global Metrics
 */
export function useLiveTelemetry() {
  const [stats, setStats] = useState<TelemetryStats>(REAL_BASELINE_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Record page visit on initial load
    recordVisit();

    // Read real metrics from local storage
    try {
      const localVisits = parseInt(localStorage.getItem('domoskills_real_visits') || '1', 10);
      const localReg = parseInt(localStorage.getItem('domoskills_real_registered') || '0', 10);
      const localInstalls = parseInt(localStorage.getItem('domoskills_real_installs') || '0', 10);

      setStats({
        totalVisits: Math.max(1, localVisits),
        registeredUsers: localReg,
        totalInstalls: localInstalls,
      });
    } catch {
      // ignore
    }

    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_REF);

      // Real-time listener on telemetry stats document
      const unsubscribe = onSnapshot(
        statsRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            setStats({
              totalVisits: typeof data.totalVisits === 'number' ? data.totalVisits : 1,
              registeredUsers: typeof data.registeredUsers === 'number' ? data.registeredUsers : 0,
              totalInstalls: typeof data.totalInstalls === 'number' ? data.totalInstalls : 0,
              updatedAt: data.updatedAt,
            });
          }
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );

      // Also query actual users collection count for ground truth
      const usersCollection = collection(db, 'users');
      getCountFromServer(usersCollection)
        .then((userCountSnap) => {
          const actualCount = userCountSnap.data().count;
          if (actualCount > 0) {
            setStats((prev) => ({
              ...prev,
              registeredUsers: Math.max(prev.registeredUsers, actualCount),
            }));
          }
        })
        .catch(() => {});

      return () => unsubscribe();
    } catch {
      setLoading(false);
    }
  }, []);

  // Instant local listener for install actions
  useEffect(() => {
    const handleInstallEvent = (e: any) => {
      const added = e.detail?.count || 1;
      setStats((prev) => ({
        ...prev,
        totalInstalls: prev.totalInstalls + added,
      }));
    };

    window.addEventListener('domoskills-install-recorded', handleInstallEvent);
    return () => window.removeEventListener('domoskills-install-recorded', handleInstallEvent);
  }, []);

  return {
    ...stats,
    loading,
    formattedVisits: formatMetric(stats.totalVisits),
    formattedUsers: formatMetric(stats.registeredUsers),
    formattedInstalls: formatMetric(stats.totalInstalls),
  };
}
