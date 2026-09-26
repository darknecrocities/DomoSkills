export const CREATE_CATEGORIES_TABLE = `
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  "order" INTEGER DEFAULT 0
);
`;

export const CREATE_REPOSITORIES_TABLE = `
CREATE TABLE IF NOT EXISTS repositories (
  id TEXT PRIMARY KEY,
  owner TEXT NOT NULL,
  repository TEXT NOT NULL,
  sourceUrl TEXT NOT NULL,
  defaultBranch TEXT DEFAULT 'main',
  license TEXT DEFAULT 'MIT',
  description TEXT,
  stars INTEGER DEFAULT 0,
  verified INTEGER DEFAULT 1,
  lastSyncedAt TEXT,
  createdAt TEXT
);
`;

export const CREATE_SKILLS_TABLE = `
CREATE TABLE IF NOT EXISTS skills (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT NOT NULL,
  sourceRepositoryId TEXT,
  sourceRepository TEXT NOT NULL,
  sourcePath TEXT DEFAULT '',
  sourceUrl TEXT NOT NULL,
  rawContentUrl TEXT,
  license TEXT DEFAULT 'MIT',
  version TEXT DEFAULT '1.0.0',
  commitSha TEXT DEFAULT 'HEAD',
  compatibility TEXT NOT NULL,
  trustLevel TEXT DEFAULT 'Verified',
  installs INTEGER DEFAULT 0,
  favorites INTEGER DEFAULT 0,
  isVerified INTEGER DEFAULT 1,
  isFeatured INTEGER DEFAULT 0,
  security TEXT NOT NULL,
  files TEXT NOT NULL,
  instructions TEXT DEFAULT '',
  previewImage TEXT,
  prompt TEXT,
  lastIndexedAt TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_skills_slug ON skills(slug);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_featured ON skills(isFeatured);
CREATE INDEX IF NOT EXISTS idx_skills_installs ON skills(installs);
`;

export const CREATE_SUBMISSIONS_TABLE = `
CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  repositoryUrl TEXT NOT NULL,
  skillPath TEXT DEFAULT 'skills',
  status TEXT NOT NULL,
  skillSlug TEXT,
  submittedAt TEXT NOT NULL,
  analyzedAt TEXT,
  securityScore REAL DEFAULT 100,
  rejectionReason TEXT
);
`;
