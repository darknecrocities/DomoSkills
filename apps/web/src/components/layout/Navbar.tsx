'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Github,
  User,
  LogOut,
  Layers,
  ChevronDown,
  Star,
  Settings,
  ExternalLink,
  Wrench,
  Stethoscope,
  PlusCircle,
  FolderTree,
} from 'lucide-react';
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
  const [mobileExploreExpanded, setMobileExploreExpanded] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const exploreDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger top route switch progress sweep animation on page change
  useEffect(() => {
    setIsNavigating(true);
    setExploreDropdownOpen(false);
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    const timer = setTimeout(() => setIsNavigating(false), 450);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        exploreDropdownRef.current &&
        !exploreDropdownRef.current.contains(event.target as Node)
      ) {
        setExploreDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setUserDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setExploreDropdownOpen(false);
        setUserDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseEnterExplore = () => {
    if (dropdownCloseTimerRef.current) {
      clearTimeout(dropdownCloseTimerRef.current);
      dropdownCloseTimerRef.current = null;
    }
    setExploreDropdownOpen(true);
  };

  const handleMouseLeaveExplore = () => {
    dropdownCloseTimerRef.current = setTimeout(() => {
      setExploreDropdownOpen(false);
    }, 180);
  };

  const cartCount = mounted ? skills.length : 0;
  const currentUser = mounted ? user : null;

  const standardNavLinks = [
    { href: '/doctor', label: 'Agent Doctor' },
    { href: '/submit', label: 'Submit Skill' },
  ];

  const quickCategories = [
    { label: 'Frontend', href: '/explore?category=frontend' },
    { label: 'Security', href: '/explore?category=security' },
    { label: 'AI & ML', href: '/explore?category=ai-ml' },
    { label: 'DevOps', href: '/explore?category=devops' },
  ];

  const isExploreActive = pathname.startsWith('/explore');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-md">
      {/* Top Page Switch Glow Progress Bar - Strict Monochrome */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1, transformOrigin: '0% 50%' }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/20 via-white to-white/20 z-50 shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo with DomoSkills Official Icon */}
        <div className="flex items-center gap-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-white/20 bg-surface-raised transition group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]">
              <img
                src="/official_domoskills_icon.png"
                alt="DomoSkills"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="font-mono text-base font-bold tracking-tight text-white sm:text-lg">
              DOMOSKILLS<span className="animate-cursor-blink text-text-muted">_</span>
            </div>
          </Link>

          {/* Desktop Nav with Black and White Explore Skills Dropdown */}
          <nav
            onMouseLeave={() => setHoveredHref(null)}
            className="hidden md:flex items-center gap-1 p-1 rounded-xl border border-border bg-surface backdrop-blur-md"
          >
            {/* 1. Explore Skills Interactive Dropdown Button */}
            <div
              ref={exploreDropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnterExplore}
              onMouseLeave={handleMouseLeaveExplore}
            >
              <button
                type="button"
                id="explore-skills-dropdown-btn"
                aria-expanded={exploreDropdownOpen}
                aria-haspopup="true"
                onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                onMouseEnter={() => setHoveredHref('/explore')}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-wider rounded-lg transition-colors group ${
                  isExploreActive || exploreDropdownOpen
                    ? 'text-white font-bold'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {/* Active Pill Background */}
                {isExploreActive && (
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

                {/* Active Bottom Glow Line */}
                {isExploreActive && (
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

                {/* Hover Pill Highlight */}
                {hoveredHref === '/explore' && !isExploreActive && (
                  <motion.div
                    layoutId="navbar-hover-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 rounded-lg bg-surface-raised border border-border z-0"
                  />
                )}

                <span className="relative z-10">Explore Skills</span>
                <ChevronDown
                  className={`relative z-10 h-3 w-3 transition-transform duration-200 ${
                    exploreDropdownOpen ? 'rotate-180 text-white' : 'text-text-muted group-hover:text-white'
                  }`}
                />
              </button>

              {/* Dropdown Floating Menu - Strict Black & White Theme */}
              <AnimatePresence>
                {exploreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-0 top-full mt-2 w-[340px] sm:w-[380px] rounded-xl border border-border bg-surface-raised p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(255,255,255,0.06)] z-50 font-mono"
                  >
                    {/* Featured Companion Card: DomoDomo */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between px-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                        <span>Sister Suite</span>
                        <span className="rounded border border-white/20 bg-white text-black px-1.5 py-0.2 text-[9px] font-bold">
                          TOOLS
                        </span>
                      </div>

                      <a
                        href="https://domodomo.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setExploreDropdownOpen(false)}
                        className="group flex items-start gap-3 rounded-lg border border-white/20 bg-surface p-2.5 transition hover:border-white hover:bg-surface-active hover:shadow-[0_0_15px_rgba(255,255,255,0.12)]"
                      >
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border border-white/20 bg-surface-raised group-hover:border-white">
                          <img
                            src="/assets/domodomo/domodomo-app-icon.png"
                            alt="DomoDomo"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:underline">
                            <span>DomoDomo — Web & Agent Tools</span>
                            <ExternalLink className="h-3 w-3 text-text-muted transition group-hover:text-white group-hover:translate-x-0.5" />
                          </div>
                          <p className="mt-1 font-sans text-[11px] text-text-secondary leading-snug">
                            Everyday browser utilities, format converters, and agent toolbox at domodomo.site
                          </p>
                        </div>
                      </a>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-border my-2.5" />

                    {/* DomoSkills Registry Section */}
                    <div className="space-y-1">
                      <div className="px-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                        DomoSkills Registry
                      </div>

                      <Link
                        href="/explore"
                        onClick={() => setExploreDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-text-secondary hover:bg-surface hover:text-white transition group border border-transparent hover:border-border"
                      >
                        <Layers className="h-4 w-4 text-white shrink-0" />
                        <div className="flex-1">
                          <div className="text-white group-hover:underline font-bold">
                            Browse All 1,000+ Skills
                          </div>
                          <div className="font-sans text-[11px] text-text-muted">
                            Search, filter, and stack agent capabilities
                          </div>
                        </div>
                      </Link>

                      {/* Quick Category Filters */}
                      <div className="pt-2 px-1">
                        <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-text-muted mb-1.5">
                          <FolderTree className="h-2.5 w-2.5" />
                          <span>Filter By Category</span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {quickCategories.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              onClick={() => setExploreDropdownOpen(false)}
                              className="rounded border border-border bg-surface px-2.5 py-1.5 text-[11px] text-text-secondary hover:border-white hover:text-white hover:bg-surface-active transition text-center"
                            >
                              {cat.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Quick Tools */}
                    <div className="border-t border-border mt-2.5 pt-2 flex items-center justify-between px-1 text-[11px] text-text-muted">
                      <Link
                        href="/doctor"
                        onClick={() => setExploreDropdownOpen(false)}
                        className="flex items-center gap-1 hover:text-white transition"
                      >
                        <Stethoscope className="h-3 w-3" />
                        <span>Agent Doctor</span>
                      </Link>
                      <Link
                        href="/submit"
                        onClick={() => setExploreDropdownOpen(false)}
                        className="flex items-center gap-1 hover:text-white transition"
                      >
                        <PlusCircle className="h-3 w-3" />
                        <span>Submit Skill</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Standard Nav Links (Doctor, Submit) */}
            {standardNavLinks.map((link) => {
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
                      className="absolute inset-0 rounded-lg bg-surface-raised border border-border z-0"
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
            className="hidden sm:flex items-center gap-3 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-muted transition hover:border-white hover:text-text-secondary"
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

          {/* GitHub Star Link with Dynamic Star Count - Monochrome */}
          <a
            href="https://github.com/darknecrocities/DomoSkills"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-white transition hover:border-white hover:bg-surface-raised group shadow-sm"
            title="Star DomoSkills on GitHub"
          >
            <Github className="h-3.5 w-3.5 text-text-secondary group-hover:text-white" />
            <span className="font-semibold">Star</span>
            <span className="inline-flex items-center gap-1 rounded border border-white/20 bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white group-hover:bg-white/20 transition">
              <Star className="h-2.5 w-2.5 fill-white text-white" />
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
                ? 'border-white bg-white text-black hover:bg-muted-white shadow-[0_0_15px_rgba(255,255,255,0.25)]'
                : 'border-border bg-surface text-text-secondary hover:border-white hover:text-white'
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

          {/* User Auth Section - Strict Monochrome */}
          {currentUser ? (
            <div ref={userDropdownRef} className="relative">
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
                  <div className="px-3 py-2 border-b border-border text-text-muted text-[11px]">
                    Signed in as <br />
                    <span className="text-white font-bold truncate block">{currentUser.email}</span>
                  </div>
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-3 py-2 rounded text-text-secondary hover:text-white hover:bg-surface transition mt-1"
                  >
                    <Settings className="h-3.5 w-3.5 text-white" />
                    <span>Profile & Settings</span>
                  </Link>
                  <Link
                    href="/explore"
                    className="flex items-center gap-2 px-3 py-2 rounded text-text-secondary hover:text-white hover:bg-surface transition"
                  >
                    <Layers className="h-3.5 w-3.5 text-white" />
                    <span>My Stacks & Cart</span>
                  </Link>
                  <Link
                    href="/submit"
                    className="flex items-center gap-2 px-3 py-2 rounded text-text-secondary hover:text-white hover:bg-surface transition"
                  >
                    <PlusCircle className="h-3.5 w-3.5 text-white" />
                    <span>Publish Agent Skill</span>
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded text-text-secondary hover:text-white hover:bg-surface transition text-left mt-1 border-t border-border"
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
              <User className="h-3.5 w-3.5 text-white" />
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

      {/* Mobile Drawer Menu with Fluid Slide/Fade Transition - Black & White Theme */}
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
              
              {/* Mobile Explore Accordion */}
              <div className="rounded-lg border border-border bg-surface overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileExploreExpanded(!mobileExploreExpanded)}
                  className="w-full flex items-center justify-between px-3 py-2.5 uppercase tracking-wider font-bold text-white hover:bg-surface-raised transition"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="h-3.5 w-3.5" />
                    <span>Explore Skills</span>
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-text-muted transition-transform ${
                      mobileExploreExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileExploreExpanded && (
                  <div className="border-t border-border bg-surface-raised px-3 py-2 space-y-2">
                    {/* DomoDomo External Link */}
                    <a
                      href="https://domodomo.site/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded border border-white/20 bg-surface text-white hover:border-white transition"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src="/assets/domodomo/domodomo-app-icon.png"
                          alt="DomoDomo"
                          className="h-5 w-5 rounded object-cover"
                        />
                        <div>
                          <div className="font-bold text-xs">DomoDomo Tools ↗</div>
                          <div className="font-sans text-[10px] text-text-muted">Web & Agent Toolbox</div>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-text-muted" />
                    </a>

                    {/* Catalog Link */}
                    <Link
                      href="/explore"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-2 py-1.5 rounded text-text-secondary hover:text-white hover:bg-surface text-xs font-semibold"
                    >
                      Browse All 1,000+ Skills
                    </Link>

                    {/* Category Shortcuts */}
                    <div className="grid grid-cols-2 gap-1 pt-1">
                      {quickCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-2 py-1 rounded border border-border bg-surface text-[10px] text-text-secondary hover:text-white text-center"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Standard Links in Mobile Drawer */}
              {standardNavLinks.map((link) => {
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
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </Link>
                );
              })}

              {/* DomoDomo Direct Link in Mobile Drawer */}
              <a
                href="https://domodomo.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3 py-2 uppercase tracking-wider text-white border border-white/10 hover:border-white rounded-lg transition-colors bg-surface"
              >
                <span className="flex items-center gap-2">
                  <Wrench className="h-3.5 w-3.5" />
                  <span>DomoDomo Tools</span>
                </span>
                <ExternalLink className="h-3 w-3 text-text-muted" />
              </a>

              {/* Auth / Profile in Mobile Drawer */}
              {!currentUser ? (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('signin');
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-left uppercase tracking-wider text-white hover:bg-surface rounded-lg font-bold transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In / Register</span>
                </button>
              ) : (
                <>
                  <Link
                    href="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 uppercase tracking-wider text-white hover:bg-surface rounded-lg font-bold transition-colors"
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
                    className="flex items-center gap-2 px-3 py-2 text-left uppercase tracking-wider text-text-secondary hover:text-white hover:bg-surface rounded-lg font-bold transition-colors"
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
