import yaml from 'js-yaml';
import { SkillFrontmatter, SkillFrontmatterSchema } from '@domoskills/validators';

export interface ParsedSkillContent {
  frontmatter: SkillFrontmatter;
  rawFrontmatter: Record<string, unknown>;
  content: string;
  hasValidFrontmatter: boolean;
  errors: string[];
}

export function parseSkillMarkdown(rawMarkdown: string): ParsedSkillContent {
  const result: ParsedSkillContent = {
    frontmatter: {
      name: 'unnamed-skill',
      description: 'No description provided',
      license: 'MIT',
      version: '1.0.0',
      tags: [],
      compatibility: ['universal'],
      dependencies: [],
      requiresEnv: [],
    },
    rawFrontmatter: {},
    content: '',
    hasValidFrontmatter: false,
    errors: [],
  };

  if (!rawMarkdown || typeof rawMarkdown !== 'string') {
    result.errors.push('Empty or invalid markdown content');
    return result;
  }

  const trimmed = rawMarkdown.trimStart();
  if (!trimmed.startsWith('---')) {
    result.errors.push('SKILL.md must begin with YAML frontmatter delimiter (---)');
    result.content = rawMarkdown;
    return result;
  }

  const secondDelimiterIndex = trimmed.indexOf('\n---', 3);
  if (secondDelimiterIndex === -1) {
    result.errors.push('Missing closing YAML frontmatter delimiter (---)');
    result.content = rawMarkdown;
    return result;
  }

  const yamlString = trimmed.slice(3, secondDelimiterIndex).trim();
  const markdownBody = trimmed.slice(secondDelimiterIndex + 4).trimStart();

  result.content = markdownBody;

  try {
    const parsedYaml = yaml.load(yamlString);
    if (!parsedYaml || typeof parsedYaml !== 'object') {
      result.errors.push('Frontmatter is not a valid YAML object');
      return result;
    }

    result.rawFrontmatter = parsedYaml as Record<string, unknown>;

    const validation = SkillFrontmatterSchema.safeParse(parsedYaml);
    if (validation.success) {
      result.frontmatter = validation.data;
      result.hasValidFrontmatter = true;
    } else {
      result.errors.push(...validation.error.errors.map((e) => `${e.path.join('.')}: ${e.message}`));
      // Fill partials
      result.frontmatter = {
        name: (parsedYaml as Record<string, string>).name || 'unnamed-skill',
        description: (parsedYaml as Record<string, string>).description || 'No description provided',
        license: (parsedYaml as Record<string, string>).license || 'MIT',
        version: (parsedYaml as Record<string, string>).version || '1.0.0',
        tags: Array.isArray((parsedYaml as Record<string, unknown>).tags)
          ? ((parsedYaml as Record<string, unknown>).tags as string[])
          : [],
        compatibility: ['universal'],
        dependencies: [],
        requiresEnv: [],
      };
    }
  } catch (err: unknown) {
    result.errors.push(`YAML Parsing Error: ${(err as Error).message}`);
  }

  return result;
}
