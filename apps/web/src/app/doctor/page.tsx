'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Terminal,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Copy,
  Check,
  Cpu,
  Shield,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { AGENT_ADAPTERS, AGENT_TARGET_LIST, getAdapter } from '@domoskills/adapters';
import { AgentTarget } from '@domoskills/validators';

export default function DoctorPage() {
  const [selectedAgent, setSelectedAgent] = useState<AgentTarget>('universal');
  const [copied, setCopied] = useState(false);

  const adapter = getAdapter(selectedAgent);

  const getAgentConfigStub = (target: AgentTarget) => {
    switch (target) {
      case 'cursor':
        return `# .cursorrules
# DomoSkills capability discovery for Cursor IDE
# Auto-loads skill instructions from .cursor/skills/*/SKILL.md

When asked to follow project rules or specialized capabilities,
inspect instructions inside: .cursor/skills/
`;
      case 'claude':
        return `// .claude/config.json
{
  "skillsPath": ".claude/skills",
  "autoDiscover": true,
  "standards": ["domoskills-standard-v1"]
}`;
      case 'opencode':
        return `// .opencode/opencode.json
{
  "plugins": [],
  "skills": {
    "directory": ".opencode/skills",
    "indexing": "eager"
  }
}`;
      default:
        return `# .agent/agent.yaml
# DomoSkills Universal Agent Standard Configuration
version: 1
skillsDirectory: .agent/skills
capabilities:
  - autoDiscovery: true
  - isolationMode: readonly
`;
    }
  };

  const configStub = getAgentConfigStub(selectedAgent);

  const handleCopy = () => {
    navigator.clipboard.writeText(configStub);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-text-muted">
            <Terminal className="h-3.5 w-3.5 text-white" />
            <span>Agent Infrastructure Doctor</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Workspace Diagnostics & Adapters
          </h1>
          <p className="font-sans text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
            Verify AI agent compatibility markers, troubleshoot skills loading paths, and generate configuration hooks
            for your editor and runtime.
          </p>
        </div>

        {/* Diagnostic Simulator Results */}
        <div className="card-polkadot-hover rounded-xl border border-border bg-surface p-6 space-y-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Environment Readiness Checks</span>
            </div>
            <span className="text-emerald-400 font-semibold">Active & Ready</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="rounded border border-border bg-surface-raised p-4 space-y-2">
              <div className="flex items-center justify-between text-text-muted">
                <span>Node.js Runtime</span>
                <span className="text-emerald-400 font-bold inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Ready</span>
                </span>
              </div>
              <div className="text-white font-bold text-sm">Node.js Engine Compatible</div>
              <div className="text-text-muted text-[11px]">Supports modern ESM & worker threads</div>
            </div>

            <div className="rounded border border-border bg-surface-raised p-4 space-y-2">
              <div className="flex items-center justify-between text-text-muted">
                <span>Git System</span>
                <span className="text-emerald-400 font-bold inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Ready</span>
                </span>
              </div>
              <div className="text-white font-bold text-sm">Safe Git Submodules</div>
              <div className="text-text-muted text-[11px]">Enables shallow downloads of verified repositories</div>
            </div>

            <div className="rounded border border-border bg-surface-raised p-4 space-y-2">
              <div className="flex items-center justify-between text-text-muted">
                <span>Security Sandboxing</span>
                <span className="text-emerald-400 font-bold inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Active</span>
                </span>
              </div>
              <div className="text-white font-bold text-sm">Path Traversal Block</div>
              <div className="text-text-muted text-[11px]">Zero arbitrary script auto-execution</div>
            </div>

          </div>
        </div>

        {/* Agent Hook Generator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Picker (5 cols) */}
          <div className="lg:col-span-5 rounded-lg border border-border bg-surface p-6 space-y-4 font-mono text-xs">
            <div className="font-bold uppercase tracking-wider text-white mb-2">
              Select Agent Ecosystem
            </div>

            <div className="space-y-2">
              {AGENT_TARGET_LIST.map((target) => {
                const a = AGENT_ADAPTERS[target];
                const isSelected = selectedAgent === target;
                return (
                  <button
                    key={target}
                    type="button"
                    onClick={() => setSelectedAgent(target)}
                    className={`w-full flex items-center justify-between rounded border p-3 text-left transition ${
                      isSelected
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-border bg-surface-raised text-text-secondary hover:border-border-bright hover:text-white'
                    }`}
                  >
                    <div>
                      <div>{a.name}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-black/70' : 'text-text-muted'}`}>
                        {a.defaultPath}
                      </div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-black" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Config Stub (7 cols) */}
          <div className="lg:col-span-7 rounded-lg border border-border bg-surface-raised p-6 space-y-4 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div className="flex items-center gap-2 text-white font-bold">
                  <FileCode className="h-4 w-4" />
                  <span>{adapter.hookFile || `${adapter.defaultPath}/SKILL.md`}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[11px] text-text-secondary hover:text-white transition"
                >
                  {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <p className="font-sans text-xs text-text-secondary mb-3 leading-relaxed">
                Add this file to your project root to ensure <strong className="text-white">{adapter.name}</strong> automatically discovers skills in <code className="text-white">{adapter.defaultPath}/</code>.
              </p>

              <pre className="rounded border border-border bg-black p-4 text-white text-[11px] leading-relaxed overflow-x-auto">
                {configStub}
              </pre>
            </div>

            <div className="border-t border-border pt-4 text-text-muted text-[11px] flex items-center justify-between">
              <span>CLI: <code>npx domoskills add &lt;skill&gt; --agent {selectedAgent}</code></span>
              <Link href="/explore" className="text-white hover:underline flex items-center gap-1">
                <span>Browse Skills</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
