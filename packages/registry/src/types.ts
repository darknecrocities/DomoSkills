import {
  Skill,
  SkillFile,
  SourceRepository,
  CategorySlug,
  AgentTarget,
  TrustLevel,
  License,
  SubmissionRecord,
} from '@domoskills/validators';

export interface DiscoveredSkill {
  repositoryUrl: string;
  owner: string;
  repository: string;
  branch: string;
  skillPath: string;
  rawMarkdownUrl: string;
}

export interface SkillPackage {
  metadata: DiscoveredSkill;
  rawSkillMarkdown: string;
  files: SkillFile[];
  licenseText?: string;
  commitSha: string;
}

export interface ValidationResult {
  valid: boolean;
  score: number;
  trustLevel: TrustLevel;
  errors: string[];
  warnings: string[];
}

export interface SkillProvider {
  id: string;
  name: string;
  discover(): Promise<DiscoveredSkill[]>;
  fetchSkill(source: DiscoveredSkill): Promise<SkillPackage>;
  validate(skillPkg: SkillPackage): Promise<ValidationResult>;
}

export interface SkillFilterOptions {
  query?: string;
  category?: CategorySlug | 'all';
  agent?: AgentTarget | 'all';
  license?: License | 'all';
  trustLevel?: TrustLevel | 'all';
  hasScripts?: boolean;
  hasVisualPreview?: boolean;
  featuredOnly?: boolean;
  sortBy?: 'trending' | 'installs' | 'favorites' | 'updated' | 'newest' | 'alphabetical';
  sortDirection?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface SkillSearchResult {
  skills: Skill[];
  total: number;
  hasMore: boolean;
  categories: { slug: CategorySlug; name: string; count: number }[];
}
