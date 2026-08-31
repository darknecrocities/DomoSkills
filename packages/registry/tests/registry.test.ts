import { describe, it, expect } from 'vitest';
import { registry } from '../src/index.js';

describe('Registry & Search Engine', () => {
  it('loads seed catalog properly', () => {
    const stats = registry.getStats();
    expect(stats.totalSkills).toBeGreaterThanOrEqual(20);
    expect(stats.verifiedPercentage).toBeGreaterThanOrEqual(80);
  });

  it('searches by keyword with relevance ranking', () => {
    const res = registry.getSkills({ query: 'react' });
    expect(res.skills.length).toBeGreaterThan(0);
    expect(res.skills[0].slug).toContain('react');
  });

  it('filters by category', () => {
    const res = registry.getSkills({ category: 'security' });
    expect(res.skills.every((s) => s.category === 'security')).toBe(true);
  });

  it('resolves install manifest with multi-agent target', () => {
    const manifest = registry.resolveInstallManifest(
      ['react-performance', 'owasp-agent-guardian'],
      'cursor'
    );
    expect(manifest.success).toBe(true);
    expect(manifest.packages.length).toBe(2);
    expect(manifest.command).toContain('--agent cursor');
    expect(manifest.packages[0].targetDirectory).toContain('.cursor/skills');
  });
});
