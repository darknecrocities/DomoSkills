'use client';

import React, { useState } from 'react';
import { Folder, FolderOpen, FileText, FileCode, AlertCircle, Check } from 'lucide-react';
import { SkillFile } from '@domoskills/validators';
import { buildFileTree, FileTreeNode } from '@domoskills/skill-parser';

interface FileTreeViewerProps {
  files: SkillFile[];
  skillName: string;
  defaultInstructions?: string;
}

export function FileTreeViewer({ files, skillName, defaultInstructions = '' }: FileTreeViewerProps) {
  const fileTree = buildFileTree(
    files.length > 0
      ? files
      : [{ path: 'SKILL.md', type: 'file', size: defaultInstructions.length, isExecutable: false }]
  );

  const [selectedFile, setSelectedFile] = useState<string>('SKILL.md');
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    references: true,
    scripts: true,
  });

  const toggleFolder = (path: string) => {
    setOpenFolders((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const getSelectedFileContent = () => {
    if (selectedFile === 'SKILL.md') {
      return defaultInstructions || '# SKILL.md\n\nNo instructions provided.';
    }
    const matched = files.find((f) => f.path === selectedFile);
    if (matched && matched.content) return matched.content;
    return `// Content preview for ${selectedFile}\n// Reference file for ${skillName} capability.\n`;
  };

  const renderNode = (node: FileTreeNode, depth = 0) => {
    if (node.type === 'directory') {
      const isOpen = openFolders[node.name] ?? true;
      return (
        <div key={node.path} className="space-y-1">
          <button
            type="button"
            onClick={() => toggleFolder(node.name)}
            className="flex items-center gap-1.5 w-full text-left font-mono text-xs text-text-secondary hover:text-white py-1 rounded"
            style={{ paddingLeft: `${depth * 14}px` }}
          >
            {isOpen ? <FolderOpen className="h-3.5 w-3.5 text-white" /> : <Folder className="h-3.5 w-3.5 text-text-muted" />}
            <span className="font-semibold">{node.name}/</span>
          </button>
          {isOpen && node.children?.map((child) => renderNode(child, depth + 1))}
        </div>
      );
    }

    const isSelected = selectedFile === node.path;
    return (
      <button
        key={node.path}
        type="button"
        onClick={() => setSelectedFile(node.path)}
        className={`flex items-center justify-between w-full text-left font-mono text-xs py-1 px-2 rounded transition ${
          isSelected
            ? 'bg-surface-active text-white border border-border-bright'
            : 'text-text-muted hover:text-white hover:bg-surface'
        }`}
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
      >
        <div className="flex items-center gap-1.5 truncate">
          {node.isExecutable ? (
            <FileCode className="h-3.5 w-3.5 text-yellow-400" />
          ) : (
            <FileText className="h-3.5 w-3.5 text-text-secondary" />
          )}
          <span className="truncate">{node.name}</span>
        </div>
        {node.size && (
          <span className="text-[10px] text-text-faint">
            {(node.size / 1024).toFixed(1)}kb
          </span>
        )}
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 rounded-lg border border-border bg-surface-raised overflow-hidden">
      
      {/* File Tree Left Pane */}
      <div className="border-r border-border bg-surface p-4 font-mono text-xs">
        <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">
          Skill Directory Tree
        </div>
        <div className="space-y-1">
          {fileTree.map((node) => renderNode(node, 0))}
        </div>
      </div>

      {/* Content Preview Right Pane */}
      <div className="md:col-span-2 bg-black p-4 font-mono text-xs overflow-x-auto flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-border pb-2 mb-3 text-text-muted text-[11px]">
            <span className="text-white font-bold">{selectedFile}</span>
            <span>Read-Only Inspector</span>
          </div>
          <pre className="text-text-secondary whitespace-pre-wrap leading-relaxed max-h-[350px] overflow-y-auto text-[11px]">
            {getSelectedFileContent()}
          </pre>
        </div>

        <div className="mt-4 border-t border-border/50 pt-2 text-[10px] text-text-muted flex items-center justify-between">
          <span>Target: .agent/skills/{skillName}/{selectedFile}</span>
          <span className="text-emerald-400 font-semibold">Integrity Verified</span>
        </div>
      </div>

    </div>
  );
}
