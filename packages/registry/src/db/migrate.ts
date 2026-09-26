import path from 'node:path';
import fs from 'node:fs';
import { RegistryDatabase, getDbPath } from './database.js';
import categoriesData from '../data/categories.json';
import repositoriesData from '../data/repositories.json';
import skillsData from '../data/skills.json';
import { Category, Skill, SourceRepository } from '@domoskills/validators';

export function runMigration(customDbPath?: string): {
  categoriesCount: number;
  repositoriesCount: number;
  skillsCount: number;
  dbPath: string;
} {
  const dbPath = customDbPath || getDbPath();
  const db = new RegistryDatabase(dbPath);

  // 1. Migrate categories
  const categories = categoriesData as unknown as Category[];
  for (const cat of categories) {
    db.insertCategory(cat);
  }

  // 2. Migrate repositories
  const repositoriesMap = repositoriesData as unknown as Record<string, SourceRepository>;
  for (const repoId of Object.keys(repositoriesMap)) {
    db.insertRepository(repositoriesMap[repoId]);
  }

  // 3. Migrate skills
  const skills = skillsData as unknown as Skill[];
  for (const skill of skills) {
    db.insertSkill(skill);
  }

  const stats = db.getStats();

  db.close();

  return {
    categoriesCount: categories.length,
    repositoriesCount: Object.keys(repositoriesMap).length,
    skillsCount: stats.totalSkills,
    dbPath,
  };
}

if (typeof require !== 'undefined' && require.main === module) {
  console.log('🚀 Starting JSON to SQLite migration...');
  const startTime = Date.now();
  const result = runMigration();
  console.log(`✅ Migration complete in ${Date.now() - startTime}ms!`);
  console.log(`📊 Summary:`);
  console.log(`   - Categories: ${result.categoriesCount}`);
  console.log(`   - Repositories: ${result.repositoriesCount}`);
  console.log(`   - Skills: ${result.skillsCount}`);
  console.log(`   - Database Path: ${result.dbPath}`);
}
