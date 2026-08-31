import pc from 'picocolors';
import { registry } from '@domoskills/registry';
import { logger } from '../utils/logger.js';

export function searchCommand(query?: string, options: { category?: string; agent?: string } = {}) {
  logger.banner();

  const results = registry.getSkills({
    query: query || '',
    category: (options.category as any) || 'all',
    agent: (options.agent as any) || 'all',
    limit: 15,
  });

  if (results.skills.length === 0) {
    logger.warn(`No skills found matching "${query || ''}".`);
    logger.info('Try searching for "react", "security", "docker", "fastapi", or "postgres".');
    return;
  }

  logger.log(
    pc.bold(
      `Found ${results.total} matching skill${results.total === 1 ? '' : 's'}` +
        (query ? ` for "${query}"` : '') +
        ':'
    )
  );
  logger.log();

  for (const skill of results.skills) {
    const trustBadge =
      skill.trustLevel === 'Official'
        ? pc.bgCyan(pc.black(' OFFICIAL '))
        : skill.trustLevel === 'Verified'
        ? pc.bgGreen(pc.black(' VERIFIED '))
        : pc.bgYellow(pc.black(' COMMUNITY '));

    const scriptBadge = skill.security.containsScripts ? pc.yellow(' [scripts]') : '';

    console.log(
      `  ${pc.bold(pc.white(skill.slug.padEnd(28)))} ${trustBadge}${scriptBadge}  ${pc.dim(
        skill.category.padEnd(12)
      )} ${pc.dim('★ ' + skill.installs.toLocaleString())}`
    );
    console.log(`    ${pc.dim(skill.description)}`);
    console.log(`    ${pc.dim('Source:')} ${pc.cyan(skill.sourceUrl)}`);
    console.log();
  }

  logger.log(pc.dim('To install:'));
  logger.log(`  ${pc.green(`npx domoskills add ${results.skills[0].slug}`)}`);
  logger.log();
}
