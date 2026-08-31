import { AgentAdapter, AgentTarget, AgentDetectionResult } from './types.js';

export const AGENT_ADAPTERS: Record<AgentTarget, AgentAdapter> = {
  universal: {
    id: 'universal',
    name: 'Universal Agent Standard',
    shortName: 'Universal',
    description: 'Vendor-neutral standard directory structure supported by open-source agent runners and tools',
    defaultPath: '.agent/skills',
    globalPath: '~/.agent/skills',
    hookFile: '.agent/agent.yaml',
    configPattern: '.agent/skills/*/SKILL.md',
    capabilities: {
      supportsSkillsDir: true,
      supportsScripts: true,
      supportsNestedReferences: true,
      autoDiscovery: true,
    },
  },
  claude: {
    id: 'claude',
    name: 'Claude Code (Anthropic)',
    shortName: 'Claude Code',
    description: 'Anthropic Claude Code CLI agent workspace skill structure',
    defaultPath: '.claude/skills',
    globalPath: '~/.claude/skills',
    hookFile: '.claude/config.json',
    configPattern: '.claude/skills/*/SKILL.md',
    capabilities: {
      supportsSkillsDir: true,
      supportsScripts: true,
      supportsNestedReferences: true,
      autoDiscovery: true,
    },
  },
  codex: {
    id: 'codex',
    name: 'OpenAI Codex / Agents',
    shortName: 'OpenAI Codex',
    description: 'OpenAI agent framework workspace capability directory',
    defaultPath: '.agents/skills',
    globalPath: '~/.agents/skills',
    hookFile: '.agents/manifest.json',
    configPattern: '.agents/skills/*/SKILL.md',
    capabilities: {
      supportsSkillsDir: true,
      supportsScripts: true,
      supportsNestedReferences: true,
      autoDiscovery: true,
    },
  },
  cursor: {
    id: 'cursor',
    name: 'Cursor IDE',
    shortName: 'Cursor',
    description: 'Cursor IDE AI rules and agent workspace skill repository',
    defaultPath: '.cursor/skills',
    globalPath: '~/.cursor/skills',
    hookFile: '.cursorrules',
    configPattern: '.cursor/skills/*/SKILL.md',
    capabilities: {
      supportsSkillsDir: true,
      supportsScripts: false,
      supportsNestedReferences: true,
      autoDiscovery: true,
    },
  },
  opencode: {
    id: 'opencode',
    name: 'OpenCode Interpreter',
    shortName: 'OpenCode',
    description: 'OpenCode environment runtime capability & skill package registry',
    defaultPath: '.opencode/skills',
    globalPath: '~/.opencode/skills',
    hookFile: '.opencode/opencode.json',
    configPattern: '.opencode/skills/*/SKILL.md',
    capabilities: {
      supportsSkillsDir: true,
      supportsScripts: true,
      supportsNestedReferences: true,
      autoDiscovery: true,
    },
  },
  copilot: {
    id: 'copilot',
    name: 'GitHub Copilot Workspace',
    shortName: 'GitHub Copilot',
    description: 'GitHub Copilot instructions and repository agent extensions',
    defaultPath: '.github/skills',
    globalPath: '~/.github/skills',
    hookFile: '.github/copilot-instructions.md',
    configPattern: '.github/skills/*/SKILL.md',
    capabilities: {
      supportsSkillsDir: true,
      supportsScripts: false,
      supportsNestedReferences: true,
      autoDiscovery: true,
    },
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini CLI / Antigravity',
    shortName: 'Gemini CLI',
    description: 'Google Gemini CLI & Antigravity IDE custom agent skill directory',
    defaultPath: '.gemini/skills',
    globalPath: '~/.gemini/skills',
    hookFile: '.gemini/config/skills',
    configPattern: '.gemini/skills/*/SKILL.md',
    capabilities: {
      supportsSkillsDir: true,
      supportsScripts: true,
      supportsNestedReferences: true,
      autoDiscovery: true,
    },
  },
};

export const AGENT_TARGET_LIST: AgentTarget[] = [
  'universal',
  'claude',
  'codex',
  'cursor',
  'opencode',
  'copilot',
  'gemini',
];

export function getAdapter(target: AgentTarget = 'universal'): AgentAdapter {
  return AGENT_ADAPTERS[target] || AGENT_ADAPTERS.universal;
}

export function getSkillInstallationPath(target: AgentTarget = 'universal', isGlobal = false): string {
  const adapter = getAdapter(target);
  return isGlobal ? adapter.globalPath : adapter.defaultPath;
}

export function getSkillFullPath(skillSlug: string, target: AgentTarget = 'universal', isGlobal = false): string {
  const basePath = getSkillInstallationPath(target, isGlobal);
  return `${basePath}/${skillSlug}`;
}

export function generateInstallCommand(
  skills: string[],
  target: AgentTarget = 'universal',
  options: { global?: boolean; flags?: string } = {}
): string {
  if (!skills || skills.length === 0) {
    return 'npx domoskills add <skill-name>';
  }

  const skillList = skills.join(' ');
  const agentFlag = target !== 'universal' ? ` --agent ${target}` : '';
  const globalFlag = options.global ? ' --global' : '';
  const customFlags = options.flags ? ` ${options.flags}` : '';

  return `npx domoskills add ${skillList}${agentFlag}${globalFlag}${customFlags}`;
}

export function generateMultiLineInstallCommand(
  skills: string[],
  target: AgentTarget = 'universal',
  options: { global?: boolean } = {}
): string {
  if (!skills || skills.length === 0) {
    return 'npx domoskills add <skill-name>';
  }

  if (skills.length <= 2) {
    return generateInstallCommand(skills, target, options);
  }

  const agentFlag = target !== 'universal' ? ` \\\n  --agent ${target}` : '';
  const globalFlag = options.global ? ' \\\n  --global' : '';
  const skillsLines = skills.map((s) => `  ${s}`).join(' \\\n');

  return `npx domoskills add \\\n${skillsLines}${agentFlag}${globalFlag}`;
}
