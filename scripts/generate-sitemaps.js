const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://domoskills.com';
const today = new Date().toISOString().split('T')[0];

// 1. Static Core Pages
const staticRoutes = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: 'explore', priority: '0.9', changefreq: 'daily' },
  { url: 'doctor', priority: '0.8', changefreq: 'weekly' },
  { url: 'submit', priority: '0.8', changefreq: 'weekly' },
  { url: 'settings', priority: '0.5', changefreq: 'monthly' },
  { url: 'privacy', priority: '0.5', changefreq: 'monthly' },
  { url: 'terms', priority: '0.5', changefreq: 'monthly' },
];

// 2. Load Categories
const categoriesPath = path.resolve(__dirname, '../packages/registry/src/data/categories.json');
let categories = [];
try {
  categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
} catch (e) {
  console.warn('Could not load categories from src, trying dist...', e.message);
  const altPath = path.resolve(__dirname, '../packages/registry/dist/data/categories.json');
  categories = JSON.parse(fs.readFileSync(altPath, 'utf-8'));
}

// 3. Supported Agents
const agents = [
  'universal',
  'claude',
  'cursor',
  'opencode',
  'codex',
  'gemini',
  'copilot',
];

// 4. Bundle Presets
const presets = [
  'autonomous-ai-engineer',
  'devsecops-hardening',
  'fullstack-ts-pro',
  'llmops-inference-lab',
  'multi-agent-swarms',
  'nextgen-frontend-ux',
  'cloud-native-resilience',
  'automated-qa-testing',
  'edge-serverless-fast',
];

// 5. Load Skills
const skillsPath = path.resolve(__dirname, '../packages/registry/src/data/skills.json');
let skills = [];
try {
  skills = JSON.parse(fs.readFileSync(skillsPath, 'utf-8'));
} catch (e) {
  console.warn('Could not load skills from src, trying dist...', e.message);
  const altPath = path.resolve(__dirname, '../packages/registry/dist/data/skills.json');
  skills = JSON.parse(fs.readFileSync(altPath, 'utf-8'));
}

console.log(`🚀 Found ${skills.length} skills, ${categories.length} categories, ${agents.length} agents, ${presets.length} presets.`);

function buildUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function wrapUrlSet(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;
}

// Generate Slices
const pageEntries = staticRoutes.map((route) => {
  const loc = route.url ? `${BASE_URL}/${route.url}` : `${BASE_URL}/`;
  return buildUrlEntry(loc, today, route.changefreq, route.priority);
});

const categoryEntries = categories.map((cat) => {
  const loc = `${BASE_URL}/explore?category=${encodeURIComponent(cat.slug)}`;
  return buildUrlEntry(loc, today, 'daily', '0.85');
});

const agentEntries = agents.map((agent) => {
  const loc = `${BASE_URL}/explore?agent=${encodeURIComponent(agent)}`;
  return buildUrlEntry(loc, today, 'daily', '0.85');
});

const presetEntries = presets.map((preset) => {
  const loc = `${BASE_URL}/explore?preset=${encodeURIComponent(preset)}`;
  return buildUrlEntry(loc, today, 'weekly', '0.8');
});

const skillEntries = skills.map((skill) => {
  const loc = `${BASE_URL}/skills/${encodeURIComponent(skill.slug)}`;
  let lastmod = today;
  if (skill.updatedAt) {
    lastmod = skill.updatedAt.split('T')[0];
  } else if (skill.createdAt) {
    lastmod = skill.createdAt.split('T')[0];
  }
  const isHighPriority = skill.trustLevel === 'Official' || (skill.securityScore && skill.securityScore >= 90);
  const priority = isHighPriority ? '0.9' : '0.8';
  return buildUrlEntry(loc, lastmod, 'weekly', priority);
});

// Master Sitemap (Everything in one)
const allEntries = [
  ...pageEntries,
  ...categoryEntries,
  ...agentEntries,
  ...presetEntries,
  ...skillEntries,
];

const masterSitemapXml = wrapUrlSet(allEntries);
const pagesSitemapXml = wrapUrlSet(pageEntries);
const categoriesSitemapXml = wrapUrlSet(categoryEntries);
const agentsSitemapXml = wrapUrlSet(agentEntries);
const bundlesSitemapXml = wrapUrlSet(presetEntries);
const skillsSitemapXml = wrapUrlSet(skillEntries);

// Sitemap Index
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-skills.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-categories.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-agents.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-bundles.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;

// Robots.txt
const robotsTxt = `User-agent: *
Allow: /
Crawl-delay: 1

# Explicit Allow for Search Crawlers
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# Host & Sitemaps
Host: ${BASE_URL}
Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/sitemap-index.xml
Sitemap: ${BASE_URL}/sitemap-pages.xml
Sitemap: ${BASE_URL}/sitemap-skills.xml
Sitemap: ${BASE_URL}/sitemap-categories.xml
Sitemap: ${BASE_URL}/sitemap-agents.xml
Sitemap: ${BASE_URL}/sitemap-bundles.xml
`;

// Target directories
const targetDirs = [
  path.resolve(__dirname, '../apps/web/public'),
];

targetDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(path.join(dir, 'sitemap.xml'), masterSitemapXml.trim());
  fs.writeFileSync(path.join(dir, 'sitemap-index.xml'), sitemapIndexXml.trim());
  fs.writeFileSync(path.join(dir, 'sitemap-pages.xml'), pagesSitemapXml.trim());
  fs.writeFileSync(path.join(dir, 'sitemap-skills.xml'), skillsSitemapXml.trim());
  fs.writeFileSync(path.join(dir, 'sitemap-categories.xml'), categoriesSitemapXml.trim());
  fs.writeFileSync(path.join(dir, 'sitemap-agents.xml'), agentsSitemapXml.trim());
  fs.writeFileSync(path.join(dir, 'sitemap-bundles.xml'), bundlesSitemapXml.trim());
  fs.writeFileSync(path.join(dir, 'robots.txt'), robotsTxt.trim());
});

console.log(`✅ Generated master sitemap (${allEntries.length} URLs) and segmented sitemaps in apps/web/public/`);
console.log(`✅ Generated robots.txt with search crawler directives.`);
