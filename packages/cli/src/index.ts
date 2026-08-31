import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { searchCommand } from './commands/search.js';
import { addCommand } from './commands/add.js';
import { removeCommand } from './commands/remove.js';
import { listCommand } from './commands/list.js';
import { doctorCommand } from './commands/doctor.js';
import { auditCommand } from './commands/audit.js';
import { updateCommand } from './commands/update.js';
import { installCommand } from './commands/install.js';

const program = new Command();

program
  .name('domoskills')
  .description('The Open AI Agent Skills Marketplace & CLI Installer')
  .version('0.1.0');

// init
program
  .command('init')
  .description('Initialize DomoSkills directory and config in the current project')
  .option('-a, --agent <target>', 'Target agent ecosystem (universal, claude, codex, cursor, opencode, copilot, gemini)', 'universal')
  .option('-f, --force', 'Overwrite existing config file')
  .action((options) => {
    initCommand(options);
  });

// search
program
  .command('search [query]')
  .description('Search skills in the open registry')
  .option('-c, --category <category>', 'Filter by category')
  .option('-a, --agent <agent>', 'Filter by agent compatibility')
  .action((query, options) => {
    searchCommand(query, options);
  });

// add
program
  .command('add <skills...>')
  .description('Add one or more agent skills to your project')
  .option('-a, --agent <target>', 'Target agent ecosystem (universal, claude, codex, cursor, opencode, copilot, gemini)')
  .option('-g, --global', 'Install globally into user home agent directory')
  .option('-f, --force', 'Force re-installation even if already present')
  .action((skills, options) => {
    addCommand(skills, options);
  });

// remove
program
  .command('remove <skill>')
  .alias('rm')
  .description('Remove an installed skill from the project')
  .option('-a, --agent <target>', 'Target agent ecosystem')
  .action((skill, options) => {
    removeCommand(skill, options);
  });

// list
program
  .command('list')
  .alias('ls')
  .description('List installed skills in the current project')
  .option('-a, --agent <target>', 'Target agent ecosystem')
  .action((options) => {
    listCommand(options);
  });

// doctor
program
  .command('doctor')
  .description('Diagnose development environment, agents, and compatibility markers')
  .action(() => {
    doctorCommand();
  });

// audit
program
  .command('audit')
  .description('Audit installed skills for security advisories and script presence')
  .option('-a, --agent <target>', 'Target agent ecosystem')
  .action((options) => {
    auditCommand(options);
  });

// update
program
  .command('update [skill]')
  .description('Check and update installed skills from registry')
  .option('-a, --agent <target>', 'Target agent ecosystem')
  .action((skill, options) => {
    updateCommand(skill, options);
  });

// install
program
  .command('install [manifest]')
  .alias('i')
  .description('Install all skills specified in domoskills.json')
  .option('-a, --agent <target>', 'Target agent ecosystem')
  .option('-f, --force', 'Force overwrite')
  .action((manifest, options) => {
    installCommand(manifest, options);
  });

program.parse(process.argv);
