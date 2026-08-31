import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import { getAdapter } from '@domoskills/adapters';
import { AgentTarget } from '@domoskills/validators';
import { logger } from '../utils/logger.js';
import { getProjectConfigPath, readConfig, writeConfig } from '../utils/config.js';

export function initCommand(options: { agent?: string; force?: boolean } = {}) {
  logger.banner();
  const cwd = process.cwd();
  const targetAgent = (options.agent || 'universal') as AgentTarget;
  const adapter = getAdapter(targetAgent);

  const skillsDir = path.join(cwd, adapter.defaultPath);
  const configPath = getProjectConfigPath(cwd);

  logger.info(`Initializing DomoSkills repository context for ${pc.bold(adapter.name)}...`);

  // Create skills directory
  if (!fs.existsSync(skillsDir)) {
    fs.mkdirSync(skillsDir, { recursive: true });
    logger.success(`Created skills directory: ${pc.cyan(adapter.defaultPath)}`);
  } else {
    logger.info(`Skills directory already exists: ${pc.dim(adapter.defaultPath)}`);
  }

  // Create or verify config
  if (!fs.existsSync(configPath) || options.force) {
    const config = readConfig(cwd);
    config.agent = targetAgent;
    writeConfig(config, cwd);
    logger.success(`Created configuration lockfile: ${pc.cyan('domoskills.json')}`);
  } else {
    logger.info(`Configuration already exists: ${pc.dim('domoskills.json')}`);
  }

  logger.log();
  logger.log(pc.bold('Ready to add capabilities:'));
  logger.log(`  ${pc.dim('$')} ${pc.green('npx domoskills search <keyword>')}`);
  logger.log(`  ${pc.dim('$')} ${pc.green('npx domoskills add <skill-name>')}`);
  logger.log();
}
