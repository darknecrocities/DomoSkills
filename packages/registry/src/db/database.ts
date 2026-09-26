import {
  Category,
  Skill,
  SourceRepository,
  SubmissionRecord,
} from '@domoskills/validators';
import {
  CREATE_CATEGORIES_TABLE,
  CREATE_REPOSITORIES_TABLE,
  CREATE_SKILLS_TABLE,
  CREATE_SUBMISSIONS_TABLE,
} from './schema.js';

function dynamicRequire(moduleName: string): any {
  if (typeof window !== 'undefined') {
    return null;
  }
  try {
    const req = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : eval('require');
    return req(moduleName);
  } catch {
    return null;
  }
}

export function getDbPath(): string {
  if (process.env.DOMOSKILLS_DB_PATH) {
    return process.env.DOMOSKILLS_DB_PATH;
  }
  const path = dynamicRequire('node:path');
  const fs = dynamicRequire('node:fs');
  if (!path || !fs) return '';

  const defaultDir = path.resolve(__dirname, '../../data');
  if (!fs.existsSync(defaultDir)) {
    fs.mkdirSync(defaultDir, { recursive: true });
  }
  return path.join(defaultDir, 'domoskills.db');
}

export class RegistryDatabase {
  private db: any = null;
  private memorySkills: Map<string, Skill> = new Map();
  private memoryCategories: Category[] = [];

  constructor(dbPath?: string) {
    const DatabaseSync = dynamicRequire('node:sqlite')?.DatabaseSync;
    const path = dynamicRequire('node:path');
    const fs = dynamicRequire('node:fs');

    if (DatabaseSync && path && fs) {
      const targetPath = dbPath || getDbPath();
      const dir = path.dirname(targetPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      try {
        this.db = new DatabaseSync(targetPath);
        // Enable WAL mode & busy timeout to prevent concurrent lock contention
        this.db.exec('PRAGMA journal_mode = WAL;');
        this.db.exec('PRAGMA busy_timeout = 5000;');
        this.db.exec('PRAGMA synchronous = NORMAL;');
        this.initSchema();
      } catch (err) {
        // Fallback gracefully if database is locked during build
      }
    }
  }

  private initSchema() {
    if (!this.db) return;
    try {
      this.db.exec(CREATE_CATEGORIES_TABLE);
      this.db.exec(CREATE_REPOSITORIES_TABLE);
      this.db.exec(CREATE_SKILLS_TABLE);
      this.db.exec(CREATE_SUBMISSIONS_TABLE);
    } catch {
      // Ignore concurrent schema initialization
    }
  }

  // Categories
  getAllCategories(): Category[] {
    if (!this.db) return this.memoryCategories;
    try {
      const stmt = this.db.prepare('SELECT * FROM categories ORDER BY "order" ASC, name ASC');
      const rows = stmt.all() as any[];
      return rows.map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        description: r.description,
        icon: r.icon,
        order: Number(r.order),
      }));
    } catch {
      return this.memoryCategories;
    }
  }

  insertCategory(category: Category) {
    if (!this.db) {
      this.memoryCategories.push(category);
      return;
    }
    try {
      const stmt = this.db.prepare(
        'INSERT OR REPLACE INTO categories (id, slug, name, description, icon, "order") VALUES (?, ?, ?, ?, ?, ?)'
      );
      stmt.run(category.id, category.slug, category.name, category.description, category.icon, category.order ?? 0);
    } catch {}
  }

  // Repositories
  getAllRepositories(): SourceRepository[] {
    if (!this.db) return [];
    try {
      const stmt = this.db.prepare('SELECT * FROM repositories');
      const rows = stmt.all() as any[];
      return rows.map((r) => ({
        id: r.id,
        owner: r.owner,
        repository: r.repository,
        sourceUrl: r.sourceUrl,
        defaultBranch: r.defaultBranch || 'main',
        license: r.license || 'MIT',
        description: r.description,
        stars: Number(r.stars),
        verified: Boolean(r.verified),
        lastSyncedAt: r.lastSyncedAt,
        createdAt: r.createdAt,
      }));
    } catch {
      return [];
    }
  }

  insertRepository(repo: SourceRepository) {
    if (!this.db) return;
    try {
      const stmt = this.db.prepare(
        `INSERT OR REPLACE INTO repositories (id, owner, repository, sourceUrl, defaultBranch, license, description, stars, verified, lastSyncedAt, createdAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );
      stmt.run(
        repo.id,
        repo.owner,
        repo.repository,
        repo.sourceUrl,
        repo.defaultBranch || 'main',
        repo.license || 'MIT',
        repo.description || '',
        repo.stars || 0,
        repo.verified ? 1 : 0,
        repo.lastSyncedAt,
        repo.createdAt
      );
    } catch {}
  }

  // Skills
  getAllSkills(): Skill[] {
    if (!this.db) return Array.from(this.memorySkills.values());
    try {
      const stmt = this.db.prepare('SELECT * FROM skills');
      const rows = stmt.all() as any[];
      return rows.map(this.mapRowToSkill);
    } catch {
      return Array.from(this.memorySkills.values());
    }
  }

  getSkillBySlug(slug: string): Skill | null {
    if (!this.db) return this.memorySkills.get(slug) || null;
    try {
      const stmt = this.db.prepare('SELECT * FROM skills WHERE slug = ?');
      const row = stmt.get(slug) as any;
      return row ? this.mapRowToSkill(row) : null;
    } catch {
      return this.memorySkills.get(slug) || null;
    }
  }

  getFeaturedSkills(limit = 6): Skill[] {
    if (!this.db) {
      return Array.from(this.memorySkills.values())
        .filter((s) => s.isFeatured)
        .slice(0, limit);
    }
    try {
      const stmt = this.db.prepare('SELECT * FROM skills WHERE isFeatured = 1 LIMIT ?');
      const rows = stmt.all(limit) as any[];
      return rows.map(this.mapRowToSkill);
    } catch {
      return Array.from(this.memorySkills.values())
        .filter((s) => s.isFeatured)
        .slice(0, limit);
    }
  }

  getTrendingSkills(limit = 8): Skill[] {
    if (!this.db) {
      return Array.from(this.memorySkills.values())
        .sort((a, b) => b.installs - a.installs)
        .slice(0, limit);
    }
    try {
      const stmt = this.db.prepare('SELECT * FROM skills ORDER BY installs DESC LIMIT ?');
      const rows = stmt.all(limit) as any[];
      return rows.map(this.mapRowToSkill);
    } catch {
      return Array.from(this.memorySkills.values())
        .sort((a, b) => b.installs - a.installs)
        .slice(0, limit);
    }
  }

  insertSkill(skill: Skill) {
    if (!this.db) {
      this.memorySkills.set(skill.slug, skill);
      return;
    }
    try {
      const stmt = this.db.prepare(
        `INSERT OR REPLACE INTO skills (
          id, slug, name, description, category, tags, sourceRepositoryId, sourceRepository,
          sourcePath, sourceUrl, rawContentUrl, license, version, commitSha, compatibility,
          trustLevel, installs, favorites, isVerified, isFeatured, security, files,
          instructions, previewImage, prompt, lastIndexedAt, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );

      stmt.run(
        skill.id,
        skill.slug,
        skill.name,
        skill.description,
        skill.category,
        JSON.stringify(skill.tags || []),
        skill.sourceRepository?.id || '',
        JSON.stringify(skill.sourceRepository || {}),
        skill.sourcePath || '',
        skill.sourceUrl,
        skill.rawContentUrl || null,
        skill.license || 'MIT',
        skill.version || '1.0.0',
        skill.commitSha || 'HEAD',
        JSON.stringify(skill.compatibility || ['universal']),
        skill.trustLevel || 'Verified',
        skill.installs || 0,
        skill.favorites || 0,
        skill.isVerified ? 1 : 0,
        skill.isFeatured ? 1 : 0,
        JSON.stringify(skill.security || {}),
        JSON.stringify(skill.files || []),
        skill.instructions || '',
        skill.previewImage || null,
        skill.prompt || null,
        skill.lastIndexedAt,
        skill.createdAt,
        skill.updatedAt
      );
    } catch {}
  }

  getStats() {
    if (!this.db) {
      const all = Array.from(this.memorySkills.values());
      const totalInstalls = all.reduce((acc, s) => acc + s.installs, 0);
      const verifiedCount = all.filter((s) => s.isVerified).length;
      return {
        totalSkills: all.length,
        totalInstalls,
        totalRepositories: 0,
        verifiedPercentage: all.length > 0 ? Math.round((verifiedCount / all.length) * 100) : 0,
      };
    }

    try {
      const totalSkillsRow = (this.db.prepare('SELECT COUNT(*) as count FROM skills').get() as any) || { count: 0 };
      const installsRow = (this.db.prepare('SELECT SUM(installs) as sum FROM skills').get() as any) || { sum: 0 };
      const verifiedRow = (this.db.prepare('SELECT COUNT(*) as count FROM skills WHERE isVerified = 1').get() as any) || { count: 0 };
      const reposRow = (this.db.prepare('SELECT COUNT(DISTINCT sourceRepositoryId) as count FROM skills').get() as any) || { count: 0 };

      const totalSkills = Number(totalSkillsRow.count) || 0;
      const totalInstalls = Number(installsRow.sum) || 0;
      const verifiedCount = Number(verifiedRow.count) || 0;
      const totalRepositories = Number(reposRow.count) || 0;

      return {
        totalSkills,
        totalInstalls,
        totalRepositories,
        verifiedPercentage: totalSkills > 0 ? Math.round((verifiedCount / totalSkills) * 100) : 0,
      };
    } catch {
      return {
        totalSkills: 0,
        totalInstalls: 0,
        totalRepositories: 0,
        verifiedPercentage: 0,
      };
    }
  }

  // Submissions
  insertSubmission(record: SubmissionRecord) {
    if (!this.db) return;
    try {
      const stmt = this.db.prepare(
        `INSERT OR REPLACE INTO submissions (id, repositoryUrl, skillPath, status, skillSlug, submittedAt, analyzedAt, securityScore, rejectionReason)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      );
      stmt.run(
        record.id,
        record.repositoryUrl,
        record.skillPath,
        record.status,
        record.skillSlug || null,
        record.submittedAt,
        record.analyzedAt || null,
        record.securityScore ?? 100,
        record.rejectionReason || null
      );
    } catch {}
  }

  private mapRowToSkill(r: any): Skill {
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      description: r.description,
      category: r.category,
      tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags,
      sourceRepository: typeof r.sourceRepository === 'string' ? JSON.parse(r.sourceRepository) : r.sourceRepository,
      sourcePath: r.sourcePath || '',
      sourceUrl: r.sourceUrl,
      rawContentUrl: r.rawContentUrl || undefined,
      license: r.license || 'MIT',
      version: r.version || '1.0.0',
      commitSha: r.commitSha || 'HEAD',
      compatibility: typeof r.compatibility === 'string' ? JSON.parse(r.compatibility) : r.compatibility,
      trustLevel: r.trustLevel || 'Verified',
      installs: Number(r.installs) || 0,
      favorites: Number(r.favorites) || 0,
      isVerified: Boolean(r.isVerified),
      isFeatured: Boolean(r.isFeatured),
      security: typeof r.security === 'string' ? JSON.parse(r.security) : r.security,
      files: typeof r.files === 'string' ? JSON.parse(r.files) : r.files,
      instructions: r.instructions || '',
      previewImage: r.previewImage || undefined,
      prompt: r.prompt || undefined,
      lastIndexedAt: r.lastIndexedAt,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  close() {
    if (this.db) {
      try {
        this.db.close();
      } catch {}
    }
  }
}
