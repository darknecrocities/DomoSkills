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

let lastVisitTimestamp = 0;

/**
 * Record a page visit in cloud registry and local storage
 * Always counts whenever any user visits, even if unauthenticated
 */
export async function recordVisit(): Promise<void> {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  // Throttle by 3 seconds to avoid duplicate increments from rapid re-renders
  if (now - lastVisitTimestamp < 3000) {
    return;
  }
  lastVisitTimestamp = now;

  // Increment local counter
  const localVisits = parseInt(localStorage.getItem('domoskills_real_visits') || '0', 10) + 1;
  localStorage.setItem('domoskills_real_visits', localVisits.toString());

  // Broadcast event to current page so counters update in real time
  window.dispatchEvent(
    new CustomEvent('domoskills-visit-recorded', { detail: { count: localVisits } })
  );

  if (!isFirebaseConfigured || !db) {
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
    // Graceful offline fallback
  }
}

/**
 * Record a registered or signed-in user and synchronize actual user count
 */
export async function recordUserRegistration(user: {
  uid: string;
  email: string | null;
  displayName: string | null;
  provider: string;
}): Promise<void> {
  if (!user || !user.uid) return;

  // Update local registration record
  const localRegCount = parseInt(localStorage.getItem('domoskills_real_registered') || '0', 10) + 1;
  localStorage.setItem('domoskills_real_registered', localRegCount.toString());

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('domoskills-user-recorded', { detail: { user } })
    );
  }

  if (!isFirebaseConfigured || !db) return;

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

    // Sync actual total registered users count
    try {
      const usersSnap = await getCountFromServer(collection(db, 'users'));
      const realUserCount = usersSnap.data().count;
      const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_REF);
      await setDoc(
        statsRef,
        {
          registeredUsers: realUserCount,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch {
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
    }
  } catch (error) {
    // Ignore permissions or offline issues
  }
}

/**
 * Record skill download or CLI install event
 */
export async function recordDownload(skillSlug?: string, count: number = 1): Promise<void> {
  // Track real installs locally
  const localInstalls = parseInt(localStorage.getItem('domoskills_real_installs') || '0', 10) + count;
  localStorage.setItem('domoskills_real_installs', localInstalls.toString());

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('domoskills-install-recorded', { detail: { skillSlug, count } })
    );
  }

  if (!isFirebaseConfigured || !db) return;

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
 * Format real number with compact notation only if >= 1000
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
 * React Hook: Realtime Registry & Global Metrics
 */
export function useLiveTelemetry() {
  const [stats, setStats] = useState<TelemetryStats>(REAL_BASELINE_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    if (!isFirebaseConfigured || !db) {
      setLoading(false);
      return;
    }

    try {
      const statsRef = doc(db, STATS_COLLECTION, STATS_DOC_REF);

      // Real-time listener on registry stats document
      const unsubscribe = onSnapshot(
        statsRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            setStats((prev) => ({
              totalVisits: typeof data.totalVisits === 'number' ? Math.max(prev.totalVisits, data.totalVisits) : prev.totalVisits,
              registeredUsers: typeof data.registeredUsers === 'number' ? data.registeredUsers : prev.registeredUsers,
              totalInstalls: typeof data.totalInstalls === 'number' ? Math.max(prev.totalInstalls, data.totalInstalls) : prev.totalInstalls,
              updatedAt: data.updatedAt,
            }));
          }
          setLoading(false);
        },
        () => {
          setLoading(false);
        }
      );

      // Query actual users collection count for 100% ground truth
      const usersCollection = collection(db, 'users');
      getCountFromServer(usersCollection)
        .then((userCountSnap) => {
          const actualCount = userCountSnap.data().count;
          setStats((prev) => ({
            ...prev,
            registeredUsers: actualCount,
          }));

          // Sync back to stats document if needed
          setDoc(
            statsRef,
            {
              registeredUsers: actualCount,
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          ).catch(() => {});
        })
        .catch(() => {});

      return () => unsubscribe();
    } catch {
      setLoading(false);
    }
  }, []);

  // Instant local listeners for visit, install, and user registration actions
  useEffect(() => {
    const handleInstallEvent = (e: any) => {
      const added = e.detail?.count || 1;
      setStats((prev) => ({
        ...prev,
        totalInstalls: prev.totalInstalls + added,
      }));
    };

    const handleVisitEvent = (e: any) => {
      const count = e.detail?.count;
      if (typeof count === 'number') {
        setStats((prev) => ({
          ...prev,
          totalVisits: Math.max(prev.totalVisits, count),
        }));
      }
    };

    const handleUserEvent = () => {
      setStats((prev) => ({
        ...prev,
        registeredUsers: prev.registeredUsers + 1,
      }));
    };

    window.addEventListener('domoskills-install-recorded', handleInstallEvent);
    window.addEventListener('domoskills-visit-recorded', handleVisitEvent);
    window.addEventListener('domoskills-user-recorded', handleUserEvent);

    return () => {
      window.removeEventListener('domoskills-install-recorded', handleInstallEvent);
      window.removeEventListener('domoskills-visit-recorded', handleVisitEvent);
      window.removeEventListener('domoskills-user-recorded', handleUserEvent);
    };
  }, []);

  return {
    ...stats,
    loading,
    formattedVisits: formatMetric(stats.totalVisits),
    formattedUsers: formatMetric(stats.registeredUsers),
    formattedInstalls: formatMetric(stats.totalInstalls),
  };
}

export interface StackReceiptData {
  manifestId: string;
  userId?: string | null;
  userEmail?: string | null;
  targetAgent: string;
  skills: Array<{
    slug: string;
    name: string;
    category: string;
    version?: string;
    license: string;
  }>;
  totalSkills: number;
  installCommand: string;
  createdAt?: string;
}

/**
 * Record a confirmed stack receipt in cloud registry and local storage
 */
export async function recordStackReceipt(data: StackReceiptData): Promise<{ success: boolean; manifestId: string }> {
  const manifestId = data.manifestId || `DOMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // 1. Save to local storage history
  if (typeof window !== 'undefined') {
    try {
      const existing = JSON.parse(localStorage.getItem('domoskills_stack_receipts') || '[]');
      const updated = [{ ...data, manifestId, createdAt: new Date().toISOString() }, ...existing].slice(0, 50);
      localStorage.setItem('domoskills_stack_receipts', JSON.stringify(updated));
    } catch {}
  }

  // Record metrics count
  recordDownload(undefined, Math.max(1, data.skills.length));

  // 2. Save to cloud registry if configured
  if (isFirebaseConfigured && db) {
    try {
      const receiptDocRef = doc(db, 'stacks', manifestId);
      await setDoc(
        receiptDocRef,
        {
          ...data,
          manifestId,
          confirmedAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Stack receipt sync warning:', err);
    }
  }

  return { success: true, manifestId };
}
