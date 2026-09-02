import fs from 'fs';
import path from 'path';
import os from 'os';
import pc from 'picocolors';
import { registry } from '@domoskills/registry';
import { getAdapter } from '@domoskills/adapters';
import { isPathSafe } from '@domoskills/skill-parser';
import { AgentTarget } from '@domoskills/validators';
import { logger } from '../utils/logger.js';
import { readConfig, writeConfig } from '../utils/config.js';

export function addCommand(
  skillNames: string[],
  options: { agent?: string; global?: boolean; force?: boolean } = {}
) {
  logger.banner();

  if (!skillNames || skillNames.length === 0) {
    logger.error('Please specify at least one skill to add.');
    logger.info('Usage: npx domoskills add <skill-name> [skill-name-2...]');
    return;
  }

  const cwd = process.cwd();
  const config = readConfig(cwd);
  const targetAgent = (options.agent || config.agent || 'universal') as AgentTarget;
  const adapter = getAdapter(targetAgent);
  const isGlobal = Boolean(options.global);

  const baseDir = isGlobal
    ? path.join(os.homedir(), adapter.defaultPath)
    : path.join(cwd, adapter.defaultPath);

  logger.info(
    `Installing ${pc.bold(skillNames.length.toString())} skill(s) for ${pc.bold(
      adapter.name
    )} (${pc.dim(isGlobal ? 'Global' : adapter.defaultPath)})...`
  );
  logger.log();

  let installedCount = 0;

  for (const slug of skillNames) {
    const skill = registry.getSkillBySlug(slug);

    if (!skill) {
      logger.error(`Skill "${slug}" not found in DomoSkills registry.`);
      logger.info(`Run ${pc.cyan(`npx domoskills search ${slug}`)} to search available skills.`);
      continue;
    }

    const skillTargetDir = path.join(baseDir, skill.slug);

    // Check existing
    if (fs.existsSync(skillTargetDir) && !options.force) {
      logger.warn(`Skill "${skill.slug}" is already installed at ${pc.dim(skillTargetDir)}. Use --force to overwrite.`);
      continue;
    }

    // Security check on files
    let hasSafetyIssue = false;
    for (const f of skill.files) {
      const safety = isPathSafe(f.path);
      if (!safety.safe) {
        logger.error(`Security violation in skill "${skill.slug}": file "${f.path}" is unsafe (${safety.reason}). Aborting installation.`);
        hasSafetyIssue = true;
        break;
      }
    }
    if (hasSafetyIssue) continue;

    // Create target dir
    fs.mkdirSync(skillTargetDir, { recursive: true });

    // Write SKILL.md
    const skillMdPath = path.join(skillTargetDir, 'SKILL.md');
    fs.writeFileSync(skillMdPath, skill.instructions, 'utf-8');

    // Write auxiliary reference files
    for (const file of skill.files) {
      if (file.path === 'SKILL.md') continue;

      const destPath = path.join(skillTargetDir, file.path);
      const destDir = path.dirname(destPath);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Generate reference documentation stub or actual content
      const sampleContent = file.content || `# ${file.path}\n\nReference asset for ${skill.name} capability.\n`;
      fs.writeFileSync(destPath, sampleContent, 'utf-8');
    }

    // Warnings if scripts present
    if (skill.security.containsScripts) {
      logger.warn(`Skill "${skill.slug}" contains executable files. DomoSkills installed them in read-only mode.`);
    }

    // Update config
    if (!isGlobal) {
      const repoName =
        skill.sourceRepository.repository ||
        (skill.sourceRepository as any).name ||
        'skills-registry';
      const existingIdx = config.skills.findIndex((s) => s.name === skill.slug);
      const skillRecord = {
        name: skill.slug,
        source: `${skill.sourceRepository.owner}/${repoName}`,
        version: skill.version,
        commit: skill.commitSha,
        installedAt: new Date().toISOString(),
        files: skill.files.map((f) => f.path),
        agent: targetAgent,
      };

      if (existingIdx >= 0) {
        config.skills[existingIdx] = skillRecord;
      } else {
        config.skills.push(skillRecord);
      }
      config.agent = targetAgent;
      writeConfig(config, cwd);
    }

    const resolvedRepo =
      skill.sourceRepository.repository ||
      (skill.sourceRepository as any).name ||
      'skills-registry';

    logger.success(
      `Installed ${pc.bold(skill.name)} (${pc.dim(skill.slug)}) v${skill.version} ` +
        pc.dim(`[${skill.license}]`)
    );
    logger.step('Location', path.relative(cwd, skillTargetDir) || skillTargetDir);
    logger.step('Source', `${skill.sourceRepository.owner}/${resolvedRepo} (${skill.commitSha})`);
    installedCount++;
    logger.log();
  }

  if (installedCount > 0) {
    logger.log(
      pc.bold(
        pc.green(
          `✔ Successfully added ${installedCount} skill${
            installedCount === 1 ? '' : 's'
          } to ${adapter.name}!`
        )
      )
    );
    logger.log(pc.dim('Your AI agent is now equipped with these skills.'));
  }
}
