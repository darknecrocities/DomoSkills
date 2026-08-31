import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import { getAdapter } from '@domoskills/adapters';
import { logger } from '../utils/logger.js';
import { readConfig, writeConfig } from '../utils/config.js';

export function removeCommand(skillName: string, options: { agent?: string } = {}) {
  logger.banner();

  if (!skillName) {
    logger.error('Please specify a skill name to remove.');
    return;
  }

  const cwd = process.cwd();
  const config = readConfig(cwd);
  const targetAgent = (options.agent || config.agent || 'universal') as any;
  const adapter = getAdapter(targetAgent);

  const skillDir = path.join(cwd, adapter.defaultPath, skillName);

  if (!fs.existsSync(skillDir)) {
    logger.warn(`Skill "${skillName}" is not installed in ${pc.dim(adapter.defaultPath)}.`);
  } else {
    fs.rmSync(skillDir, { recursive: true, force: true });
    logger.success(`Removed directory: ${pc.cyan(path.relative(cwd, skillDir))}`);
  }

  // Update config
  const prevCount = config.skills.length;
  config.skills = config.skills.filter((s) => s.name !== skillName);

  if (config.skills.length < prevCount) {
    writeConfig(config, cwd);
    logger.success(`Removed "${skillName}" from domoskills.json.`);
  }

  logger.log();
}
