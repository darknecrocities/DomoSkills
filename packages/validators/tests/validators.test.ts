import { describe, it, expect } from 'vitest';
import {
  SkillFrontmatterSchema,
  DomoskillsConfigSchema,
  SubmissionRequestSchema,
} from '../src/index.js';

describe('Zod Validators', () => {
  it('validates skill frontmatter', () => {
    const valid = {
      name: 'react-performance',
      description: 'Optimize React apps for highest performance and speed.',
      license: 'MIT',
      version: '1.0.0',
    };
    expect(SkillFrontmatterSchema.safeParse(valid).success).toBe(true);

    const invalid = {
      name: 'INVALID NAME WITH SPACES',
      description: 'Short',
    };
    expect(SkillFrontmatterSchema.safeParse(invalid).success).toBe(false);
  });

  it('validates domoskills.json schema', () => {
    const valid = {
      version: 1,
      agent: 'opencode',
      skills: [
        {
          name: 'react-performance',
          source: 'domoskills/official-agent-skills',
          version: '1.0.0',
          commit: 'abcdef1',
        },
      ],
    };
    expect(DomoskillsConfigSchema.safeParse(valid).success).toBe(true);
  });

  it('validates submission requests', () => {
    const valid = {
      repositoryUrl: 'https://github.com/my-org/custom-agent-skills',
      skillPath: 'skills/my-skill',
    };
    expect(SubmissionRequestSchema.safeParse(valid).success).toBe(true);

    const invalid = {
      repositoryUrl: 'not-a-url',
    };
    expect(SubmissionRequestSchema.safeParse(invalid).success).toBe(false);
  });
});
