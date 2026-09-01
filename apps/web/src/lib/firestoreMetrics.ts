'use client';

import { useEffect, useState } from 'react';
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { registry } from '@domoskills/registry';

export interface TelemetryStats {
  totalVisits: number;
  registeredUsers: number;
  totalInstalls: number;
  updatedAt?: any;
}

// Initial baseline metrics from registry
const BASELINE_STATS = {
  totalVisits: 14820,
  registeredUsers: 1420,
  totalInstalls: 486200,
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
  const localVisits = parseInt(localStorage.getItem('domoskills_local_visits') || '0', 10) + 1;
  localStorage.setItem('domoskills_local_visits', localVisits.toString());

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
    console.warn('Firestore visit tracking skipped (offline/demo):', error);
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
  const localRegCount = parseInt(localStorage.getItem('domoskills_local_registered') || '0', 10) + 1;
  localStorage.setItem('domoskills_local_registered', localRegCount.toString());

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
    console.warn('Firestore user registration record skipped:', error);
  }
}

/**
 * Record skill download or CLI install event in Firestore
 */
export async function recordDownload(skillSlug?: string, count: number = 1): Promise<void> {
  // Track locally
  const localInstalls = parseInt(localStorage.getItem('domoskills_local_installs') || '0', 10) + count;
  localStorage.setItem('domoskills_local_installs', localInstalls.toString());

  // Broadcast custom event so active UI components can react immediately
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
    console.warn('Firestore download event skipped:', error);
  }
}

/**
 * React Hook: Realtime Firestore Telemetry & Global Metrics
 */
export function useLiveTelemetry() {
  const [stats, setStats] = useState<TelemetryStats>(BASELINE_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read local storage on client mount
    try {
      const localVisits = parseInt(localStorage.getItem('domoskills_local_visits') || '0', 10);
      const localReg = parseInt(localStorage.getItem('domoskills_local_registered') || '0', 10);
      const localInstalls = parseInt(localStorage.getItem('domoskills_local_installs') || '0', 10);

      setStats({
        totalVisits: BASELINE_STATS.totalVisits + localVisits,
        registeredUsers: BASELINE_STATS.registeredUsers + localReg,
        totalInstalls: BASELINE_STATS.totalInstalls + localInstalls,
      });
    } catch {
      // ignore
    }

    // Record page visit on initial load
    recordVisit();

    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }

    try {
      const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_REF);
      const unsubscribe = onSnapshot(
        statsRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            setStats({
              totalVisits: (data.totalVisits || BASELINE_STATS.totalVisits),
              registeredUsers: (data.registeredUsers || BASELINE_STATS.registeredUsers),
              totalInstalls: (data.totalInstalls || BASELINE_STATS.totalInstalls),
              updatedAt: data.updatedAt,
            });
          } else {
            // Seed initial stats document in Firestore
            setDoc(statsRef, BASELINE_STATS, { merge: true }).catch(() => {});
          }
          setLoading(false);
        },
        (error) => {
          console.warn('Firestore telemetry snapshot subscription fallback:', error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (e) {
      setLoading(false);
    }
  }, []);

  // Listen to local install events for instant responsive counter updates
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
    formattedVisits: stats.totalVisits >= 1000 ? `${(stats.totalVisits / 1000).toFixed(1)}k` : stats.totalVisits.toLocaleString(),
    formattedUsers: stats.registeredUsers.toLocaleString(),
    formattedInstalls: stats.totalInstalls >= 1000 ? `${(stats.totalInstalls / 1000).toFixed(0)}k+` : stats.totalInstalls.toLocaleString(),
  };
}
