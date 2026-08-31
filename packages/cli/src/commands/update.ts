import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import { registry } from '@domoskills/registry';
import { logger } from '../utils/logger.js';
import { readConfig, writeConfig } from '../utils/config.js';
import { addCommand } from './add.js';

export function updateCommand(skillName?: string, options: { agent?: string } = {}) {
  logger.banner();
  logger.log(pc.bold('DomoSkills Update Manager'));
  logger.log(pc.dim('Checking for updated skill versions and definitions...'));
  logger.log();

  const cwd = process.cwd();
  const config = readConfig(cwd);

  if (config.skills.length === 0) {
    logger.info('No skills currently tracked in domoskills.json.');
    return;
  }

  const targets = skillName ? config.skills.filter((s) => s.name === skillName) : config.skills;

  if (skillName && targets.length === 0) {
    logger.warn(`Skill "${skillName}" is not recorded in domoskills.json.`);
    return;
  }

  let updatedCount = 0;

  for (const track of targets) {
    const regSkill = registry.getSkillBySlug(track.name);
    if (!regSkill) {
      logger.info(`Skipping ${pc.dim(track.name)} (not in registry index).`);
      continue;
    }

    if (regSkill.version !== track.version) {
      logger.info(`Update available for ${pc.bold(track.name)}: ${pc.dim(`v${track.version}`)} -> ${pc.green(`v${regSkill.version}`)}`);
      addCommand([track.name], { agent: options.agent || config.agent, force: true });
      updatedCount++;
    } else {
      logger.success(`${pc.bold(track.name)} is up to date (${pc.dim(`v${track.version}`)}).`);
    }
  }

  logger.log();
  if (updatedCount > 0) {
    logger.success(`Updated ${updatedCount} skill(s) to the latest version.`);
  } else {
    logger.success('All skills are up to date.');
  }
  logger.log();
}
