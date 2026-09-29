import { RegistryDatabase, getDbPath } from './database.js';
import { SEED_CATEGORIES, SEED_REPOSITORIES, SEED_SKILLS } from '../seed-data.js';

export function runMigration(customDbPath?: string): {
  categoriesCount: number;
  repositoriesCount: number;
  skillsCount: number;
  dbPath: string;
} {
  const dbPath = customDbPath || getDbPath();
  const db = new RegistryDatabase(dbPath);

  // 1. Migrate categories
  for (const cat of SEED_CATEGORIES) {
    db.insertCategory(cat);
  }

  // 2. Migrate repositories
  for (const repoId of Object.keys(SEED_REPOSITORIES)) {
    db.insertRepository(SEED_REPOSITORIES[repoId]);
  }

  // 3. Migrate skills
  for (const skill of SEED_SKILLS) {
    db.insertSkill(skill);
  }

  const stats = db.getStats();

  db.close();

  return {
    categoriesCount: SEED_CATEGORIES.length,
    repositoriesCount: Object.keys(SEED_REPOSITORIES).length,
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
