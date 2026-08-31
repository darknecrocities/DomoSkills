import { describe, it, expect } from 'vitest';
import { getAdapter, getSkillInstallationPath, generateInstallCommand, AGENT_TARGET_LIST } from '../src/index.js';

describe('Multi-Agent Adapters', () => {
  it('supports all required agent targets', () => {
    expect(AGENT_TARGET_LIST).toEqual([
      'universal',
      'claude',
      'codex',
      'cursor',
      'opencode',
      'copilot',
      'gemini',
    ]);
  });

  it('maps correct default installation paths', () => {
    expect(getSkillInstallationPath('universal')).toBe('.agent/skills');
    expect(getSkillInstallationPath('claude')).toBe('.claude/skills');
    expect(getSkillInstallationPath('codex')).toBe('.agents/skills');
    expect(getSkillInstallationPath('cursor')).toBe('.cursor/skills');
    expect(getSkillInstallationPath('opencode')).toBe('.opencode/skills');
    expect(getSkillInstallationPath('copilot')).toBe('.github/skills');
    expect(getSkillInstallationPath('gemini')).toBe('.gemini/skills');
  });

  it('generates dynamic install commands with agent flags', () => {
    const cmd1 = generateInstallCommand(['react-perf', 'security-guard'], 'universal');
    expect(cmd1).toBe('npx domoskills add react-perf security-guard');

    const cmd2 = generateInstallCommand(['react-perf', 'security-guard'], 'opencode');
    expect(cmd2).toBe('npx domoskills add react-perf security-guard --agent opencode');

    const cmd3 = generateInstallCommand(['react-perf'], 'cursor', { global: true });
    expect(cmd3).toBe('npx domoskills add react-perf --agent cursor --global');
  });
});
