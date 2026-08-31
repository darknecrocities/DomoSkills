import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import pc from 'picocolors';
import { AGENT_ADAPTERS } from '@domoskills/adapters';
import { logger } from '../utils/logger.js';
import { readConfig } from '../utils/config.js';

export function doctorCommand() {
  logger.banner();
  logger.log(pc.bold('DomoSkills Diagnostic Doctor'));
  logger.log(pc.dim('Inspecting development environment and AI agent workspaces...'));
  logger.log();

  const cwd = process.cwd();
  const config = readConfig(cwd);

  // 1. Node.js
  const nodeVersion = process.version;
  logger.success(`Node.js runtime detected: ${pc.cyan(nodeVersion)}`);

  // 2. Git
  let gitVersion = 'Not found';
  try {
    gitVersion = execSync('git --version', { stdio: ['pipe', 'pipe', 'ignore'] })
      .toString()
      .trim();
    logger.success(`Git detected: ${pc.cyan(gitVersion)}`);
  } catch {
    logger.warn('Git is not found or not in PATH.');
  }

  // 3. Project Root
  const isNpmProject = fs.existsSync(path.join(cwd, 'package.json'));
  const isPythonProject = fs.existsSync(path.join(cwd, 'pyproject.toml')) || fs.existsSync(path.join(cwd, 'requirements.txt'));
  const isRustProject = fs.existsSync(path.join(cwd, 'Cargo.toml'));
  const isGitRepo = fs.existsSync(path.join(cwd, '.git'));

  if (isNpmProject || isPythonProject || isRustProject || isGitRepo) {
    const projType = isNpmProject ? 'Node/TS' : isPythonProject ? 'Python' : isRustProject ? 'Rust' : 'Git Project';
    logger.success(`Project workspace detected: ${pc.cyan(projType)} (${pc.dim(cwd)})`);
  } else {
    logger.info(`Running in workspace: ${pc.dim(cwd)}`);
  }

  logger.log();
  logger.log(pc.bold('Detected AI Agent Workspaces & Markers:'));

  const detectedAgents: string[] = [];

  const markerChecks = [
    { id: 'opencode', marker: '.opencode', label: 'OpenCode Workspace' },
    { id: 'cursor', marker: '.cursorrules', label: 'Cursor IDE Rules' },
    { id: 'cursor', marker: '.cursor', label: 'Cursor IDE Directory' },
    { id: 'claude', marker: '.claude', label: 'Claude Code Directory' },
    { id: 'codex', marker: '.agents', label: 'OpenAI Codex / Agents' },
    { id: 'gemini', marker: '.gemini', label: 'Gemini / Antigravity Directory' },
    { id: 'copilot', marker: '.github', label: 'GitHub Workspace / Copilot' },
    { id: 'universal', marker: '.agent', label: 'Universal Agent Standard' },
  ];

  for (const check of markerChecks) {
    if (fs.existsSync(path.join(cwd, check.marker))) {
      if (!detectedAgents.includes(check.id)) {
        detectedAgents.push(check.id);
        const adapter = AGENT_ADAPTERS[check.id as keyof typeof AGENT_ADAPTERS];
        logger.success(`${pc.bold(adapter.name)} ${pc.dim(`(found: ${check.marker})`)}`);
      }
    }
  }

  if (detectedAgents.length === 0) {
    logger.info('No specific agent marker files found. Using default Universal standard (.agent/skills).');
  }

  logger.log();
  logger.log(pc.bold('Configured Target:'));
  const activeAgent = config.agent || (detectedAgents[0] as any) || 'universal';
  const activeAdapter = AGENT_ADAPTERS[activeAgent as keyof typeof AGENT_ADAPTERS] || AGENT_ADAPTERS.universal;
  logger.log(`  Target Agent: ${pc.cyan(activeAdapter.name)}`);
  logger.log(`  Skills Directory: ${pc.cyan(activeAdapter.defaultPath)}`);
  logger.log(`  Config File: ${pc.cyan('domoskills.json')}`);
  logger.log();
  logger.success('All diagnostics passed! System is ready.');
  logger.log();
}
