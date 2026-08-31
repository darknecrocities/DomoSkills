'use client';

import React from 'react';
import {
  Sparkles,
  Terminal,
  Cpu,
  Code2,
  Layers,
  Bot,
  Zap,
  Globe,
} from 'lucide-react';

interface AgentBrand {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
  color: string;
}

const AGENT_BRANDS: AgentBrand[] = [
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    badge: 'AI Coding Agent',
    icon: <Sparkles className="h-4 w-4 text-purple-400" />,
    color: 'border-purple-500/30 bg-purple-950/20 text-purple-200',
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    badge: 'Anthropic Terminal Agent',
    icon: <Terminal className="h-4 w-4 text-orange-400" />,
    color: 'border-orange-500/30 bg-orange-950/20 text-orange-200',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    badge: 'AI Code Editor',
    icon: <Code2 className="h-4 w-4 text-cyan-400" />,
    color: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    badge: 'GPT Coding Engine',
    icon: <Cpu className="h-4 w-4 text-emerald-400" />,
    color: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200',
  },
  {
    id: 'codex',
    name: 'OpenAI Codex',
    badge: 'Agent Synthesis',
    icon: <Bot className="h-4 w-4 text-teal-400" />,
    color: 'border-teal-500/30 bg-teal-950/20 text-teal-200',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    badge: 'Universal Open Agent',
    icon: <Layers className="h-4 w-4 text-pink-400" />,
    color: 'border-pink-500/30 bg-pink-950/20 text-pink-200',
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    badge: 'Google Multi-Agent',
    icon: <Globe className="h-4 w-4 text-blue-400" />,
    color: 'border-blue-500/30 bg-blue-950/20 text-blue-200',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    badge: 'Cascade Agent IDE',
    icon: <Zap className="h-4 w-4 text-yellow-400" />,
    color: 'border-yellow-500/30 bg-yellow-950/20 text-yellow-200',
  },
];

export function AgentBeltCarousel() {
  // Duplicate for seamless infinite marquee loop
  const brandsList = [...AGENT_BRANDS, ...AGENT_BRANDS, ...AGENT_BRANDS];

  return (
    <div className="relative w-full overflow-hidden border-y border-border bg-surface/80 backdrop-blur-sm py-5">
      
      {/* Left Blur & Fade-out Gradient Overlay */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-24 sm:w-40 bg-gradient-to-r from-background via-background/90 to-transparent backdrop-blur-[1px]" />
      
      {/* Right Blur & Fade-out Gradient Overlay */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-24 sm:w-40 bg-gradient-to-l from-background via-background/90 to-transparent backdrop-blur-[1px]" />

      {/* Marquee Belt Container */}
      <div className="animate-belt-marquee flex items-center gap-6">
        {brandsList.map((brand, idx) => (
          <div
            key={`${brand.id}-${idx}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface-raised px-4 py-2.5 font-mono text-xs shadow-sm transition hover:border-white/50 hover:scale-105 hover:bg-surface select-none shrink-0"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-surface">
              {brand.icon}
            </div>
            
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tight text-sm">
                {brand.name}
              </span>
              <span className="text-[10px] text-text-muted">
                {brand.badge}
              </span>
            </div>

            <div className="ml-2 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        ))}
      </div>

    </div>
  );
}
