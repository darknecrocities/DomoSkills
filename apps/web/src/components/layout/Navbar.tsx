'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Terminal, ShoppingBag, Plus, Menu, X, Shield, Activity, Github } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const pathname = usePathname();
  const { skills, isDrawerOpen, setDrawerOpen } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = skills.length;

  const navLinks = [
    { href: '/explore', label: 'Explore Skills' },
    { href: '/doctor', label: 'Agent Doctor' },
    { href: '/submit', label: 'Submit Skill' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
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

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider transition rounded ${
                    isActive
                      ? 'bg-surface-active text-white border border-border-bright'
                      : 'text-text-secondary hover:text-white hover:bg-surface-raised'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          
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
            className="flex sm:hidden p-2 rounded border border-border text-text-secondary hover:text-white hover:bg-surface-raised"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* GitHub Star Link */}
          <a
            href="https://github.com/darknecrocities/DomoSkills"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-white transition hover:border-white hover:bg-surface-raised group"
          >
            <Github className="h-3.5 w-3.5 text-text-secondary group-hover:text-white" />
            <span className="font-semibold">Star</span>
            <span className="rounded bg-white/10 px-1.5 py-0.2 text-[10px] text-text-muted group-hover:text-white">
              GitHub
            </span>
          </a>

          {/* Skill Stack Cart Button */}
          <button
            type="button"
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            className={`relative flex items-center gap-2 rounded border px-3.5 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider transition ${
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-surface-raised px-4 py-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 font-mono text-sm uppercase tracking-wider text-text-secondary hover:bg-surface hover:text-white rounded"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/domoskills/domoskills"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 font-mono text-sm uppercase tracking-wider text-text-secondary hover:bg-surface hover:text-white rounded"
            >
              <Github className="h-4 w-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
