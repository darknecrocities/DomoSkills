import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, Cpu, Code2, Github, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8">
          
          {/* Col 1: Brand & Manifesto */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-white/20 bg-surface-raised">
                <img
                  src="/assets/domodomo/domodomo-app-icon.png"
                  alt="DomoDomo App Icon"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="font-mono text-base font-bold tracking-tight text-white">
                DOMOSKILLS_
              </span>
            </div>
            <p className="max-w-md font-sans text-sm text-text-secondary leading-relaxed mb-6">
              The free, open-source capability registry and discovery marketplace for AI coding agents.
              Discover modular skills, stack capabilities, and install directly into your project in seconds.
            </p>
            <div className="inline-flex items-center gap-2 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-muted">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Open Community Registry • Verified Open-Source Skills</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-4">
              Registry
            </h3>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <Link href="/explore" className="text-text-secondary hover:text-white transition">
                  Browse All Skills
                </Link>
              </li>
              <li>
                <Link href="/explore?category=frontend" className="text-text-secondary hover:text-white transition">
                  Frontend & React
                </Link>
              </li>
              <li>
                <Link href="/explore?category=security" className="text-text-secondary hover:text-white transition">
                  OWASP & Security
                </Link>
              </li>
              <li>
                <Link href="/explore?category=ai-ml" className="text-text-secondary hover:text-white transition">
                  AI & RAG Architecture
                </Link>
              </li>
              <li>
                <Link href="/explore?category=devops" className="text-text-secondary hover:text-white transition">
                  Docker & Cloud CI
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Developer Tools */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-white mb-4">
              Developer Tools
            </h3>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <Link href="/doctor" className="text-text-secondary hover:text-white transition">
                  Agent Diagnostic Doctor
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-text-secondary hover:text-white transition">
                  Submit Skill Repository
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/darknecrocities/DomoSkills"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-text-secondary hover:text-white transition"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/darknecrocities/DomoSkills#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-text-secondary hover:text-white transition"
                >
                  <span>Documentation</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <div>
            © 2026 DomoSkills Open Source. Free and Community Driven.
          </div>
          <div className="flex items-center gap-4">
            <span>Built for Claude, Cursor, OpenCode & Universal Agents</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
