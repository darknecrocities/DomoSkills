import { MetadataRoute } from 'next';
import { registry } from '@domoskills/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://domoskills.com';
  const today = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/doctor`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/settings`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: today,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const categories = [
    'frontend',
    'design',
    'backend',
    'fullstack',
    'security',
    'devops',
    'cloud',
    'ai-ml',
    'database',
    'testing',
    'mobile',
    'productivity',
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/explore?category=${cat}`,
    lastModified: today,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  const agents = ['universal', 'claude', 'cursor', 'opencode', 'codex', 'gemini', 'copilot'];
  const agentRoutes: MetadataRoute.Sitemap = agents.map((agent) => ({
    url: `${baseUrl}/explore?agent=${agent}`,
    lastModified: today,
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  const skills = registry.getAllSkills();
  const skillUrls: MetadataRoute.Sitemap = skills.map((skill) => ({
    url: `${baseUrl}/skills/${skill.slug}`,
    lastModified: skill.updatedAt ? new Date(skill.updatedAt) : today,
    changeFrequency: 'weekly',
    priority: skill.trustLevel === 'Official' ? 0.9 : 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...agentRoutes, ...skillUrls];
}
