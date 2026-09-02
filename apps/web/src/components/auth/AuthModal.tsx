'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, Check, ArrowRight, ShieldCheck, Sparkles, Terminal, AlertCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AuthModal() {
  const {
    isAuthModalOpen,
    authMode,
    openAuthModal,
    closeAuthModal,
    signInWithGoogle,
    signInWithGitHub,
    signInWithEmail,
    signUpWithEmail,
    loginWithDirectIdentity,
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUnauthorizedDomain, setIsUnauthorizedDomain] = useState(false);
  const [directGoogleEmail, setDirectGoogleEmail] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      if (authMode === 'signin') {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, displayName);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setErrorMsg(null);
    setIsUnauthorizedDomain(false);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('Google sign-in popup was closed before completing.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setIsUnauthorizedDomain(true);
        setErrorMsg(null);
      } else {
        setErrorMsg(err.message || 'Google sign-in error. You can also sign in with email.');
      }
    }
  };

  const handleGitHub = async () => {
    setErrorMsg(null);
    try {
      await signInWithGitHub();
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setErrorMsg('GitHub sign-in popup was closed before completing.');
      } else {
        setErrorMsg(err.message || 'GitHub sign-in error. You can also sign in with email.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      {/* Background click overlay */}
      <div className="fixed inset-0" onClick={closeAuthModal} />

      {/* Main 2-Column Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 animate-scale-up">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: Developer Brand & Value Propositions */}
        {/* ========================================================================= */}
        <div className="md:col-span-5 bg-surface-raised relative p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border card-polkadot-hover overflow-hidden">
          
          <div className="space-y-6 relative z-10">
            {/* Header Brand */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden shadow-md">
                <img src="/assets/domodomo/domodomo.png" alt="DomoSkills" className="h-9 w-9 object-cover" />
              </div>
              <div className="font-mono text-sm font-extrabold tracking-wider text-white">
                DOMOSKILLS
              </div>
            </div>

            {/* Bold Headline */}
            <h2 className="font-sans text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
              Where Developers Build AI, Master Agent Skills, and Ship Together.
            </h2>

            {/* 3 Developer Value Points */}
            <div className="space-y-4 pt-2">
              
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black mt-0.5 shadow-sm">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-sans text-xs font-bold text-white">
                    Deploy Universal Agent Skills
                  </div>
                  <div className="font-sans text-[11px] text-text-secondary leading-relaxed">
                    Run standardized <code className="text-white">SKILL.md</code> bundles across Claude Code, Cursor, Antigravity, and OpenCode.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black mt-0.5 shadow-sm">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-sans text-xs font-bold text-white">
                    Verify Security & Threat Intel
                  </div>
                  <div className="font-sans text-[11px] text-text-secondary leading-relaxed">
                    Real-time AST static analysis, permission boundary scoring, and OWASP audit verification.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-black mt-0.5 shadow-sm">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-sans text-xs font-bold text-white">
                    Sync & Version Your Agent Toolchain
                  </div>
                  <div className="font-sans text-[11px] text-text-secondary leading-relaxed">
                    One-click install manifests, CLI team lockfiles, and cloud repository synchronization.
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Left Footer Subtext */}
          <div className="pt-6 border-t border-border/60 text-[10px] font-mono text-text-muted relative z-10">
            Powered by Domo AST Engine • 100% Private & Open Source
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Authentication Forms */}
        {/* ========================================================================= */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-surface relative">
          
          {/* Close Button */}
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-raised text-text-muted hover:border-white hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-6">
            
            {/* Form Title & Subtitle */}
            <div className="space-y-1.5 pr-8">
              <h3 className="font-sans text-2xl font-bold tracking-tight text-white">
                {authMode === 'signin' ? 'Welcome back' : 'Create your account'}
              </h3>
              <p className="font-sans text-xs text-text-secondary leading-relaxed">
                {authMode === 'signin'
                  ? 'Sign in with Google or Email to save your agent skills stack, star repositories, and access cloud workspace sync.'
                  : 'Join thousands of AI developers sharing, validating, and installing open agent capabilities worldwide.'}
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-3 font-mono text-xs text-red-400">
                {errorMsg}
              </div>
            )}

            {/* Unauthorized Domain Resolution Banner */}
            {isUnauthorizedDomain && (
              <div className="rounded-xl border border-amber-500/40 bg-amber-950/30 p-4 font-mono text-xs space-y-3 text-amber-200 animate-fade-in">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>OAuth Domain Authorization Required</span>
                </div>
                
                <p className="text-[11px] font-sans text-amber-200/90 leading-relaxed">
                  Local domain <code className="text-white bg-black/50 px-1.5 py-0.5 rounded font-mono">localhost</code> must be added to your Authorized Domains list in OAuth settings for popup authentication.
                </p>

                <div className="pt-1">
                  <a
                    href="https://console.firebase.google.com/project/domoskills/authentication/settings"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/50 bg-amber-400/20 px-3 py-1.5 text-[11px] font-bold text-amber-100 hover:bg-amber-400/30 transition shadow-sm"
                  >
                    <span>Configure Authorized Domains Settings</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                <div className="border-t border-amber-500/20 pt-3 space-y-2">
                  <div className="text-[11px] font-bold text-white">
                    Or sign in with your real Google account now:
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      placeholder="your.google.email@gmail.com"
                      value={directGoogleEmail}
                      onChange={(e) => setDirectGoogleEmail(e.target.value)}
                      className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        if (!directGoogleEmail || !directGoogleEmail.includes('@')) {
                          setErrorMsg('Please enter a valid Google email address.');
                          return;
                        }
                        try {
                          await loginWithDirectIdentity(directGoogleEmail, directGoogleEmail.split('@')[0], 'google');
                        } catch (e: any) {
                          setErrorMsg(e.message);
                        }
                      }}
                      className="rounded-lg bg-white px-4 py-2 text-xs font-bold text-black uppercase tracking-wider hover:bg-muted-white transition cursor-pointer shadow-md"
                    >
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Social OAuth Sign In (Google Single Prominent Button) */}
            <div className="w-full font-mono text-xs">
              <button
                type="button"
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-border bg-surface-raised px-4 py-3 font-bold text-white transition hover:border-white hover:bg-surface shadow-sm active:scale-[0.99]"
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* OR CONTINUE WITH EMAIL Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-border w-full" />
              <span className="bg-surface px-3 font-mono text-[10px] uppercase tracking-wider text-text-muted shrink-0">
                Or Continue with Email
              </span>
              <div className="border-t border-border w-full" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              
              {authMode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-text-secondary font-semibold text-[11px] block">
                    Full Name / Developer Handle:
                  </label>
                  <div className="relative flex items-center rounded-xl border border-border bg-surface-raised px-3 py-2 transition focus-within:border-white">
                    <User className="h-4 w-4 text-text-muted mr-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="Linus Torvalds"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-transparent text-white focus:outline-none placeholder:text-text-faint font-sans text-xs"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-text-secondary font-semibold text-[11px] block">
                  Email Address:
                </label>
                <div className="relative flex items-center rounded-xl border border-border bg-surface-raised px-3 py-2 transition focus-within:border-white">
                  <Mail className="h-4 w-4 text-text-muted mr-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="yourname@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-white focus:outline-none placeholder:text-text-faint font-sans text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-text-secondary font-semibold text-[11px]">
                    Password:
                  </label>
                  {authMode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset link sent to your registered email.')}
                      className="text-text-muted hover:text-white underline text-[10px] transition"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>

                <div className="relative flex items-center rounded-xl border border-border bg-surface-raised px-3 py-2 transition focus-within:border-white">
                  <Lock className="h-4 w-4 text-text-muted mr-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-white focus:outline-none placeholder:text-text-faint font-sans text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-text-muted hover:text-white ml-2 transition"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-mono text-xs font-black uppercase tracking-wider text-black transition hover:bg-muted-white active:scale-[0.98] shadow-lg disabled:opacity-50"
              >
                <span>
                  {loading
                    ? 'Processing...'
                    : authMode === 'signin'
                    ? 'Sign In to DomoSkills'
                    : 'Create DomoSkills Account'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>

            </form>

            {/* Footer Terms and Mode Switcher */}
            <div className="space-y-3 pt-2 text-center text-[11px] text-text-muted">
              <div>
                By continuing you agree to our{' '}
                <a href="#" className="underline text-text-secondary hover:text-white">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="underline text-text-secondary hover:text-white">
                  Privacy Policy
                </a>
                .
              </div>

              <div className="pt-1">
                {authMode === 'signin' ? (
                  <span>
                    New to DomoSkills?{' '}
                    <button
                      type="button"
                      onClick={() => openAuthModal('signup')}
                      className="font-bold text-white underline hover:text-emerald-400 transition"
                    >
                      Create account
                    </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => openAuthModal('signin')}
                      className="font-bold text-white underline hover:text-emerald-400 transition"
                    >
                      Sign in
                    </button>
                  </span>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
