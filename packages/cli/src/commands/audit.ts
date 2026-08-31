import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import { getAdapter } from '@domoskills/adapters';
import { registry } from '@domoskills/registry';
import { parseSkillMarkdown, analyzeSkillFiles } from '@domoskills/skill-parser';
import { logger } from '../utils/logger.js';
import { readConfig } from '../utils/config.js';

export function auditCommand(options: { agent?: string } = {}) {
  logger.banner();
  logger.log(pc.bold('DomoSkills Security & Integrity Audit'));
  logger.log(pc.dim('Scanning installed agent skills for integrity, script presence, and advisories...'));
  logger.log();

  const cwd = process.cwd();
  const config = readConfig(cwd);
  const targetAgent = (options.agent || config.agent || 'universal') as any;
  const adapter = getAdapter(targetAgent);
  const skillsDir = path.join(cwd, adapter.defaultPath);

  if (!fs.existsSync(skillsDir)) {
    logger.info('No skills directory found to audit.');
    return;
  }

  const dirs = fs.readdirSync(skillsDir, { withFileTypes: true }).filter((d) => d.isDirectory());
  let issuesFound = 0;

  for (const d of dirs) {
    const skillName = d.name;
    const skillPath = path.join(skillsDir, skillName);
    const skillMdFile = path.join(skillPath, 'SKILL.md');

    logger.log(pc.bold(`Checking ${pc.cyan(skillName)}:`));

    if (!fs.existsSync(skillMdFile)) {
      logger.error(`  ✖ Missing SKILL.md in ${skillName}`);
      issuesFound++;
      continue;
    }

    const mdContent = fs.readFileSync(skillMdFile, 'utf-8');
    const parsed = parseSkillMarkdown(mdContent);

    if (!parsed.hasValidFrontmatter) {
      logger.warn(`  ⚠ Invalid YAML frontmatter: ${parsed.errors.join(', ')}`);
      issuesFound++;
    } else {
      logger.success(`  ✔ Frontmatter valid (${parsed.frontmatter.name} v${parsed.frontmatter.version})`);
    }

    // Registry match check
    const regSkill = registry.getSkillBySlug(skillName);
    if (regSkill) {
      logger.success(`  ✔ Matched in DomoSkills registry (${regSkill.trustLevel} | License: ${regSkill.license})`);
    } else {
      logger.info(`  ℹ Unregistered local skill (not in official registry index)`);
    }

    // Scan all files in directory
    const allFiles = getAllFiles(skillPath);
    const skillFiles = allFiles.map((full) => {
      const rel = path.relative(skillPath, full).replace(/\\/g, '/');
      const isExec = /\.(sh|bash|py|js|ts|bat|cmd|ps1)$/i.test(rel);
      return {
        path: rel,
        type: 'file' as const,
        size: fs.statSync(full).size,
        isExecutable: isExec,
        content: fs.readFileSync(full, 'utf-8'),
      };
    });

    const secAnalysis = analyzeSkillFiles(skillFiles, mdContent);
    if (secAnalysis.containsScripts) {
      logger.warn(`  ⚠ Contains ${secAnalysis.executableFiles.length} executable script(s):`);
      for (const ef of secAnalysis.executableFiles) {
        console.log(`     - ${pc.dim(ef)}`);
      }
    }

    if (secAnalysis.warnings.length > 0) {
      for (const w of secAnalysis.warnings) {
        if (!w.includes('Script file detected')) {
          logger.warn(`  ⚠ ${w}`);
          issuesFound++;
        }
      }
    } else {
      logger.success(`  ✔ Security integrity score: ${secAnalysis.securityScore}/100`);
    }

    logger.log();
  }

  if (issuesFound === 0) {
    logger.success('All installed skills passed the security audit with zero critical vulnerabilities.');
  } else {
    logger.warn(`Audit completed with ${issuesFound} warning(s) or issue(s). Review reported items.`);
  }
  logger.log();
}

function getAllFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of list) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}
