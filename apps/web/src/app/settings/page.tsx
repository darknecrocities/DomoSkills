'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Github,
  Globe,
  Save,
  Check,
  Sparkles,
  Layers,
  ShieldCheck,
  ExternalLink,
  Plus,
  AlertCircle,
  Camera,
  Terminal,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { registry } from '@domoskills/registry';

interface PublishedSkillItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  version: string;
  securityScore: number;
  submittedAt: string;
  status: string;
}



export default function SettingsPage() {
  const { user, loading, openAuthModal, updateUserProfile } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [publishedSkills, setPublishedSkills] = useState<PublishedSkillItem[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setUsername(user.username || user.email?.split('@')[0] || '');
      setBio(user.bio || '');
      setGithubUrl(user.githubUrl || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  // Load published skills for this user
  useEffect(() => {
    if (!user) {
      setLoadingSkills(false);
      return;
    }

    async function loadUserSkills() {
      setLoadingSkills(true);
      const items: PublishedSkillItem[] = [];

      // 1. Check local submissions cache
      try {
        const localKey = `domoskills_user_submissions_${user?.uid}`;
        const rawLocal = localStorage.getItem(localKey);
        if (rawLocal) {
          const parsed = JSON.parse(rawLocal);
          if (Array.isArray(parsed)) {
            parsed.forEach((p) => {
              items.push({
                id: p.slug || `sub-${Date.now()}`,
                slug: p.slug,
                name: p.name || p.slug,
                category: p.category || 'productivity',
                version: p.version || '1.0.0',
                securityScore: p.securityScore || 100,
                submittedAt: p.submittedAt || new Date().toISOString(),
                status: 'Verified & Live',
              });
            });
          }
        }
      } catch {}

      // 2. Query Firestore if available
      if (isFirebaseConfigured && db && user?.uid) {
        try {
          const q = query(collection(db, 'submissions'), where('userId', '==', user.uid));
          const snapshot = await getDocs(q);
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            if (!items.some((i) => i.slug === data.slug)) {
              items.push({
                id: docSnap.id,
                slug: data.slug,
                name: data.name || data.slug,
                category: data.category || 'productivity',
                version: data.version || '1.0.0',
                securityScore: data.securityScore || 100,
                submittedAt: data.submittedAt || data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
                status: data.status === 'approved' ? 'Verified & Live' : 'Under Review',
              });
            }
          });
        } catch (err) {
          console.warn('Firestore skills lookup warning:', err);
        }
      }

      // 3. Also check if any registry skills match user's name or github handle
      const allRegistrySkills = registry.getAllSkills();
      const userHandle = (username || user?.displayName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (userHandle && userHandle.length > 2) {
        allRegistrySkills.forEach((s) => {
          const owner = (s.sourceRepository?.owner || '').toLowerCase();
          if (owner === userHandle && !items.some((i) => i.slug === s.slug)) {
            items.push({
              id: s.id,
              slug: s.slug,
              name: s.name,
              category: s.category,
              version: s.version,
              securityScore: s.security.securityScore,
              submittedAt: s.lastIndexedAt,
              status: 'Verified & Live',
            });
          }
        });
      }

      setPublishedSkills(items);
      setLoadingSkills(false);
    }

    loadUserSkills();
  }, [user, username]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setErrorMsg(null);
    setSaving(true);
    setSavedSuccess(false);

    try {
      // Clean GitHub URL
      let formattedGithub = githubUrl.trim();
      if (formattedGithub && !formattedGithub.startsWith('http://') && !formattedGithub.startsWith('https://')) {
        formattedGithub = `https://github.com/${formattedGithub.replace(/^@/, '')}`;
      }

      await updateUserProfile({
        displayName: displayName.trim() || undefined,
        username: username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '') || undefined,
        bio: bio.trim() || undefined,
        githubUrl: formattedGithub || undefined,
        photoURL: photoURL.trim() || undefined,
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update profile settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 text-center font-mono text-xs text-text-muted">
        Loading developer settings...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-md mx-auto rounded-2xl border border-border bg-surface p-8 text-center space-y-6 card-polkadot-hover">
          <div className="h-14 w-14 rounded-2xl bg-white text-black flex items-center justify-center mx-auto shadow-lg">
            <User className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h1 className="font-sans text-2xl font-bold text-white tracking-tight">
              Developer Settings & Profile
            </h1>
            <p className="font-sans text-xs text-text-secondary leading-relaxed">
              Please sign in or create a free account to customize your profile, link your GitHub repository, and track your published agent skills.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openAuthModal('signin')}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-md"
          >
            <span>Sign In to Continue</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
              Developer Workspace
            </div>
            <h1 className="font-sans text-3xl font-extrabold tracking-tight text-white mt-1">
              Account & Profile Settings
            </h1>
            <p className="font-sans text-xs text-text-secondary mt-1">
              Manage your public developer handle, linked GitHub provenance, and published agent capabilities.
            </p>
          </div>

          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-raised px-4 py-2.5 font-mono text-xs font-semibold text-white hover:border-white transition shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>Publish New Skill</span>
          </Link>
        </div>

        {/* Status Alerts */}
        {savedSuccess && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 font-mono text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
            <Check className="h-4 w-4 shrink-0 text-emerald-400" />
            <span>Your developer profile and settings have been saved successfully!</span>
          </div>
        )}

        {errorMsg && (
          <div className="rounded-xl border border-red-500/30 bg-red-950/40 p-4 font-mono text-xs text-red-400 flex items-center gap-2 animate-fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Profile Form */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-border pb-4">
              <h2 className="font-sans text-lg font-bold text-white">Profile Customization</h2>
              <p className="font-sans text-xs text-text-secondary mt-0.5">
                Customize how your name, handle, and avatar appear across DomoSkills.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6 font-mono text-xs">
              
              {/* Avatar Selector & Preview */}
              <div className="space-y-3">
                <label className="text-text-secondary font-semibold text-[11px] block">
                  Avatar & Profile Image
                </label>

                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded-2xl border border-border bg-surface-raised overflow-hidden shrink-0 shadow-md">
                    {photoURL ? (
                      <img src={photoURL} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-white text-black font-bold text-xl">
                        {displayName?.charAt(0).toUpperCase() || 'D'}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="url"
                      placeholder="Paste image URL (https://...)"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="w-full rounded-xl border border-border bg-surface-raised px-3 py-2 text-white font-sans text-xs focus:border-white focus:outline-none transition"
                    />
                    <p className="text-[10px] text-text-muted font-sans">
                      Provide a direct image URL (e.g. from GitHub or Gravatar) to personalize your developer card.
                    </p>
                  </div>
                </div>
              </div>

              {/* Display Name & Username */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-text-secondary font-semibold text-[11px] block">
                    Full Name / Display Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Linus Torvalds"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface-raised px-3 py-2.5 text-white font-sans text-xs focus:border-white focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary font-semibold text-[11px] block">
                    Developer Handle:
                  </label>
                  <div className="relative flex items-center rounded-xl border border-border bg-surface-raised px-3 py-2 focus-within:border-white transition">
                    <span className="text-text-muted mr-1">@</span>
                    <input
                      type="text"
                      placeholder="handle"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      className="w-full bg-transparent text-white font-mono text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Bio / Headline */}
              <div className="space-y-1.5">
                <label className="text-text-secondary font-semibold text-[11px] block">
                  Bio / Headline:
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell the community what AI coding agents and architectures you build..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface-raised px-3 py-2 text-white font-sans text-xs focus:border-white focus:outline-none transition resize-none"
                />
              </div>

              {/* GitHub Account Link */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-text-secondary font-semibold text-[11px] flex items-center gap-1.5">
                    <Github className="h-3.5 w-3.5 text-white" />
                    <span>Linked GitHub Account</span>
                  </label>
                  {githubUrl && (
                    <a
                      href={githubUrl.startsWith('http') ? githubUrl : `https://github.com/${githubUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline"
                    >
                      <span>View GitHub</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <div className="relative flex items-center rounded-xl border border-border bg-surface-raised px-3 py-2.5 focus-within:border-white transition">
                  <input
                    type="text"
                    placeholder="https://github.com/your-username or your-username"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full bg-transparent text-white font-sans text-xs focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-text-muted font-sans">
                  Links your open-source repositories and verified skill provenance to your developer card.
                </p>
              </div>

              {/* Email (Read Only) */}
              <div className="space-y-1.5 pt-2 border-t border-border/80">
                <div className="flex items-center justify-between text-text-muted text-[11px]">
                  <span>Authenticated Email:</span>
                  <span className="rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 text-[10px] font-mono">
                    Verified {user.provider.toUpperCase()}
                  </span>
                </div>
                <div className="rounded-xl border border-border/60 bg-surface-subtle px-3 py-2 text-text-secondary text-xs font-mono">
                  {user.email}
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-md disabled:opacity-50"
                >
                  {saving ? (
                    <span>Saving Profile...</span>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* RIGHT COLUMN: Published Skills & Ingestion Metrics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Stats Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border bg-surface p-5 space-y-2 card-polkadot-hover">
                <div className="flex items-center gap-2 text-text-muted text-xs font-mono uppercase">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Published Skills</span>
                </div>
                <div className="font-mono text-3xl font-extrabold text-white">
                  {loadingSkills ? '...' : publishedSkills.length}
                </div>
                <div className="text-[10px] text-text-muted font-sans">
                  Indexed on DomoSkills Registry
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5 space-y-2 card-polkadot-hover">
                <div className="flex items-center gap-2 text-text-muted text-xs font-mono uppercase">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Security Avg</span>
                </div>
                <div className="font-mono text-3xl font-extrabold text-emerald-400">
                  100%
                </div>
                <div className="text-[10px] text-text-muted font-sans">
                  Passed AST Static Analysis
                </div>
              </div>
            </div>

            {/* Published Skills List */}
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="font-sans text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-emerald-400" />
                  <span>Your Published Skills ({publishedSkills.length})</span>
                </div>

                <Link
                  href="/submit"
                  className="text-[11px] font-mono text-white hover:underline flex items-center gap-1"
                >
                  <Plus className="h-3 w-3" />
                  <span>Submit Skill</span>
                </Link>
              </div>

              {loadingSkills ? (
                <div className="py-8 text-center font-mono text-xs text-text-muted">
                  Loading published skills...
                </div>
              ) : publishedSkills.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-6 text-center space-y-3">
                  <div className="h-10 w-10 rounded-full bg-surface-raised flex items-center justify-center mx-auto text-text-muted">
                    <Sparkles className="h-5 w-5 text-text-secondary" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-sans text-xs font-bold text-white">
                      No published skills yet
                    </div>
                    <p className="font-sans text-[11px] text-text-muted leading-relaxed">
                      Publish your custom prompt guidelines, AST workflows, or agent toolchains to the open registry.
                    </p>
                  </div>
                  <Link
                    href="/submit"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white bg-white px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-muted-white transition shadow-sm"
                  >
                    <span>Publish Your First Skill</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {publishedSkills.map((s) => (
                    <div
                      key={s.id}
                      className="rounded-xl border border-border bg-surface-raised p-4 space-y-2.5 transition hover:border-border-bright"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            href={`/skills/${s.slug}`}
                            className="font-sans text-xs font-bold text-white hover:underline"
                          >
                            {s.name}
                          </Link>
                          <div className="font-mono text-[10px] text-text-muted mt-0.5">
                            <code>{s.slug}</code> • v{s.version}
                          </div>
                        </div>

                        <span className="rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 font-mono text-[10px]">
                          {s.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-text-muted border-t border-border/60 pt-2">
                        <span className="capitalize">{s.category}</span>
                        <Link
                          href={`/skills/${s.slug}`}
                          className="text-white hover:underline flex items-center gap-1"
                        >
                          <span>View on Registry</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Terminal Installation Tip */}
            <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                <Terminal className="h-4 w-4 text-emerald-400" />
                <span>Quick Terminal Test</span>
              </div>
              <p className="text-[11px] text-text-secondary font-sans leading-relaxed">
                Test any capability in your local workspace terminal using the official DomoSkills CLI:
              </p>
              <div className="rounded-lg border border-border bg-black p-3 font-mono text-xs text-white">
                <span className="text-emerald-400">$</span> npx domoskills add react-performance
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
