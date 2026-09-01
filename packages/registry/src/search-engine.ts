import { Skill, CategorySlug } from '@domoskills/validators';
import { SkillFilterOptions, SkillSearchResult } from './types.js';
import { SEED_CATEGORIES } from './seed-data.js';

export class SkillSearchEngine {
  private skills: Skill[];

  constructor(skills: Skill[]) {
    this.skills = skills;
  }

  updateSkills(skills: Skill[]) {
    this.skills = skills;
  }

  search(options: SkillFilterOptions = {}): SkillSearchResult {
    const {
      query = '',
      category = 'all',
      agent = 'all',
      license = 'all',
      trustLevel = 'all',
      hasScripts,
      hasVisualPreview,
      featuredOnly,
      sortBy = 'trending',
      sortDirection = 'desc',
      limit = 50,
      offset = 0,
    } = options;

    const normalizedQuery = query.trim().toLowerCase();
    const queryTokens = normalizedQuery ? normalizedQuery.split(/\s+/).filter(Boolean) : [];

    // Filter skills
    let filtered = this.skills.filter((skill) => {
      // Visual preview filter
      if (hasVisualPreview && !skill.previewImage) {
        return false;
      }

      // Category filter
      if (category !== 'all' && skill.category !== category) {
        return false;
      }

      // Agent compatibility filter
      if (agent !== 'all') {
        if (!skill.compatibility.includes('universal') && !skill.compatibility.includes(agent)) {
          return false;
        }
      }

      // License filter
      if (license !== 'all' && skill.license !== license) {
        return false;
      }

      // Trust level filter
      if (trustLevel !== 'all' && skill.trustLevel !== trustLevel) {
        return false;
      }

      // Has scripts filter
      if (hasScripts !== undefined) {
        if (skill.security.containsScripts !== hasScripts) {
          return false;
        }
      }

      // Featured filter
      if (featuredOnly && !skill.isFeatured) {
        return false;
      }

      // Query search
      if (queryTokens.length > 0) {
        const nameNorm = skill.name.toLowerCase();
        const slugNorm = skill.slug.toLowerCase();
        const descNorm = skill.description.toLowerCase();
        const tagsNorm = skill.tags.map((t) => t.toLowerCase()).join(' ');
        const catNorm = skill.category.toLowerCase();
        const repoNorm = `${skill.sourceRepository.owner}/${skill.sourceRepository.repository}`.toLowerCase();

        // Match all query tokens across searchable fields
        const allTokensMatch = queryTokens.every((token) => {
          return (
            nameNorm.includes(token) ||
            slugNorm.includes(token) ||
            descNorm.includes(token) ||
            tagsNorm.includes(token) ||
            catNorm.includes(token) ||
            repoNorm.includes(token)
          );
        });

        if (!allTokensMatch) return false;
      }

      return true;
    });

    // Score and rank if there's a search query
    if (queryTokens.length > 0) {
      filtered = filtered
        .map((skill) => {
          let score = 0;
          const nameNorm = skill.name.toLowerCase();
          const slugNorm = skill.slug.toLowerCase();
          const descNorm = skill.description.toLowerCase();
          const tagsNorm = skill.tags.map((t) => t.toLowerCase());

          for (const token of queryTokens) {
            if (slugNorm === token) score += 100;
            else if (slugNorm.startsWith(token)) score += 50;
            else if (slugNorm.includes(token)) score += 30;

            if (nameNorm.startsWith(token)) score += 40;
            else if (nameNorm.includes(token)) score += 20;

            if (tagsNorm.some((t) => t === token)) score += 35;
            else if (tagsNorm.some((t) => t.includes(token))) score += 15;

            if (descNorm.includes(token)) score += 10;
          }

          // Verification boost
          if (skill.trustLevel === 'Official') score += 10;
          if (skill.isFeatured) score += 5;

          return { skill, score };
        })
        .sort((a, b) => b.score - a.score)
        .map((item) => item.skill);
    } else {
      // Standard sorting
      filtered.sort((a, b) => {
        let diff = 0;
        switch (sortBy) {
          case 'trending':
            diff = b.installs * 1.5 + b.favorites * 3 - (a.installs * 1.5 + a.favorites * 3);
            break;
          case 'installs':
            diff = b.installs - a.installs;
            break;
          case 'favorites':
            diff = b.favorites - a.favorites;
            break;
          case 'updated':
            diff = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            break;
          case 'newest':
            diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            break;
          case 'alphabetical':
            diff = a.name.localeCompare(b.name);
            break;
          default:
            diff = b.installs - a.installs;
        }
        return sortDirection === 'asc' ? -diff : diff;
      });
    }

    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    // Calculate category counts for current filtered set
    const categoriesCount = SEED_CATEGORIES.map((cat) => ({
      slug: cat.slug,
      name: cat.name,
      count: this.skills.filter((s) => s.category === cat.slug).length,
    }));

    return {
      skills: paginated,
      total,
      hasMore: offset + limit < total,
      categories: categoriesCount,
    };
  }
}
