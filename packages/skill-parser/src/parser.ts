import { parseSkillMarkdown, ParsedSkillContent } from './frontmatter.js';
import { analyzeSkillFiles, determineTrustLevel, isPathSafe } from './security.js';
import { buildFileTree, FileTreeNode } from './file-tree.js';
import { Skill, SkillFile, SkillSecuritySummary } from '@domoskills/validators';

export interface CompleteParsedSkill {
  skill: Partial<Skill>;
  parsedContent: ParsedSkillContent;
  security: SkillSecuritySummary;
  fileTree: FileTreeNode[];
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export function parseSkillPackage(
  skillMarkdown: string,
  files: SkillFile[] = [],
  options: {
    sourceRepo?: string;
    sourceUrl?: string;
    isOfficial?: boolean;
    isVerifiedSource?: boolean;
  } = {}
): CompleteParsedSkill {
  const errors: string[] = [];
  const warnings: string[] = [];

  const parsedContent = parseSkillMarkdown(skillMarkdown);
  if (!parsedContent.hasValidFrontmatter) {
    errors.push(...parsedContent.errors);
  }

  // Check file safety
  for (const f of files) {
    const safety = isPathSafe(f.path);
    if (!safety.safe) {
      errors.push(`Unsafe file path in skill: ${f.path} - ${safety.reason}`);
    }
  }

  const security = analyzeSkillFiles(files, parsedContent.content);
  warnings.push(...security.warnings);

  const trustLevel = determineTrustLevel(
    Boolean(options.isOfficial),
    options.isVerifiedSource ?? true,
    security.securityScore,
    security.containsScripts
  );

  const fileTree = buildFileTree(
    files.length > 0
      ? files
      : [
          {
            path: 'SKILL.md',
            type: 'file',
            size: skillMarkdown.length,
            isExecutable: false,
          },
        ]
  );

  const partialSkill: Partial<Skill> = {
    slug: parsedContent.frontmatter.name,
    name: parsedContent.frontmatter.name
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    description: parsedContent.frontmatter.description,
    license: (parsedContent.frontmatter.license as any) || 'MIT',
    version: parsedContent.frontmatter.version || '1.0.0',
    tags: parsedContent.frontmatter.tags || [],
    compatibility: parsedContent.frontmatter.compatibility || ['universal'],
    trustLevel,
    instructions: parsedContent.content,
    files: files.length > 0 ? files : [{ path: 'SKILL.md', type: 'file', size: skillMarkdown.length, isExecutable: false }],
    security,
  };

  return {
    skill: partialSkill,
    parsedContent,
    security,
    fileTree,
    isValid: errors.length === 0 && parsedContent.hasValidFrontmatter,
    errors,
    warnings,
  };
}
