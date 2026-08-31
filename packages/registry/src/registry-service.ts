import {
  Skill,
  Category,
  SubmissionRequest,
  SubmissionRecord,
  InstallResolveResponse,
  AgentTarget,
} from '@domoskills/validators';
import { getAdapter, generateInstallCommand, getSkillFullPath } from '@domoskills/adapters';
import { SEED_CATEGORIES, SEED_SKILLS, SEED_REPOSITORIES } from './seed-data.js';
import { SkillSearchEngine } from './search-engine.js';
import { SkillFilterOptions, SkillSearchResult } from './types.js';

export class RegistryService {
  private skills: Map<string, Skill> = new Map();
  private categories: Category[] = [...SEED_CATEGORIES];
  private submissions: Map<string, SubmissionRecord> = new Map();
  private searchEngine: SkillSearchEngine;

  constructor() {
    for (const skill of SEED_SKILLS) {
      this.skills.set(skill.slug, skill);
    }
    this.searchEngine = new SkillSearchEngine(Array.from(this.skills.values()));
  }

  getSkills(options: SkillFilterOptions = {}): SkillSearchResult {
    return this.searchEngine.search(options);
  }

  getSkillBySlug(slug: string): Skill | null {
    return this.skills.get(slug) || null;
  }

  getAllSkills(): Skill[] {
    return Array.from(this.skills.values());
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getFeaturedSkills(limit = 6): Skill[] {
    return Array.from(this.skills.values())
      .filter((s) => s.isFeatured)
      .slice(0, limit);
  }

  getTrendingSkills(limit = 8): Skill[] {
    return Array.from(this.skills.values())
      .sort((a, b) => b.installs - a.installs)
      .slice(0, limit);
  }

  getStats() {
    const all = Array.from(this.skills.values());
    const totalInstalls = all.reduce((acc, s) => acc + s.installs, 0);
    const verifiedCount = all.filter((s) => s.isVerified).length;
    const uniqueRepos = new Set(all.map((s) => `${s.sourceRepository.owner}/${s.sourceRepository.repository}`)).size;

    return {
      totalSkills: all.length,
      totalInstalls,
      totalRepositories: uniqueRepos,
      verifiedPercentage: Math.round((verifiedCount / all.length) * 100),
    };
  }

  async submitSkill(request: SubmissionRequest): Promise<{ success: boolean; record: SubmissionRecord; message: string }> {
    const id = `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    // Extract owner/repo
    const match = request.repositoryUrl.match(/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)/);
    const owner = match ? match[1] : 'unknown';
    const repo = match ? match[2] : 'unknown';

    const record: SubmissionRecord = {
      id,
      repositoryUrl: request.repositoryUrl,
      skillPath: request.skillPath || 'skills',
      status: 'pending_review',
      submittedAt: new Date().toISOString(),
      securityScore: 95,
    };

    this.submissions.set(id, record);

    return {
      success: true,
      record,
      message: `Repository ${owner}/${repo} queued for indexing and validation pipeline.`,
    };
  }

  resolveInstallManifest(
    skillSlugs: string[],
    targetAgent: AgentTarget = 'universal',
    isGlobal = false
  ): InstallResolveResponse {
    const resolvedPackages = [];
    const warnings: string[] = [];
    const adapter = getAdapter(targetAgent);

    for (const slug of skillSlugs) {
      const skill = this.getSkillBySlug(slug);
      if (!skill) {
        warnings.push(`Skill '${slug}' was not found in registry.`);
        continue;
      }

      if (skill.security.containsScripts) {
        warnings.push(`Skill '${slug}' contains executable scripts (${skill.security.executableFiles.join(', ')}). DomoSkills will install them in read-only mode.`);
      }

      const targetDir = getSkillFullPath(slug, targetAgent, isGlobal);

      resolvedPackages.push({
        slug: skill.slug,
        name: skill.name,
        version: skill.version,
        commitSha: skill.commitSha,
        sourceRepository: skill.sourceRepository,
        targetDirectory: targetDir,
        files: skill.files,
        security: skill.security,
      });
    }

    const command = generateInstallCommand(
      resolvedPackages.map((p) => p.slug),
      targetAgent,
      { global: isGlobal }
    );

    return {
      success: resolvedPackages.length > 0,
      targetAgent,
      basePath: adapter.defaultPath,
      packages: resolvedPackages,
      warnings,
      command,
    };
  }
}

export const registry = new RegistryService();
