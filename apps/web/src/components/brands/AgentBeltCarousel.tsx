'use client';

import React from 'react';

interface AgentBrand {
  id: string;
  name: string;
  category: string;
  fontClass: string;
  logo: React.ReactNode;
}

const AGENT_BRANDS: AgentBrand[] = [
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    category: 'AI Coding Agent',
    fontClass: 'font-sans font-medium tracking-tight',
    logo: (
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
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
    ),
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    category: 'Anthropic Terminal',
    fontClass: 'font-[family-name:var(--font-anthropic)] font-medium tracking-tight text-[15px]',
    logo: (
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"
          stroke="#D97706"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'AI Code Editor',
    fontClass: 'font-mono font-bold tracking-tight',
    logo: (
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l9 5.5v9L12 22l-9-5.5v-9L12 2z" stroke="#38BDF8" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 2v20M21 7.5l-9 5M3 7.5l9 5" stroke="#38BDF8" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'Frontier AI',
    fontClass: 'font-[family-name:var(--font-openai)] font-bold tracking-wide',
    logo: (
      <svg className="h-6 w-6 shrink-0 text-white fill-white" viewBox="0 0 24 24">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1636a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813l-.0048 6.7227zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    ),
  },
  {
    id: 'codex',
    name: 'OpenAI Codex',
    category: 'Agent Synthesis',
    fontClass: 'font-mono font-bold tracking-tight',
    logo: (
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="#2DD4BF" strokeWidth="2" />
        <path d="M7 10l3 2-3 2M13 14h4" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    category: 'Universal Open Agent',
    fontClass: 'font-mono font-black tracking-wider',
    logo: (
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    category: 'Google Multi-Agent',
    fontClass: 'font-sans font-bold tracking-tight',
    logo: (
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4771 12 22C12 16.4771 16.4771 12 22 12C16.4771 12 12 7.52285 12 2Z" fill="url(#geminiGradMarqueeFinal)" />
        <defs>
          <linearGradient id="geminiGradMarqueeFinal" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60A5FA" />
            <stop offset="1" stopColor="#C084FC" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'Cascade Agent IDE',
    fontClass: 'font-sans font-bold tracking-wide',
    logo: (
      <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M2 13c3-4 6-4 9 0s6 4 9 0M2 18c3-4 6-4 9 0s6 4 9 0M2 8c3-4 6-4 9 0s6 4 9 0" stroke="#2DD4BF" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function AgentBeltCarousel() {
  // Exactly 2 identical halves for mathematically seamless 360-degree infinite loop (0% to -50%)
  const brandsList = [...AGENT_BRANDS, ...AGENT_BRANDS];

  return (
    <div className="relative w-full overflow-hidden border-y border-border bg-surface/50 backdrop-blur-md py-6">
      
      {/* Left Blur & Fade-out Gradient Overlay */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-28 sm:w-48 bg-gradient-to-r from-background via-background/80 to-transparent backdrop-blur-[2px]" />
      
      {/* Right Blur & Fade-out Gradient Overlay */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-28 sm:w-48 bg-gradient-to-l from-background via-background/80 to-transparent backdrop-blur-[2px]" />

      {/* Marquee Belt Track with company typography and authentic brand logos */}
      <div className="animate-belt-marquee flex items-center gap-12 sm:gap-16">
        {brandsList.map((brand, idx) => (
          <div
            key={`${brand.id}-${idx}`}
            className="group flex items-center gap-3.5 cursor-pointer select-none shrink-0 transition-transform duration-200 hover:scale-105"
          >
            <div className="flex h-8 w-8 items-center justify-center transition-transform duration-200 group-hover:scale-110">
              {brand.logo}
            </div>
            
            <div className="flex flex-col">
              <span className={`${brand.fontClass} text-white tracking-tight text-sm group-hover:text-emerald-400 transition-colors`}>
                {brand.name}
              </span>
              <span className="font-mono text-[10px] text-text-muted group-hover:text-text-secondary transition-colors">
                {brand.category}
              </span>
            </div>

            <div className="h-1 w-1 rounded-full bg-border-bright/40 ml-4 group-hover:bg-emerald-400 transition-colors" />
          </div>
        ))}
      </div>

    </div>
  );
}
