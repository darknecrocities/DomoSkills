import fs from 'fs';
import path from 'path';
import { DomoskillsConfig, DomoskillsConfigSchema, AgentTarget } from '@domoskills/validators';

const CONFIG_FILE_NAME = 'domoskills.json';

export function getProjectConfigPath(cwd: string = process.cwd()): string {
  return path.join(cwd, CONFIG_FILE_NAME);
}

export function readConfig(cwd: string = process.cwd()): DomoskillsConfig {
  const configPath = getProjectConfigPath(cwd);
  if (!fs.existsSync(configPath)) {
    return {
      version: 1,
      agent: 'universal',
      skills: [],
    };
  }

  try {
    const raw = fs.readFileSync(configPath, 'utf-8');
    const json = JSON.parse(raw);
    const parsed = DomoskillsConfigSchema.safeParse(json);
    if (parsed.success) {
      return parsed.data;
    }
    return {
      version: 1,
      agent: (json.agent as AgentTarget) || 'universal',
      skills: Array.isArray(json.skills) ? json.skills : [],
    };
  } catch {
    return {
      version: 1,
      agent: 'universal',
      skills: [],
    };
  }
}

export function writeConfig(config: DomoskillsConfig, cwd: string = process.cwd()): void {
  const configPath = getProjectConfigPath(cwd);
  config.lastUpdated = new Date().toISOString();
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf-8');
}
