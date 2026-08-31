import { describe, it, expect } from 'vitest';
import { parseSkillMarkdown, parseSkillPackage } from '../src/index.js';

describe('parseSkillMarkdown', () => {
  it('successfully parses valid YAML frontmatter and markdown body', () => {
    const markdown = `---
name: react-performance
description: Optimize React rendering performance and memoization.
license: MIT
version: 1.2.0
tags:
  - React
  - Performance
---

# Instructions
Follow these steps to optimize components.`;

    const result = parseSkillMarkdown(markdown);
    expect(result.hasValidFrontmatter).toBe(true);
    expect(result.frontmatter.name).toBe('react-performance');
    expect(result.frontmatter.license).toBe('MIT');
    expect(result.frontmatter.version).toBe('1.2.0');
    expect(result.frontmatter.tags).toEqual(['React', 'Performance']);
    expect(result.content).toContain('# Instructions');
  });

  it('handles malformed or missing frontmatter safely', () => {
    const badMarkdown = `# No frontmatter header here`;
    const result = parseSkillMarkdown(badMarkdown);
    expect(result.hasValidFrontmatter).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.frontmatter.name).toBe('unnamed-skill');
  });
});

describe('parseSkillPackage', () => {
  it('correctly builds file tree and security summary', () => {
    const markdown = `---
name: backend-security
description: Security guidelines for REST and GraphQL endpoints.
license: Apache-2.0
---
# Security Guide`;

    const files = [
      { path: 'SKILL.md', type: 'file' as const, size: 500, isExecutable: false },
      { path: 'references/checklist.md', type: 'file' as const, size: 300, isExecutable: false },
      { path: 'scripts/verify.sh', type: 'file' as const, size: 200, isExecutable: true },
    ];

    const result = parseSkillPackage(markdown, files, { isOfficial: true });
    expect(result.isValid).toBe(true);
    expect(result.security.containsScripts).toBe(true);
    expect(result.security.executableFiles).toContain('scripts/verify.sh');
    expect(result.fileTree.length).toBeGreaterThan(0);
  });
});
