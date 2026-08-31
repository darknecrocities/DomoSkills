import { SkillProvider, DiscoveredSkill, SkillPackage, ValidationResult } from '../types.js';
import { parseSkillPackage } from '@domoskills/skill-parser';

export class ManualSubmissionProvider implements SkillProvider {
  id = 'manual-submission-provider';
  name = 'Manual Community Submission Ingestor';

  async discover(): Promise<DiscoveredSkill[]> {
    return [];
  }

  async fetchSkill(source: DiscoveredSkill): Promise<SkillPackage> {
    return {
      metadata: source,
      rawSkillMarkdown: '',
      files: [],
      commitSha: 'HEAD',
    };
  }

  async validate(skillPkg: SkillPackage): Promise<ValidationResult> {
    const parsed = parseSkillPackage(skillPkg.rawSkillMarkdown, skillPkg.files, {
      sourceRepo: `${skillPkg.metadata.owner}/${skillPkg.metadata.repository}`,
      sourceUrl: skillPkg.metadata.repositoryUrl,
      isOfficial: false,
      isVerifiedSource: false,
    });

    return {
      valid: parsed.isValid,
      score: parsed.security.securityScore,
      trustLevel: parsed.skill.trustLevel || 'Community',
      errors: parsed.errors,
      warnings: parsed.warnings,
    };
  }
}
