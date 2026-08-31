'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { registry } from '@domoskills/registry';

interface TerminalProps {
  initialCommand?: string;
  isInteractive?: boolean;
}

export function InteractiveTerminal({
  initialCommand = 'npx domoskills add react-performance owasp-agent-guardian',
  isInteractive = true,
}: TerminalProps) {
  const [copied, setCopied] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [domoQuote, setDomoQuote] = useState('Domo ready to run skills!');
  const [showQuote, setShowQuote] = useState(true);
  
  // 3D Physics Tilt State
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50, isHovered: false });

  const [history, setHistory] = useState<Array<{ command: string; output: string[] }>>([
    {
      command: 'npx domoskills add react-performance owasp-agent-guardian',
      output: [
        'DOMOSKILLS_ — The Open Agent Skills Registry',
        '[info] Resolving 2 skills for Universal Agent (.agent/skills)...',
        '[ok] Installed React Performance (react-performance) v1.4.2 [MIT]',
        '  > Location: .agent/skills/react-performance',
        '  > Source: domoskills/official-agent-skills (7f9a12c)',
        '[ok] Installed OWASP Top 10 Security Guardian (owasp-agent-guardian) v3.0.1 [MIT]',
        '  > Location: .agent/skills/owasp-agent-guardian',
        '  > Source: security-guardians/agent-security-skills (9e1a82b)',
        '',
        '[ok] Successfully added 2 skills to Universal Agent workspace!',
        'Your AI agent is now equipped with these capabilities.',
      ],
    },
  ]);

  const [activeTab, setActiveTab] = useState<'demo' | 'cli'>('demo');
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(initialCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 3D Tilt Physics Calculations
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 7.5; // Max 7.5deg tilt
    const rotY = ((x - centerX) / centerX) * 7.5;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ rotX, rotY, glareX, glareY, isHovered: true });
  };

  const handlePointerLeave = () => {
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50, isHovered: false });
  };

  const handleDomoClick = () => {
    const quotes = [
      'Type "help" to see all commands!',
      'Type "doctor" for diagnostics!',
      'Type "search react" for UI tools!',
      'Type "audit" for AST security analysis!',
      'Type "add drizzle-orm-master" to install!',
    ];
    const nextQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDomoQuote(nextQuote);
    setShowQuote(true);
    setActiveTab('cli');
    setInputVal('doctor');
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputVal.trim();
    if (!raw) return;

    const parts = raw.split(/\s+/);
    const cmd = parts[0] === 'npx' || parts[0] === 'domoskills' ? parts[1] || '' : parts[0];
    const arg1 = parts[0] === 'npx' || parts[0] === 'domoskills' ? parts[2] : parts[1];

    let outputLines: string[] = [];

    switch (cmd?.toLowerCase()) {
      case 'help':
        outputLines = [
          'DomoSkills CLI Playground Commands:',
          '  search [query]    - Search skills in open registry',
          '  add <skills...>   - Simulate installing skills into .agent/skills',
          '  list              - List installed agent capabilities',
          '  doctor            - Run agent diagnostic checks',
          '  audit             - Security audit of installed skills',
          '  clear             - Clear terminal screen',
        ];
        break;
      case 'search':
        const searchResults = registry.getSkills({ query: arg1 || '', limit: 4 });
        outputLines = [
          `Found ${searchResults.total} skills matching "${arg1 || ''}":`,
          ...searchResults.skills.map(
            (s) => `  * ${s.slug.padEnd(26)} [${s.trustLevel}] [installs: ${s.installs}]  (${s.category})`
          ),
          '',
          `Type "add ${searchResults.skills[0]?.slug || 'react-performance'}" to install.`,
        ];
        break;
      case 'doctor':
        outputLines = [
          'DomoSkills Diagnostic Doctor',
          '[ok] Node.js runtime detected: v24.13.0',
          '[ok] Git detected: git version 2.45.1',
          '[ok] Agent workspace detected: OpenCode & Cursor (.agent/skills)',
          '[ok] Universal Agent Configuration: Active',
          '[ok] All diagnostics passed. Ready for skills.',
        ];
        break;
      case 'audit':
        outputLines = [
          'DomoSkills Security & Integrity Audit',
          '[ok] react-performance: Frontmatter valid, 0 security advisories [Score: 100/100]',
          '[ok] owasp-agent-guardian: Frontmatter valid, read-only permissions [Score: 100/100]',
          '[ok] Zero critical vulnerabilities found across installed capabilities.',
        ];
        break;
      case 'add':
        outputLines = [
          `[ok] Successfully resolved and installed "${arg1 || 'custom-skill'}"!`,
          `  Location: .agent/skills/${arg1 || 'custom-skill'}`,
          `  Updated: domoskills.json`,
        ];
        break;
      case 'list':
      case 'ls':
        outputLines = [
          'Installed Skills in .agent/skills:',
          '  * react-performance          v1.4.2 [MIT]',
          '  * owasp-agent-guardian       v3.0.1 [MIT]',
          '  * rag-pipeline-architect     v2.2.0 [MIT]',
        ];
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        outputLines = [
          `Command not recognized: "${raw}". Type "help" for available commands.`,
        ];
    }

    setHistory((prev) => [...prev, { command: raw, output: outputLines }]);
    setInputVal('');
  };

  useEffect(() => {
    if (activeTab === 'cli') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, activeTab]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${tilt.isHovered ? 1.015 : 1}, ${tilt.isHovered ? 1.015 : 1}, 1)`,
        transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="relative w-full rounded-2xl border border-border bg-surface-raised shadow-2xl overflow-visible font-mono text-xs card-polkadot-hover"
    >
      
      {/* Dynamic 3D Glare Lighting Sheen */}
      {tilt.isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-2xl opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.08), transparent 60%)`,
          }}
        />
      )}

      {/* Terminal Window Header */}
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 rounded-t-2xl">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-border-bright/60 hover:bg-red-500/80 transition cursor-pointer"></span>
            <span className="h-3 w-3 rounded-full bg-border-bright/60 hover:bg-yellow-500/80 transition cursor-pointer"></span>
            <span className="h-3 w-3 rounded-full bg-border-bright/60 hover:bg-emerald-500/80 transition cursor-pointer"></span>
          </div>
          <div className="ml-3 flex items-center gap-2 text-text-muted text-[11px]">
            <TerminalIcon className="h-3.5 w-3.5 text-white" />
            <span className="font-semibold text-text-secondary">domoskills-terminal</span>
            <span className="hidden sm:inline text-text-faint">— zsh 80×24</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Switcher */}
          <div className="flex rounded border border-border bg-surface-raised p-0.5 text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab('demo')}
              className={`px-2.5 py-0.5 rounded transition ${
                activeTab === 'demo' ? 'bg-white text-black font-bold' : 'text-text-muted hover:text-white'
              }`}
            >
              Demo Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('cli')}
              className={`px-2.5 py-0.5 rounded transition ${
                activeTab === 'cli' ? 'bg-white text-black font-bold' : 'text-text-muted hover:text-white'
              }`}
            >
              Interactive CLI
            </button>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded border border-border bg-surface px-2.5 py-1 text-[11px] text-text-secondary hover:border-white hover:text-white transition"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen Body */}
      <div className="p-4 sm:p-6 bg-background/95 min-h-[280px] max-h-[360px] overflow-y-auto space-y-4 rounded-b-2xl pb-16">
        
        {activeTab === 'demo' ? (
          <div>
            <div className="flex items-center gap-2 text-text-secondary mb-3">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white font-semibold">{initialCommand}</span>
            </div>
            
            <div className="space-y-1 text-text-muted">
              <div className="text-white font-bold">DOMOSKILLS_ — The Open Agent Skills Registry</div>
              <div className="text-cyan-400">ℹ Resolving 2 skills for Universal Agent...</div>
              <div className="text-emerald-400">✔ react-performance <span className="text-text-muted">[v1.4.2 • MIT • Verified]</span></div>
              <div className="text-emerald-400">✔ owasp-agent-guardian <span className="text-text-muted">[v3.0.1 • MIT • Official]</span></div>
              <div className="py-2 text-text-secondary">
                <span className="text-white font-bold">Installed successfully into target workspace:</span>
                <pre className="mt-1 text-text-muted text-[11px] leading-relaxed">
{`.agent/
└── skills/
    ├── react-performance/
    │   └── SKILL.md
    └── owasp-agent-guardian/
        └── SKILL.md`}
                </pre>
              </div>
              <div className="text-white font-semibold flex items-center gap-2">
                <span className="text-emerald-400">✔</span> Agent capability stack synchronized.
                <span className="inline-block h-3.5 w-1.5 bg-white animate-cursor-blink"></span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-text-muted">
              Type <span className="text-white font-bold">help</span>, <span className="text-cyan-400">search react</span>, <span className="text-emerald-400">doctor</span>, <span className="text-yellow-400">audit</span>, or <span className="text-white font-bold">list</span>.
            </div>

            {history.map((h, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-2 text-text-secondary">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-white font-semibold">{h.command}</span>
                </div>
                {h.output.map((line, j) => (
                  <div key={j} className="text-text-muted pl-4">
                    {line}
                  </div>
                ))}
              </div>
            ))}

            <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-2">
              <span className="text-emerald-400 font-bold">$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type a command (e.g. 'doctor' or 'help')..."
                className="w-full bg-transparent text-white focus:outline-none placeholder:text-text-faint"
                autoFocus
              />
            </form>
            <div ref={bottomRef} />
          </div>
        )}

      </div>

      {/* DomoDomo Signature Frameless Mascot Overlay on Bottom-Right Corner */}
      <div className="absolute -bottom-6 -right-5 sm:-bottom-8 sm:-right-6 z-40 flex items-end pointer-events-auto select-none">
        
        {/* Floating Speech Bubble */}
        {showQuote && (
          <div
            onClick={handleDomoClick}
            className="mb-14 mr-[-10px] cursor-pointer rounded-xl border border-white/20 bg-surface/95 px-3 py-1.5 font-mono text-[11px] text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:border-white animate-bounce-subtle flex items-center gap-1.5"
            style={{ animationDuration: '3s' }}
          >
            <span className="text-emerald-400 font-bold">Domo:</span>
            <span>{domoQuote}</span>
          </div>
        )}

        {/* Frameless Animated Domo Mascot sitting on bottom-right */}
        <button
          type="button"
          onClick={handleDomoClick}
          className="group relative cursor-pointer p-0 bg-transparent border-0 outline-none transition-transform duration-300 hover:scale-110 active:scale-95 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          title="Click Domo to run an automated diagnostic command!"
        >
          <img
            src="/assets/domodomo/domolaptop.gif"
            alt="Domo Terminal Mascot"
            className="h-28 w-28 sm:h-32 sm:w-32 object-contain"
          />
        </button>

      </div>

    </div>
  );
}
