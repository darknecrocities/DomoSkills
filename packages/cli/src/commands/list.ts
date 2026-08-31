import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import { getAdapter } from '@domoskills/adapters';
import { logger } from '../utils/logger.js';
import { readConfig } from '../utils/config.js';

export function listCommand(options: { agent?: string } = {}) {
  logger.banner();

  const cwd = process.cwd();
  const config = readConfig(cwd);
  const targetAgent = (options.agent || config.agent || 'universal') as any;
  const adapter = getAdapter(targetAgent);

  const skillsDir = path.join(cwd, adapter.defaultPath);

  logger.info(`Listing installed skills for ${pc.bold(adapter.name)} (${pc.dim(adapter.defaultPath)}):`);
  logger.log();

  if (!fs.existsSync(skillsDir)) {
    logger.warn('No skills directory found.');
    logger.info('Run `npx domoskills add <skill>` to install capabilities.');
    return;
  }

  const entries = fs.readdirSync(skillsDir, { withFileTypes: true });
  const installedDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  if (installedDirs.length === 0) {
    logger.warn('No skills installed currently.');
    logger.info('Run `npx domoskills search` to explore available skills.');
    return;
  }

  for (const dir of installedDirs) {
    const skillPath = path.join(skillsDir, dir);
    const hasSkillMd = fs.existsSync(path.join(skillPath, 'SKILL.md'));
    const configEntry = config.skills.find((s) => s.name === dir);

    console.log(
      `  ${pc.bold(pc.white(dir.padEnd(28)))} ${
        hasSkillMd ? pc.green('✔ SKILL.md') : pc.red('✖ Missing SKILL.md')
      }  ${pc.dim(configEntry?.version ? `v${configEntry.version}` : 'local')}`
    );
    if (configEntry?.source) {
      console.log(`    ${pc.dim('Source:')} ${pc.dim(configEntry.source)}`);
    }
  }

  logger.log();
  logger.log(pc.dim(`Total: ${installedDirs.length} skill(s) installed.`));
  logger.log();
}
