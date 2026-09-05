'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, Github, User, LogOut, Sparkles, Layers, ChevronDown, Star, Settings } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';
import { useGitHubStars } from '@/lib/useGitHubStars';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { skills, isDrawerOpen, setDrawerOpen } = useCartStore();
  const { user, openAuthModal, logout } = useAuth();
  const { formattedStars } = useGitHubStars();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger top route switch progress sweep animation on page change
  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  const cartCount = mounted ? skills.length : 0;
  const currentUser = mounted ? user : null;

  const navLinks = [
    { href: '/explore', label: 'Explore Skills' },
    { href: '/doctor', label: 'Agent Doctor' },
    { href: '/submit', label: 'Submit Skill' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      {/* Top Page Switch Glow Progress Bar */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1, transformOrigin: '0% 50%' }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-white to-emerald-400 z-50 shadow-[0_0_10px_rgba(255,255,255,0.7)] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo with DomoDomo App Icon */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-white/20 bg-surface-raised transition group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]">
              <img
                src="/assets/domodomo/domodomo-app-icon.png"
                alt="DomoDomo App Icon"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="font-mono text-base font-bold tracking-tight text-white sm:text-lg">
              DOMOSKILLS<span className="animate-cursor-blink text-text-muted">_</span>
            </div>
          </Link>

          {/* Desktop Nav Links with Gliding Spring Pill Animation */}
          <nav
            onMouseLeave={() => setHoveredHref(null)}
            className="hidden md:flex items-center gap-1 p-1 rounded-xl border border-border/80 bg-surface/80 backdrop-blur-md"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredHref === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  className="relative px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-wider rounded-lg transition-colors group"
                >
                  {/* Gliding Active Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-lg bg-surface-active border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)] z-0"
                    />
                  )}

                  {/* Active Bottom Glow Accent Line */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-glow"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 32,
                      }}
                      className="absolute -bottom-[1px] left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent z-10"
                    />
                  )}

                  {/* Subtle Hover Highlight when inactive */}
                  {isHovered && !isActive && (
                    <motion.div
                      layoutId="navbar-hover-pill"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0 rounded-lg bg-surface-raised/70 border border-border/50 z-0"
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-text-secondary group-hover:text-white'
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Quick Search Shortcut Trigger */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-3 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-muted transition hover:border-border-bright hover:text-text-secondary"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search skills...</span>
            <kbd className="rounded border border-border bg-surface-raised px-1.5 py-0.5 text-[10px] text-text-secondary">
              ⌘K
            </kbd>
          </button>

          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="flex sm:hidden p-1.5 rounded border border-border text-text-secondary hover:text-white hover:bg-surface-raised"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* GitHub Star Link with Dynamic Star Count */}
          <a
            href="https://github.com/darknecrocities/DomoSkills"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-white transition hover:border-white hover:bg-surface-raised group shadow-sm"
            title="Star DomoSkills on GitHub"
          >
            <Github className="h-3.5 w-3.5 text-text-secondary group-hover:text-white" />
            <span className="font-semibold">Star</span>
            <span className="inline-flex items-center gap-1 rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white group-hover:bg-white/20 transition">
              <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
              <span suppressHydrationWarning>{formattedStars}</span>
            </span>
          </a>

          {/* Skill Stack Cart Button */}
          <button
            id="navbar-cart-btn"
            type="button"
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            className={`relative flex items-center gap-1.5 sm:gap-2 rounded border px-2.5 sm:px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition ${
              cartCount > 0
                ? 'border-white bg-white text-black hover:bg-muted-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                : 'border-border bg-surface text-text-secondary hover:border-border-bright hover:text-white'
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="hidden xs:inline">Stack</span>
            {cartCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth Section */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-border bg-surface-raised px-2.5 py-1.5 font-mono text-xs text-white hover:border-white transition"
              >
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt={currentUser.displayName || 'User'} className="h-5 w-5 rounded-full object-cover" />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black font-bold text-[10px]">
                    {currentUser.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <span className="hidden sm:inline font-bold">{currentUser.displayName || 'Developer'}</span>
                <ChevronDown className="h-3 w-3 text-text-muted" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-surface-raised p-2 shadow-2xl z-50 font-mono text-xs animate-fade-in"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-border/80 text-text-muted text-[11px]">
                    Signed in as <br />
                    <span className="text-white font-bold truncate block">{currentUser.email}</span>
                  </div>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-3 py-2 rounded text-text-secondary hover:text-white hover:bg-surface transition mt-1"
                  >
                    <Settings className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Profile & Settings</span>
                  </Link>
                  <Link
                    href="/explore"
                    className="flex items-center gap-2 px-3 py-2 rounded text-text-secondary hover:text-white hover:bg-surface transition"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>My Stacks & Cart</span>
                  </Link>
                  <Link
                    href="/submit"
                    className="flex items-center gap-2 px-3 py-2 rounded text-text-secondary hover:text-white hover:bg-surface transition"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Publish Agent Skill</span>
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded text-red-400 hover:text-red-300 hover:bg-red-950/30 transition text-left mt-1 border-t border-border/60"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal('signin')}
              className="flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-white hover:border-white hover:bg-surface-raised transition shadow-sm"
            >
              <User className="h-3.5 w-3.5 text-emerald-400" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden p-2 rounded border border-border text-text-secondary hover:text-white hover:bg-surface-raised"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Fluid Slide/Fade Transition */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-border bg-surface-raised px-4 py-4 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-1.5 font-mono text-xs">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 uppercase tracking-wider rounded-lg transition-colors ${
                      isActive
                        ? 'bg-surface-active text-white font-bold border border-white/20 shadow-sm'
                        : 'text-text-secondary hover:bg-surface hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    )}
                  </Link>
                );
              })}
              {!currentUser ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signin');
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-left uppercase tracking-wider text-emerald-400 hover:bg-surface rounded-lg font-bold transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In / Register</span>
                </button>
              ) : (
                <>
                  <Link
                    href="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 uppercase tracking-wider text-cyan-400 hover:bg-surface rounded-lg font-bold transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Profile & Settings</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-left uppercase tracking-wider text-red-400 hover:bg-surface rounded-lg font-bold transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out ({currentUser.displayName})</span>
                  </button>
                </>
              )}
              <a
                href="https://github.com/darknecrocities/DomoSkills"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 uppercase tracking-wider text-text-secondary hover:bg-surface hover:text-white rounded-lg transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
