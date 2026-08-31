import { z } from 'zod';

// ==========================================
// TRUST LEVELS & LICENSES
// ==========================================

export const TrustLevelEnum = z.enum([
  'Official',
  'Verified',
  'Community',
  'Experimental',
  'Unverified',
]);
export type TrustLevel = z.infer<typeof TrustLevelEnum>;

export const AgentTargetEnum = z.enum([
  'universal',
  'claude',
  'codex',
  'cursor',
  'opencode',
  'copilot',
  'gemini',
]);
export type AgentTarget = z.infer<typeof AgentTargetEnum>;

export const LicenseEnum = z.enum([
  'MIT',
  'Apache-2.0',
  'BSD-3-Clause',
  'BSD-2-Clause',
  'ISC',
  'GPL-3.0',
  'LGPL-3.0',
  'MPL-2.0',
  'Unlicense',
  'Custom',
  'Unknown',
]);
export type License = z.infer<typeof LicenseEnum>;

// ==========================================
// CATEGORIES
// ==========================================

export const CategorySlugEnum = z.enum([
  'frontend',
  'design',
  'backend',
  'fullstack',
  'security',
  'devops',
  'cloud',
  'ai-ml',
  'database',
  'testing',
  'mobile',
  'productivity',
]);
export type CategorySlug = z.infer<typeof CategorySlugEnum>;

export const CategorySchema = z.object({
  id: z.string(),
  slug: CategorySlugEnum,
  name: z.string().min(1),
  description: z.string(),
  icon: z.string(),
  order: z.number().default(0),
});
export type Category = z.infer<typeof CategorySchema>;

// ==========================================
// SKILL FRONTMATTER (SKILL.md)
// ==========================================

export const SkillFrontmatterSchema = z.object({
  name: z.string().min(2).max(64).regex(/^[a-z0-9-]+$/, 'Name must be lowercase alphanumeric with hyphens'),
  description: z.string().min(10).max(500),
  license: z.string().default('MIT'),
  version: z.string().optional().default('1.0.0'),
  author: z.string().optional(),
  repository: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  compatibility: z.array(AgentTargetEnum).optional().default(['universal']),
  metadata: z.record(z.unknown()).optional(),
  dependencies: z.array(z.string()).optional().default([]),
  requiresEnv: z.array(z.string()).optional().default([]),
});
export type SkillFrontmatter = z.infer<typeof SkillFrontmatterSchema>;

// ==========================================
// REPOSITORY ATTRIBUTION
// ==========================================

export const SourceRepositorySchema = z.object({
  id: z.string(),
  owner: z.string().min(1),
  repository: z.string().min(1),
  sourceUrl: z.string().url(),
  defaultBranch: z.string().default('main'),
  license: LicenseEnum.default('MIT'),
  description: z.string().optional(),
  stars: z.number().default(0),
  verified: z.boolean().default(true),
  lastSyncedAt: z.string().datetime().or(z.string()),
  createdAt: z.string().datetime().or(z.string()),
});
export type SourceRepository = z.infer<typeof SourceRepositorySchema>;

// ==========================================
// SKILL ENTITY
// ==========================================

export const SkillFileSchema = z.object({
  path: z.string(),
  type: z.enum(['file', 'directory']),
  size: z.number().default(0),
  isExecutable: z.boolean().default(false),
  sha: z.string().optional(),
  content: z.string().optional(),
});
export type SkillFile = z.infer<typeof SkillFileSchema>;

export const SkillSecuritySummarySchema = z.object({
  isMetadataValid: z.boolean().default(true),
  isLicenseDetected: z.boolean().default(true),
  isSourceVerified: z.boolean().default(true),
  containsScripts: z.boolean().default(false),
  requiresEnvironmentVariables: z.boolean().default(false),
  requiresExternalDependencies: z.boolean().default(false),
  executableFiles: z.array(z.string()).default([]),
  securityScore: z.number().min(0).max(100).default(100),
  warnings: z.array(z.string()).default([]),
});
export type SkillSecuritySummary = z.infer<typeof SkillSecuritySummarySchema>;

export const SkillSchema = z.object({
  id: z.string(),
  slug: z.string().min(2).max(64).regex(/^[a-z0-9-]+$/),
  name: z.string().min(2).max(100),
  description: z.string().min(10),
  category: CategorySlugEnum,
  tags: z.array(z.string()).default([]),
  sourceRepository: SourceRepositorySchema,
  sourcePath: z.string().default(''),
  sourceUrl: z.string().url(),
  rawContentUrl: z.string().optional(),
  license: LicenseEnum.default('MIT'),
  version: z.string().default('1.0.0'),
  commitSha: z.string().default('HEAD'),
  compatibility: z.array(AgentTargetEnum).default(['universal']),
  trustLevel: TrustLevelEnum.default('Verified'),
  installs: z.number().default(0),
  favorites: z.number().default(0),
  isVerified: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  security: SkillSecuritySummarySchema.default({
    isMetadataValid: true,
    isLicenseDetected: true,
    isSourceVerified: true,
    containsScripts: false,
    requiresEnvironmentVariables: false,
    requiresExternalDependencies: false,
    executableFiles: [],
    securityScore: 100,
    warnings: [],
  }),
  files: z.array(SkillFileSchema).default([]),
  instructions: z.string().default(''),
  lastIndexedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Skill = z.infer<typeof SkillSchema>;

// ==========================================
// DOMOSKILLS.JSON (CONFIG / LOCKFILE)
// ==========================================

export const InstalledSkillLockSchema = z.object({
  name: z.string(),
  source: z.string(),
  version: z.string(),
  commit: z.string(),
  installedAt: z.string().optional(),
  files: z.array(z.string()).optional(),
  agent: AgentTargetEnum.optional(),
});
export type InstalledSkillLock = z.infer<typeof InstalledSkillLockSchema>;

export const DomoskillsConfigSchema = z.object({
  version: z.literal(1).default(1),
  agent: AgentTargetEnum.default('universal'),
  skills: z.array(InstalledSkillLockSchema).default([]),
  customPaths: z.record(z.string()).optional(),
  lastUpdated: z.string().optional(),
});
export type DomoskillsConfig = z.infer<typeof DomoskillsConfigSchema>;

// ==========================================
// USER SUBMISSION SCHEMA
// ==========================================

export const SubmissionRequestSchema = z.object({
  repositoryUrl: z.string().url().regex(/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/, 'Must be a valid GitHub repository URL'),
  skillPath: z.string().default(''),
  contactEmail: z.string().email().optional(),
  notes: z.string().max(500).optional(),
});
export type SubmissionRequest = z.infer<typeof SubmissionRequestSchema>;

export const SubmissionStatusEnum = z.enum([
  'pending_review',
  'scanning',
  'approved',
  'rejected',
]);
export type SubmissionStatus = z.infer<typeof SubmissionStatusEnum>;

export const SubmissionRecordSchema = z.object({
  id: z.string(),
  repositoryUrl: z.string(),
  skillPath: z.string(),
  status: SubmissionStatusEnum,
  skillSlug: z.string().optional(),
  submittedAt: z.string(),
  analyzedAt: z.string().optional(),
  securityScore: z.number().optional(),
  rejectionReason: z.string().optional(),
});
export type SubmissionRecord = z.infer<typeof SubmissionRecordSchema>;

// ==========================================
// CART SCHEMA
// ==========================================

export const CartItemSchema = z.object({
  skillId: z.string(),
  slug: z.string(),
  name: z.string(),
  category: CategorySlugEnum,
  license: z.string(),
  trustLevel: TrustLevelEnum,
  addedAt: z.number(),
});
export type CartItem = z.infer<typeof CartItemSchema>;

export const CartStateSchema = z.object({
  skills: z.array(CartItemSchema),
  targetAgent: AgentTargetEnum.default('universal'),
});
export type CartState = z.infer<typeof CartStateSchema>;

// ==========================================
// RESOLUTION & MANIFEST REQUEST/RESPONSE
// ==========================================

export const InstallResolveRequestSchema = z.object({
  skills: z.array(z.string()).min(1),
  agent: AgentTargetEnum.default('universal'),
  global: z.boolean().optional().default(false),
});
export type InstallResolveRequest = z.infer<typeof InstallResolveRequestSchema>;

export const ResolvedSkillPackageSchema = z.object({
  slug: z.string(),
  name: z.string(),
  version: z.string(),
  commitSha: z.string(),
  sourceRepository: SourceRepositorySchema,
  targetDirectory: z.string(),
  files: z.array(SkillFileSchema),
  security: SkillSecuritySummarySchema,
});
export type ResolvedSkillPackage = z.infer<typeof ResolvedSkillPackageSchema>;

export const InstallResolveResponseSchema = z.object({
  success: z.boolean(),
  targetAgent: AgentTargetEnum,
  basePath: z.string(),
  packages: z.array(ResolvedSkillPackageSchema),
  warnings: z.array(z.string()).default([]),
  command: z.string(),
});
export type InstallResolveResponse = z.infer<typeof InstallResolveResponseSchema>;
