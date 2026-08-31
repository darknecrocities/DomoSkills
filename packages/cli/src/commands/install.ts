import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import { logger } from '../utils/logger.js';
import { readConfig } from '../utils/config.js';
import { addCommand } from './add.js';

export function installCommand(manifestPath?: string, options: { agent?: string; force?: boolean } = {}) {
  logger.banner();

  const cwd = process.cwd();
  let targetFile = manifestPath ? path.resolve(cwd, manifestPath) : path.join(cwd, 'domoskills.json');

  if (!fs.existsSync(targetFile)) {
    logger.error(`Manifest file not found: ${targetFile}`);
    logger.info('Run `npx domoskills init` to initialize a project or specify a file: `npx domoskills install domoskills.json`');
    return;
  }

  const config = readConfig(cwd);
  if (!config.skills || config.skills.length === 0) {
    logger.warn('No skills defined in manifest file.');
    return;
  }

  logger.info(`Installing ${pc.bold(config.skills.length.toString())} skill(s) from ${pc.cyan(path.basename(targetFile))}...`);
  logger.log();

  const skillNames = config.skills.map((s) => s.name);
  addCommand(skillNames, {
    agent: options.agent || config.agent,
    force: options.force,
  });
}
