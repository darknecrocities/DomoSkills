'use client';

import React, { useState } from 'react';
import {
  Download,
  X,
  Copy,
  Check,
  FileCode,
  Terminal,
  Container,
  FolderTree,
  Sparkles,
} from 'lucide-react';
import { CartItem, AgentTarget } from '@domoskills/validators';
import { getAdapter } from '@domoskills/adapters';

interface MultiFormatExportModalProps {
  skills: CartItem[];
  targetAgent: AgentTarget;
  manifestId?: string;
  isOpen: boolean;
  onClose: () => void;
}

type ExportFormat = 'json' | 'sh' | 'docker' | 'devcontainer';

export function MultiFormatExportModal({
  skills,
  targetAgent,
  manifestId = 'DOMO-STACK',
  isOpen,
  onClose,
}: MultiFormatExportModalProps) {
  const [activeFormat, setActiveFormat] = useState<ExportFormat>('json');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const adapter = getAdapter(targetAgent);
  const skillSlugs = skills.map((s) => s.slug);

  const getExportContent = (): { filename: string; content: string } => {
    switch (activeFormat) {
      case 'json':
        return {
          filename: 'domoskills.json',
          content: JSON.stringify(
            {
              $schema: 'https://domoskills.io/schema/v1.json',
              manifestId,
              agent: targetAgent,
              agentPath: adapter.defaultPath,
              skills: skills.map((s) => ({
                name: s.slug,
                category: s.category,
                license: s.license,
                version: '1.0.0',
              })),
              createdAt: new Date().toISOString(),
            },
            null,
            2
          ),
        };

      case 'sh':
        return {
          filename: 'install-skills.sh',
          content: `#!/usr/bin/env bash
# DomoSkills Stack Installer
# Manifest: ${manifestId}
# Target Agent: ${adapter.name} (${adapter.defaultPath})

set -e

echo "🚀 Installing DomoSkills capability stack [${manifestId}]..."

# Ensure npx / node is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx is required to install DomoSkills."
    exit 1
fi

npx domoskills add ${skillSlugs.join(' ')} --agent ${targetAgent}

echo "✔ Successfully installed ${skills.length} skills into ${adapter.defaultPath}!"
`,
        };

      case 'docker':
        return {
          filename: 'docker-compose.agent.yml',
          content: `version: '3.8'

services:
  agent-workspace:
    image: node:20-alpine
    container_name: domoskills-agent
    working_dir: /workspace
    volumes:
      - .:/workspace
    environment:
      - AGENT_TARGET=${targetAgent}
      - DOMO_MANIFEST=${manifestId}
    command: >
      sh -c "npx domoskills add ${skillSlugs.join(' ')} --agent ${targetAgent} && tail -f /dev/null"
`,
        };

      case 'devcontainer':
        return {
          filename: 'devcontainer.json',
          content: JSON.stringify(
            {
              name: 'DomoSkills Agent Workspace',
              image: 'mcr.microsoft.com/devcontainers/typescript-node:20',
              customizations: {
                vscode: {
                  extensions: ['github.copilot', 'antigravity.agent'],
                },
              },
              postCreateCommand: `npx domoskills add ${skillSlugs.join(' ')} --agent ${targetAgent}`,
            },
            null,
            2
          ),
        };
    }
  };

  const { filename, content } = getExportContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formats: { id: ExportFormat; label: string; file: string; icon: React.ReactNode }[] = [
    { id: 'json', label: 'CLI Config', file: 'domoskills.json', icon: <FileCode className="h-3.5 w-3.5" /> },
    { id: 'sh', label: 'Shell One-Liner', file: 'install-skills.sh', icon: <Terminal className="h-3.5 w-3.5" /> },
    { id: 'docker', label: 'Docker Compose', file: 'docker-compose.yml', icon: <Container className="h-3.5 w-3.5" /> },
    { id: 'devcontainer', label: 'DevContainer', file: 'devcontainer.json', icon: <FolderTree className="h-3.5 w-3.5" /> },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 animate-fade-in flex items-center justify-center font-mono text-xs"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-[#0d0d12] shadow-2xl p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 font-bold">
              <Download className="h-4 w-4" />
            </div>
            <div>
              <h3 id="export-title" className="font-bold text-white text-sm">
                Multi-Format Stack Exporter
              </h3>
              <p className="text-[11px] text-text-muted">
                Export manifest <span className="text-white font-bold">#{manifestId}</span> across dev ecosystems
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border p-1.5 text-text-secondary hover:border-white hover:text-white transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {formats.map((f) => {
            const isSelected = activeFormat === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFormat(f.id)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'border-white bg-white text-black font-bold shadow-sm'
                    : 'border-border bg-surface text-text-secondary hover:text-white hover:border-border-bright'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {f.icon}
                  <span className="text-xs">{f.label}</span>
                </div>
                <span className={`text-[10px] ${isSelected ? 'text-black/70' : 'text-text-muted'}`}>
                  {f.file}
                </span>
              </button>
            );
          })}
        </div>

        {/* Code Content Box */}
        <div className="relative rounded-xl border border-border bg-black p-4 text-white overflow-x-auto max-h-72">
          <pre className="whitespace-pre-wrap break-all text-[11px] leading-relaxed text-text-secondary">
            {content}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-border/70">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-surface hover:border-white text-white transition cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download {filename}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border text-text-secondary hover:text-white transition cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black font-bold uppercase tracking-wider hover:bg-muted-white transition shadow-md cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Content</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
